import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import { usePeptides, type PeptideFilters, type Peptide } from "@/hooks/usePeptides";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

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

const researchBadgeColors: Record<string, string> = {
  strong: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  moderate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  limited: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  emerging: "bg-muted text-muted-foreground",
};

const fdaBadgeColors: Record<string, string> = {
  "FDA Approved": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Category 2": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Under Review": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Not Regulated": "bg-muted text-muted-foreground",
};

function PeptideRow({ peptide }: { peptide: Peptide }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className="border-b border-border hover:bg-muted/50 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="p-4 font-medium">{peptide.name}</td>
        <td className="p-4 text-muted-foreground">{peptide.category}</td>
        <td className="p-4 text-muted-foreground text-sm">{peptide.primary_use}</td>
        <td className="p-4">
          <Badge variant="secondary" className={cn("text-xs", researchBadgeColors[peptide.research_status])}>
            {peptide.research_status}
          </Badge>
        </td>
        <td className="p-4">
          <Badge variant="secondary" className={cn("text-xs", fdaBadgeColors[peptide.fda_status])}>
            {peptide.fda_status}
          </Badge>
        </td>
        <td className="p-4">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </td>
      </tr>
      {expanded && (
        <tr className="bg-muted/30">
          <td colSpan={6} className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Mechanism of Action</h4>
                <p className="text-sm text-muted-foreground">{peptide.mechanism}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">What Research Shows</h4>
                <p className="text-sm text-muted-foreground">{peptide.studies}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Safety Considerations</h4>
                <p className="text-sm text-muted-foreground">{peptide.safety}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Related Peptides</h4>
                <div className="flex flex-wrap gap-2">
                  {peptide.related_peptides?.length > 0 ? (
                    peptide.related_peptides.map((related) => (
                      <Badge key={related} variant="outline" className="text-xs">
                        {related}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">None listed</span>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function Database() {
  const { canAccessDatabase } = useTier();
  const [filters, setFilters] = useState<PeptideFilters>({});
  const { data: peptides, isLoading } = usePeptides(filters);

  if (!canAccessDatabase) {
    return (
      <DashboardLayout>
        <UpgradePrompt requiredTier="pro" feature="Peptide Database" />
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

        {/* Table */}
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="p-4 text-left text-sm font-medium">Peptide Name</th>
                <th className="p-4 text-left text-sm font-medium">Category</th>
                <th className="p-4 text-left text-sm font-medium">Primary Use</th>
                <th className="p-4 text-left text-sm font-medium">Research</th>
                <th className="p-4 text-left text-sm font-medium">FDA Status</th>
                <th className="p-4 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    Loading peptides...
                  </td>
                </tr>
              ) : peptides?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No peptides found matching your filters
                  </td>
                </tr>
              ) : (
                peptides?.map((peptide) => (
                  <PeptideRow key={peptide.id} peptide={peptide} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
