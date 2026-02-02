import { ExternalLink } from "lucide-react";

interface PrimarySource {
  title: string;
  url: string;
  description: string;
}

interface PrimarySourcesProps {
  sources?: PrimarySource[];
  additionalSources?: PrimarySource[];
  includeGlobalSources?: boolean;
  topic?: "bpc-157" | "tb-500" | "semaglutide" | "tirzepatide" | "peptide-safety" | "peptide-legal" | "general" | "regulatory" | "safety";
}

const GLOBAL_SOURCES: PrimarySource[] = [
  {
    title: "FDA Bulk Drug Substances Used in Compounding",
    url: "https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding",
    description: "Official FDA guidance on which substances can be compounded by pharmacies.",
  },
  {
    title: "WADA Prohibited List",
    url: "https://www.wada-ama.org/en/prohibited-list",
    description: "World Anti-Doping Agency list of prohibited substances for athletes.",
  },
];

const BPC157_SOURCES: PrimarySource[] = [
  {
    title: "BPC 157: A Systematic Review (2024)",
    url: "https://pubmed.ncbi.nlm.nih.gov/30915550/",
    description: "Comprehensive review of 36 BPC-157 studies examining preclinical and clinical evidence.",
  },
  {
    title: "BPC 157 and Tendon Healing",
    url: "https://pubmed.ncbi.nlm.nih.gov/21030672/",
    description: "Preclinical study examining effects on Achilles tendon healing in animal models.",
  },
  {
    title: "BPC 157 Mechanism of Action",
    url: "https://pubmed.ncbi.nlm.nih.gov/27847366/",
    description: "Research on nitric oxide system interaction and growth factor modulation.",
  },
];

const TB500_SOURCES: PrimarySource[] = [
  {
    title: "Thymosin Beta-4 and Tissue Repair",
    url: "https://pubmed.ncbi.nlm.nih.gov/20515666/",
    description: "Review of TB-4 mechanisms in wound healing and tissue regeneration.",
  },
];

const GLP1_SOURCES: PrimarySource[] = [
  {
    title: "ClinicalTrials.gov: Semaglutide Studies",
    url: "https://clinicaltrials.gov/search?term=semaglutide",
    description: "Registry of all clinical trials involving semaglutide.",
  },
  {
    title: "ClinicalTrials.gov: Tirzepatide Studies",
    url: "https://clinicaltrials.gov/search?term=tirzepatide",
    description: "Registry of all clinical trials involving tirzepatide.",
  },
];

function getTopicSources(topic: string): PrimarySource[] {
  switch (topic) {
    case "bpc-157":
      return BPC157_SOURCES;
    case "tb-500":
      return TB500_SOURCES;
    case "semaglutide":
    case "tirzepatide":
      return GLP1_SOURCES;
    case "peptide-safety":
    case "peptide-legal":
      return [...BPC157_SOURCES.slice(0, 1)];
    default:
      return [];
  }
}

export function PrimarySources({ 
  sources = [], 
  additionalSources = [],
  includeGlobalSources = true,
  topic = "general" 
}: PrimarySourcesProps) {
  const topicSources = getTopicSources(topic);
  const allSources = [
    ...sources,
    ...additionalSources,
    ...topicSources,
    ...(includeGlobalSources ? GLOBAL_SOURCES : []),
  ];

  // Deduplicate by URL
  const uniqueSources = allSources.filter(
    (source, index, self) => index === self.findIndex((s) => s.url === source.url)
  );

  if (uniqueSources.length === 0) {
    return null;
  }

  return (
    <section id="primary-sources" className="mb-10">
      <h2 className="text-2xl font-bold mb-4">Primary Sources</h2>
      <p className="text-muted-foreground mb-4 leading-relaxed">
        The following peer-reviewed studies and official sources inform this guide:
      </p>
      <ul className="space-y-3">
        {uniqueSources.map((source, index) => (
          <li key={index} className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 mt-1 text-primary shrink-0" />
            <div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                {source.title}
              </a>
              <span className="text-muted-foreground"> — {source.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
