import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CMSProvider } from "@/contexts/CMSContext";
import WelcomeAnimation from "@/components/WelcomeAnimation";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleAnimationComplete = () => {
    setShowWelcome(false);
    // Trigger content fade-in
    setTimeout(() => setContentVisible(true), 50);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CMSProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {showWelcome && <WelcomeAnimation onComplete={handleAnimationComplete} />}
          
          <div 
            className={`transition-opacity duration-700 ${
              contentVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </CMSProvider>
    </QueryClientProvider>
  );
};

export default App;
