export interface CompoundIntel {
  mechanism: string;
  synergies: string;
  timeline: string;
  sideEffects: string;
  dietTips: string;
  exerciseTips: string;
  storageNotes: string;
  proTip: string;
}

const compoundIntelligence: Record<string, CompoundIntel> = {
  "CJC-1295 (No DAC)": {
    mechanism: "CJC-1295 mimics growth hormone releasing hormone (GHRH) and binds to receptors on your pituitary gland, triggering sustained GH pulses. Unlike the DAC version, it creates natural pulsatile release patterns — your body gets GH in waves, not a constant flood. This preserves receptor sensitivity and avoids the desensitization that comes with synthetic HGH.",
    synergies: "Pairs exceptionally well with Ipamorelin. CJC-1295 amplifies the GH pulse that Ipamorelin triggers — together they produce 3-5x more GH output than either alone. This is the most studied peptide combination for GH optimization.",
    timeline: "Days 1-5: Receptor priming, possible vivid dreams and deeper sleep. Days 5-14: Noticeable sleep quality improvement, slight increase in hunger (GH stimulates ghrelin). Weeks 3-4: Recovery between workouts improves, skin hydration increases. Weeks 6-8: Measurable body composition changes if training and diet are consistent.",
    sideEffects: "Most common: water retention (mild, resolves in 1-2 weeks), increased appetite, tingling/numbness in hands upon waking (transient GH spike — harmless, resolves within 30 min). Injection site redness is normal and resolves in 15-30 min. If you experience persistent joint pain, reduce dose by 50% and reassess after 5 days.",
    dietTips: "Inject on an empty stomach — insulin blunts GH release by up to 80%. Wait at least 2 hours after eating, or inject before bed (ideal timing). Avoid carbs for 30 min post-injection. High-protein meals during the day support GH-mediated muscle protein synthesis.",
    exerciseTips: "Resistance training amplifies GH response by 2-3x. Train 30-60 min before your evening injection for maximum synergy. HIIT cardio also triggers natural GH — combining with CJC-1295 creates a compounding effect. Avoid training immediately after injection (blood flow can disperse the peptide from the injection site too quickly).",
    storageNotes: "Reconstituted: refrigerate at 36-46°F (2-8°C). Use within 30 days. Do NOT freeze after reconstitution. Unreconstituted powder can be stored at room temperature for up to 30 days or refrigerated for up to 12 months.",
    proTip: "Take your injection at the same time every night. Your pituitary has circadian GH patterns — consistent timing synchronizes the exogenous pulse with your natural rhythm for maximum output.",
  },
  "Ipamorelin": {
    mechanism: "Ipamorelin is a growth hormone secretagogue — it mimics the hunger hormone ghrelin and binds to GHS-R receptors on your pituitary. What makes it special: it's the MOST SELECTIVE GH releaser available. It triggers GH without raising cortisol, prolactin, or aldosterone. This means GH benefits without the stress hormone spike or water retention that other secretagogues cause.",
    synergies: "The gold standard pairing is with CJC-1295 (No DAC). Ipamorelin provides the sharp GH pulse trigger while CJC-1295 amplifies and sustains it. Together they create a synergistic wave that produces significantly more GH than either peptide alone. Stacking with GHK-Cu adds a tissue repair dimension on top of the GH optimization.",
    timeline: "Days 1-3: May notice improved sleep onset (falls asleep faster). Days 5-10: Sleep quality deepens noticeably — many users report waking up feeling more refreshed. Weeks 2-3: Recovery between workouts improves, morning energy increases. Weeks 4-8: Skin quality improvements, gradual body composition shifts (less visceral fat, better muscle tone).",
    sideEffects: "Very well-tolerated — the cleanest GH secretagogue. Possible: mild headache first few days (hydration usually fixes this), slight hunger increase (less than other GH peptides), temporary lightheadedness immediately post-injection (sit down for 2-3 min). If you experience tingling in extremities, it's a sign the GH pulse is working — it resolves within 30 min.",
    dietTips: "Same fasting rules as CJC-1295 — insulin suppresses the GH pulse. Empty stomach is critical. If injecting at night, finish eating 2-3 hours before. During the day, prioritize protein (1g per lb bodyweight) to give your elevated GH something to build with. Adequate zinc and magnesium support GH signaling pathways.",
    exerciseTips: "Heavy compound lifts (squats, deadlifts, presses) trigger the largest natural GH pulses. Stacking these training sessions with your Ipamorelin timing creates a double GH pulse effect. Avoid long steady-state cardio on injection days — it can blunt the GH response. Short intense sessions (20-30 min) are ideal.",
    storageNotes: "Reconstituted: refrigerate, use within 28 days. More fragile than CJC-1295 — keep away from direct light. Store vial upright. Never shake — gently swirl to mix.",
    proTip: "If using with CJC-1295, inject them together in the same syringe. Draw Ipamorelin first, then CJC-1295. This saves injection sites and the peptides are chemically compatible.",
  },
  "GHK-Cu": {
    mechanism: "GHK-Cu is a copper-binding tripeptide naturally found in your blood, but levels decline 60% by age 60. It acts as a master regulator of tissue repair — studies have shown it modulates expression of over 4,000 genes, switching on repair pathways and switching off inflammatory ones. It stimulates collagen production, attracts immune cells to injury sites, increases fibroblast activity, and promotes new blood vessel formation. Think of it as your body's 'reset to younger' signal.",
    synergies: "Complements GH-boosting stacks (CJC/Ipa) because elevated GH amplifies tissue repair processes that GHK-Cu initiates. The GH provides raw building materials while GHK-Cu directs the construction. Also pairs well with BPC-157 for targeted healing — GHK-Cu handles systemic repair while BPC-157 focuses on specific injury sites.",
    timeline: "Days 1-7: Anti-inflammatory effects begin — may notice reduced skin redness or irritation. Weeks 2-3: Skin texture improvements become visible (smoother, more hydrated). Weeks 4-6: Hair quality may improve (thickness, growth rate). Weeks 8-12: Noticeable skin tightening, reduction in fine lines, improved wound healing speed. Full collagen remodeling takes 90+ days.",
    sideEffects: "Excellent safety profile — it's a naturally occurring peptide. Possible: injection site redness (common with copper peptides, resolves in 30-60 min), mild skin flushing, temporary darkening of skin at injection sites (copper metabolism). Very rarely: nausea if injected too quickly. If redness persists longer than 2 hours, reduce dose by 50%.",
    dietTips: "Vitamin C (500-1000mg daily) is critical — it's a cofactor in collagen synthesis that GHK-Cu stimulates. Eat citrus, bell peppers, or supplement. Ensure adequate protein intake for collagen building blocks (glycine, proline, hydroxyproline — found in bone broth, gelatin, meat). Avoid excessive zinc supplementation — zinc competes with copper for absorption and can blunt GHK-Cu's effects.",
    exerciseTips: "No specific timing restrictions — GHK-Cu isn't affected by insulin or exercise timing the way GH secretagogues are. However, light movement after injection increases blood flow and distribution. For skin benefits, avoid excessive sun exposure (UV damages collagen faster than GHK-Cu can rebuild it). Use SPF 30+ daily to protect your investment.",
    storageNotes: "Reconstituted: refrigerate, use within 21-28 days. Light-sensitive — store in original box or wrap vial in foil. Copper peptides can oxidize — if solution turns dark blue/green, discard.",
    proTip: "Morning injection is ideal for GHK-Cu — your skin's repair processes are most active during the day. This is the opposite of CJC/Ipa which are best at night. Stagger your injections: GHK-Cu AM, CJC/Ipa PM.",
  },
  "BPC-157": {
    mechanism: "Body Protection Compound-157 is a 15-amino acid peptide derived from a protein found in human gastric juice. It works primarily through the nitric oxide pathway — promoting angiogenesis (new blood vessel formation) directly at injury sites. It also upregulates growth hormone receptors, modulates the serotonin and dopamine systems, and has demonstrated organ-protective effects across gut, brain, liver, and musculoskeletal tissue in over 100 published studies.",
    synergies: "The classic recovery stack is BPC-157 + TB-500. They attack healing from two different angles: BPC-157 builds new blood vessels AT the injury, while TB-500 moves repair cells TO the injury. Together they create a comprehensive healing environment. Also enhances the recovery benefits of GH-boosting stacks.",
    timeline: "Days 1-3: Anti-inflammatory effects begin at injection/oral sites. Days 5-10: Pain reduction at injury sites, improved gut comfort if taking orally. Weeks 2-4: Significant healing acceleration for tendons, ligaments, and muscle injuries. Weeks 4-8: Gut healing (if relevant) becomes pronounced. Some users report mood improvements via serotonin system modulation.",
    sideEffects: "Extremely well-tolerated across hundreds of studies. Possible: mild nausea (especially oral), injection site irritation, temporary dizziness, mild headache. Unique consideration: BPC-157 may promote growth of existing blood vessels — theoretically could accelerate tumor growth in people with active cancer. If you have any active malignancy, do NOT use without oncologist clearance.",
    dietTips: "If taking orally for gut healing: take on empty stomach with water only. Food in the stomach may reduce local concentration. If injecting for injury: no specific dietary restrictions, but anti-inflammatory foods (fatty fish, turmeric, berries) support the healing cascade. Avoid excessive alcohol — it directly counteracts BPC-157's gut-protective effects.",
    exerciseTips: "For injury recovery: inject as close to the injury site as possible (subcutaneous, not intramuscular). Light movement and blood flow to the area after injection helps distribution. Avoid heavy loading of the injured area for the first 2 weeks — let the peptide build the vascular infrastructure first, then gradually increase load.",
    storageNotes: "Reconstituted: refrigerate, use within 14-21 days (shorter shelf life than most peptides). Very sensitive to heat — never leave at room temperature. Oral BPC-157 (if using capsules) can be stored at room temperature away from moisture.",
    proTip: "If using for a specific injury, inject subcutaneously as close to the site as possible — within 2-3 inches. Systemic injection (abdomen) still works but local injection delivers 3-5x more compound directly to the target tissue.",
  },
  "TB-500": {
    mechanism: "TB-500 is a synthetic fragment of Thymosin Beta-4, a protein present in virtually every cell in your body. It works by binding to and sequestering actin — the protein that forms your cell's structural skeleton. This frees up actin monomers that migrate to damaged tissue, promoting cell migration, blood vessel formation, and wound healing. It also reduces inflammation and prevents adhesion formation (scar tissue). TB-500 is systemic — unlike BPC-157 which works locally, TB-500 reaches injuries throughout your entire body.",
    synergies: "Pairs perfectly with BPC-157 for the most comprehensive healing stack available. TB-500 handles systemic repair (reaches everywhere via the bloodstream) while BPC-157 provides intense local healing. This combination is widely used for tendon, ligament, and joint recovery. Also complements GH-boosting stacks for enhanced overall recovery.",
    timeline: "Week 1: Anti-inflammatory effects begin. Loading dose creates systemic availability. Weeks 2-3: Noticeable reduction in chronic inflammation. Injury sites begin healing faster. Weeks 4-6: Significant improvement in flexibility and range of motion around injured joints. Hair growth acceleration reported by some users. Weeks 8-12: Full tissue remodeling effects.",
    sideEffects: "Generally well-tolerated. Most common: mild headache during loading phase (higher initial doses), injection site redness, temporary fatigue. Like BPC-157, TB-500 promotes angiogenesis — same cancer precaution applies. Less common: head rush or lightheadedness immediately after injection (inject slowly, sit for 5 min after).",
    dietTips: "No strict timing requirements — TB-500 isn't affected by insulin like GH peptides. However, adequate protein intake is critical for tissue repair. Collagen-rich foods (bone broth, gelatin) provide raw materials. Anti-inflammatory diet supports the healing environment: omega-3 fatty acids, leafy greens, berries, turmeric.",
    exerciseTips: "During loading phase (first 4-6 weeks): moderate training intensity. Don't push hard on injured areas just because pain decreases — the tissue needs time to structurally rebuild, not just feel better. Gradually increase load over weeks. TB-500 is popular among athletes specifically because it allows faster return to training, but respect the biology — pain reduction precedes structural healing.",
    storageNotes: "Reconstituted: refrigerate, use within 21 days. More stable than BPC-157 but still requires refrigeration. Loading protocol typically uses larger vials — reconstitute with appropriate BAC water volume.",
    proTip: "TB-500 doesn't need to be injected near the injury site — it works systemically. Abdominal subcutaneous injection is fine for whole-body coverage. This makes it easier than BPC-157 which benefits from local injection. Many people inject TB-500 in the abdomen and BPC-157 near the specific injury.",
  },
  "Semaglutide": {
    mechanism: "Semaglutide is a GLP-1 receptor agonist — it mimics the incretin hormone your gut releases after eating. It works on three levels: (1) suppresses appetite by acting on hypothalamic hunger centers in your brain, (2) slows gastric emptying so food stays in your stomach longer making you feel full, and (3) improves insulin sensitivity by enhancing pancreatic beta-cell function. FDA-approved as Ozempic (diabetes) and Wegovy (weight loss).",
    synergies: "Can be combined with AOD-9604 for enhanced fat loss through dual mechanisms. Semaglutide handles appetite suppression while AOD-9604 directly stimulates fat cell lipolysis. Some protocols combine with CJC/Ipa to preserve lean mass during weight loss — GH is muscle-sparing. Caution: do NOT combine with other GLP-1 agonists (tirzepatide, liraglutide).",
    timeline: "Week 1-2 (lowest dose): Mild appetite suppression, possibly nausea as body adjusts. Weeks 3-4 (dose titration): Significant appetite reduction, food noise quiets substantially. Month 2: 5-8% body weight loss typical. Month 3: 10-12% body weight loss. Month 6: 15-17% body weight loss is average in clinical trials. Effects are dose-dependent.",
    sideEffects: "Most common: nausea (60-70% of users initially — reduces over 2-4 weeks), constipation, diarrhea, vomiting. Manage nausea by eating small frequent meals, avoiding fatty/greasy foods, and titrating dose slowly. Serious but rare: pancreatitis (seek help for severe persistent abdominal pain), gallstones (more common during rapid weight loss). Do NOT use if personal or family history of medullary thyroid carcinoma or MEN2 syndrome.",
    dietTips: "You will eat less — make every calorie count. Prioritize protein (minimum 1g per lb lean body mass) to prevent muscle loss. Many users lose muscle mass on GLP-1s because they eat less protein overall. Eat protein FIRST at each meal. Stay hydrated — reduced food intake means less water from food. Fiber helps with constipation side effects. Avoid alcohol — effects are amplified and nausea worsens.",
    exerciseTips: "Resistance training is NON-NEGOTIABLE on semaglutide. Without it, up to 40% of weight lost can be lean muscle. Lift heavy 3-4x per week to send the signal that muscle needs to stay. Moderate cardio is fine but don't rely on it. Track body composition, not just scale weight — you want fat loss, not weight loss.",
    storageNotes: "Refrigerate at all times (36-46°F). Do NOT freeze. If using compounded semaglutide from a clinic, follow their specific storage instructions. Branded Ozempic/Wegovy pens can be stored at room temperature for up to 56 days after first use.",
    proTip: "Dose titration is everything. Start low, increase slowly. Most side effects happen when people jump to full dose too fast. The standard clinical titration is 4 weeks at each dose level before increasing. If nausea is severe, stay at current dose an extra 2-4 weeks before titrating up.",
  },
  "AOD-9604": {
    mechanism: "AOD-9604 is a modified fragment of human growth hormone — specifically amino acids 176-191 from the C-terminal end. This specific fragment retains GH's fat-burning properties while having zero effect on blood sugar, IGF-1 levels, or growth. It stimulates lipolysis (fat breakdown) and inhibits lipogenesis (fat creation) by mimicking the way natural GH regulates fat metabolism. Think of it as the fat-loss slice of GH without any of the other effects.",
    synergies: "Pairs well with semaglutide for a dual-mechanism fat loss approach — semaglutide suppresses appetite while AOD handles direct fat cell metabolism. Can also stack with CJC/Ipa though there's some mechanistic overlap on the GH pathway. Combining with GHK-Cu supports skin elasticity during fat loss (prevents loose skin).",
    timeline: "Weeks 1-2: Subtle metabolic shift — may notice slight increase in body temperature (thermogenesis). Weeks 3-4: Measurable reduction in stubborn fat areas if diet is in deficit. Weeks 6-8: Visible changes in body composition. Weeks 8-12: Full protocol results. AOD works best with consistent caloric deficit — it's an accelerator, not a miracle. It won't overcome a caloric surplus.",
    sideEffects: "Very mild profile — one of the cleanest fat loss peptides. Possible: injection site redness, mild headache, temporary nausea. Notably does NOT cause the insulin resistance, joint pain, or water retention associated with full-length HGH. No impact on blood glucose — safe for pre-diabetic individuals (still consult your doctor).",
    dietTips: "Must be in caloric deficit for AOD to work — it accelerates fat burning but cannot override physics. Inject on empty stomach in the morning for maximum lipolytic effect. Avoid eating for 30-60 min after injection. High-protein diet preserves lean mass during the deficit. Stay hydrated — fat metabolism increases water requirements.",
    exerciseTips: "Fasted morning cardio after AOD injection maximizes fat oxidation. Even a 20-30 min walk creates a significant fat-burning window. Resistance training maintains muscle during the deficit. Don't combine AOD with a massive caloric surplus — you're wasting it.",
    storageNotes: "Reconstituted: refrigerate, use within 28 days. Stable peptide with good shelf life. Store away from light.",
    proTip: "Inject in the morning before food or fasted cardio. AOD's fat-mobilizing effect peaks 30-60 minutes post-injection — you want to be active during this window, not sitting at a desk. Even a morning walk counts.",
  },
  "Tesamorelin": {
    mechanism: "Tesamorelin is a GHRH analog — the only peptide in this class with actual FDA approval (Egrifta, for HIV-associated lipodystrophy). It stimulates your pituitary to produce and release growth hormone in a natural pulsatile pattern. Specifically targets visceral fat reduction through GH-mediated lipolysis. Studies show 15-18% visceral fat reduction over 6 months. Unlike synthetic HGH, it works WITH your body's feedback loops rather than overriding them.",
    synergies: "Do NOT combine with CJC-1295 — they compete for the same GHRH receptor. Choose one or the other. Can pair with Ipamorelin (different receptor — GHSR vs GHRH-R). Works well alongside GHK-Cu for body composition + skin quality improvements.",
    timeline: "Weeks 1-2: Similar to other GH peptides — sleep improvements, mild appetite increase. Weeks 4-6: IGF-1 levels measurably elevated. Weeks 8-12: Visceral fat reduction becomes measurable via DEXA or waist circumference. Months 3-6: 15-18% average visceral fat reduction in clinical data. This is a marathon, not a sprint.",
    sideEffects: "Injection site reactions (redness, itching), joint pain, headache, muscle pain. Because it's FDA-approved, the side effect profile is well-documented. Rare but possible: peripheral edema, carpal tunnel symptoms (from GH elevation). Contraindicated in active malignancy.",
    dietTips: "Same GH rules — inject on empty stomach for maximum pulse. Moderate carb intake helps manage insulin (which blunts GH). Prioritize protein for lean mass preservation. Visceral fat loss is also accelerated by reducing processed foods and alcohol.",
    exerciseTips: "Resistance training synergizes with GH elevation for body recomposition. Moderate cardio (zone 2) specifically targets visceral fat when combined with elevated GH. Training before evening injection creates a double GH pulse — exercise-induced + peptide-induced.",
    storageNotes: "FDA-approved product has specific storage: refrigerate, reconstitute only when ready to inject, use within 30 days.",
    proTip: "If choosing between tesamorelin and CJC-1295: tesamorelin has clinical trial data and FDA backing. CJC-1295 is more commonly available from research peptide vendors. For visceral fat specifically, tesamorelin has the strongest evidence base.",
  },
};

