import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Gallery from './components/Gallery';
import './App.css';

const HomePage: React.FC = () => {
  return (
    <div className="home">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
        </motion.div>

        <div className="home-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/corsono-gallery" style={{ textDecoration: 'none' }}>
              <div className="home-card">
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📸</div>
                <h2>Corsono Gallery</h2>
                <p style={{ color: '#ccc' }}>
                  Fashion photography and behind-the-scenes moments from the Corsono brand
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/art-gallery" style={{ textDecoration: 'none' }}>
              <div className="home-card">
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎨</div>
                <h2>Art Gallery</h2>
                <p style={{ color: '#ccc' }}>
                  Original artwork and creative expressions exploring consciousness through visual art
                </p>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          style={{ marginTop: '64px', textAlign: 'center' }}
        >
          <p style={{ color: '#666', fontSize: '14px' }}>
            Modern React frontend with smooth animations and intuitive UX
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
      </Routes>
    </Router>
  );
};

export default App;