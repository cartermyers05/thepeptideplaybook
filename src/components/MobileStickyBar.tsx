import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const HIDDEN_PATHS = ["/sales", "/checkout", "/login", "/signup"];

export function MobileStickyBar() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHidden =
    HIDDEN_PATHS.some((p) => pathname === p) ||
    pathname.startsWith("/dashboard");

  if (isHidden) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#111827] border-t border-[#1E293B] px-4 py-3 flex items-center justify-between"
        >
          <span className="text-sm font-bold text-[#F1F5F9]">
            Stop guessing. Get your protocol.
          </span>
          <Link to="/checkout">
            <Button className="bg-[#06D6A0] hover:bg-[#05C493] text-[#0a0a0f] font-bold text-sm px-5 py-3 rounded-[10px] min-h-[44px]">
              $67
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
