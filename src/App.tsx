import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Spine } from "@/components/site/ThreadLine";
import { ScrollToTop, PageShell } from "@/components/site/PageShell";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/config/site";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-brand-paper font-body text-brand-ink">
      <ScrollProgress />
      <Spine />
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageShell><Home /></PageShell>} />
          <Route path="/about" element={<PageShell><About /></PageShell>} />
          <Route
            path="/services"
            element={
              site.nav.find((item) => item.path === "/services")?.enabled
                ? <PageShell><Services /></PageShell>
                : <Navigate to="/" replace />
            }
          />
          <Route path="/gallery" element={<PageShell><Gallery /></PageShell>} />
          <Route
            path="/contact"
            element={
              site.nav.find((item) => item.path === "/contact")?.enabled
                ? <PageShell><Contact /></PageShell>
                : <Navigate to="/" replace />
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
