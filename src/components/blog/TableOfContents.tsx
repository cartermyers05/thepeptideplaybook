import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { List } from "lucide-react";

interface TableOfContentsProps {
  content: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [items, setItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    // Extract headings from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headings = doc.querySelectorAll("h2, h3");
    
    const tocItems: TOCItem[] = [];
    headings.forEach((heading, index) => {
      const text = heading.textContent?.trim() || "";
      if (text) {
        const id = `heading-${index}`;
        tocItems.push({
          id,
          text,
          level: heading.tagName === "H2" ? 2 : 3,
        });
      }
    });
    
    setItems(tocItems);
  }, [content]);

  if (items.length < 3) return null;

  const scrollToHeading = (id: string, index: number) => {
    // Find the actual heading in the DOM by looking for h2/h3 elements
    const articleContent = document.querySelector("article");
    if (articleContent) {
      const headings = articleContent.querySelectorAll("h2, h3");
      const heading = headings[index];
      if (heading) {
        heading.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8 p-6 bg-muted/30 rounded-xl border border-border/50"
    >
      <h2 className="font-semibold mb-4 flex items-center gap-2">
        <List className="w-5 h-5 text-primary" />
        Table of Contents
      </h2>
      
      <nav className="space-y-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id, index)}
            className={`block text-left text-sm hover:text-primary transition-colors ${
              item.level === 3 ? "pl-4" : ""
            } ${item.level === 2 ? "text-foreground font-medium" : "text-muted-foreground"}`}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </motion.div>
  );
}
