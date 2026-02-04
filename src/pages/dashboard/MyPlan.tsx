import { motion } from "framer-motion";
import { FlaskConical, Clock, MapPin, Calendar, AlertCircle, Check, Lightbulb, AlertTriangle, Info, Package, Syringe, ClipboardList } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useCourse } from "@/hooks/useCourse";
import { useMilestones } from "@/hooks/useMilestones";
import { peptideDetails, reconstitutionGuide, injectionGuide, reconstitutionSteps, injectionSteps } from "@/lib/courseContent";
import { DosingCalculator } from "@/components/dashboard/DosingCalculator";
import { InteractiveGuide } from "@/components/dashboard/InteractiveGuide";
import { getGoalTheme } from "@/lib/goalThemes";
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
  const { awardMilestone } = useMilestones();
  
  // Get goal-based theme
  const goalTheme = getGoalTheme(userCourse?.goal);
  const GoalIcon = goalTheme.Icon;

  if (!userCourse) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-500">No course found. Purchase a course to get started.</p>
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
          <div className={`w-10 h-10 rounded-xl ${goalTheme.iconBg} flex items-center justify-center`}>
            <GoalIcon className={`w-5 h-5 ${goalTheme.iconColor}`} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black">My Plan</h1>
            <p className="text-gray-500 text-sm">
              {weekCount}-week {goalTheme.name.toLowerCase()} program · {userCourse.peptides.length} peptide{userCourse.peptides.length > 1 ? 's' : ''}
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
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Goal-specific gradient top bar */}
                <div 
                  className="h-1" 
                  style={{ 
                    background: `linear-gradient(to right, ${goalTheme.gradientFrom}, ${goalTheme.gradientTo})` 
                  }}
                />
                
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${goalTheme.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Syringe className={`w-6 h-6 ${goalTheme.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h2 className="text-xl font-bold text-black">{peptide.name}</h2>
                        {details && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                            {details.category}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{peptide.purpose}</p>
                    </div>
                  </div>
                  
                  {/* How it works */}
                  {details && (
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-sm text-gray-600">{details.howItWorks}</p>
                    </div>
                  )}
                </div>

                {/* Quick info grid */}
                <div className="px-6 pb-4 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <FlaskConical className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400">Research Dosing</p>
                      <p className="text-sm font-medium text-black">{peptide.dosing_research}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400">Timing</p>
                      <p className="text-sm font-medium text-black">{details?.timing || peptide.timing}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400">Frequency</p>
                      <p className="text-sm font-medium text-black">{details?.frequency || peptide.frequency}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400">Injection Site</p>
                      <p className="text-sm font-medium text-black">{details?.injectionSite || peptide.site}</p>
                    </div>
                  </div>
                </div>

                {/* Dosing schedule table */}
                {details?.dosingSchedule && (
                  <div className="px-6 pb-4">
                    <p className="text-sm font-semibold text-black mb-3">Your Schedule</p>
                    <div className="rounded-lg border border-gray-200 overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2.5 text-left font-medium text-gray-500">Week</th>
                            <th className="px-4 py-2.5 text-left font-medium text-gray-500">Dose</th>
                            <th className="px-4 py-2.5 text-left font-medium text-gray-500">Draw</th>
                            <th className="px-4 py-2.5 text-left font-medium text-gray-500"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {details.dosingSchedule.map((row, i) => {
                            const weekRange = row.weeks.split('-').map(Number);
                            const isCurrentWeek = currentWeek >= weekRange[0] && currentWeek <= (weekRange[1] || weekRange[0]);
                            
                            return (
                              <tr key={i} className={isCurrentWeek ? 'bg-gray-50' : ''}>
                                <td className="px-4 py-2.5 font-medium text-black">{row.weeks}</td>
                                <td className="px-4 py-2.5 text-black">{row.dose}</td>
                                <td className="px-4 py-2.5 text-gray-500">{row.notes}</td>
                                <td className="px-4 py-2.5">
                                  {isCurrentWeek && (
                                    <span className="text-xs font-medium text-white bg-black px-2 py-1 rounded-full">
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
                  <Accordion type="single" collapsible className="border-t border-gray-100">
                    {/* Side Effects */}
                    <AccordionItem value="side-effects" className="border-b-0">
                      <AccordionTrigger className="px-6 py-3 hover:no-underline text-sm">
                        <span className="flex items-center gap-2 text-gray-600">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          Side Effects & Safety
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Common (usually mild)</p>
                            <ul className="space-y-1.5">
                              {details.sideEffects.common.map((effect, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2" />
                                  {effect}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                            <p className="text-sm font-medium text-red-700 mb-2 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              When to seek medical attention
                            </p>
                            <ul className="space-y-1">
                              {details.sideEffects.whenToConcern.map((concern, i) => (
                                <li key={i} className="text-sm text-gray-600">{concern}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Tips */}
                    <AccordionItem value="tips" className="border-b-0">
                      <AccordionTrigger className="px-6 py-3 hover:no-underline text-sm">
                        <span className="flex items-center gap-2 text-gray-600">
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          Pro Tips
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <ul className="space-y-2">
                          {details.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Storage */}
                    <AccordionItem value="storage" className="border-b-0">
                      <AccordionTrigger className="px-6 py-3 hover:no-underline text-sm">
                        <span className="flex items-center gap-2 text-gray-600">
                          <Info className="w-4 h-4 text-blue-500" />
                          Storage Instructions
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-600"><strong className="text-black">Before reconstitution:</strong> {details.storage.beforeRecon}</p>
                          <p className="text-gray-600"><strong className="text-black">After reconstitution:</strong> {details.storage.afterRecon}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                {/* Notes */}
                {peptide.notes && (
                  <div className="px-6 pb-4 pt-2 border-t border-gray-100 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-500">{peptide.notes}</p>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Dosing Calculator */}
          <motion.div variants={itemVariants}>
            <DosingCalculator />
          </motion.div>

          {/* Interactive Guides */}
          <motion.div variants={itemVariants}>
            <h2 className="font-semibold text-black mb-4">Interactive Guides</h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Reconstitution Guide */}
              <Accordion type="single" collapsible className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-300 to-blue-500" />
                <AccordionItem value="recon" className="border-0">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <FlaskConical className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-black">Reconstitution Guide</p>
                        <p className="text-xs text-gray-500">Step-by-step with checkboxes</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">{reconstitutionGuide.overview}</p>
                      
                      {/* Math reference */}
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                        <p className="text-sm font-medium text-black mb-2">{reconstitutionGuide.mathExplanation.title}</p>
                        <p className="text-xs text-gray-500 mb-2">{reconstitutionGuide.mathExplanation.example}</p>
                        <div className="grid gap-1 text-xs">
                          {reconstitutionGuide.mathExplanation.doseChart.map((item, i) => (
                            <div key={i} className="flex justify-between">
                              <span className="font-medium text-black">{item.dose}</span>
                              <span className="text-gray-500">{item.draw}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive steps */}
                      <InteractiveGuide
                        guideId="reconstitution"
                        title="Reconstitution"
                        steps={reconstitutionSteps}
                        onComplete={() => {
                          awardMilestone.mutate("reconstitution_complete");
                        }}
                        completedColor="bg-blue-50 border-blue-200"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Injection Guide */}
              <Accordion type="single" collapsible className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-pink-300 to-pink-500" />
                <AccordionItem value="injection" className="border-0">
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                        <Syringe className="w-5 h-5 text-pink-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-black">Injection Guide</p>
                        <p className="text-xs text-gray-500">First injection walkthrough</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">{injectionGuide.overview}</p>
                      
                      {/* Calming facts */}
                      <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                        <p className="text-sm font-medium text-green-700 mb-2">It's easier than you think</p>
                        <ul className="space-y-1">
                          {injectionGuide.calmingFacts.map((fact, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                              <Check className="w-3 h-3 text-green-600 mt-0.5" />
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Interactive steps */}
                      <InteractiveGuide
                        guideId="injection"
                        title="Injection"
                        steps={injectionSteps}
                        onComplete={() => {
                          awardMilestone.mutate("first_injection");
                        }}
                        completedColor="bg-pink-50 border-pink-200"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>

          {/* Supplies Checklist */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-black mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-500" />
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
                  <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center mt-0.5 group-hover:border-black transition-colors">
                    <Check className="w-3 h-3 text-black opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-black">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.spec}</p>
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
