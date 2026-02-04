// Comprehensive peptide details and guides for My Plan tab

export interface PeptideDetail {
  name: string;
  category: string;
  howItWorks: string;
  whyForYou: Record<string, string>;
  expectations: string;
  dosingSchedule: { weeks: string; dose: string; notes: string }[];
  timing: string;
  frequency: string;
  injectionSite: string;
  storage: { beforeRecon: string; afterRecon: string };
  sideEffects: { common: string[]; whenToConcern: string[] };
  tips: string[];
}

export const peptideDetails: Record<string, PeptideDetail> = {
  semaglutide: {
    name: "Semaglutide",
    category: "GLP-1 Receptor Agonist",
    howItWorks: "Mimics GLP-1 hormone that signals fullness to your brain. Reduces appetite, slows gastric emptying, and quiets 'food noise.'",
    whyForYou: {
      fat_loss: "Based on your fat loss goal, semaglutide has the strongest research backing for appetite regulation and metabolic optimization.",
    },
    expectations: "Reduced appetite within days, 'food noise' goes quiet, 10-15% weight loss over 8 weeks typical.",
    dosingSchedule: [
      { weeks: "1-2", dose: "0.25mg weekly (10 units)", notes: "Adjustment phase - your body adapts" },
      { weeks: "3-4", dose: "0.5mg weekly (20 units)", notes: "Effects kick in - appetite suppression noticeable" },
      { weeks: "5-8", dose: "1.0mg weekly (40 units)", notes: "Full dose (stay at 0.5mg if responding well)" },
    ],
    timing: "Same day each week, ideally morning",
    frequency: "Once weekly",
    injectionSite: "Subcutaneous - abdomen (2 inches from navel), thigh, or upper arm. Rotate sites weekly.",
    storage: {
      beforeRecon: "Refrigerate or room temperature (check packaging)",
      afterRecon: "Refrigerate at 36-46°F. Use within 28 days. Never freeze.",
    },
    sideEffects: {
      common: [
        "Nausea (usually subsides after 2-3 weeks)",
        "Reduced appetite (intended effect)",
        "Fatigue in first week",
        "Constipation (stay hydrated, increase fiber)",
      ],
      whenToConcern: [
        "Severe abdominal pain that doesn't go away",
        "Persistent vomiting (more than 24 hours)",
        "Signs of allergic reaction (rash, swelling, difficulty breathing)",
      ],
    },
    tips: [
      "Eat slowly, stop when 80% full",
      "Prioritize protein (100g+ daily) to preserve muscle",
      "Stay hydrated (64oz+ water daily)",
      "If nausea is bad, inject before bed to sleep through it",
      "Avoid greasy/fatty foods - they make nausea worse",
    ],
  },
  
  bpc157: {
    name: "BPC-157",
    category: "Body Protection Compound",
    howItWorks: "Promotes angiogenesis (new blood vessel growth), protects gut lining, accelerates healing of tendons, ligaments, and muscles through multiple growth pathways.",
    whyForYou: {
      muscle: "This peptide accelerates tissue repair and recovery - exactly what you need for muscle building and faster gym recovery.",
      recovery: "BPC-157 is specifically researched for tissue repair - tendons, ligaments, muscles. Ideal for injury recovery.",
      beginner: "The perfect starting point - one well-researched peptide, simple protocol, builds your confidence.",
    },
    expectations: "Improved gut health, faster recovery, reduced inflammation. Injury healing may be noticeably accelerated.",
    dosingSchedule: [
      { weeks: "1-8", dose: "250mcg twice daily (10 units each)", notes: "Morning and evening, consistent timing" },
    ],
    timing: "Morning and evening, around training if applicable",
    frequency: "Twice daily",
    injectionSite: "Subcutaneous - as close to injury site as practical, or abdomen for systemic effects",
    storage: {
      beforeRecon: "Refrigerate",
      afterRecon: "Refrigerate at 36-46°F. Use within 28 days.",
    },
    sideEffects: {
      common: [
        "Generally very well tolerated",
        "Possible injection site irritation",
        "Rare: mild headache, dizziness",
      ],
      whenToConcern: [
        "Severe reaction at injection site",
        "Allergic symptoms (rash, swelling)",
      ],
    },
    tips: [
      "Can inject near injury site for localized effect",
      "Systemic benefits occur regardless of injection location",
      "Often stacked with TB-500 for enhanced healing",
      "Empty stomach not required but may help absorption",
    ],
  },
  
  tb500: {
    name: "TB-500",
    category: "Thymosin Beta-4 Fragment",
    howItWorks: "Promotes cell migration, blood vessel growth, and reduces inflammation. Works systemically throughout the body rather than locally.",
    whyForYou: {
      muscle: "Works synergistically with BPC-157 for enhanced recovery between workouts.",
      recovery: "Systemic healing support that complements BPC-157's localized effects.",
    },
    expectations: "Systemic healing, improved flexibility, reduced inflammation. Hair growth is a common unexpected benefit.",
    dosingSchedule: [
      { weeks: "1-2", dose: "2.5mg twice weekly", notes: "Loading phase - builds up levels in body" },
      { weeks: "3-8", dose: "2.5mg once weekly", notes: "Maintenance phase" },
    ],
    timing: "Any time - works systemically regardless of timing",
    frequency: "Twice weekly (loading) then once weekly (maintenance)",
    injectionSite: "Subcutaneous - abdomen. Location doesn't matter for systemic effects.",
    storage: {
      beforeRecon: "Refrigerate",
      afterRecon: "Refrigerate at 36-46°F. Use within 28 days.",
    },
    sideEffects: {
      common: [
        "Generally well tolerated",
        "Possible head rush immediately after injection",
        "Rare: mild flu-like symptoms",
      ],
      whenToConcern: [
        "Persistent flu symptoms lasting more than 24 hours",
        "Severe reaction at injection site",
      ],
    },
    tips: [
      "Loading phase is important - don't skip it",
      "Hair growth is a common positive side effect",
      "Best when stacked with BPC-157",
      "Non-consecutive days for twice-weekly dosing",
    ],
  },
  
  epithalon: {
    name: "Epithalon",
    category: "Telomerase Activator",
    howItWorks: "Stimulates telomerase production to maintain telomere length, potentially slowing cellular aging. Also regulates melatonin for improved sleep.",
    whyForYou: {
      anti_aging: "This longevity peptide targets cellular health at the telomere level - the foundation of anti-aging.",
    },
    expectations: "Improved sleep quality, enhanced cellular health markers over time. Effects are subtle but cumulative.",
    dosingSchedule: [
      { weeks: "1-2", dose: "5mg daily for 10 days", notes: "First cycle" },
      { weeks: "3", dose: "Break - no injection", notes: "10 day rest period" },
      { weeks: "4-5", dose: "5mg daily for 10 days", notes: "Second cycle" },
    ],
    timing: "Evening, before bed",
    frequency: "Once daily during active cycles (10 days on, 10 days off)",
    injectionSite: "Subcutaneous - abdomen",
    storage: {
      beforeRecon: "Refrigerate",
      afterRecon: "Refrigerate. Use within 21 days.",
    },
    sideEffects: {
      common: [
        "Generally well tolerated",
        "Improved sleep (positive effect)",
        "Rare: mild injection site irritation",
      ],
      whenToConcern: [
        "Unusual fatigue",
        "Signs of allergic reaction",
      ],
    },
    tips: [
      "Cycling is important - don't use continuously",
      "Benefits accumulate over multiple cycles",
      "Best paired with GHK-Cu for visible results",
      "Evening dosing supports natural melatonin rhythm",
    ],
  },
  
  ghkcu: {
    name: "GHK-Cu",
    category: "Copper Peptide",
    howItWorks: "Stimulates collagen synthesis, attracts immune cells to injury sites, has antioxidant effects. Works both topically and via injection.",
    whyForYou: {
      anti_aging: "Skin rejuvenation and collagen production - visible anti-aging effects within weeks.",
    },
    expectations: "Improved skin quality within 4 weeks, better wound healing, potential hair benefits.",
    dosingSchedule: [
      { weeks: "1-12", dose: "1-2mg daily", notes: "Consistent daily use" },
    ],
    timing: "Morning",
    frequency: "Once daily",
    injectionSite: "Subcutaneous - abdomen, or topical if using cream formulation",
    storage: {
      beforeRecon: "Refrigerate",
      afterRecon: "Refrigerate. Use within 28 days.",
    },
    sideEffects: {
      common: [
        "Generally very well tolerated",
        "Injection site may have blue tint (copper)",
        "Rare: mild skin irritation if topical",
      ],
      whenToConcern: [
        "Severe skin reaction",
        "Signs of allergic response",
      ],
    },
    tips: [
      "Can use topical and injectable for enhanced effects",
      "Blue/green tint at injection site is normal (copper)",
      "Best results with consistent daily use",
      "Pairs well with Epithalon for anti-aging",
    ],
  },
  
  semax: {
    name: "Semax",
    category: "Nootropic Peptide",
    howItWorks: "Enhances BDNF (brain-derived neurotrophic factor), modulates dopamine and serotonin, provides neuroprotection.",
    whyForYou: {
      cognitive: "This nootropic stack is researched for focus, memory, and mental clarity - no injections required.",
    },
    expectations: "Improved focus within days, reduced brain fog, enhanced memory and mental clarity.",
    dosingSchedule: [
      { weeks: "1-2", dose: "200mcg daily (nasal)", notes: "Starting dose" },
      { weeks: "3-8", dose: "400-600mcg daily (nasal)", notes: "Full effect dose" },
    ],
    timing: "Morning, on empty stomach",
    frequency: "Once daily",
    injectionSite: "Intranasal (nose spray) - no injection required!",
    storage: {
      beforeRecon: "Refrigerate",
      afterRecon: "Refrigerate. Use within 21 days.",
    },
    sideEffects: {
      common: [
        "Generally well tolerated",
        "Mild nasal irritation initially",
        "Possible increased alertness (intended effect)",
      ],
      whenToConcern: [
        "Severe headache",
        "Significant mood changes",
        "Nasal bleeding",
      ],
    },
    tips: [
      "No needles - nasal administration only",
      "Start low and increase gradually",
      "Best on empty stomach for absorption",
      "Can be used daily or as-needed",
    ],
  },
  
  selank: {
    name: "Selank",
    category: "Anxiolytic Nootropic",
    howItWorks: "Modulates GABA and serotonin for anti-anxiety effects, enhances memory consolidation, provides mild immune support.",
    whyForYou: {
      cognitive: "Complements Semax by reducing anxiety while enhancing focus and mood stability.",
    },
    expectations: "Reduced anxiety, improved focus under stress, better mood stability.",
    dosingSchedule: [
      { weeks: "1-2", dose: "250mcg daily (nasal)", notes: "Starting dose" },
      { weeks: "3-8", dose: "500mcg daily (nasal)", notes: "Full effect dose" },
    ],
    timing: "Morning or early afternoon (avoid evening - may affect sleep)",
    frequency: "Once daily",
    injectionSite: "Intranasal (nose spray) - no injection required!",
    storage: {
      beforeRecon: "Refrigerate",
      afterRecon: "Refrigerate. Use within 21 days.",
    },
    sideEffects: {
      common: [
        "Generally well tolerated",
        "Mild nasal irritation",
        "Possible fatigue initially (as anxiety reduces)",
      ],
      whenToConcern: [
        "Severe mood changes",
        "Extreme fatigue",
        "Nasal bleeding",
      ],
    },
    tips: [
      "No needles - nasal administration only",
      "Avoid evening use - may affect sleep",
      "Stacks well with Semax",
      "Effects build over first week",
    ],
  },
};

