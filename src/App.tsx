import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Core pages
import Index from "./pages/Index";
import Matrix from "./pages/Matrix";
import Readme from "./pages/Readme";

// Consolidated issue pages
import Automated from "./pages/Automated";
import Guided from "./pages/Guided";
import Manual from "./pages/Manual";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Core Pages */}
          <Route path="/" element={<Index />} />
          <Route path="/matrix" element={<Matrix />} />
          <Route path="/readme" element={<Readme />} />

          {/* Consolidated Issue Pages */}
          <Route path="/automated" element={<Automated />} />
          <Route path="/guided" element={<Guided />} />
          <Route path="/manual" element={<Manual />} />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
