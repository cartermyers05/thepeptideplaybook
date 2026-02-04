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
import DashboardProtocol from "./pages/dashboard/Protocol";
import DashboardCoach from "./pages/dashboard/Coach";
import DashboardProgress from "./pages/dashboard/Progress";
import CourseLessons from "./pages/dashboard/CourseLessons";
import MyPlan from "./pages/dashboard/MyPlan";
import CoursePreview from "./pages/CoursePreview";

// SEO Guide pages
import Guides from "./pages/Guides";
import BPC157Guide from "./pages/guides/BPC157Guide";
import FDALegalStatusGuide from "./pages/guides/FDALegalStatusGuide";
import ArePeptidesSafeGuide from "./pages/guides/ArePeptidesSafeGuide";
import BPC157vsTB500Guide from "./pages/guides/BPC157vsTB500Guide";
import SemaglutideGuide from "./pages/guides/SemaglutideGuide";
import TirzepatideVsSemaglutideGuide from "./pages/guides/TirzepatideVsSemaglutideGuide";
import GrowthHormonePeptidesGuide from "./pages/guides/GrowthHormonePeptidesGuide";
import BPC157CancerRisk from "./pages/guides/BPC157CancerRisk";
import BPC157DrugTest from "./pages/guides/BPC157DrugTest";
import BPC157InfectionRisk from "./pages/guides/BPC157InfectionRisk";
import TB500SideEffects from "./pages/guides/TB500SideEffects";
import CJC1295Safety from "./pages/guides/CJC1295Safety";
import VerifyPeptideCOA from "./pages/guides/VerifyPeptideCOA";
import PeptideContamination from "./pages/guides/PeptideContamination";
import PeptideTikTokMyths from "./pages/guides/PeptideTikTokMyths";

// Trust signal pages
import EditorialPolicy from "./pages/EditorialPolicy";
import Partners from "./pages/Partners";
import ReferralLanding from "./pages/ReferralLanding";

// Quiz pages
import Quiz from "./pages/Quiz";
import QuizResults from "./pages/QuizResults";

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
            <Route path="/guides/semaglutide-complete-guide" element={<SemaglutideGuide />} />
            <Route path="/guides/tirzepatide-vs-semaglutide" element={<TirzepatideVsSemaglutideGuide />} />
            <Route path="/guides/growth-hormone-peptides-guide" element={<GrowthHormonePeptidesGuide />} />
            <Route path="/guides/bpc-157-cancer-risk" element={<BPC157CancerRisk />} />
            <Route path="/guides/bpc-157-drug-test" element={<BPC157DrugTest />} />
            <Route path="/guides/bpc-157-infection-risk" element={<BPC157InfectionRisk />} />
            <Route path="/guides/tb-500-side-effects" element={<TB500SideEffects />} />
            <Route path="/guides/cjc-1295-safety" element={<CJC1295Safety />} />
            <Route path="/guides/verify-peptide-coa" element={<VerifyPeptideCOA />} />
            <Route path="/guides/peptide-contamination" element={<PeptideContamination />} />
            <Route path="/guides/peptide-tiktok-myths" element={<PeptideTikTokMyths />} />
            
            {/* Trust signal pages */}
            <Route path="/editorial-policy" element={<EditorialPolicy />} />
            <Route path="/partners" element={<Partners />} />
            
            {/* Quiz flow */}
            <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
            <Route path="/quiz/results" element={<QuizResults />} />
            
            {/* Course preview (pre-purchase) */}
            <Route path="/course/:goal" element={<CoursePreview />} />
            
            {/* Referral link handler */}
            <Route path="/ref/:code" element={<ReferralLanding />} />
            
            {/* Protected routes - Dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/course" element={<ProtectedRoute><CourseLessons /></ProtectedRoute>} />
            <Route path="/dashboard/plan" element={<ProtectedRoute><MyPlan /></ProtectedRoute>} />
            <Route path="/dashboard/protocol" element={<ProtectedRoute><MyPlan /></ProtectedRoute>} />
            <Route path="/dashboard/coach" element={<ProtectedRoute><DashboardCoach /></ProtectedRoute>} />
            <Route path="/dashboard/progress" element={<ProtectedRoute><DashboardProgress /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />
            
            {/* Legacy routes kept for backwards compatibility */}
            <Route path="/dashboard/checklist" element={<ProtectedRoute><DashboardChecklist /></ProtectedRoute>} />
            <Route path="/dashboard/database" element={<ProtectedRoute><DashboardDatabase /></ProtectedRoute>} />
            <Route path="/dashboard/chat" element={<ProtectedRoute><DashboardChat /></ProtectedRoute>} />
            <Route path="/dashboard/digest" element={<ProtectedRoute><DashboardDigest /></ProtectedRoute>} />
            <Route path="/dashboard/community" element={<ProtectedRoute><DashboardCommunity /></ProtectedRoute>} />
            
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
