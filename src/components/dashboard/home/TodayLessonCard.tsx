import { Link } from "react-router-dom";
import { Clock, ArrowRight, BookOpen, FlaskConical, Syringe, MessageCircle } from "lucide-react";

interface Lesson {
  day: number;
  phase: string;
  title: string;
  content: string;
  action_item: string;
}

interface TodayLessonCardProps {
  lesson: Lesson | null | undefined;
  currentDay: number;
  hasCompletedToday?: boolean;
}

export function TodayLessonCard({ lesson, currentDay, hasCompletedToday }: TodayLessonCardProps) {
  // Show contextual guide links based on current day
  const showReconGuide = currentDay >= 3 && currentDay <= 5;
  const showInjectionGuide = currentDay >= 4 && currentDay <= 7;

  if (!lesson) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-rose-300 to-rose-400" />
        <div className="p-6 text-center py-10">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-black mb-2">Welcome to Your Course</h2>
          <p className="text-gray-500 mb-6">Your personalized journey starts here</p>
          <Link
            to="/dashboard/course"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const preview = lesson.content?.slice(0, 140) || '';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-rose-300 to-rose-400" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Today's Lesson
          </span>
          <span className="text-sm text-gray-400">Day {currentDay}</span>
        </div>
        
        <h2 className="text-2xl font-bold text-black mb-2">
          {lesson.title}
        </h2>
        <p className="text-gray-500 mb-4 line-clamp-2">
          {preview}...
        </p>

        {/* Contextual quick links */}
        {(showReconGuide || showInjectionGuide) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {showReconGuide && (
              <Link
                to="/dashboard/plan"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <FlaskConical className="w-3 h-3" />
                Reconstitution Guide
              </Link>
            )}
            {showInjectionGuide && (
              <Link
                to="/dashboard/plan"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
              >
                <Syringe className="w-3 h-3" />
                Injection Guide
              </Link>
            )}
            <Link
              to="/dashboard/coach"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              Ask AI Coach
            </Link>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">4 min read</span>
          </div>
          
          <Link
            to="/dashboard/course"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            {hasCompletedToday ? 'Continue' : 'Start'} Lesson
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
