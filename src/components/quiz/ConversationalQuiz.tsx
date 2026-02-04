import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Flame, Dumbbell, Heart, Clock, Brain, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuizChat } from "@/hooks/useQuizChat";
import { QuizMessage } from "./QuizMessage";
import { QuizProgressSidebar } from "./QuizProgressSidebar";
import { BuildingAnimation } from "./BuildingAnimation";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const quickAnswers = [
  { value: 'fat_loss', label: 'Fat Loss', icon: Flame },
  { value: 'muscle', label: 'Build Muscle', icon: Dumbbell },
  { value: 'recovery', label: 'Heal Injury', icon: Heart },
  { value: 'anti_aging', label: 'Anti-Aging', icon: Clock },
  { value: 'cognitive', label: 'Cognitive', icon: Brain },
  { value: 'beginner', label: 'Not Sure', icon: HelpCircle },
];

export function ConversationalQuiz() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
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
    getTimelineLabel,
    totalSteps
  } = useQuizChat();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
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

  const handleBuildingComplete = async (email: string, newsletter: boolean) => {
    setIsSubmitting(true);
    try {
      const goal = await saveQuizResponse(email, newsletter);
      // Map goals to course paths
      const goalToCourse: Record<string, string> = {
        fat_loss: 'fat-loss',
        muscle: 'muscle',
        recovery: 'recovery',
        anti_aging: 'anti-aging',
        cognitive: 'cognitive',
        beginner: 'beginner'
      };
      const coursePath = goalToCourse[goal] || 'beginner';
      navigate(`/course/${coursePath}`);
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
        getTimelineLabel={getTimelineLabel}
        onComplete={handleBuildingComplete}
        isSubmitting={isSubmitting}
      />
    );
  }

  const showQuickAnswers = currentStep === 0 && messages.length <= 1;

  return (
    <div className="flex h-full gap-6">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Progress bar */}
        <div className="px-4 py-3 border-b bg-background/95 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}
            </span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-foreground rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4 max-w-2xl mx-auto">
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
                className="text-center text-sm text-destructive bg-destructive/10 rounded-lg p-3"
              >
                {error}
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {/* Quick answers */}
        {showQuickAnswers && (
          <div className="px-4 py-3 border-t bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-2 text-center">Quick answers:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickAnswers.map(({ value, label, icon: Icon }) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAnswer(value, label)}
                  disabled={isLoading}
                  className="gap-1.5"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
          <div className="flex gap-2 max-w-2xl mx-auto">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Sidebar - hidden on mobile */}
      {!isMobile && (
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-4">
            <QuizProgressSidebar
              extractedValues={extractedValues}
              currentStep={currentStep}
              getGoalLabel={getGoalLabel}
              getExperienceLabel={getExperienceLabel}
              getConcernLabel={getConcernLabel}
              getTimelineLabel={getTimelineLabel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
