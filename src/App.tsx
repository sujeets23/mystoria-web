import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GrainOverlay } from './components/GrainOverlay';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './utils/ScrollToTop';
import { SmoothScroll } from './components/SmoothScroll';

import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { ServicesPage } from './pages/Services';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { AdminBlog } from './pages/AdminBlog';

const AppContent: React.FC = () => {
  const location = useLocation();
  // Is this an administrative secret route?
  const isAdminRoute =
    location.pathname.startsWith('/admin') || location.pathname.startsWith('/studio-admin');

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E5E5E5] flex flex-col selection:bg-crimson selection:text-white">
      {/* Subtle noise grain texture */}
      <GrainOverlay />

      {/* Custom cursor for desktop (disabled inside admin to ensure smooth text editing) */}
      {!isAdminRoute && <CustomCursor />}

      {/* Auto scroll restoration on route changes */}
      <ScrollToTop />

      {/* Floating / Sticky navigation (Hidden on secret admin dashboard) */}
      {!isAdminRoute && <Navbar />}

      {/* Main Routed Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Public Editorial Blog Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Hidden Admin Portal Routes (Not linked anywhere on website) */}
          <Route path="/admin" element={<AdminBlog />} />
          <Route path="/studio-admin" element={<AdminBlog />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Global studio footer (Hidden on secret admin dashboard) */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
    </Router>
  );
};

export default App;
