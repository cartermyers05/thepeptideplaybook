import { Helmet } from "react-helmet-async";
import { Lightbulb } from "lucide-react";

interface DirectAnswerBlockProps {
  question: string;
  answer: string;
  keywords?: string[];
}

export function DirectAnswerBlock({ question, answer, keywords = [] }: DirectAnswerBlockProps) {
  // Schema.org Answer markup for AI extraction
  const answerSchema = {
    "@context": "https://schema.org",
    "@type": "Answer",
    "text": answer,
    "dateCreated": new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(answerSchema)}</script>
      </Helmet>

      <div 
        className="direct-answer relative p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg mb-8"
        itemScope 
        itemType="https://schema.org/Answer"
      >
        <meta itemProp="text" content={answer} />
        
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-primary">Quick Answer</h2>
        </div>
        
        <p 
          className="text-foreground leading-relaxed text-base mb-4"
          itemProp="text"
        >
          {answer}
        </p>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-primary/20">
            {keywords.slice(0, 5).map((keyword, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
