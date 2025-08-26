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
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ fontSize: '1.25rem', color: '#ccc', marginBottom: '32px' }}
          >
            Where Consciousness Meets Creativity
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ fontSize: '1rem', color: '#999', maxWidth: '600px', margin: '0 auto 40px' }}
          >
            Discover the Golden Dawn collection - luxury streetwear that embodies conscious intention and spiritual elegance
          </motion.p>
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
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>👑</div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-gold)', marginBottom: '16px' }}>
                Golden Dawn Collection
              </h2>
              <p style={{ color: '#ccc', fontSize: '1.1rem', marginBottom: '24px' }}>
                Premium hoodies, tracksuit bottoms, and exclusive bundle sets. Conscious luxury for the awakened soul.
              </p>
              <div style={{
                background: 'linear-gradient(90deg, var(--color-gold), #fff)',
                color: '#000',
                padding: '12px 32px',
                borderRadius: '25px',
                display: 'inline-block',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
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
          <h3 style={{ 
            textAlign: 'center', 
            color: 'var(--color-gold)', 
            marginBottom: '32px',
            fontSize: '1.5rem'
          }}>
            Explore Our Creative Universe
          </h3>
        </motion.div>

        <div className="home-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/corsono-gallery" style={{ textDecoration: 'none' }}>
              <div className="home-card">
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📸</div>
                <h2>Corsono Gallery</h2>
                <p style={{ color: '#ccc' }}>
                  Behind-the-scenes moments and fashion photography showcasing the Corsono aesthetic
                </p>
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
              <div className="home-card">
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎨</div>
                <h2>Art Gallery</h2>
                <p style={{ color: '#ccc' }}>
                  Original visual art exploring consciousness, spirituality, and creative expression
                </p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Brand Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          style={{ 
            marginTop: '64px', 
            textAlign: 'center',
            padding: '32px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <p style={{ 
            color: '#bbb', 
            fontSize: '1rem',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Every piece in our collection is crafted with intention. From the Golden Dawn luxury streetwear to our artistic expressions, 
            we believe in creating with consciousness and wearing with purpose.
          </p>
        </motion.div>
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
                title="Corsono Gallery"
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
                title="Art Gallery"
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