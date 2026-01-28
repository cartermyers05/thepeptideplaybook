import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  TrendingUp, 
  Quote, 
  ArrowLeft,
  Calendar,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SEOHead } from "@/components/seo/SEOHead";
import { useCitationStats, useTopCitedArticles, useCitations } from "@/hooks/useCitations";

const ENGINE_COLORS: Record<string, string> = {
  chatgpt: "#10a37f",
  perplexity: "#8b5cf6",
  claude: "#d97706",
  gemini: "#3b82f6",
  other: "#6b7280",
};

const ENGINE_LABELS: Record<string, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  claude: "Claude",
  gemini: "Gemini",
  other: "Other",
};

export default function CitationsDashboard() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("30");

  const { data: stats, isLoading: statsLoading } = useCitationStats();
  const { data: topArticles, isLoading: articlesLoading } = useTopCitedArticles(10);
  const { data: recentCitations, isLoading: citationsLoading } = useCitations();

  // Transform stats for charts
  const engineData = stats?.byEngine
    ? Object.entries(stats.byEngine).map(([engine, count]) => ({
        name: ENGINE_LABELS[engine] || engine,
        value: count,
        color: ENGINE_COLORS[engine] || ENGINE_COLORS.other,
      }))
    : [];

  const dateData = stats?.byDate
    ? Object.entries(stats.byDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-parseInt(timeRange))
        .map(([date, count]) => ({
          date: new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          citations: count,
        }))
    : [];

  return (
    <>
      <SEOHead title="Citation Analytics" noIndex />

      <div className="min-h-screen bg-background">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/articles")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  Citation Analytics
                </h1>
                <p className="text-muted-foreground text-sm">
                  Track AI search engine citations and performance
                </p>
              </div>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Citations</p>
                    <p className="text-3xl font-bold">
                      {statsLoading ? <Skeleton className="h-9 w-20" /> : stats?.total || 0}
                    </p>
                  </div>
                  <Quote className="w-8 h-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            {Object.entries(stats?.byEngine || {})
              .slice(0, 3)
              .map(([engine, count]) => (
                <Card key={engine}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {ENGINE_LABELS[engine] || engine}
                        </p>
                        <p className="text-3xl font-bold">{count}</p>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: ENGINE_COLORS[engine] + "20" }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Citations Over Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Citations Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <Skeleton className="h-64 w-full" />
                ) : dateData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={dateData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="date"
                        className="text-xs"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        className="text-xs"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="citations"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    No citation data available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Engine Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Citations by AI Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <Skeleton className="h-64 w-full" />
                ) : engineData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={engineData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {engineData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    No citation data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Top Cited Articles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Quote className="w-5 h-5 text-primary" />
                Top Cited Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {articlesLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : topArticles && topArticles.length > 0 ? (
                <div className="space-y-3">
                  {topArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        <a
                          href={`/articles/${article.slug}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {article.title}
                        </a>
                      </div>
                      <Badge>{article.citation_count} citations</Badge>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No cited articles yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