export const reconstitutionGuide = {
  title: "How to Reconstitute Your Peptide",
  overview: "Reconstitution means adding bacteriostatic water to the powder to create an injectable solution. It's straightforward once you understand the process.",
  
  mathExplanation: {
    title: "The Math (Important!)",
    content: "You need to know how much water to add so you can measure accurate doses.",
    example: "With a 5mg vial + 2ml BAC water:",
    doseChart: [
      { dose: "0.25mg", draw: "0.1ml (10 units on syringe)" },
      { dose: "0.5mg", draw: "0.2ml (20 units)" },
      { dose: "1.0mg", draw: "0.4ml (40 units)" },
    ],
  },
  
  steps: [
    {
      step: 1,
      title: "Prepare Your Workspace",
      content: "Wash hands thoroughly with soap and water. Clear a clean, flat surface. Gather both vials, syringe, and alcohol swabs. Let everything reach room temperature (5 minutes).",
    },
    {
      step: 2,
      title: "Clean the Vial Tops",
      content: "Use an alcohol swab on both vial stoppers (peptide and BAC water). Wipe in one direction, let air dry 10-15 seconds. Don't blow on them.",
    },
    {
      step: 3,
      title: "Draw Bacteriostatic Water",
      content: "Draw 2ml of air into your syringe. Insert needle into BAC water vial, push the air in (creates pressure). Turn upside down, draw your desired amount of water (typically 2ml).",
    },
    {
      step: 4,
      title: "Add Water to Peptide - THE CRITICAL STEP",
      content: "Insert needle into peptide vial at a 45° angle, with tip touching the INSIDE WALL of the vial. SLOWLY release water down the side (take 30-60 seconds). DO NOT spray directly onto the powder - this damages the peptide.",
    },
    {
      step: 5,
      title: "Let It Dissolve",
      content: "Remove needle. Gently swirl the vial - NEVER SHAKE. Wait 5-10 minutes. The solution should become completely clear with no particles or cloudiness.",
    },
    {
      step: 6,
      title: "Store Properly",
      content: "Write today's date on the vial with a marker. Refrigerate immediately at 36-46°F. Use within 28 days. Never freeze.",
    },
  ],
  
  commonMistakes: [
    {
      mistake: "Spraying water directly onto powder",
      whyBad: "Force damages peptide molecular structure, reducing potency",
      fix: "Always inject slowly down the inside wall of the vial",
    },
    {
      mistake: "Shaking the vial",
      whyBad: "Creates foam and can denature (destroy) the peptide",
      fix: "Gentle swirling only, or just let it sit",
    },
    {
      mistake: "Using sterile water instead of BAC water",
      whyBad: "No preservative - bacteria grows within days",
      fix: "Always use bacteriostatic water (contains 0.9% benzyl alcohol)",
    },
    {
      mistake: "Not letting it fully dissolve",
      whyBad: "Particles mean uneven dosing",
      fix: "Wait until completely clear - up to 30 minutes is okay",
    },
  ],
  
  troubleshooting: [
    {
      issue: "Solution is cloudy",
      answer: "Wait up to 30 minutes with occasional gentle swirling. If still cloudy after 30 minutes, the peptide may have been damaged during shipping or reconstitution - don't use it.",
    },
    {
      issue: "Small bubbles in solution",
      answer: "Small bubbles are normal and harmless. They'll dissipate over time. Don't shake to remove them.",
    },
    {
      issue: "Accidentally shook the vial",
      answer: "Let it sit undisturbed for 30 minutes. It's usually still usable but may have slightly reduced potency. Avoid shaking next time.",
    },
    {
      issue: "Water won't go into vial easily",
      answer: "The vial may have negative pressure. Draw out a small amount of air first, then add water. Or add water very slowly.",
    },
  ],
};

