-- ═══════════════════════════════════════════════════════════
-- STUDIES DATABASE: 500+ Peer-Reviewed Citations
-- ═══════════════════════════════════════════════════════════

-- Create the main studies table for peer-reviewed citations
CREATE TABLE public.studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Core citation data
  pubmed_id TEXT UNIQUE,
  doi TEXT,
  title TEXT NOT NULL,
  authors TEXT[],
  journal TEXT NOT NULL,
  publication_year INTEGER NOT NULL,
  publication_date DATE,
  
  -- Study characteristics
  study_type TEXT NOT NULL CHECK (study_type IN ('randomized_controlled_trial', 'meta_analysis', 'systematic_review', 'cohort', 'case_control', 'animal', 'in_vitro', 'case_study', 'observational')),
  species TEXT[] DEFAULT '{}',
  sample_size INTEGER,
  
  -- Content
  abstract TEXT,
  key_findings TEXT NOT NULL,
  dosing_info TEXT,
  safety_findings TEXT,
  
  -- Categorization
  peptide_names TEXT[] NOT NULL DEFAULT '{}',
  research_areas TEXT[] DEFAULT '{}',
  
  -- Quality indicators (GRADE scale)
  evidence_level TEXT CHECK (evidence_level IN ('high', 'moderate', 'low', 'very_low')),
  is_landmark_study BOOLEAN DEFAULT FALSE,
  
  -- Source links
  pubmed_url TEXT,
  full_text_url TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  verified_by TEXT
);

-- Create index for peptide-based lookups (GIN for array containment)
CREATE INDEX idx_studies_peptide_names ON public.studies USING GIN (peptide_names);

-- Create index for filtering by study quality
CREATE INDEX idx_studies_evidence ON public.studies (evidence_level, study_type);

-- Create index for research areas
CREATE INDEX idx_studies_research_areas ON public.studies USING GIN (research_areas);

-- Create index for species
CREATE INDEX idx_studies_species ON public.studies USING GIN (species);

-- Create index for publication year
CREATE INDEX idx_studies_year ON public.studies (publication_year DESC);

-- ═══════════════════════════════════════════════════════════
-- PEPTIDE-STUDIES JUNCTION TABLE
-- ═══════════════════════════════════════════════════════════

-- Create junction table linking peptides to studies
CREATE TABLE public.peptide_studies (
  peptide_id UUID REFERENCES public.peptides(id) ON DELETE CASCADE,
  study_id UUID REFERENCES public.studies(id) ON DELETE CASCADE,
  relevance TEXT CHECK (relevance IN ('primary', 'supportive', 'contradictory')) DEFAULT 'primary',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (peptide_id, study_id)
);

-- Index for efficient lookups
CREATE INDEX idx_peptide_studies_peptide ON public.peptide_studies (peptide_id);
CREATE INDEX idx_peptide_studies_study ON public.peptide_studies (study_id);

-- ═══════════════════════════════════════════════════════════
-- ENHANCE PEPTIDES TABLE
-- ═══════════════════════════════════════════════════════════

-- Add study-related columns to peptides
ALTER TABLE public.peptides 
ADD COLUMN IF NOT EXISTS key_studies JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS total_study_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS human_study_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_study_update TIMESTAMPTZ;

-- ═══════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════

-- Enable RLS on studies table
ALTER TABLE public.studies ENABLE ROW LEVEL SECURITY;

-- Anyone can read studies (public research data)
CREATE POLICY "Anyone can read studies"
ON public.studies
FOR SELECT
USING (true);

-- Only admins can manage studies
CREATE POLICY "Admins can manage studies"
ON public.studies
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Enable RLS on peptide_studies junction table
ALTER TABLE public.peptide_studies ENABLE ROW LEVEL SECURITY;

-- Anyone can read peptide_studies mappings
CREATE POLICY "Anyone can read peptide_studies"
ON public.peptide_studies
FOR SELECT
USING (true);

-- Only admins can manage peptide_studies
CREATE POLICY "Admins can manage peptide_studies"
ON public.peptide_studies
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- ═══════════════════════════════════════════════════════════
-- UPDATE TRIGGER
-- ═══════════════════════════════════════════════════════════

-- Create trigger for automatic updated_at
CREATE TRIGGER update_studies_updated_at
BEFORE UPDATE ON public.studies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();