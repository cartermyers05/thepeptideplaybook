import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { ChatWidget } from "./ChatWidget";
import { ChatConsentModal } from "./ChatConsentModal";

const CONSENT_KEY = "peptide-chat-consent";

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    setHasConsent(consent === "true");
  }, []);

  const handleClick = () => {
    if (!hasConsent) {
      setShowConsentModal(true);
    } else {
      setIsOpen(true);
    }
  };

  const handleConsentAccept = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    setHasConsent(true);
    setShowConsentModal(false);
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        onClick={handleClick}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && hasConsent && (
          <ChatWidget onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>

      {/* Consent modal */}
      <AnimatePresence>
        {showConsentModal && (
          <ChatConsentModal
            onAccept={handleConsentAccept}
            onClose={() => setShowConsentModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
