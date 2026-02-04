import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export interface ExtractedValues {
  goal: string | null;
  experience: string | null;
  concern: string | null;
  readiness: string | null;
}

interface QuizChatState {
  messages: Message[];
  extractedValues: ExtractedValues;
  currentStep: number;
  isLoading: boolean;
  isComplete: boolean;
  error: string | null;
}

const INITIAL_MESSAGE = `Hey! I'm here to help you build your personalized peptide course.

I'll ask you a few questions to understand your goals, and then I'll create a custom program just for you.

What's your main goal with peptides?`;

const goalLabels: Record<string, string> = {
  fat_loss: 'Fat Loss & Metabolism',
  muscle: 'Muscle Building & Recovery',
  recovery: 'Injury Recovery',
  anti_aging: 'Anti-Aging & Longevity',
  cognitive: 'Cognitive Enhancement',
  beginner: 'Not Sure Yet'
};

const experienceLabels: Record<string, string> = {
  never: 'Never Used',
  researched: 'Researched Only',
  experienced: 'Experienced'
};

const concernLabels: Record<string, string> = {
  injection_fear: 'Injection Anxiety',
  dosing_confusion: 'Dosing Confusion',
  peptide_choice: 'Peptide Selection',
  side_effects: 'Side Effects',
  all: 'All Concerns'
};

const readinessLabels: Record<string, string> = {
  ready_now: 'Ready to Start ASAP',
  soon: 'Planning in Weeks',
  exploring: 'Just Exploring'
};

