import { motion } from "framer-motion";
import { FlaskConical, Clock, MapPin, Calendar, AlertCircle, Check, ChevronDown, Lightbulb, AlertTriangle, Info } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useCourse } from "@/hooks/useCourse";
import { peptideDetails, reconstitutionGuide, injectionGuide } from "@/lib/courseContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function MyPlan() {
  const { userCourse } = useCourse();

  if (!userCourse) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">No course found. Purchase a course to get started.</p>
        </div>
      </DashboardLayout>
    );
  }

  const weekCount = Math.ceil(userCourse.duration_days / 7);

  // Get peptide details for this course
  const getPeptideDetails = (peptideName: string) => {
    const key = peptideName.toLowerCase().replace(/-/g, '');
    return peptideDetails[key] || null;
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Your {userCourse.title.replace(' Course', '')} Plan</h1>
          <p className="text-muted-foreground">
            {weekCount}-week program with {userCourse.peptides.length} peptide{userCourse.peptides.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Peptide cards with expanded info */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-primary" />
              Your Peptides
            </h2>
            
            <div className="space-y-6">
              {userCourse.peptides.map((peptide, index) => {
                const details = getPeptideDetails(peptide.name);
                
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="rounded-xl border border-border bg-card overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold">{peptide.name}</h3>
                        {details && (
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            {details.category}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground">{peptide.purpose}</p>
                      
                      {/* How it works */}
                      {details && (
                        <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                          <p className="text-sm font-medium text-primary mb-1">How it works:</p>
                          <p className="text-sm text-muted-foreground">{details.howItWorks}</p>
                        </div>
                      )}
                    </div>

                    {/* Quick info grid */}
                    <div className="px-6 pb-4 grid gap-4 sm:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <FlaskConical className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Research Dosing</p>
                          <p className="text-sm text-muted-foreground">{peptide.dosing_research}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Timing</p>
                          <p className="text-sm text-muted-foreground">{details?.timing || peptide.timing}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Frequency</p>
                          <p className="text-sm text-muted-foreground">{details?.frequency || peptide.frequency}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Injection Site</p>
                          <p className="text-sm text-muted-foreground">{details?.injectionSite || peptide.site}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dosing schedule table */}
                    {details?.dosingSchedule && (
                      <div className="px-6 pb-4">
                        <p className="text-sm font-medium mb-2">Your Schedule:</p>
                        <div className="rounded-lg border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="px-3 py-2 text-left font-medium">Week</th>
                                <th className="px-3 py-2 text-left font-medium">Dose</th>
                                <th className="px-3 py-2 text-left font-medium hidden sm:table-cell">Notes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {details.dosingSchedule.map((row, i) => (
                                <tr key={i} className="border-t border-border">
                                  <td className="px-3 py-2 font-medium">{row.weeks}</td>
                                  <td className="px-3 py-2">{row.dose}</td>
                                  <td className="px-3 py-2 text-muted-foreground hidden sm:table-cell">{row.notes}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Expandable sections */}
                    {details && (
                      <Accordion type="single" collapsible className="border-t border-border">
                        {/* Side Effects */}
                        <AccordionItem value="side-effects" className="border-b-0">
                          <AccordionTrigger className="px-6 py-3 hover:no-underline text-sm">
                            <span className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              Side Effects & Safety
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-medium mb-2">Common (usually mild):</p>
                                <ul className="space-y-1">
                                  {details.sideEffects.common.map((effect, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <span className="text-primary">•</span>
                                      {effect}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                                <p className="text-sm font-medium text-destructive mb-2 flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  When to seek medical attention:
                                </p>
                                <ul className="space-y-1">
                                  {details.sideEffects.whenToConcern.map((concern, i) => (
                                    <li key={i} className="text-sm text-muted-foreground">{concern}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Tips */}
                        <AccordionItem value="tips" className="border-b-0">
                          <AccordionTrigger className="px-6 py-3 hover:no-underline text-sm">
                            <span className="flex items-center gap-2">
                              <Lightbulb className="w-4 h-4" />
                              Pro Tips
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <ul className="space-y-2">
                              {details.tips.map((tip, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Storage */}
                        <AccordionItem value="storage" className="border-b-0">
                          <AccordionTrigger className="px-6 py-3 hover:no-underline text-sm">
                            <span className="flex items-center gap-2">
                              <Info className="w-4 h-4" />
                              Storage Instructions
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="space-y-2 text-sm">
                              <p><strong>Before reconstitution:</strong> {details.storage.beforeRecon}</p>
                              <p><strong>After reconstitution:</strong> {details.storage.afterRecon}</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}

                    {/* Notes */}
                    {peptide.notes && (
                      <div className="px-6 pb-4 pt-2 border-t border-border flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{peptide.notes}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Supplies checklist */}
          <motion.section variants={itemVariants}>
            <h2 className="text-lg font-semibold mb-4">Supplies Checklist</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ...userCourse.peptides.map(p => `${p.name} vial`),
                  "Bacteriostatic water (30ml, 0.9% benzyl alcohol)",
                  "Insulin syringes (1ml, 29-31 gauge, 1/2 inch)",
                  "Alcohol swabs (70% isopropyl)",
                  "Sharps disposal container",
                ].map((item, index) => (
                  <label key={index} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                      <Check className="w-3 h-3 text-primary opacity-0 group-hover:opacity-50 transition-opacity" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Reconstitution Guide - Expanded */}
          <motion.section variants={itemVariants}>
            <h2 className="text-lg font-semibold mb-4">Guides</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {/* Reconstitution */}
              <AccordionItem value="reconstitution" className="rounded-xl border border-border bg-card px-6">
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="text-base">📋 {reconstitutionGuide.title}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-6">
                    <p className="text-muted-foreground">{reconstitutionGuide.overview}</p>
                    
                    {/* The Math */}
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{reconstitutionGuide.mathExplanation.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{reconstitutionGuide.mathExplanation.example}</p>
                        <div className="grid gap-2 sm:grid-cols-3">
                          {reconstitutionGuide.mathExplanation.doseChart.map((item, i) => (
                            <div key={i} className="text-sm bg-background rounded p-2">
                              <span className="font-medium">{item.dose}</span> = {item.draw}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Steps */}
                    <div>
                      <h4 className="font-medium mb-3">Step-by-Step:</h4>
                      <ol className="space-y-4">
                        {reconstitutionGuide.steps.map((step) => (
                          <li key={step.step} className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0 font-medium">
                              {step.step}
                            </span>
                            <div>
                              <p className="font-medium">{step.title}</p>
                              <p className="text-sm text-muted-foreground">{step.content}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Common Mistakes */}
                    <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                      <h4 className="font-medium text-destructive mb-3">Common Mistakes to Avoid:</h4>
                      <div className="space-y-3">
                        {reconstitutionGuide.commonMistakes.map((item, i) => (
                          <div key={i} className="text-sm">
                            <p className="font-medium">❌ {item.mistake}</p>
                            <p className="text-muted-foreground ml-5">{item.whyBad}</p>
                            <p className="text-primary ml-5">✓ {item.fix}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Troubleshooting */}
                    <div>
                      <h4 className="font-medium mb-3">Troubleshooting:</h4>
                      <div className="space-y-3">
                        {reconstitutionGuide.troubleshooting.map((item, i) => (
                          <div key={i} className="p-3 rounded-lg bg-muted/50">
                            <p className="font-medium text-sm">{item.issue}</p>
                            <p className="text-sm text-muted-foreground">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Injection Guide */}
              <AccordionItem value="injection" className="rounded-xl border border-border bg-card px-6">
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="text-base">💉 {injectionGuide.title}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-6">
                    <p className="text-muted-foreground">{injectionGuide.overview}</p>

                    {/* Calming Facts */}
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-3">Facts to Calm Your Nerves:</h4>
                        <ul className="space-y-2">
                          {injectionGuide.calmingFacts.map((fact, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Steps */}
                    <div>
                      <h4 className="font-medium mb-3">Step-by-Step:</h4>
                      <ol className="space-y-4">
                        {injectionGuide.steps.map((step) => (
                          <li key={step.step} className="flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0 font-medium">
                              {step.step}
                            </span>
                            <div>
                              <p className="font-medium">{step.title}</p>
                              <p className="text-sm text-muted-foreground">{step.content}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Pro Tips */}
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        Pro Tips:
                      </h4>
                      <ul className="space-y-2">
                        {injectionGuide.proTips.map((tip, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Don't Worry About */}
                    <div>
                      <h4 className="font-medium mb-3">Don't Worry About:</h4>
                      <div className="space-y-3">
                        {injectionGuide.dontWorryAbout.map((item, i) => (
                          <div key={i} className="p-3 rounded-lg bg-muted/50">
                            <p className="font-medium text-sm">"What if {item.concern.toLowerCase()}?"</p>
                            <p className="text-sm text-muted-foreground">{item.reality}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.section>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
