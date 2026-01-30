import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RelatedGuide {
  title: string;
  href: string;
}

interface RelatedGuidesProps {
  guides: RelatedGuide[];
}

export function RelatedGuides({ guides }: RelatedGuidesProps) {
  return (
    <section className="my-12">
      <h2 className="text-xl font-bold mb-4">Related Guides</h2>
      <div className="space-y-3">
        {guides.map((guide, index) => (
          <Link
            key={index}
            to={guide.href}
            className="flex items-center justify-between p-4 glass-card-subtle hover:bg-primary/5 transition-colors group"
          >
            <span className="font-medium group-hover:text-primary transition-colors">
              {guide.title}
            </span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </section>
  );
}
