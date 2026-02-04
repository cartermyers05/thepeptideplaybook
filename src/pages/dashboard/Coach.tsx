import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AskCoach } from "@/components/coach/AskCoach";
import { MessageCircle } from "lucide-react";

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
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Coach</h1>
            <p className="text-muted-foreground text-sm">
              Ask anything about your course
            </p>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              className="text-sm px-4 py-2 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-colors text-foreground"
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
        <div className="card-premium p-0 overflow-hidden">
          <AskCoach />
        </div>
      </div>
    </DashboardLayout>
  );
}
