import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User } from "lucide-react";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";
import { supabase } from "@/integrations/supabase/client";
import { useCourse } from "@/hooks/useCourse";
import { useCheckIn } from "@/hooks/useCheckIn";
import { useLessons } from "@/hooks/useLessons";
import { useProtocol } from "@/hooks/useProtocol";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CheckInSummary {
  date: string;
  energy: number | null;
  mood: number | null;
  sleepQuality: number | null;
  sideEffects: string[];
  injectionDone: string | null;
}

interface UserContext {
  // Course info
  courseTitle: string;
  goal: string;
  peptides: { name: string; purpose: string; dosage: string; frequency: string; timing: string }[];
  currentDay: number;
  totalDays: number;
  currentWeek: number;
  cycleLength: number;
  experienceLevel: string | null;
  mainConcern: string | null;
  suppliesStatus: string | null;
  status: string | null;
  
  // Check-in insights (NEW)
  checkInSummary: {
    last7Days: CheckInSummary[];
    averageEnergy: number | null;
    averageMood: number | null;
    averageSleep: number | null;
    commonSideEffects: { effect: string; count: number }[];
    hasCheckedInToday: boolean;
    todayCheckIn: CheckInSummary | null;
    checkInStreak: number;
  };
  
  // Lesson progress (NEW)
  lessonProgress: {
    completedDays: number[];
    totalCompleted: number;
    completionRate: number;
    lessonStreak: number;
  };
  
  // Protocol info (NEW)
  protocolInfo: {
    protocolName: string | null;
    protocolStatus: string | null;
    protocolCurrentDay: number | null;
    protocolCurrentWeek: number | null;
  } | null;
  
  // Profile info (NEW)
  profileStreak: number;
}

