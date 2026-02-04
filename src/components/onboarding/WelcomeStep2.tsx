import { motion } from "framer-motion";
import { Check, Package, ShoppingCart } from "lucide-react";
import type { SuppliesStatus } from "./WelcomeModal";

interface WelcomeStep2Props {
  onSelect: (status: SuppliesStatus) => void;
}

const options = [
  {
    value: 'have_them' as SuppliesStatus,
    icon: Check,
    title: "I have everything",
    subtitle: "Great! Let's start Day 0",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    value: 'this_week' as SuppliesStatus,
    icon: Package,
    title: "They're arriving this week",
    subtitle: "Perfect, let's prep while you wait",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    value: 'need_to_order' as SuppliesStatus,
    icon: ShoppingCart,
    title: "I still need to order",
    subtitle: "I'll show you exactly what to get",
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
  },
];

export function WelcomeStep2({ onSelect }: WelcomeStep2Props) {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold mb-2 text-center">
          Before we dive in, quick question:
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Do you have your supplies yet?
        </p>
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(option.value)}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-colors text-left group"
            >
              <div className={`w-12 h-12 rounded-full ${option.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <option.icon className={`w-6 h-6 ${option.iconColor}`} />
              </div>
              <div>
                <p className="font-medium">{option.title}</p>
                <p className="text-sm text-muted-foreground">{option.subtitle}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