export const injectionGuide = {
  title: "Your First Injection Guide",
  overview: "Subcutaneous injections go into the fatty layer just under your skin. They're the easiest type of injection - short thin needle, doesn't go into muscle, and most people say it's much less painful than expected.",
  
  calmingFacts: [
    "The needle is thinner than a standard blood draw needle",
    "It takes about 30 seconds total",
    "Millions do this daily - diabetics inject multiple times per day",
    "Most people barely feel it after the first few times",
    "You're in complete control of the speed and pressure",
  ],
  
  steps: [
    {
      step: 1,
      title: "Gather Supplies",
      content: "Reconstituted vial (let warm 5 minutes - room temp is more comfortable), new sterile syringe, alcohol swabs. Find a comfortable, well-lit spot.",
    },
    {
      step: 2,
      title: "Draw Your Dose",
      content: "Clean the vial top with alcohol. Draw air equal to your dose. Insert needle, push air in, turn upside down, draw your dose. Tap out any large bubbles, push plunger slightly to remove them.",
    },
    {
      step: 3,
      title: "Choose Injection Site",
      content: "Best for beginners: abdomen, 2 inches away from navel in any direction. Avoid: bruised areas, the belt line, within 2 inches of navel. Alternatives: outer thigh, back of upper arm.",
    },
    {
      step: 4,
      title: "Clean the Site",
      content: "Swab the injection area with alcohol in a circular motion (center outward). Let it air dry completely - about 15 seconds. Don't blow on it.",
    },
    {
      step: 5,
      title: "Prepare the Skin",
      content: "With your non-dominant hand, pinch about 1-2 inches of skin between your thumb and forefinger. Keep holding this pinch throughout the injection.",
    },
    {
      step: 6,
      title: "Insert the Needle",
      content: "Hold the syringe like a pencil or dart in your dominant hand. In one smooth, confident motion, insert the needle at a 45-90° angle (45° if you're lean, 90° if you have more fat). Insert the full length of the needle.",
    },
    {
      step: 7,
      title: "Inject Slowly",
      content: "Slowly push the plunger down over 5-10 seconds. Rushing causes more discomfort. Breathe normally. You might feel slight pressure - that's normal.",
    },
    {
      step: 8,
      title: "Remove and Dispose",
      content: "Wait 5 seconds after fully depressing the plunger. Pull the needle straight out. Release the skin pinch. Apply light pressure with a cotton ball if needed. Dispose of syringe immediately in a sharps container. Never recap.",
    },
  ],
  
  proTips: [
    "Ice the area for 30 seconds before if you're really nervous - it numbs the skin",
    "Breathe out as you insert the needle - you'll be more relaxed",
    "Inject slowly - fast injections hurt more",
    "Don't look if watching makes you anxious - many people close their eyes",
    "It gets easier every time - most people feel comfortable by injection 3 or 4",
    "Room temperature peptide feels better than cold",
    "Rotate sites so you're never using the same exact spot twice in a row",
  ],
  
  dontWorryAbout: [
    {
      concern: "Needle won't go in",
      reality: "These needles are designed to pierce skin easily. If you feel resistance, try a slightly different spot. The skin varies in thickness.",
    },
    {
      concern: "I might hit a vein",
      reality: "SubQ injections go into fat, not near blood vessels. The needle is too short to reach anything important. If you see blood, just apply pressure - you're fine.",
    },
    {
      concern: "I might inject into muscle",
      reality: "If you pinch the skin and angle correctly, this won't happen. Even if you did hit muscle, it's not harmful - just might be slightly sorer.",
    },
    {
      concern: "Air bubbles will harm me",
      reality: "Tiny air bubbles in subcutaneous injections are completely harmless. The amount that could fit in your syringe is far too small to cause any issue.",
    },
    {
      concern: "I'll get an infection",
      reality: "With clean technique (alcohol swab, new syringe), infection is extremely rare. Your body is good at handling minor bacteria.",
    },
  ],
};