/** Fuzzy match a compound name to the intelligence map */
export function getCompoundIntel(name: string): CompoundIntel | null {
  const lower = name.toLowerCase();
  for (const [key, value] of Object.entries(compoundIntelligence)) {
    const keyLower = key.toLowerCase();
    if (keyLower === lower) return value;
    if (lower.includes(keyLower) || keyLower.includes(lower)) return value;
  }
  // Partial keyword matching for common abbreviations
  const aliases: Record<string, string> = {
    "cjc": "CJC-1295 (No DAC)",
    "cjc-1295": "CJC-1295 (No DAC)",
    "cjc1295": "CJC-1295 (No DAC)",
    "ipa": "Ipamorelin",
    "ghk": "GHK-Cu",
    "ghk cu": "GHK-Cu",
    "bpc": "BPC-157",
    "bpc157": "BPC-157",
    "bpc 157": "BPC-157",
    "tb500": "TB-500",
    "tb 500": "TB-500",
    "tb4": "TB-500",
    "thymosin": "TB-500",
    "sema": "Semaglutide",
    "ozempic": "Semaglutide",
    "wegovy": "Semaglutide",
    "aod": "AOD-9604",
    "aod9604": "AOD-9604",
    "tesa": "Tesamorelin",
    "egrifta": "Tesamorelin",
  };
  for (const [alias, key] of Object.entries(aliases)) {
    if (lower.includes(alias)) return compoundIntelligence[key] || null;
  }
  return null;
}

