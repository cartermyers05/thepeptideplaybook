import { useState, useEffect } from "react";
import { List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface GuideTableOfContentsProps {
  items: TOCItem[];
}

export function GuideTableOfContents({ items }: GuideTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile: Collapsible */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 glass-card-subtle"
        >
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-primary" />
            <span className="font-medium">Table of Contents</span>
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>
        {isOpen && (
          <nav className="mt-2 p-4 glass-card-subtle">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "text-left text-sm hover:text-primary transition-colors",
                      item.level === 3 && "pl-4",
                      activeId === item.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: Sticky sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <div className="flex items-center gap-2 mb-4">
            <List className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm">Contents</span>
          </div>
          <nav className="border-l border-border">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "block w-full text-left text-sm py-1.5 pl-4 border-l-2 -ml-px transition-colors",
                      item.level === 3 && "pl-6",
                      activeId === item.id
                        ? "border-primary text-primary font-medium"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                    )}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
