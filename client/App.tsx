import "./global.css";

import { Toaster } from "@/components/ui/toaster";

// TypeScript declaration for HMR root tracking
declare global {
  interface Window {
    __reactRoot?: any;
  }
}
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Flights from "./pages/Flights";
import Trains from "./pages/Trains";
import Cabs from "./pages/Cabs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Placeholder page component
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-slate-50 pt-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
        <p className="text-lg text-slate-600">
          This page is coming soon. Our AI travel assistant is working on it!
        </p>
      </div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/how-it-works"
                element={<PlaceholderPage title="How It Works" />}
              />
              <Route path="/flights" element={<Flights />} />
              <Route path="/trains" element={<Trains />} />
              <Route
                path="/hotels"
                element={<PlaceholderPage title="Book Hotels" />}
              />
              <Route path="/cabs" element={<Cabs />} />
              <Route
                path="/bookings"
                element={<PlaceholderPage title="My Bookings" />}
              />
              <Route
                path="/about"
                element={<PlaceholderPage title="About Us" />}
              />
              <Route
                path="/contact"
                element={<PlaceholderPage title="Contact Us" />}
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Create root only once and handle hot module replacement
let root: any;
const rootElement = document.getElementById("root")!;

if (import.meta.hot) {
  // Development mode with HMR
  if (!window.__reactRoot) {
    window.__reactRoot = createRoot(rootElement);
  }
  root = window.__reactRoot;
} else {
  // Production mode
  root = createRoot(rootElement);
}

root.render(<App />);
