import { User, Award } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AuthorSectionProps {
  name: string;
  credential?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export function AuthorSection({
  name,
  credential,
  publishedAt,
  updatedAt,
}: AuthorSectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
      <Avatar className="w-12 h-12 border-2 border-primary/20">
        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="font-semibold text-foreground">{name}</span>
        </div>

        {credential && (
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{credential}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {publishedAt && (
            <span>
              <strong>Published:</strong> {formatDate(publishedAt)}
            </span>
          )}
          {updatedAt && (
            <span>
              <strong>Updated:</strong> {formatDate(updatedAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
