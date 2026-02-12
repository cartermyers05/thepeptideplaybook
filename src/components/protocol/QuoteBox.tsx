import { ReactNode } from "react";

interface QuoteBoxProps {
  children: ReactNode;
}

export function QuoteBox({ children }: QuoteBoxProps) {
  return (
    <div
      style={{
        background: "rgba(30,41,59,0.5)",
        borderLeft: "2px solid #06D6A0",
        borderRadius: "0 12px 12px 0",
        padding: "16px 20px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15,
        fontStyle: "italic",
        color: "#CBD5E1",
      }}
    >
      {children}
    </div>
  );
}
