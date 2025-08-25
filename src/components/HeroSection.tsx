import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles
    if (particlesRef.current) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particlesRef.current.appendChild(particle);
      }
    }
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-particles" ref={particlesRef}></div>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-title-line">D'Corsono</span>
            <span className="hero-subtitle">Where Consciousness Meets Creativity</span>
          </motion.h1>
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A journey through the alchemy of being, where ancient wisdom meets modern innovation, 
            and every act is an expression of conscious awareness.
          </motion.p>
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/corsono" className="btn btn-primary">Explore Corsono</Link>
            <Link to="/corsono-gallery" className="btn btn-secondary">Photo Gallery</Link>
            <Link to="/art-gallery" className="btn btn-outline">Inner Gallery</Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="consciousness-symbol">
            <div className="symbol-ring outer"></div>
            <div className="symbol-ring middle"></div>
            <div className="symbol-ring inner"></div>
            <div className="symbol-center"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
