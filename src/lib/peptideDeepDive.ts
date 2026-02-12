export type LegalStatus = "fda_approved" | "compounding" | "research_only";

export interface DosingPhase {
  phase: string;
  dose: string;
  duration: string;
  source: string;
}

export interface PeptideDeepDiveData {
  name: string;
  summary: string;
  evidenceRating: number;
  legalStatus: LegalStatus;
  mechanism: string;
  evidence: { finding: string; source: string }[];
  dosing: { phases: DosingPhase[]; notes?: string };
  safety: {
    commonSideEffects: string[];
    seriousConcerns: string[];
    interactions: string[];
    contraindications: string[];
  };
  legal2026: {
    fdaStatus: string;
    prescriptionRequired: string;
    compoundingAvailability: string;
    lastUpdated: string;
  };
  doctorScript: {
    opening: string;
    studiesToReference: string[];
    questionsToAsk: string[];
    ifDoctorNotFamiliar: string;
  };
}

export const peptideDeepDiveLibrary: Record<string, PeptideDeepDiveData> = {
  Semaglutide: {
    name: "Semaglutide",
    summary: "GLP-1 receptor agonist proven to reduce body weight by ~15% in clinical trials.",
    evidenceRating: 5,
    legalStatus: "fda_approved",
    mechanism:
      "Semaglutide mimics a natural hormone called GLP-1 that your gut releases after eating. It slows stomach emptying so you feel full longer, reduces appetite signals in the brain, and improves how your body handles insulin and blood sugar. The result is significantly reduced hunger, fewer cravings, and gradual, sustained weight loss. It also appears to have cardiovascular benefits independent of weight loss.",
    evidence: [
      { finding: "14.9% average body weight loss over 68 weeks vs. 2.4% with placebo (n=1,961)", source: "STEP 1 Trial, NEJM 2021" },
      { finding: "Reduced major cardiovascular events by 20% in overweight adults with established CV disease", source: "SELECT Trial, NEJM 2023" },
      { finding: "Participants maintained weight loss at 2-year follow-up when continuing treatment", source: "STEP 5 Trial, Nature Medicine 2022" },
      { finding: "Superior to liraglutide (Saxenda) for weight loss: 15.8% vs. 6.4% reduction", source: "STEP 8 Trial, JAMA 2022" },
    ],
    dosing: {
      phases: [
        { phase: "Starting", dose: "0.25 mg/week", duration: "Weeks 1-4", source: "FDA prescribing info" },
        { phase: "Titration 1", dose: "0.5 mg/week", duration: "Weeks 5-8", source: "STEP trials" },
        { phase: "Titration 2", dose: "1.0 mg/week", duration: "Weeks 9-12", source: "STEP trials" },
        { phase: "Maintenance", dose: "1.7-2.4 mg/week", duration: "Ongoing", source: "STEP 1 Trial, NEJM" },
      ],
      notes: "Slow titration is critical to minimize GI side effects. Most nausea resolves within 4-8 weeks at each dose level.",
    },
    safety: {
      commonSideEffects: ["Nausea (44%)", "Diarrhea (30%)", "Vomiting (24%)", "Constipation (24%)", "Headache (14%)"],
      seriousConcerns: ["Pancreatitis (rare, <0.3%)", "Gallbladder events (cholelithiasis)", "Thyroid C-cell tumors in rodent studies (not confirmed in humans)"],
      interactions: ["May affect absorption of oral medications due to delayed gastric emptying", "Use caution with insulin or sulfonylureas (hypoglycemia risk)"],
      contraindications: ["Personal or family history of medullary thyroid carcinoma (MTC)", "Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)", "History of pancreatitis"],
    },
    legal2026: {
      fdaStatus: "FDA-approved as Ozempic (diabetes) and Wegovy (weight management)",
      prescriptionRequired: "Yes, prescription required",
      compoundingAvailability: "Compounded versions face ongoing FDA regulatory action. Availability varies by state.",
      lastUpdated: "February 2026",
    },
    doctorScript: {
      opening: "I've been researching semaglutide for {goal}. I found some compelling clinical data from the STEP trials and wanted to get your perspective before making any decisions.",
      studiesToReference: [
        "STEP 1 Trial (NEJM 2021) showing 14.9% weight loss",
        "SELECT Trial (NEJM 2023) showing cardiovascular benefits",
        "STEP 5 two-year maintenance data",
      ],
      questionsToAsk: [
        "Based on my health history, would semaglutide be appropriate for me?",
        "What monitoring or bloodwork would you recommend if I started this?",
        "Are there any interactions with my current medications I should know about?",
        "Would you be comfortable prescribing this, or can you refer me to someone who specializes in metabolic health?",
      ],
      ifDoctorNotFamiliar: "I understand GLP-1 agonists are relatively new for weight management. I have research summaries from the STEP and SELECT trials I can share. I'd rather do this with medical supervision than on my own.",
    },
  },

  Tirzepatide: {
    name: "Tirzepatide",
    summary: "Dual GIP/GLP-1 agonist with the strongest weight loss results of any approved medication.",
    evidenceRating: 5,
    legalStatus: "fda_approved",
    mechanism:
      "Tirzepatide is the first dual-action incretin. It activates both GLP-1 and GIP receptors simultaneously, which no other approved drug does. GLP-1 suppresses appetite and slows digestion, while GIP improves how fat tissue metabolizes energy and enhances insulin sensitivity. This dual mechanism produces greater weight loss and blood sugar control than GLP-1 alone. Think of it as hitting two metabolic switches instead of one.",
    evidence: [
      { finding: "22.5% average body weight loss at the highest dose over 72 weeks (n=2,539)", source: "SURMOUNT-1 Trial, NEJM 2022" },
      { finding: "Over one-third of participants lost 25%+ of body weight at 15mg dose", source: "SURMOUNT-1 Trial, NEJM 2022" },
      { finding: "Superior to semaglutide 1mg for A1C reduction and weight loss in type 2 diabetes", source: "SURPASS-2 Trial, NEJM 2021" },
      { finding: "Improvements in blood pressure, triglycerides, and waist circumference beyond weight loss alone", source: "SURMOUNT-2 Trial, Lancet 2023" },
    ],
    dosing: {
      phases: [
        { phase: "Starting", dose: "2.5 mg/week", duration: "Weeks 1-4", source: "FDA prescribing info" },
        { phase: "Titration 1", dose: "5 mg/week", duration: "Weeks 5-8", source: "SURMOUNT trials" },
        { phase: "Titration 2", dose: "10 mg/week", duration: "Weeks 9-12", source: "SURMOUNT trials" },
        { phase: "Maintenance", dose: "10-15 mg/week", duration: "Ongoing", source: "SURMOUNT-1 Trial" },
      ],
      notes: "Like semaglutide, slow titration over 4-week intervals reduces GI side effects. The 15mg dose showed the highest efficacy but also more side effects.",
    },
    safety: {
      commonSideEffects: ["Nausea (31%)", "Diarrhea (23%)", "Decreased appetite (20%)", "Vomiting (12%)", "Constipation (11%)"],
      seriousConcerns: ["Pancreatitis (rare)", "Gallbladder events", "Thyroid C-cell tumor risk (precautionary, based on rodent data)"],
      interactions: ["May affect absorption of oral medications due to delayed gastric emptying", "Caution with insulin or sulfonylureas"],
      contraindications: ["Personal or family history of MTC", "MEN 2 syndrome", "History of pancreatitis"],
    },
    legal2026: {
      fdaStatus: "FDA-approved as Mounjaro (diabetes) and Zepbound (weight management)",
      prescriptionRequired: "Yes, prescription required",
      compoundingAvailability: "Compounded versions are available through some pharmacies, though regulatory landscape is evolving.",
      lastUpdated: "February 2026",
    },
    doctorScript: {
      opening: "I've been researching tirzepatide for {goal}. The SURMOUNT trial data looks very promising, and I wanted to discuss whether it might be right for me.",
      studiesToReference: [
        "SURMOUNT-1 Trial (NEJM 2022) showing 22.5% weight loss",
        "SURPASS-2 head-to-head vs. semaglutide",
        "SURMOUNT-2 cardiometabolic benefits data",
      ],
      questionsToAsk: [
        "Given my health profile, would tirzepatide or semaglutide be more appropriate?",
        "What baseline labs should I get before starting?",
        "How should we monitor for pancreatitis or gallbladder issues?",
        "What's your experience with the titration schedule?",
      ],
      ifDoctorNotFamiliar: "Tirzepatide is the first dual GIP/GLP-1 agonist. I have the SURMOUNT trial summaries if you'd like to review them. I'd prefer to do this under medical guidance.",
    },
  },

  "BPC-157": {
    name: "BPC-157",
    summary: "Body Protection Compound derived from gastric juice proteins, studied for tissue repair and gut healing.",
    evidenceRating: 3,
    legalStatus: "research_only",
    mechanism:
      "BPC-157 is a chain of 15 amino acids derived from a protein naturally found in your stomach acid. It works by promoting the growth of new blood vessels (angiogenesis) and stimulating the production of growth factors that accelerate tissue repair. In animal studies, it has been shown to speed healing of tendons, ligaments, muscles, and gut lining. It also appears to modulate the nitric oxide system and interact with the dopamine system. Most research is preclinical, but the volume of positive animal data is unusually large for a research peptide.",
    evidence: [
      { finding: "Accelerated healing of transected Achilles tendons in rats with improved biomechanical strength", source: "Journal of Orthopaedic Research, 2010" },
      { finding: "Protected against NSAID-induced gut lesions and accelerated gastric ulcer healing in multiple models", source: "Journal of Pharmacological Sciences, 2018" },
      { finding: "Promoted angiogenesis and tendon-to-bone healing in rat rotator cuff models", source: "Journal of Orthopaedic Surgery and Research, 2019" },
      { finding: "Counteracted corticosteroid-impaired muscle healing in animal models", source: "Peptides, 2020" },
      { finding: "No human clinical trials published as of 2026. All data is preclinical (animal/in vitro).", source: "PubMed systematic review" },
    ],
    dosing: {
      phases: [
        { phase: "Standard", dose: "250-500 mcg/day", duration: "4-6 weeks", source: "Preclinical literature extrapolation" },
        { phase: "Loading (acute injury)", dose: "500 mcg 2x/day", duration: "2 weeks", source: "Clinical practice reports" },
      ],
      notes: "Most BPC-157 research uses animal models. Human dosing is extrapolated from body-weight-adjusted animal doses. No standardized human dosing protocol exists. Subcutaneous injection near the injury site is the most common administration method in clinical practice.",
    },
    safety: {
      commonSideEffects: ["Injection site redness or irritation", "Mild nausea (rare, reported anecdotally)", "Dizziness (rare)"],
      seriousConcerns: ["Limited human safety data. Long-term effects unknown.", "Theoretical concern about promoting growth in existing tumors (angiogenesis mechanism)", "Product quality varies significantly between suppliers"],
      interactions: ["No well-documented drug interactions (due to lack of human trials)", "Theoretical interaction with blood pressure medications (nitric oxide modulation)"],
      contraindications: ["History of cancer (theoretical angiogenesis concern)", "Pregnancy or breastfeeding (no safety data)", "Anyone under 18 (no pediatric data)"],
    },
    legal2026: {
      fdaStatus: "NOT FDA-approved for any use. Added to FDA Import Alert list.",
      prescriptionRequired: "Not available by prescription. Cannot be legally prescribed.",
      compoundingAvailability: "Removed from compounding pharmacy availability in 2024-2025 following FDA action. Currently classified as research chemical only.",
      lastUpdated: "February 2026",
    },
    doctorScript: {
      opening: "I've been reading about BPC-157 for {goal}. I know it's not FDA-approved, but there's a significant amount of preclinical research. I wanted to get your medical perspective.",
      studiesToReference: [
        "Over 90 published studies on BPC-157 in peer-reviewed journals",
        "Achilles tendon healing study (J Orthop Res, 2010)",
        "Gut mucosal protection research (J Pharmacol Sci, 2018)",
      ],
      questionsToAsk: [
        "Are you familiar with BPC-157 research? What's your perspective on the preclinical data?",
        "Given that it's not FDA-approved, what monitoring would you suggest if someone were using it?",
        "Are there any approved alternatives that work through similar mechanisms?",
        "What bloodwork would help establish a safety baseline?",
      ],
      ifDoctorNotFamiliar: "I understand this is outside mainstream medicine. I have summaries of the published research I can share. My priority is safety, and I'd rather have medical oversight than try this alone. Would you be open to reviewing the data?",
    },
  },

  "TB-500": {
    name: "TB-500",
    summary: "Synthetic version of thymosin beta-4, researched for wound healing and tissue repair.",
    evidenceRating: 2,
    legalStatus: "research_only",
    mechanism:
      "TB-500 is a synthetic fragment of thymosin beta-4, a protein your body naturally produces that plays a role in cell migration and tissue repair. It works by upregulating actin, a protein that forms the structural framework of cells, which helps cells move to injury sites faster. It also promotes new blood vessel formation and reduces inflammation. In animal studies, it has shown effects on wound healing, cardiac repair after injury, and corneal healing. The research is earlier-stage than BPC-157, with fewer published studies.",
    evidence: [
      { finding: "Improved cardiac function and reduced scar size after heart attack in mouse models", source: "Annals of the New York Academy of Sciences, 2007" },
      { finding: "Accelerated wound closure and hair regrowth in dermal wound models", source: "Wound Repair and Regeneration, 2012" },
      { finding: "Promoted corneal epithelial healing in animal models, leading to Phase 2 human trial for dry eye", source: "RegeneRx clinical pipeline, 2019" },
      { finding: "Reduced inflammatory markers and promoted tissue remodeling in tendon injury models", source: "Journal of Inflammation Research, 2016" },
    ],
    dosing: {
      phases: [
        { phase: "Loading", dose: "750 mcg 2x/week", duration: "Weeks 1-4", source: "Preclinical extrapolation" },
        { phase: "Maintenance", dose: "750 mcg 1x/week", duration: "Weeks 5-8", source: "Clinical practice reports" },
      ],
      notes: "TB-500 dosing is less established than BPC-157. Most protocols are based on anecdotal clinical practice rather than published human studies. Often used in combination with BPC-157 for recovery.",
    },
    safety: {
      commonSideEffects: ["Injection site discomfort", "Temporary lethargy or fatigue", "Head rush shortly after injection (rare)"],
      seriousConcerns: ["Very limited human safety data", "Theoretical tumor growth concern (promotes cell migration and angiogenesis)", "Long-term effects completely unknown"],
      interactions: ["No documented drug interactions (insufficient research)", "Theoretical concern with immunosuppressants (thymic origin)"],
      contraindications: ["Active cancer or history of cancer", "Pregnancy or breastfeeding", "Autoimmune conditions (theoretical immune modulation)"],
    },
    legal2026: {
      fdaStatus: "NOT FDA-approved. No approved human use.",
      prescriptionRequired: "Not prescribable. Research chemical only.",
      compoundingAvailability: "Not available through compounding pharmacies. Sold only as research chemical.",
      lastUpdated: "February 2026",
    },
    doctorScript: {
      opening: "I've been looking into TB-500 (thymosin beta-4) for {goal}. I understand the evidence is mostly preclinical, but I wanted your medical input.",
      studiesToReference: [
        "Thymosin beta-4 cardiac repair studies (Ann NY Acad Sci, 2007)",
        "Wound healing and tissue remodeling research",
        "RegeneRx Phase 2 trial for ophthalmic use",
      ],
      questionsToAsk: [
        "Are you familiar with thymosin beta-4 research?",
        "Given the limited human data, what would your concerns be?",
        "Are there approved alternatives for tissue repair I should consider first?",
        "What monitoring would you recommend if someone were using this?",
      ],
      ifDoctorNotFamiliar: "Thymosin beta-4 is a naturally occurring protein being researched for tissue repair. The data is early-stage. I'm bringing this up because I want to make an informed decision with medical guidance rather than on my own.",
    },
  },

  "GHK-Cu": {
    name: "GHK-Cu",
    summary: "Copper peptide naturally found in blood plasma, researched for skin repair, wound healing, and anti-aging.",
    evidenceRating: 3,
    legalStatus: "compounding",
    mechanism:
      "GHK-Cu is a tripeptide (three amino acids) naturally present in your blood plasma, saliva, and urine. Levels decline significantly with age, from about 200 ng/mL at age 20 to 80 ng/mL by age 60. It binds copper, which is essential for many enzymes involved in tissue repair. GHK-Cu stimulates collagen and glycosaminoglycan synthesis in skin, promotes blood vessel growth, and has anti-inflammatory effects. It also appears to influence gene expression, upregulating genes associated with tissue remodeling and downregulating those linked to tissue destruction.",
    evidence: [
      { finding: "Increased collagen synthesis in human fibroblasts by 70% and glycosaminoglycan synthesis by 120%", source: "Journal of Biomaterials Science, 2008" },
      { finding: "Improved skin elasticity, density, and firmness in a 12-week topical study (n=67)", source: "Journal of Aging Research & Clinical Practice, 2015" },
      { finding: "Accelerated wound healing and reduced scarring in multiple preclinical models", source: "Wounds, 2008" },
      { finding: "Gene expression analysis showed modulation of 4,000+ genes toward a younger pattern", source: "Genome Biology, 2012 (bioinformatics analysis)" },
    ],
    dosing: {
      phases: [
        { phase: "Topical (skin)", dose: "1-2% cream, applied daily", duration: "Ongoing", source: "Cosmetic studies" },
        { phase: "Injectable (research)", dose: "200-500 mcg/day", duration: "4-8 weeks", source: "Preclinical extrapolation" },
      ],
      notes: "Topical GHK-Cu has the most direct evidence for skin applications and is widely available in cosmetic products. Injectable use has less established dosing and is primarily based on clinical practice rather than published trials.",
    },
    safety: {
      commonSideEffects: ["Skin irritation or redness with topical use", "Injection site reactions (injectable)", "Metallic taste (rare, from copper)"],
      seriousConcerns: ["Copper toxicity at very high doses (unlikely at standard peptide doses)", "Limited injectable safety data in humans", "Quality control varies between suppliers"],
      interactions: ["No significant drug interactions documented", "Theoretical interaction with copper-chelating medications (penicillamine)"],
      contraindications: ["Wilson's disease or copper metabolism disorders", "Pregnancy or breastfeeding", "Active skin infection at application site"],
    },
    legal2026: {
      fdaStatus: "Not FDA-approved as a drug. Available as a cosmetic ingredient (topical).",
      prescriptionRequired: "Topical: No prescription needed. Injectable: Research chemical or compounding pharmacy.",
      compoundingAvailability: "Available through some compounding pharmacies for injectable use. Topical products widely available over-the-counter.",
      lastUpdated: "February 2026",
    },
    doctorScript: {
      opening: "I've been researching GHK-Cu for {goal}. It's a naturally occurring peptide in blood plasma that declines with age. I wanted to discuss whether supplementation makes sense for me.",
      studiesToReference: [
        "Collagen synthesis study (J Biomater Sci, 2008)",
        "12-week topical skin study showing elasticity improvements",
        "Gene expression analysis from Genome Biology, 2012",
      ],
      questionsToAsk: [
        "What's your perspective on copper peptides for skin and tissue health?",
        "Should I check my copper levels before starting supplementation?",
        "Would topical or another form of delivery be more appropriate for my goals?",
        "Are there any concerns given my current health profile?",
      ],
      ifDoctorNotFamiliar: "GHK-Cu is a tripeptide that occurs naturally in human plasma. The topical form is already used in cosmetic products. I'm interested in understanding if there's benefit beyond cosmetic use and want your guidance.",
    },
  },

  Epitalon: {
    name: "Epitalon",
    summary: "Synthetic version of epithalamin, researched for telomerase activation and potential anti-aging effects.",
    evidenceRating: 2,
    legalStatus: "research_only",
    mechanism:
      "Epitalon is a synthetic tetrapeptide designed to mimic epithalamin, a compound produced by the pineal gland. Its primary mechanism of interest is activating telomerase, the enzyme that maintains telomere length at the ends of chromosomes. Telomeres shorten with each cell division and are considered a marker of biological aging. In laboratory and animal studies, Epitalon has been shown to reactivate telomerase in human somatic cells and extend lifespan in animal models. It may also influence melatonin production and circadian rhythm regulation through its pineal gland connection.",
    evidence: [
      { finding: "Reactivated telomerase activity and elongated telomeres in human fetal fibroblast cultures", source: "Bulletin of Experimental Biology and Medicine, 2003" },
      { finding: "Extended lifespan by 13.3% in fruit fly studies", source: "Mechanisms of Ageing and Development, 2003" },
      { finding: "Restored evening melatonin peak in elderly patients (n=14) in a small clinical study", source: "Neuroendocrinology Letters, 2001" },
      { finding: "Long-term (6+ year) follow-up in elderly patients showed improved physiological markers vs. control group", source: "Bulletin of Experimental Biology and Medicine, 2006" },
    ],
    dosing: {
      phases: [
        { phase: "Standard cycle", dose: "5-10 mg/day", duration: "10-20 days", source: "Published study protocols" },
        { phase: "Maintenance", dose: "5 mg/day for 10 days", duration: "Every 4-6 months", source: "Clinical practice reports" },
      ],
      notes: "Epitalon is typically administered in cycles rather than continuously. The most common protocol mirrors the research studies: a 10-20 day course repeated every 4-6 months. Injectable (subcutaneous) is the primary route studied.",
    },
    safety: {
      commonSideEffects: ["Injection site irritation", "Changes in sleep patterns (often improved)", "Mild headache during initial use"],
      seriousConcerns: ["Very limited human safety data", "Theoretical concern: telomerase activation could theoretically promote cancer cell survival", "Long-term effects of repeated cycles unknown"],
      interactions: ["No documented drug interactions (insufficient research)", "May interact with melatonin supplements (overlapping mechanism)"],
      contraindications: ["Active cancer (telomerase activation concern)", "Pregnancy or breastfeeding", "Autoimmune conditions"],
    },
    legal2026: {
      fdaStatus: "NOT FDA-approved. No approved human use.",
      prescriptionRequired: "Not prescribable. Research chemical only.",
      compoundingAvailability: "Not available through compounding pharmacies. Available as research chemical from peptide suppliers.",
      lastUpdated: "February 2026",
    },
    doctorScript: {
      opening: "I've been reading about Epitalon for {goal}. The telomerase research is interesting, and I wanted your perspective on the science and whether it's something worth considering.",
      studiesToReference: [
        "Telomerase activation study (Bull Exp Biol Med, 2003)",
        "Melatonin restoration in elderly patients (Neuroendocrinol Lett, 2001)",
        "Long-term follow-up studies by Khavinson et al.",
      ],
      questionsToAsk: [
        "What's your view on the telomere theory of aging?",
        "Do you have concerns about telomerase activation and cancer risk?",
        "Would you recommend telomere length testing as a baseline?",
        "Are there other approaches to address biological aging you'd recommend?",
      ],
      ifDoctorNotFamiliar: "Epitalon is a synthetic peptide from longevity research. The key interest is telomerase activation. I know the evidence is early-stage and I want to understand the risk-benefit profile with your help.",
    },
  },

  "CJC-1295/Ipamorelin": {
    name: "CJC-1295/Ipamorelin",
    summary: "Growth hormone secretagogue combination that stimulates natural GH release for recovery and body composition.",
    evidenceRating: 3,
    legalStatus: "compounding",
    mechanism:
      "This combination works through two complementary pathways to boost your body's own growth hormone (GH) production. CJC-1295 is a modified version of growth hormone releasing hormone (GHRH) that stimulates the pituitary gland to produce more GH. Ipamorelin is a selective ghrelin mimetic that triggers GH release through a different receptor. Together, they amplify natural GH pulses (especially the large nighttime pulse) without the side effects seen with direct GH injection. This approach maintains your body's feedback loops rather than overriding them.",
    evidence: [
      { finding: "CJC-1295 increased mean GH levels by 46% and IGF-1 by 45% after a single dose (n=33)", source: "Journal of Clinical Endocrinology & Metabolism, 2006" },
      { finding: "Ipamorelin selectively released GH without significantly affecting cortisol, prolactin, or ACTH", source: "European Journal of Endocrinology, 1999" },
      { finding: "GH secretagogues improved body composition (reduced fat mass, increased lean mass) in GH-deficient adults", source: "Growth Hormone & IGF Research, 2005" },
      { finding: "Combination therapy showed sustained IGF-1 elevation over 2-4 week treatment periods", source: "Journal of Clinical Endocrinology & Metabolism, 2006" },
    ],
    dosing: {
      phases: [
        { phase: "Starting", dose: "CJC-1295: 100 mcg + Ipamorelin: 100 mcg", duration: "Weeks 1-2", source: "Clinical practice" },
        { phase: "Standard", dose: "CJC-1295: 200 mcg + Ipamorelin: 200 mcg", duration: "Weeks 3-12", source: "Clinical practice" },
        { phase: "Cycling", dose: "Same doses, 5 days on / 2 days off", duration: "Ongoing (8-12 week cycles)", source: "Clinical practice reports" },
      ],
      notes: "Typically administered before bed to amplify the natural nighttime GH pulse. Cycling (with breaks) helps prevent receptor desensitization. Some clinicians recommend fasting for 2 hours before injection to maximize GH release.",
    },
    safety: {
      commonSideEffects: ["Injection site redness", "Temporary water retention", "Increased hunger (from ghrelin pathway)", "Tingling or numbness in extremities", "Vivid dreams"],
      seriousConcerns: ["Risk of elevated IGF-1 if overused (associated with certain cancer risks at very high levels)", "Can worsen existing insulin resistance at high doses", "May affect blood sugar levels"],
      interactions: ["Caution with insulin or diabetes medications (blood sugar effects)", "May interact with corticosteroids", "Avoid concurrent use with direct GH injections"],
      contraindications: ["Active cancer (GH/IGF-1 can promote tumor growth)", "Uncontrolled diabetes", "Active pituitary conditions", "Pregnancy or breastfeeding"],
    },
    legal2026: {
      fdaStatus: "NOT FDA-approved as a combination. Individual components are research chemicals.",
      prescriptionRequired: "Available through some anti-aging/optimization clinics with a prescription.",
      compoundingAvailability: "Available through compounding pharmacies, though regulatory landscape is changing. Availability varies by state.",
      lastUpdated: "February 2026",
    },
    doctorScript: {
      opening: "I've been researching CJC-1295 and Ipamorelin for {goal}. They're growth hormone secretagogues that stimulate natural GH production. I wanted to discuss whether this approach is appropriate for me.",
      studiesToReference: [
        "CJC-1295 pharmacokinetics study (JCEM, 2006) showing 46% GH increase",
        "Ipamorelin selectivity study (Eur J Endocrinol, 1999)",
        "GH secretagogue body composition data (GH & IGF Res, 2005)",
      ],
      questionsToAsk: [
        "Would you recommend checking my IGF-1 and GH levels as a baseline?",
        "How does this compare to direct GH therapy in terms of safety?",
        "What monitoring schedule would you suggest during use?",
        "Are there any concerns with my current health profile?",
      ],
      ifDoctorNotFamiliar: "These are peptides that stimulate your pituitary to release more growth hormone naturally, rather than injecting GH directly. The safety profile appears favorable in studies because they work with the body's feedback systems. I can share the published research if helpful.",
    },
  },
};

export function getPeptideDeepDive(name: string): PeptideDeepDiveData | undefined {
  // Try exact match first, then partial match
  if (peptideDeepDiveLibrary[name]) return peptideDeepDiveLibrary[name];
  
  const lowerName = name.toLowerCase();
  for (const key of Object.keys(peptideDeepDiveLibrary)) {
    if (key.toLowerCase() === lowerName || lowerName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerName)) {
      return peptideDeepDiveLibrary[key];
    }
  }
  return undefined;
}

export function getAllPeptideNames(): string[] {
  return Object.keys(peptideDeepDiveLibrary);
}
