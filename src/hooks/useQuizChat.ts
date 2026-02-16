import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';

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

const INITIAL_MESSAGE = `Hey! I'm here to help you build your personalized Peptide Blueprint.

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

export function useQuizChat(preSelectedGoal?: string | null) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // If goal is pre-selected, start at step 1 with a different initial message
  const getInitialState = (): QuizChatState => {
    if (preSelectedGoal) {
      const goalLabel = goalLabels[preSelectedGoal] || preSelectedGoal;
      return {
        messages: [{
          id: 'initial',
          role: 'assistant',
          content: `Great choice! You've selected **${goalLabel}** as your goal.

Now let me ask a few more questions to personalize your blueprint.

What's your experience level with peptides?`
        }],
        extractedValues: {
          goal: preSelectedGoal,
          experience: null,
          concern: null,
          readiness: null
        },
        currentStep: 1, // Skip goal step
        isLoading: false,
        isComplete: false,
        error: null
      };
    }
    
    return {
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
    };
  };
  
  const [state, setState] = useState<QuizChatState>(getInitialState);

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

  // Save quiz response - for non-authenticated users, just save to localStorage
  // For authenticated users, also save to database
  const saveQuizResponse = useCallback(async () => {
    const { goal, experience, concern, readiness } = state.extractedValues;
    
    if (!goal || !experience || !readiness) {
      throw new Error('Quiz not complete');
    }

    // Always save to localStorage for course preview
    const quizData = {
      goal,
      experience,
      concern,
      readiness,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem('quizResponse', JSON.stringify(quizData));

    // If user is not authenticated, just return the goal (they'll create course after payment)
    if (!user?.id) {
      console.log('User not authenticated, quiz saved to localStorage only');
      return goal;
    }

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

      // Check if protocol already exists - UPDATE if yes, INSERT if no
      const { data: existingProtocol } = await supabase
        .from('protocols')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingProtocol) {
        // UPDATE existing protocol with new goal data
        const { error: protocolError } = await supabase
          .from('protocols')
          .update({
            goal,
            protocol_name: template.name,
            peptides: template.peptides,
            cycle_length_weeks: template.weeks,
            status: 'not_started',
            current_day: 0,
            current_week: 1,
            started_at: null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingProtocol.id);

        if (protocolError) {
          console.error('Error updating protocol:', protocolError);
          throw new Error(`Failed to update protocol: ${protocolError.message}`);
        }
      } else {
        // INSERT new protocol
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
          throw new Error(`Failed to create protocol: ${protocolError.message}`);
        }
      }

      // 2. Get course template for the new goal
      const { data: courseTemplate } = await supabase
        .from('course_templates')
        .select('*')
        .eq('goal', goal)
        .maybeSingle();

      // Check if user_course already exists - UPDATE if yes, INSERT if no
      const { data: existingCourse } = await supabase
        .from('user_courses')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingCourse) {
        // UPDATE existing course with new goal data
        const updateData = courseTemplate ? {
          template_id: courseTemplate.id,
          goal: courseTemplate.goal,
          title: courseTemplate.title,
          peptides: courseTemplate.peptides,
          duration_days: courseTemplate.duration_days,
          lessons: courseTemplate.lessons,
          current_day: 0,
          status: 'not_started',
          supplies_status: null,
          started_at: null,
        } : {
          goal,
          title: template.name,
          peptides: template.peptides,
          duration_days: template.weeks * 7,
          lessons: [],
          current_day: 0,
          status: 'not_started',
          supplies_status: null,
          started_at: null,
        };

        const { error: courseError } = await supabase
          .from('user_courses')
          .update(updateData)
          .eq('id', existingCourse.id);

        if (courseError) {
          console.error('Error updating user_course:', courseError);
          throw new Error(`Failed to update course: ${courseError.message}`);
        }
      } else {
        // INSERT new course
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
            throw new Error(`Failed to create course: ${courseError.message}`);
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
            throw new Error(`Failed to create course: ${courseError.message}`);
          }
        }
      }

      // 3. Save to quiz_responses for analytics
      // Map extracted values to DB-compatible constraint values
      const goalMap: Record<string, string> = {
        recovery: 'injury_recovery',
        muscle: 'muscle_recovery',
      };
      const experienceMap: Record<string, string> = {
        never: 'beginner',
        researched: 'some_experience',
      };
      const dbGoal = goalMap[goal] || goal;
      const dbExperience = experienceMap[experience] || experience;

      await supabase
        .from('quiz_responses')
        .insert({
          user_id: user.id,
          primary_goal: dbGoal,
          experience_level: dbExperience,
          main_concerns: concern ? [concern] : [],
          timeline: readiness,
          completed_at: new Date().toISOString()
        });

      // 4. Invalidate React Query cache so dashboard shows fresh data
      queryClient.invalidateQueries({ queryKey: ['user-course'] });
      queryClient.invalidateQueries({ queryKey: ['protocol'] });
      queryClient.invalidateQueries({ queryKey: ['course'] });

    } catch (err) {
      console.error('Error saving quiz:', err);
      throw err; // Re-throw to let UI handle it
    }

    return goal;
  }, [state.extractedValues, user, queryClient]);

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
