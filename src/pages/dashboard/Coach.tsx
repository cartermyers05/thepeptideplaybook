import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AskCoach } from "@/components/coach/AskCoach";

const suggestedQuestions = [
  "What should I expect in week 1?",
  "How do I know if my dose is right?",
  "What are normal side effects?",
  "Can I stack BPC-157 with TB-500?",
];

export default function Coach() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">AI Coach</h1>
          <p className="text-muted-foreground">
            Ask me anything about peptides
          </p>
        </div>

        {/* Suggested Questions */}
        <div className="flex flex-wrap gap-2 pb-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              className="text-xs px-3 py-1.5 rounded-full border bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              onClick={() => {
                // The AskCoach component will handle this via a ref or state update
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
        <AskCoach />
      </div>
    </DashboardLayout>
  );
}
