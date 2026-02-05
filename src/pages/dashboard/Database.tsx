import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import { usePeptides, type PeptideFilters } from "@/hooks/usePeptides";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { PeptideCard } from "@/components/database/PeptideCard";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "GLP-1", label: "GLP-1" },
  { value: "GLP-1/GIP", label: "GLP-1/GIP" },
  { value: "Recovery", label: "Recovery" },
  { value: "Growth Hormone", label: "Growth Hormone" },
  { value: "Skin/Hair", label: "Skin/Hair" },
  { value: "Cognitive", label: "Cognitive" },
  { value: "Immune", label: "Immune" },
  { value: "Longevity", label: "Longevity" },
  { value: "Hormonal", label: "Hormonal" },
  { value: "Other", label: "Other" },
];

const researchStatuses = [
  { value: "all", label: "All Research Levels" },
  { value: "strong", label: "Strong Evidence" },
  { value: "moderate", label: "Moderate Evidence" },
  { value: "limited", label: "Limited Evidence" },
  { value: "emerging", label: "Emerging" },
];

const fdaStatuses = [
  { value: "all", label: "All FDA Status" },
  { value: "FDA Approved", label: "FDA Approved" },
  { value: "Category 2", label: "Category 2" },
  { value: "Under Review", label: "Under Review" },
  { value: "Not Regulated", label: "Not Regulated" },
];

export default function Database() {
  const { isPaid } = useTier();
  const [filters, setFilters] = useState<PeptideFilters>({});
  const { data: peptides, isLoading } = usePeptides(filters);

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
            40+ peptides with research status, mechanisms, and FDA classifications
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-card border border-border rounded-xl">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search peptides..."
              value={filters.search || ""}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10"
            />
          </div>
          <Select
            value={filters.category || "all"}
            onValueChange={(value) => setFilters({ ...filters, category: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.researchStatus || "all"}
            onValueChange={(value) => setFilters({ ...filters, researchStatus: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {researchStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.fdaStatus || "all"}
            onValueChange={(value) => setFilters({ ...filters, fdaStatus: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fdaStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {peptides?.length || 0} peptides
        </p>

        {/* Cards */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading peptides...
            </div>
          ) : peptides?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No peptides found matching your filters
            </div>
          ) : (
            peptides?.map((peptide) => (
              <PeptideCard key={peptide.id} peptide={peptide} />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