/** Get synergy explanation text based on compound names in the stack */
export function getStackSynergyText(compoundNames: string[]): string | null {
  if (compoundNames.length < 2) return null;

  const lower = compoundNames.map((n) => n.toLowerCase());
  const has = (keyword: string) => lower.some((n) => n.includes(keyword));

  const hasCJC = has("cjc");
  const hasIpa = has("ipamorelin") || has("ipa");
  const hasGHK = has("ghk");
  const hasBPC = has("bpc");
  const hasTB = has("tb-500") || has("tb500") || has("thymosin");
  const hasSema = has("semaglutide") || has("ozempic") || has("wegovy") || has("sema");
  const hasAOD = has("aod");

  const parts: string[] = [];

  if (hasCJC && hasIpa) {
    parts.push(
      "CJC-1295 and Ipamorelin are the gold standard GH combination. CJC-1295 sustains the GH pulse while Ipamorelin triggers it with surgical precision — zero cortisol or prolactin spillover. Together they produce 3-5x more growth hormone than either alone."
    );
    if (hasGHK) {
      parts.push(
        "GHK-Cu leverages that elevated GH environment to accelerate collagen remodeling and tissue repair. Your GH stack builds the raw materials, GHK-Cu directs the construction. This is a full-spectrum optimization protocol: hormone optimization + tissue regeneration."
      );
    }
  }

  if (hasBPC && hasTB) {
    parts.push(
      "The dual-mechanism recovery stack. BPC-157 builds new blood vessels AT the injury through nitric oxide pathways. TB-500 mobilizes repair cells TO the injury via actin regulation. One provides the infrastructure, the other delivers the workers."
    );
  }

  if (hasSema && hasAOD) {
    parts.push(
      "Dual-pathway fat loss. Semaglutide kills appetite and food noise through central nervous system GLP-1 signaling. AOD-9604 directly stimulates fat cell lipolysis through the GH fragment pathway. Different mechanisms, compounding results."
    );
  }

  if (parts.length > 0) return parts.join("\n\n");

  return "Your protocol combines compounds that target complementary pathways. Each peptide addresses a different aspect of your goal — together they create a synergistic effect greater than the sum of individual compounds.";
}
