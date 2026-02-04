import { motion } from "framer-motion";
import { FlaskConical, Clock, MapPin, Calendar, AlertCircle, Check, Lightbulb, AlertTriangle, Info, Package, Syringe, ClipboardList } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useCourse } from "@/hooks/useCourse";
import { peptideDetails, reconstitutionGuide, injectionGuide } from "@/lib/courseContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const currentWeek = Math.ceil((userCourse.current_day || 1) / 7);

  // Get peptide details for this course
  const getPeptideDetails = (peptideName: string) => {
    const key = peptideName.toLowerCase().replace(/-/g, '');
    return peptideDetails[key] || null;
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto animate-fade-up">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Plan</h1>
            <p className="text-muted-foreground text-sm">
              {weekCount}-week program · {userCourse.peptides.length} peptide{userCourse.peptides.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Peptide cards with expanded info */}
          {userCourse.peptides.map((peptide, index) => {
            const details = getPeptideDetails(peptide.name);
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-premium overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Syringe className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h2 className="text-xl font-bold">{peptide.name}</h2>
                        {details && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            {details.category}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">{peptide.purpose}</p>
                    </div>
                  </div>
                  
                  {/* How it works */}
                  {details && (
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <p className="text-sm text-foreground/90">{details.howItWorks}</p>
                    </div>
                  )}
                </div>

                {/* Quick info grid */}
                <div className="px-6 pb-4 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <FlaskConical className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Research Dosing</p>
                      <p className="text-sm font-medium">{peptide.dosing_research}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Clock className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Timing</p>
                      <p className="text-sm font-medium">{details?.timing || peptide.timing}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Frequency</p>
                      <p className="text-sm font-medium">{details?.frequency || peptide.frequency}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Injection Site</p>
                      <p className="text-sm font-medium">{details?.injectionSite || peptide.site}</p>
                    </div>
                  </div>
                </div>

                {/* Dosing schedule table */}
                {details?.dosingSchedule && (
                  <div className="px-6 pb-4">
                    <p className="text-sm font-semibold mb-3">Your Schedule</p>
                    <div className="rounded-lg border border-border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-2.5 text-left font-medium">Week</th>
                            <th className="px-4 py-2.5 text-left font-medium">Dose</th>
                            <th className="px-4 py-2.5 text-left font-medium">Draw</th>
                            <th className="px-4 py-2.5 text-left font-medium"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {details.dosingSchedule.map((row, i) => {
                            const weekRange = row.weeks.split('-').map(Number);
                            const isCurrentWeek = currentWeek >= weekRange[0] && currentWeek <= (weekRange[1] || weekRange[0]);
                            
                            return (
                              <tr key={i} className={isCurrentWeek ? 'bg-primary/5' : ''}>
                                <td className="px-4 py-2.5 font-medium">{row.weeks}</td>
                                <td className="px-4 py-2.5">{row.dose}</td>
                                <td className="px-4 py-2.5 text-muted-foreground">{row.notes}</td>
                                <td className="px-4 py-2.5">
                                  {isCurrentWeek && (
                                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                                      Current
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
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
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          Side Effects & Safety
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Common (usually mild)</p>
                            <ul className="space-y-1.5">
                              {details.sideEffects.common.map((effect, i) => (
                                <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2" />
                                  {effect}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                            <p className="text-sm font-medium text-destructive mb-2 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              When to seek medical attention
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
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          Pro Tips
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <ul className="space-y-2">
                          {details.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                              <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
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
                          <Info className="w-4 h-4 text-primary" />
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
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{peptide.notes}</p>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Guides */}
          <motion.div variants={itemVariants}>
            <h2 className="font-semibold mb-4">Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Accordion type="single" collapsible className="card-premium overflow-hidden">
                <AccordionItem value="recon" className="border-0">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FlaskConical className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">Reconstitution</p>
                        <p className="text-xs text-muted-foreground">Step-by-step mixing</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{reconstitutionGuide.overview}</p>
                      
                      {/* Math */}
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="text-sm font-medium mb-2">{reconstitutionGuide.mathExplanation.title}</p>
                        <p className="text-xs text-muted-foreground mb-2">{reconstitutionGuide.mathExplanation.example}</p>
                        <div className="grid gap-1 text-xs">
                          {reconstitutionGuide.mathExplanation.doseChart.map((item, i) => (
                            <div key={i} className="flex justify-between">
                              <span className="font-medium">{item.dose}</span>
                              <span className="text-muted-foreground">{item.draw}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {reconstitutionGuide.steps.map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                            {step.step}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{step.title}</p>
                            <p className="text-sm text-muted-foreground">{step.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="card-premium overflow-hidden">
                <AccordionItem value="injection" className="border-0">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Syringe className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">Injection Guide</p>
                        <p className="text-xs text-muted-foreground">First injection walkthrough</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{injectionGuide.overview}</p>
                      
                      {/* Calming facts */}
                      <div className="p-3 rounded-lg bg-success/5 border border-success/10">
                        <p className="text-sm font-medium text-success mb-2">It's easier than you think</p>
                        <ul className="space-y-1">
                          {injectionGuide.calmingFacts.map((fact, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <Check className="w-3 h-3 text-success mt-0.5" />
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {injectionGuide.steps.map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                            {step.step}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{step.title}</p>
                            <p className="text-sm text-muted-foreground">{step.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>

          {/* Supplies Checklist */}
          <motion.div variants={itemVariants} className="card-premium p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Supplies Checklist
            </h3>
            <div className="space-y-3">
              {[
                ...userCourse.peptides.map(p => ({ name: `${p.name} vial`, spec: "5mg lyophilized" })),
                { name: "Bacteriostatic Water", spec: "30ml with 0.9% benzyl alcohol" },
                { name: "Insulin Syringes", spec: "1ml, 29-31 gauge, 1/2 inch" },
                { name: "Alcohol Swabs", spec: "70% isopropyl" },
                { name: "Sharps Container", spec: "For safe needle disposal" },
              ].map((item, index) => (
                <label key={index} className="flex items-start gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded border-2 border-border flex items-center justify-center mt-0.5 group-hover:border-primary transition-colors">
                    <Check className="w-3 h-3 text-primary opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.spec}</p>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