export function useQuizChat() {
  const { user } = useAuth();
  const [state, setState] = useState<QuizChatState>({
    messages: [{
      id: 'initial',
      role: 'assistant',
      content: INITIAL_MESSAGE
    }],
    extractedValues: {
      goal: null,
      experience: null,
      concern: null,
      readiness: null
    },
    currentStep: 0,
    isLoading: false,
    isComplete: false,
    error: null
  });

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || state.isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage
    };

    const assistantMsg: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: '',
      isStreaming: true
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMsg, assistantMsg],
      isLoading: true,
      error: null
    }));

    try {
      const conversationHistory = state.messages.map(m => ({
        role: m.role,
        content: m.content
      }));
      conversationHistory.push({ role: 'user', content: userMessage });

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quiz-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
          },
          body: JSON.stringify({
            message: userMessage,
            currentStep: state.currentStep,
            conversationHistory,
            extractedValues: state.extractedValues
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();

      setState(prev => {
        const newExtractedValues = { ...prev.extractedValues };
        if (data.extracted) {
          newExtractedValues[data.extracted.key as keyof ExtractedValues] = data.extracted.value;
        }

        const updatedMessages = prev.messages.map(m => 
          m.id === assistantMsg.id 
            ? { ...m, content: data.response, isStreaming: false }
            : m
        );

        return {
          ...prev,
          messages: updatedMessages,
          extractedValues: newExtractedValues,
          currentStep: data.shouldAdvance ? prev.currentStep + 1 : prev.currentStep,
          isLoading: false,
          isComplete: data.isComplete
        };
      });

    } catch (error) {
      console.error('Quiz chat error:', error);
      setState(prev => ({
        ...prev,
        messages: prev.messages.filter(m => m.id !== assistantMsg.id),
        isLoading: false,
        error: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      }));
    }
  }, [state.currentStep, state.extractedValues, state.isLoading, state.messages]);

  const sendQuickAnswer = useCallback((value: string, label: string) => {
    sendMessage(label);
  }, [sendMessage]);

  const getGoalLabel = (goal: string | null) => goal ? goalLabels[goal] || goal : null;
  const getExperienceLabel = (exp: string | null) => exp ? experienceLabels[exp] || exp : null;
  const getConcernLabel = (concern: string | null) => concern ? concernLabels[concern] || concern : null;
  const getReadinessLabel = (readiness: string | null) => readiness ? readinessLabels[readiness] || readiness : null;

  // Save quiz response - creates protocol and user_courses for new users
  const saveQuizResponse = useCallback(async () => {
    const { goal, experience, concern, readiness } = state.extractedValues;
    
    if (!goal || !experience || !readiness) {
      throw new Error('Quiz not complete');
    }

    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    // Save to localStorage for backup
    const quizData = {
      goal,
      experience,
      concern,
      readiness
    };
    localStorage.setItem('quizResponse', JSON.stringify(quizData));

    try {
      // 1. Create protocol from template
      const protocolTemplates: Record<string, { name: string; peptides: any[]; weeks: number }> = {
        fat_loss: {
          name: "Fat Loss Protocol",
          weeks: 8,
          peptides: [
            {
              name: "Semaglutide",
              purpose: "Appetite regulation, metabolic optimization",
              dosage: "Start 0.25mg, increase to 0.5mg week 3, 1mg week 5",
              frequency: "Once weekly",
              timing: "Same day each week, morning",
              site: "Subcutaneous, abdomen or thigh",
            },
          ],
        },
        muscle: {
          name: "Muscle & Recovery Protocol",
          weeks: 8,
          peptides: [
            {
              name: "BPC-157",
              purpose: "Tissue repair, gut health, recovery",
              dosage: "250mcg",
              frequency: "Twice daily",
              timing: "Morning and post-workout",
              site: "Subcutaneous, near muscle worked or abdomen",
            },
            {
              name: "TB-500",
              purpose: "Systemic healing, flexibility, recovery",
              dosage: "2.5mg",
              frequency: "Twice weekly",
              timing: "Non-consecutive days",
              site: "Subcutaneous, abdomen",
            },
          ],
        },
        recovery: {
          name: "Injury Recovery Protocol",
          weeks: 6,
          peptides: [
            {
              name: "BPC-157",
              purpose: "Localized tissue repair",
              dosage: "250-500mcg",
              frequency: "Twice daily",
              timing: "Morning and evening",
              site: "Subcutaneous, as close to injury as possible",
            },
            {
              name: "TB-500",
              purpose: "Systemic healing support",
              dosage: "2.5mg twice weekly (weeks 1-2), then 2.5mg once weekly",
              frequency: "See dosage",
              timing: "Non-consecutive days",
              site: "Subcutaneous, abdomen",
            },
          ],
        },
        anti_aging: {
          name: "Anti-Aging & Longevity Protocol",
          weeks: 12,
          peptides: [
            {
              name: "Epithalon",
              purpose: "Telomere support, cellular health",
              dosage: "5mg",
              frequency: "Once daily for 20 days, then 10 day break, repeat",
              timing: "Evening",
              site: "Subcutaneous, abdomen",
            },
            {
              name: "GHK-Cu",
              purpose: "Skin health, collagen, healing",
              dosage: "1-2mg",
              frequency: "Once daily",
              timing: "Morning",
              site: "Subcutaneous, or topical if using cream",
            },
          ],
        },
        cognitive: {
          name: "Cognitive Enhancement Protocol",
          weeks: 8,
          peptides: [
            {
              name: "Semax",
              purpose: "Focus, memory, neuroprotection",
              dosage: "200-600mcg",
              frequency: "Once daily",
              timing: "Morning",
              site: "Intranasal (nose spray)",
            },
            {
              name: "Selank",
              purpose: "Anxiety reduction, focus, mood",
              dosage: "250-500mcg",
              frequency: "Once daily",
              timing: "Morning or early afternoon",
              site: "Intranasal (nose spray)",
            },
          ],
        },
        beginner: {
          name: "Beginner Protocol",
          weeks: 6,
          peptides: [
            {
              name: "BPC-157",
              purpose: "General healing, gut health, beginner-friendly",
              dosage: "250mcg",
              frequency: "Once daily",
              timing: "Morning, empty stomach",
              site: "Subcutaneous, abdomen",
            },
          ],
        },
      };

      const template = protocolTemplates[goal] || protocolTemplates.beginner;

      // Check if protocol already exists
      const { data: existingProtocol } = await supabase
        .from('protocols')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!existingProtocol) {
        const { error: protocolError } = await supabase
          .from('protocols')
          .insert({
            user_id: user.id,
            goal,
            protocol_name: template.name,
            peptides: template.peptides,
            cycle_length_weeks: template.weeks,
            status: 'not_started',
            current_day: 0,
            current_week: 1,
          });

        if (protocolError) {
          console.error('Error creating protocol:', protocolError);
        }
      }

      // 2. Create user_courses from course_template
      const { data: existingCourse } = await supabase
        .from('user_courses')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!existingCourse) {
        const { data: courseTemplate } = await supabase
          .from('course_templates')
          .select('*')
          .eq('goal', goal)
          .maybeSingle();

        if (courseTemplate) {
          const { error: courseError } = await supabase
            .from('user_courses')
            .insert({
              user_id: user.id,
              template_id: courseTemplate.id,
              goal: courseTemplate.goal,
              title: courseTemplate.title,
              peptides: courseTemplate.peptides,
              duration_days: courseTemplate.duration_days,
              lessons: courseTemplate.lessons,
              current_day: 0,
              status: 'not_started',
              purchased_at: new Date().toISOString(),
            });

          if (courseError) {
            console.error('Error creating user_course:', courseError);
          }
        } else {
          // Fallback: create a basic course if no template exists
          const { error: courseError } = await supabase
            .from('user_courses')
            .insert({
              user_id: user.id,
              goal,
              title: template.name,
              peptides: template.peptides,
              duration_days: template.weeks * 7,
              lessons: [],
              current_day: 0,
              status: 'not_started',
              purchased_at: new Date().toISOString(),
            });

          if (courseError) {
            console.error('Error creating fallback user_course:', courseError);
          }
        }
      }

      // 3. Save to quiz_responses for analytics
      await supabase
        .from('quiz_responses')
        .insert({
          user_id: user.id,
          primary_goal: goal,
          experience_level: experience,
          main_concerns: concern ? [concern] : [],
          timeline: readiness,
          completed_at: new Date().toISOString()
        });

    } catch (err) {
      console.error('Error saving quiz:', err);
    }

    return goal;
  }, [state.extractedValues, user]);

  return {
    messages: state.messages,
    extractedValues: state.extractedValues,
    currentStep: state.currentStep,
    isLoading: state.isLoading,
    isComplete: state.isComplete,
    error: state.error,
    sendMessage,
    sendQuickAnswer,
    saveQuizResponse,
    getGoalLabel,
    getExperienceLabel,
    getConcernLabel,
    getReadinessLabel,
    totalSteps: 4
  };
}
