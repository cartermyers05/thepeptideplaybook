import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Target, Beaker, Syringe, CalendarCheck, MessageCircle } from "lucide-react";

const modules = [
  {
    icon: Target,
    title: "Module 1: Your Personalized Protocol",
    lessons: [
      "Your recommended peptides based on goals",
      "Exact dosing schedule",
      "Cycle length and timing",
      "What to expect each week",
    ],
  },
  {
    icon: Beaker,
    title: "Module 2: Reconstitution Mastery",
    lessons: [
      "Supply checklist",
      "Step-by-step mixing guide",
      "Common mistakes to avoid",
      "Storage and handling",
    ],
  },
  {
    icon: Syringe,
    title: "Module 3: Injection Confidence",
    lessons: [
      "Site selection and rotation",
      "Proper technique",
      "Managing injection anxiety",
      "What's normal vs concerning",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Module 4: Daily Optimization",
    lessons: [
      "Daily check-in system",
      "Tracking your progress",
      "Adjusting based on feedback",
      "When to consult a professional",
    ],
  },
  {
    icon: MessageCircle,
    title: "Module 5: Ongoing Support",
    lessons: [
      "24/7 AI coach access",
      "Weekly research updates",
      "Community Q&A (coming soon)",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
};

export function CurriculumSection() {
  return (
    <section id="curriculum" className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-4">
            Course Curriculum
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            What You'll Learn
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {modules.map((module, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`module-${index}`}
                  className="bg-card border rounded-xl px-6 data-[state=open]:shadow-md transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-5 [&[data-state=open]>svg]:rotate-180">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <module.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span>{module.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <ul className="space-y-2 ml-11">
                      {module.lessons.map((lesson, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
