import { motion } from "framer-motion";
import { FlaskConical, Clock, MapPin, Calendar, AlertCircle, Check } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useCourse } from "@/hooks/useCourse";
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
          className="space-y-6"
        >
          {/* Peptide cards */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-primary" />
              Peptides
            </h2>
            
            <div className="space-y-4">
              {userCourse.peptides.map((peptide, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <h3 className="text-xl font-semibold mb-2">{peptide.name}</h3>
                  <p className="text-muted-foreground mb-4">{peptide.purpose}</p>

                  <div className="grid gap-4 sm:grid-cols-2">
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
                        <p className="text-sm text-muted-foreground">{peptide.timing}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Frequency</p>
                        <p className="text-sm text-muted-foreground">{peptide.frequency}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Injection Site</p>
                        <p className="text-sm text-muted-foreground">{peptide.site}</p>
                      </div>
                    </div>
                  </div>

                  {peptide.notes && (
                    <div className="mt-4 pt-4 border-t border-border flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{peptide.notes}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Supplies checklist */}
          <motion.section variants={itemVariants}>
            <h2 className="text-lg font-semibold mb-4">Supplies Checklist</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ...userCourse.peptides.map(p => `${p.name} vial`),
                  "Bacteriostatic water",
                  "Insulin syringes (29-31 gauge)",
                  "Alcohol swabs",
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

          {/* Guides */}
          <motion.section variants={itemVariants}>
            <h2 className="text-lg font-semibold mb-4">Guides</h2>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="reconstitution" className="rounded-xl border border-border bg-card px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  📋 Reconstitution Guide
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p className="font-medium text-foreground">Step-by-step mixing instructions:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Wash hands thoroughly with soap and water</li>
                    <li>Clean the tops of both vials (peptide and BAC water) with alcohol swabs</li>
                    <li>Draw the appropriate amount of bacteriostatic water into your syringe</li>
                    <li>Insert the needle into the peptide vial</li>
                    <li>Inject the water slowly, aiming at the glass wall (not directly on powder)</li>
                    <li>Do NOT shake - gently swirl or let sit until dissolved</li>
                    <li>Solution should be clear - if cloudy, wait or gently swirl more</li>
                    <li>Label with date and store in refrigerator</li>
                  </ol>
                  <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <p className="text-sm text-warning-foreground">
                      <strong>Tip:</strong> Slow and gentle is better than fast. Clear solution = good. Cloudy = may need more time.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="injection" className="rounded-xl border border-border bg-card px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  💉 Injection Guide
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <p className="font-medium text-foreground">Your step-by-step injection guide:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Wash hands and gather all supplies</li>
                    <li>Draw your calculated dose from the reconstituted vial</li>
                    <li>Choose your injection site (lower abdomen is common)</li>
                    <li>Clean the site with an alcohol swab and let dry</li>
                    <li>Pinch a fold of skin at the injection site</li>
                    <li>Insert the needle at a 45-90 degree angle</li>
                    <li>Inject slowly and steadily</li>
                    <li>Hold for 5-10 seconds before withdrawing</li>
                    <li>Apply light pressure if needed, dispose of needle safely</li>
                  </ol>
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm">
                      <strong>Remember:</strong> Rotate injection sites to prevent tissue irritation. Room temperature peptide may be more comfortable than cold.
                    </p>
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