export function AskCoach() {
  const { userCourse } = useCourse();
  const { recentCheckIns, todayCheckIn, hasCheckedInToday } = useCheckIn();
  const { lessonProgress, completedDays, streak: lessonStreak } = useLessons(userCourse?.id);
  const { protocol } = useProtocol();
  const { data: profile } = useProfile();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Calculate check-in insights from recent data
  const checkInInsights = useMemo(() => {
    const last7 = (recentCheckIns || []).slice(0, 7);
    
    // Calculate averages
    const energyValues = last7.filter(c => c.energy_level !== null).map(c => c.energy_level!);
    const moodValues = last7.filter(c => c.mood !== null).map(c => c.mood!);
    const sleepValues = last7.filter(c => c.sleep_quality !== null).map(c => c.sleep_quality!);
    
    const averageEnergy = energyValues.length > 0 
      ? Math.round((energyValues.reduce((a, b) => a + b, 0) / energyValues.length) * 10) / 10 
      : null;
    const averageMood = moodValues.length > 0 
      ? Math.round((moodValues.reduce((a, b) => a + b, 0) / moodValues.length) * 10) / 10 
      : null;
    const averageSleep = sleepValues.length > 0 
      ? Math.round((sleepValues.reduce((a, b) => a + b, 0) / sleepValues.length) * 10) / 10 
      : null;
    
    // Count side effects
    const sideEffectCounts: Record<string, number> = {};
    last7.forEach(checkIn => {
      (checkIn.side_effects || []).forEach(effect => {
        sideEffectCounts[effect] = (sideEffectCounts[effect] || 0) + 1;
      });
    });
    
    const commonSideEffects = Object.entries(sideEffectCounts)
      .map(([effect, count]) => ({ effect, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Calculate check-in streak
    let checkInStreak = 0;
    const sortedCheckIns = [...(recentCheckIns || [])].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    for (const checkIn of sortedCheckIns) {
      if (checkIn.completed) {
        checkInStreak++;
      } else {
        break;
      }
    }
    
    return {
      last7Days: last7.map(c => ({
        date: c.date,
        energy: c.energy_level,
        mood: c.mood,
        sleepQuality: c.sleep_quality,
        sideEffects: c.side_effects || [],
        injectionDone: c.injection_done,
      })),
      averageEnergy,
      averageMood,
      averageSleep,
      commonSideEffects,
      hasCheckedInToday,
      todayCheckIn: todayCheckIn ? {
        date: todayCheckIn.date,
        energy: todayCheckIn.energy_level,
        mood: todayCheckIn.mood,
        sleepQuality: todayCheckIn.sleep_quality,
        sideEffects: todayCheckIn.side_effects || [],
        injectionDone: todayCheckIn.injection_done,
      } : null,
      checkInStreak,
    };
  }, [recentCheckIns, todayCheckIn, hasCheckedInToday]);

  // Calculate lesson progress insights
  const lessonInsights = useMemo(() => {
    const completed = lessonProgress?.filter(l => l.completed).map(l => l.day) || [];
    const totalDays = userCourse?.duration_days || 0;
    const completionRate = totalDays > 0 ? Math.round((completed.length / totalDays) * 100) : 0;
    
    return {
      completedDays: completed,
      totalCompleted: completed.length,
      completionRate,
      lessonStreak,
    };
  }, [lessonProgress, userCourse?.duration_days, lessonStreak]);

  // Build comprehensive user context
  const buildUserContext = (): UserContext | null => {
    if (!userCourse) return null;

    // Try to get quiz response from localStorage for experience and concern
    let experienceLevel = null;
    let mainConcern = null;
    try {
      const quizData = localStorage.getItem('quizResponse');
      if (quizData) {
        const parsed = JSON.parse(quizData);
        experienceLevel = parsed.experience;
        mainConcern = parsed.concern;
      }
    } catch (e) {
      // Ignore parsing errors
    }

    const weekCount = Math.ceil(userCourse.duration_days / 7);
    const currentWeek = Math.ceil((userCourse.current_day || 1) / 7);

    return {
      // Course info
      courseTitle: userCourse.title,
      goal: userCourse.goal,
      peptides: userCourse.peptides.map(p => ({
        name: p.name,
        purpose: p.purpose,
        dosage: p.dosing_research || '',
        frequency: p.frequency,
        timing: p.timing,
      })),
      currentDay: userCourse.current_day || 0,
      totalDays: userCourse.duration_days,
      currentWeek,
      cycleLength: weekCount,
      experienceLevel,
      mainConcern,
      suppliesStatus: userCourse.supplies_status,
      status: userCourse.status,
      
      // Check-in insights
      checkInSummary: checkInInsights,
      
      // Lesson progress
      lessonProgress: lessonInsights,
      
      // Protocol info
      protocolInfo: protocol ? {
        protocolName: protocol.protocol_name,
        protocolStatus: protocol.status,
        protocolCurrentDay: protocol.current_day,
        protocolCurrentWeek: protocol.current_week,
      } : null,
      
      // Profile streak
      profileStreak: profile?.current_streak || 0,
    };
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const userContext = buildUserContext();

      const { data, error } = await supabase.functions.invoke("coach", {
        body: {
          message: userMessage,
          userContext,
        },
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response || "I'm sorry, I couldn't process that. Please try again." },
      ]);
    } catch (error) {
      console.error("Coach error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center mb-4">
              <AnimatedLogo size={40} animate={false} />
            </div>
            <h3 className="font-semibold text-lg text-black mb-2">Start a conversation</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Ask me anything about your peptide course, dosing, side effects, or what to expect.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center flex-shrink-0">
                    <AnimatedLogo size={20} animate={false} />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-black text-white rounded-br-md"
                      : "bg-white border border-gray-200 text-black rounded-bl-md"
                  )}
                >
                  {message.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none text-sm">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
                  <AnimatedLogo size={20} animate={true} />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '200ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '400ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[44px] max-h-[120px] resize-none rounded-xl border-gray-200"
            rows={1}
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()} 
            className="bg-black text-white hover:bg-black/90 h-[44px] w-[44px] p-0 rounded-xl flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
