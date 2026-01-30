import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import ThankYou from "./pages/ThankYou";
import ArticleGenerator from "./pages/admin/ArticleGenerator";
import CitationsDashboard from "./pages/admin/CitationsDashboard";
import NewsDetail from "./pages/NewsDetail";
import NotFound from "./pages/NotFound";

// New pages
import Pricing from "./pages/Pricing";
import FreeGuide from "./pages/FreeGuide";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/dashboard/Home";
import DashboardChecklist from "./pages/dashboard/Checklist";
import DashboardDatabase from "./pages/dashboard/Database";
import DashboardChat from "./pages/dashboard/ChatPage";
import DashboardDigest from "./pages/dashboard/Digest";
import DashboardCommunity from "./pages/dashboard/Community";
import DashboardSettings from "./pages/dashboard/Settings";

// SEO Guide pages
import Guides from "./pages/Guides";
import BPC157Guide from "./pages/guides/BPC157Guide";
import FDALegalStatusGuide from "./pages/guides/FDALegalStatusGuide";
import ArePeptidesSafeGuide from "./pages/guides/ArePeptidesSafeGuide";
import BPC157vsTB500Guide from "./pages/guides/BPC157vsTB500Guide";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/free-guide" element={<FreeGuide />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            
            {/* SEO Guide pages */}
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/bpc-157-complete-guide" element={<BPC157Guide />} />
            <Route path="/guides/peptides-fda-legal-status-2026" element={<FDALegalStatusGuide />} />
            <Route path="/guides/are-peptides-safe" element={<ArePeptidesSafeGuide />} />
            <Route path="/guides/bpc-157-vs-tb-500" element={<BPC157vsTB500Guide />} />
            
            {/* Protected routes - Dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/checklist" element={<ProtectedRoute><DashboardChecklist /></ProtectedRoute>} />
            <Route path="/dashboard/database" element={<ProtectedRoute><DashboardDatabase /></ProtectedRoute>} />
            <Route path="/dashboard/chat" element={<ProtectedRoute><DashboardChat /></ProtectedRoute>} />
            <Route path="/dashboard/digest" element={<ProtectedRoute><DashboardDigest /></ProtectedRoute>} />
            <Route path="/dashboard/community" element={<ProtectedRoute><DashboardCommunity /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />
            
            {/* Legacy protected routes - redirects to new dashboard */}
            <Route path="/chat" element={<ProtectedRoute><DashboardChat /></ProtectedRoute>} />
            <Route path="/news/:slug" element={<ProtectedRoute><NewsDetail /></ProtectedRoute>} />
            <Route path="/admin/generate" element={<AdminRoute><ArticleGenerator /></AdminRoute>} />
            <Route path="/admin/citations" element={<AdminRoute><CitationsDashboard /></AdminRoute>} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
