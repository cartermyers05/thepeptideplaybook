import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Flame, Dumbbell, Heart, Clock, Brain, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuizChat } from "@/hooks/useQuizChat";
import { QuizMessage } from "./QuizMessage";
import { BuildingAnimation } from "./BuildingAnimation";
import { GoalButton } from "./GoalButton";

const quickAnswers = [
  { 
    value: 'fat_loss', 
    label: 'Fat Loss', 
    icon: Flame,
    gradient: 'linear-gradient(135deg, hsl(25 90% 55%) 0%, hsl(15 85% 45%) 100%)',
  },
  { 
    value: 'muscle', 
    label: 'Build Muscle', 
    icon: Dumbbell,
    gradient: 'linear-gradient(135deg, hsl(210 80% 55%) 0%, hsl(220 75% 45%) 100%)',
  },
  { 
    value: 'recovery', 
    label: 'Heal Injury', 
    icon: Heart,
    gradient: 'linear-gradient(135deg, hsl(350 80% 55%) 0%, hsl(340 75% 45%) 100%)',
  },
  { 
    value: 'anti_aging', 
    label: 'Anti-Aging', 
    icon: Clock,
    gradient: 'linear-gradient(135deg, hsl(270 70% 55%) 0%, hsl(280 65% 45%) 100%)',
  },
  { 
    value: 'cognitive', 
    label: 'Cognitive', 
    icon: Brain,
    gradient: 'linear-gradient(135deg, hsl(160 70% 45%) 0%, hsl(170 65% 35%) 100%)',
  },
  { 
    value: 'beginner', 
    label: 'Not Sure', 
    icon: HelpCircle,
    gradient: 'linear-gradient(135deg, hsl(45 80% 50%) 0%, hsl(35 75% 40%) 100%)',
  },
];

export function ConversationalQuiz() {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    extractedValues,
    currentStep,
    isLoading,
    isComplete,
    error,
    sendMessage,
    sendQuickAnswer,
    saveQuizResponse,
    getGoalLabel,
    getExperienceLabel,
    getConcernLabel,
    getReadinessLabel,
    totalSteps
  } = useQuizChat();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input after AI responds
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleQuickAnswer = (value: string, label: string) => {
    if (!isLoading) {
      sendQuickAnswer(value, label);
    }
  };

  const handleBuildingComplete = async () => {
    setIsSubmitting(true);
    try {
      await saveQuizResponse();
      // Navigation is handled by BuildingAnimation
    } catch (err) {
      console.error('Error saving quiz:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show building animation when complete
  if (isComplete) {
    return (
      <BuildingAnimation
        extractedValues={extractedValues}
        getGoalLabel={getGoalLabel}
        getExperienceLabel={getExperienceLabel}
        getConcernLabel={getConcernLabel}
        getReadinessLabel={getReadinessLabel}
        onComplete={handleBuildingComplete}
        isSubmitting={isSubmitting}
      />
    );
  }

  const showQuickAnswers = currentStep === 0 && messages.length <= 1;

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero headline */}
      <div className="text-center pt-8 md:pt-12 pb-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground mb-3">
            Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Build Your<br className="sm:hidden" /> Peptide Course
          </h1>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Answer a few questions to personalize your 8-week program
          </p>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="max-w-xl mx-auto w-full px-4 mb-6">
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-foreground rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Messages - centered, generous spacing */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pb-48"
      >
        <div className="max-w-xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <QuizMessage
              key={message.id}
              role={message.role}
              content={message.content}
              isStreaming={message.isStreaming}
              isLatest={index === messages.length - 1}
            />
          ))}
          
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-destructive bg-destructive/10 rounded-xl p-4"
            >
              {error}
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed input area at bottom */}
      <div className="fixed bottom-0 inset-x-0 bg-background/80 backdrop-blur-xl border-t border-border/50">
        <div className="max-w-xl mx-auto px-4 py-4 pb-safe">
          {/* Quick answers */}
          {showQuickAnswers && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 justify-center mb-4"
            >
              {quickAnswers.map(({ value, label, icon, gradient }) => (
                <GoalButton
                  key={value}
                  value={value}
                  label={label}
                  icon={icon}
                  gradient={gradient}
                  onClick={handleQuickAnswer}
                  disabled={isLoading}
                />
              ))}
            </motion.div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              disabled={isLoading}
              className="h-12 text-base bg-background border-border/50"
            />
            <Button 
              type="submit" 
              size="lg"
              disabled={!input.trim() || isLoading}
              className="h-12 px-4"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
