import ReactMarkdown from "react-markdown";

interface TypewriterMessageProps {
  content: string;
  isStreaming: boolean;
}

export function TypewriterMessage({ content, isStreaming }: TypewriterMessageProps) {
  return (
    <div className="text-sm">
      {content ? (
        <>
          <ReactMarkdown>{content}</ReactMarkdown>
          {isStreaming && (
            <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-middle rounded-full" />
          )}
        </>
      ) : isStreaming ? (
        <TypingIndicator />
      ) : null}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-pulse"
          style={{ animationDelay: `${i * 200}ms` }}
        />
      ))}
    </div>
  );
}
