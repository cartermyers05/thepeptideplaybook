import { useState } from "react";
import { useStudies, type StudyFilters } from "@/hooks/useStudies";
import { usePeptides } from "@/hooks/usePeptides";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, BookOpen, Filter } from "lucide-react";
import { StudyCard } from "./StudyCard";

const studyTypes = [
  { value: "all", label: "All Study Types" },
  { value: "randomized_controlled_trial", label: "RCT" },
  { value: "meta_analysis", label: "Meta-Analysis" },
  { value: "systematic_review", label: "Systematic Review" },
  { value: "cohort", label: "Cohort Study" },
  { value: "animal", label: "Animal Study" },
  { value: "in_vitro", label: "In Vitro" },
  { value: "case_study", label: "Case Study" },
  { value: "observational", label: "Observational" },
];

const evidenceLevels = [
  { value: "all", label: "All Evidence Levels" },
  { value: "high", label: "High" },
  { value: "moderate", label: "Moderate" },
  { value: "low", label: "Low" },
  { value: "very_low", label: "Very Low" },
];

const speciesOptions = [
  { value: "all", label: "All Species" },
  { value: "human", label: "Human" },
  { value: "mouse", label: "Mouse" },
  { value: "rat", label: "Rat" },
  { value: "pig", label: "Pig" },
  { value: "dog", label: "Dog" },
];

export function StudyBrowser() {
  const [filters, setFilters] = useState<StudyFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: studies, isLoading } = useStudies(filters);
  const { data: peptides } = usePeptides();

  // Build peptide options from database
  const peptideOptions = [
    { value: "all", label: "All Peptides" },
    ...(peptides?.map((p) => ({ value: p.name, label: p.name })) || []),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Research Studies</h2>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filters */}
      <div className={`bg-card border border-border rounded-xl p-4 space-y-4 ${showFilters ? '' : 'hidden md:block'}`}>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search studies by title, journal, or findings..."
            value={filters.search || ""}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap gap-3">
          <Select
            value={filters.peptideName || "all"}
            onValueChange={(value) => setFilters({ ...filters, peptideName: value })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {peptideOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.studyType || "all"}
            onValueChange={(value) => setFilters({ ...filters, studyType: value })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {studyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.evidenceLevel || "all"}
            onValueChange={(value) => setFilters({ ...filters, evidenceLevel: value })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {evidenceLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.species || "all"}
            onValueChange={(value) => setFilters({ ...filters, species: value })}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {speciesOptions.map((spec) => (
                <SelectItem key={spec.value} value={spec.value}>
                  {spec.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 ml-auto">
            <Switch
              id="landmark-only"
              checked={filters.landmarkOnly || false}
              onCheckedChange={(checked) => setFilters({ ...filters, landmarkOnly: checked })}
            />
            <Label htmlFor="landmark-only" className="text-sm">
              Landmark studies only
            </Label>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {studies?.length || 0} peer-reviewed studies
      </p>

      {/* Study Cards */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading studies...
          </div>
        ) : studies?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No studies found</p>
            <p className="text-sm">
              Try adjusting your filters or search terms.
              <br />
              Studies are being curated and will appear here soon.
            </p>
          </div>
        ) : (
          studies?.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))
        )}
      </div>
    </div>
  );
}
