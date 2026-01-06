import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Core pages
import Index from "./pages/Index";
import Matrix from "./pages/Matrix";
import Readme from "./pages/Readme";

// Automated issue pages
import AutomatedForms from "./pages/automated/Forms";
import AutomatedStructure from "./pages/automated/Structure";
import AutomatedMedia from "./pages/automated/Media";
import AutomatedColorContrast from "./pages/automated/ColorContrast";
import AutomatedAriaMisuse from "./pages/automated/AriaMisuse";

// Guided issue pages
import GuidedKeyboardFocus from "./pages/guided/KeyboardFocus";
import GuidedModalsDynamic from "./pages/guided/ModalsDynamic";
import GuidedNavigationLinks from "./pages/guided/NavigationLinks";
import GuidedErrorsFeedback from "./pages/guided/ErrorsFeedback";

// Manual issue pages
import ManualMeaningfulSequence from "./pages/manual/MeaningfulSequence";
import ManualInstructionsSensory from "./pages/manual/InstructionsSensory";
import ManualReadingLanguage from "./pages/manual/ReadingLanguage";
import ManualCognitiveLoad from "./pages/manual/CognitiveLoad";
import ManualCaptionsQuality from "./pages/manual/CaptionsQuality";

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

          {/* Automated Issue Pages */}
          <Route path="/automated/forms" element={<AutomatedForms />} />
          <Route path="/automated/structure" element={<AutomatedStructure />} />
          <Route path="/automated/media" element={<AutomatedMedia />} />
          <Route path="/automated/color-contrast" element={<AutomatedColorContrast />} />
          <Route path="/automated/aria-misuse" element={<AutomatedAriaMisuse />} />

          {/* Guided Issue Pages */}
          <Route path="/guided/keyboard-focus" element={<GuidedKeyboardFocus />} />
          <Route path="/guided/modals-dynamic" element={<GuidedModalsDynamic />} />
          <Route path="/guided/navigation-links" element={<GuidedNavigationLinks />} />
          <Route path="/guided/errors-feedback" element={<GuidedErrorsFeedback />} />

          {/* Manual Issue Pages */}
          <Route path="/manual/meaningful-sequence" element={<ManualMeaningfulSequence />} />
          <Route path="/manual/instructions-sensory" element={<ManualInstructionsSensory />} />
          <Route path="/manual/reading-language" element={<ManualReadingLanguage />} />
          <Route path="/manual/cognitive-load" element={<ManualCognitiveLoad />} />
          <Route path="/manual/captions-quality" element={<ManualCaptionsQuality />} />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
