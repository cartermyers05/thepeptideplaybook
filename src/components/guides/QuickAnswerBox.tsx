import { Helmet } from "react-helmet-async";
import { Zap, Clock, Calendar } from "lucide-react";

interface QuickAnswerBoxProps {
  answer: string;
  lastUpdated: string;
  readTime: string;
}

export function QuickAnswerBox({ answer, lastUpdated, readTime }: QuickAnswerBoxProps) {
  // Schema.org Answer markup for AI extraction
  const answerSchema = {
    "@context": "https://schema.org",
    "@type": "Answer",
    text: answer,
    dateCreated: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(answerSchema)}</script>
      </Helmet>

      <div
        className="relative p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl mb-8"
        itemScope
        itemType="https://schema.org/Answer"
      >
        <meta itemProp="text" content={answer} />

        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-sm font-bold text-primary uppercase tracking-wide">
            Quick Answer
          </span>
        </div>

        <p className="text-foreground leading-relaxed text-base mb-4" itemProp="text">
          {answer}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-primary/20 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>Read Time: {readTime}</span>
          </div>
        </div>
      </div>
    </>
  );
}
