import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";

const names = [
  "Alex from Denver",
  "Sarah from Austin",
  "Mike from LA",
  "David from Chicago",
  "Chris from Miami",
  "James from Seattle",
  "Ryan from Portland",
  "Matt from NYC",
  "Tom from Phoenix",
  "Dan from Nashville",
];

export function RecentJoinToast() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    // Show first one after 25 seconds, then every 45-75 seconds
    const showToast = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      setName(randomName);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    const initialTimeout = setTimeout(() => {
      showToast();
      const interval = setInterval(showToast, 45000 + Math.random() * 30000);
      return () => clearInterval(interval);
    }, 25000);

    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-4 z-50 bg-card border border-border rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 max-w-xs"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">just joined Peptide Playbook</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
