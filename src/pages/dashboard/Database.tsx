import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import { usePeptides } from "@/hooks/usePeptides";
import { useQuizResponse } from "@/hooks/useQuizResponse";
import { getPeptideMatch } from "@/lib/quizPersonalization";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Database as DatabaseIcon, BookOpen, GitCompareArrows } from "lucide-react";
import { PeptideCard } from "@/components/database/PeptideCard";
import { ComparisonTable } from "@/components/database/ComparisonTable";
import { StudyBrowser } from "@/components/database/StudyBrowser";
import type { Peptide } from "@/components/database/PeptideCard";
import { motion, AnimatePresence } from "framer-motion";

type FilterPill = "all" | "weight_loss" | "recovery" | "anti_aging" | "performance" | "fda_approved" | "most_researched";

const filterPills: { value: FilterPill; label: string }[] = [
  { value: "all", label: "All" },
  { value: "weight_loss", label: "Weight Loss" },
  { value: "recovery", label: "Recovery" },
  { value: "anti_aging", label: "Anti-Aging" },
  { value: "performance", label: "Performance" },
  { value: "fda_approved", label: "FDA Approved" },
  { value: "most_researched", label: "Most Researched" },
];

function applyPillFilter(peptides: Peptide[], pill: FilterPill): Peptide[] {
  switch (pill) {
    case "weight_loss":
      return peptides.filter(
        (p) => p.category.includes("GLP-1") || p.primary_use.toLowerCase().includes("weight")
      );
    case "recovery":
      return peptides.filter((p) => p.category === "Recovery");
    case "anti_aging":
      return peptides.filter((p) => p.category === "Skin/Hair" || p.category === "Longevity");
    case "performance":
      return peptides.filter((p) => p.category === "Growth Hormone");
    case "fda_approved":
      return peptides.filter((p) => p.fda_status === "FDA Approved");
    case "most_researched":
      return [...peptides].sort(
        (a, b) => (b.total_study_count ?? 0) - (a.total_study_count ?? 0)
      );
    default:
      return peptides;
  }
}

export default function Database() {
  const { isPaid } = useTier();
  const { data: peptides, isLoading } = usePeptides();
  const { data: quizResponse } = useQuizResponse();

  const [searchQuery, setSearchQuery] = useState("");
  const [activePill, setActivePill] = useState<FilterPill>("all");
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const matchedNames = useMemo(() => {
    if (!quizResponse?.primary_goal) return new Set<string>();
    const match = getPeptideMatch(quizResponse.primary_goal);
    return new Set([match.primary, match.secondary]);
  }, [quizResponse]);

  const filteredPeptides = useMemo(() => {
    if (!peptides) return [];
    let results = [...peptides] as Peptide[];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.primary_use.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Pill filter
    results = applyPillFilter(results, activePill);

    // Sort matched peptides to top
    if (matchedNames.size > 0) {
      results.sort((a, b) => {
        const aMatch = matchedNames.has(a.name) ? 1 : 0;
        const bMatch = matchedNames.has(b.name) ? 1 : 0;
        return bMatch - aMatch;
      });
    }

    return results;
  }, [peptides, searchQuery, activePill, matchedNames]);

  const comparisonPeptides = useMemo(() => {
    if (!peptides) return [];
    return selectedForCompare
      .map((id) => (peptides as Peptide[]).find((p) => p.id === id))
      .filter(Boolean) as Peptide[];
  }, [peptides, selectedForCompare]);

  const handleToggleCompare = (id: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  if (!isPaid) {
    return (
      <DashboardLayout>
        <UpgradePrompt feature="Peptide Database" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Peptide Database
          </h1>
          <p className="text-muted-foreground">
            40+ peptides and 500+ peer-reviewed studies with research status, mechanisms, and FDA classifications
          </p>
        </div>

        <Tabs defaultValue="peptides" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="peptides" className="flex items-center gap-2">
              <DatabaseIcon className="w-4 h-4" />
              Peptides
            </TabsTrigger>
            <TabsTrigger value="studies" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Research Studies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="peptides">
            {showComparison ? (
              <ComparisonTable peptides={comparisonPeptides} onClose={() => setShowComparison(false)} />
            ) : (
              <>
                {/* Search + Filter Pills */}
                <div className="space-y-3 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search peptides by name, goal, or keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {filterPills.map((pill) => (
                      <Button
                        key={pill.value}
                        variant={activePill === pill.value ? "default" : "outline"}
                        size="sm"
                        className="rounded-full shrink-0 text-xs"
                        onClick={() => setActivePill(pill.value)}
                      >
                        {pill.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground mb-4">
                  Showing {filteredPeptides.length} peptides
                </p>

                {/* Cards */}
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Loading peptides...
                    </div>
                  ) : filteredPeptides.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No peptides found matching your filters
                    </div>
                  ) : (
                    filteredPeptides.map((peptide) => (
                      <PeptideCard
                        key={peptide.id}
                        peptide={peptide}
                        isMatch={matchedNames.has(peptide.name)}
                        isSelectedForCompare={selectedForCompare.includes(peptide.id)}
                        onToggleCompare={handleToggleCompare}
                      />
                    ))
                  )}
                </div>

                {/* Floating Compare Button */}
                <AnimatePresence>
                  {selectedForCompare.length >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
                    >
                      <Button
                        size="lg"
                        className="rounded-full shadow-lg gap-2"
                        onClick={() => setShowComparison(true)}
                      >
                        <GitCompareArrows className="w-4 h-4" />
                        Compare Selected ({selectedForCompare.length})
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </TabsContent>

          <TabsContent value="studies">
            <StudyBrowser />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
