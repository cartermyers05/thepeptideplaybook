import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Loader2, ArrowLeft, Eye, Save, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SEOHead } from "@/components/seo/SEOHead";
import { TLDRBox } from "@/components/articles/TLDRBox";
import { ArticleContent } from "@/components/articles/ArticleContent";

import { useCreateArticle } from "@/hooks/useArticles";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const contentTypes = [
  { value: "citation-magnet", label: "Research Overview", description: "In-depth research summary" },
  { value: "question-answer", label: "Q&A", description: "Direct question and answer format" },
  { value: "comparison", label: "Comparison", description: "Compare multiple options" },
  { value: "guide", label: "Guide", description: "Step-by-step tutorial" },
];

interface GeneratedArticle {
  title: string;
  h1_question: string;
  slug: string;
  meta_description: string;
  tldr: string;
  full_content: string;
  structured_answer: Array<{ question: string; answer: string }>;
  citations: Array<{ source: string; url: string; study_name: string; year: number }>;
  statistics: Array<{ claim: string; percentage: number; sample_size: number; source: string }>;
  target_keywords: string[];
  content_type: string;
  author_name: string;
  author_credential: string;
  status: string;
}

export default function ArticleGenerator() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const createArticle = useCreateArticle();

  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("guide");
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic or question");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedArticle(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("generate-article", {
        body: {
          topic: topic.trim(),
          content_type: contentType,
          target_keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
        },
      });

      if (fnError) throw fnError;
      if (data.error) throw new Error(data.error);

      setGeneratedArticle(data.article);
      setShowPreview(true);
      toast.success("Article generated successfully!");
    } catch (err) {
      console.error("Generation error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate article");
      toast.error("Failed to generate article");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedArticle) return;

    try {
      await createArticle.mutateAsync({
        ...generatedArticle,
        status: "published",
        published_at: new Date().toISOString(),
      });

      toast.success("Article published successfully!");
      navigate("/articles");
    } catch (err) {
      console.error("Publish error:", err);
      toast.error("Failed to publish article");
    }
  };

  const handleSaveDraft = async () => {
    if (!generatedArticle) return;

    try {
      await createArticle.mutateAsync({
        ...generatedArticle,
        status: "draft",
      });

      toast.success("Draft saved successfully!");
      navigate("/articles");
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save draft");
    }
  };

  return (
    <>
      <SEOHead title="Article Generator" noIndex />

      <div className="min-h-screen bg-background">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/articles")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  AI Article Generator
                </h1>
                <p className="text-muted-foreground text-sm">
                  Generate SEO-optimized articles for AI search engines
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>Generate New Article</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic or Question *</Label>
                  <Textarea
                    id="topic"
                    placeholder="e.g., What is BPC-157 and how does it work for tissue repair?"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Write as a question for best AI search optimization
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex flex-col items-start">
                            <span>{type.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {type.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Target Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="BPC-157, tissue repair, healing peptide"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated keywords for SEO targeting
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Article...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Article
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Preview</CardTitle>
                  {generatedArticle && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {showPreview ? "Hide" : "Show"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!generatedArticle && !isGenerating && (
                  <div className="text-center py-16 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Your generated article will appear here</p>
                  </div>
                )}

                {isGenerating && (
                  <div className="text-center py-16">
                    <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                    <p className="text-muted-foreground">
                      Generating AI-optimized content...
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      This may take 30-60 seconds
                    </p>
                  </div>
                )}

                {generatedArticle && showPreview && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <Badge className="mb-2">{contentType}</Badge>
                      <h2 className="text-xl font-bold">{generatedArticle.h1_question}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Slug: /articles/{generatedArticle.slug}
                      </p>
                    </div>

                    <TLDRBox content={generatedArticle.tldr} />

                    <div className="max-h-96 overflow-y-auto border rounded-lg p-4">
                      <ArticleContent content={generatedArticle.full_content} />
                    </div>

                    {generatedArticle.citations?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">
                          Citations ({generatedArticle.citations.length})
                        </h3>
                        <ul className="text-sm space-y-1">
                          {generatedArticle.citations.slice(0, 3).map((c, i) => (
                            <li key={i} className="text-muted-foreground">
                              • {c.study_name} ({c.year})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t">
                      <Button onClick={handlePublish} className="flex-1">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Publish
                      </Button>
                      <Button variant="outline" onClick={handleSaveDraft}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Draft
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
