import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AskCoach } from "@/components/coach/AskCoach";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";

const suggestedQuestions = [
  "What should I expect in week 1?",
  "Is nausea normal?",
  "How do I store my peptide?",
  "What if I miss a dose?",
];

export default function Coach() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
            <AnimatedLogo size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black">AI Coach</h1>
            <p className="text-gray-500 text-sm">
              Ask anything about your course
            </p>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              className="text-sm px-4 py-2 rounded-full border border-gray-200 bg-white hover:border-black hover:bg-gray-50 transition-colors text-gray-600 hover:text-black"
              onClick={() => {
                const textarea = document.querySelector('textarea');
                if (textarea) {
                  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
                  nativeInputValueSetter?.call(textarea, question);
                  const event = new Event('input', { bubbles: true });
                  textarea.dispatchEvent(event);
                  textarea.focus();
                }
              }}
            >
              {question}
            </button>
          ))}
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-0 overflow-hidden">
          <AskCoach />
        </div>
      </div>
    </DashboardLayout>
  );
}
