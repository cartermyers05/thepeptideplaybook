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
  timeline: string | null;
}

interface QuizChatState {
  messages: Message[];
  extractedValues: ExtractedValues;
  currentStep: number;
  isLoading: boolean;
  isComplete: boolean;
  error: string | null;
}

const INITIAL_MESSAGE = `Hey! I'm going to build you a personalized peptide course. But first, I need to understand what you're looking for.

What's your main goal - what are you hoping peptides can help with?`;

const goalLabels: Record<string, string> = {
  fat_loss: 'Fat Loss',
  muscle: 'Muscle & Recovery',
  recovery: 'Injury Recovery',
  anti_aging: 'Anti-Aging',
  cognitive: 'Cognitive Enhancement',
  beginner: 'Beginner Exploration'
};

const experienceLabels: Record<string, string> = {
  beginner: 'Beginner',
  some_experience: 'Some Experience',
  experienced: 'Experienced'
};

const concernLabels: Record<string, string> = {
  injections: 'Injection Anxiety',
  dosing: 'Dosing Concerns',
  side_effects: 'Side Effects',
  reconstitution: 'Reconstitution',
  nothing: 'No Concerns'
};

const timelineLabels: Record<string, string> = {
  this_week: 'This Week',
  this_month: 'This Month',
  researching: 'Still Researching'
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
      timeline: null
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
  const getTimelineLabel = (timeline: string | null) => timeline ? timelineLabels[timeline] || timeline : null;

  const saveQuizResponse = useCallback(async (email: string, newsletter: boolean) => {
    const { goal, experience, concern, timeline } = state.extractedValues;
    
    if (!goal || !experience || !timeline) {
      throw new Error('Quiz not complete');
    }

    // Save to localStorage
    const quizData = {
      goal,
      experience,
      concern,
      timeline,
      email
    };
    localStorage.setItem('quizResponse', JSON.stringify(quizData));

    // Save to database
    try {
      const { data, error } = await supabase
        .from('quiz_responses')
        .insert({
          user_id: user?.id || null,
          primary_goal: goal,
          experience_level: experience,
          main_concerns: concern ? [concern] : [],
          timeline: timeline === 'this_week' ? 'ready_now' : timeline === 'this_month' ? 'soon' : 'researching',
          email,
          newsletter_opt_in: newsletter
        })
        .select()
        .single();

      if (!error && data) {
        localStorage.setItem('quizResponse', JSON.stringify({
          ...quizData,
          id: data.id
        }));
      }
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
    getTimelineLabel,
    totalSteps: 4
  };
}
