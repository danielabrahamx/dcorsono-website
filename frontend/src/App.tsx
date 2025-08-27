import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Gallery from './components/Gallery';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CorsonoShop from './components/shop/CorsonoShop';
import Placeholder from './components/pages/Placeholder';
import ProductAdmin from './components/admin/ProductAdmin';
import { AuthProvider } from './components/auth/AdminAuth';
import './App.css';
import './mobile-optimization.css';

const HomePage: React.FC = () => {
  return (
    <div className="home">
      <div className="container">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            D'Corsono
          </motion.h1>

          
        </motion.div>

        {/* Primary CTA - Corsono Shop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ marginBottom: '64px' }}
        >
          <Link to="/corsono" style={{ textDecoration: 'none' }}>
            <div className="home-card featured-shop" style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(255, 215, 0, 0.1))',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              padding: '32px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                <img 
                  src="/images/logo.png" 
                  alt="D'Corsono Logo" 
                  style={{ 
                    height: '60px', 
                    width: 'auto',
                    filter: 'brightness(1.2) drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-gold)', marginBottom: '16px' }}>
                Golden Dawn Collection
              </h2>
              
                             <div className="liquid-glass-button">
                 Shop Collection →
               </div>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(212, 175, 55, 0.2)',
                color: 'var(--color-gold)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                NEW
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Secondary Grid - Galleries */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          style={{ marginBottom: '32px' }}
        >
          
        </motion.div>

        <div className="home-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/corsono-gallery" style={{ textDecoration: 'none' }}>
              <div className="home-card liquid-glass">
                <h2>Gallery</h2>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/art-gallery" style={{ textDecoration: 'none' }}>
              <div className="home-card liquid-glass">
                <h2>Art</h2>
              </div>
            </Link>
          </motion.div>
        </div>

        
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/corsono" element={<CorsonoShop />} />
          <Route 
            path="/corsono-gallery" 
            element={
              <Gallery
                apiEndpoint="/api/corsono/gallery"
                uploadEndpoint="/api/corsono/gallery/upload"
                title="Gallery"
                aspectRatio="wide"
              />
            } 
          />
          <Route 
            path="/art-gallery" 
            element={
              <Gallery
                apiEndpoint="/api/art/gallery"
                uploadEndpoint="/api/art/gallery/upload"
                title="Art"
                aspectRatio="square"
              />
            } 
          />
          <Route path="/inner-library" element={<Placeholder title="Inner Library" description="Coming soon" />} />
          <Route path="/about" element={<Placeholder title="About" description="Coming soon" />} />
          <Route path="/contact" element={<Placeholder title="Contact" description="Coming soon" />} />
          <Route path="/admin/products" element={<ProductAdmin />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;