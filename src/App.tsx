import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GrainOverlay } from './components/GrainOverlay';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './utils/ScrollToTop';

import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { ServicesPage } from './pages/Services';
import { Contact } from './pages/Contact';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#050505] text-[#E5E5E5] flex flex-col selection:bg-crimson selection:text-white">
        {/* Subtle noise grain texture */}
        <GrainOverlay />

        {/* Custom cursor for desktop */}
        <CustomCursor />

        {/* Auto scroll restoration on route changes */}
        <ScrollToTop />

        {/* Floating / Sticky navigation */}
        <Navbar />

        {/* Main Routed Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Global studio footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
