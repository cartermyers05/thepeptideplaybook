import { SEOHead } from "@/components/seo/SEOHead";
import { ConversationalQuiz } from "@/components/quiz/ConversationalQuiz";

export default function Quiz() {
  return (
    <>
      <SEOHead 
        title="Build Your Peptide Course | Peptide Playbook"
        description="Chat with our AI to build a personalized peptide course tailored to your goals."
        canonical="/quiz"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-1 flex flex-col">
          <ConversationalQuiz />
        </main>
      </div>
    </>
  );
}
