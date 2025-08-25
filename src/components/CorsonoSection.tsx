import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CorsonoSection: React.FC = () => {
  const philosophyPoints = [
    {
      icon: '🌟',
      title: 'Conscious Craftsmanship',
      description: 'Every detail considered, every stitch intentional'
    },
    {
      icon: '⚡',
      title: 'Dynamic Energy',
      description: 'Clothing that moves with consciousness, not against it'
    },
    {
      icon: '🔮',
      title: 'Alchemical Design',
      description: 'Transforming base materials into expressions of awareness'
    }
  ];

  return (
    <>
      {/* Corsono Hero */}
      <section id="corsono" className="corsono-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              <span className="brand-name">Corsono</span>
              <span className="hero-subtitle">Quiet Luxury, Conscious Style</span>
            </h1>
            <p className="hero-description">
              Where consciousness meets craftsmanship. Each piece embodies the alchemy of style, 
              designed for those who understand that true luxury is an act of awareness.
            </p>
            <div className="hero-actions">
              <Link to="/corsono/collection" className="btn btn-primary">Explore Collection</Link>
              <Link to="/corsono-gallery" className="btn btn-secondary">Photo Gallery</Link>
              <Link to="/corsono/philosophy" className="btn btn-outline">Our Philosophy</Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="brand-symbol">
              <div className="symbol-circle"></div>
              <div className="symbol-accent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section" id="philosophy">
        <div className="container">
          <div className="philosophy-content">
            <motion.div 
              className="philosophy-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title">The Corsono Philosophy</h2>
              <p className="philosophy-description">
                Corsono represents more than clothing—it's a manifestation of consciousness in material form. 
                Each piece is crafted with intention, embodying the principle that consciousness is an act, 
                not a state of being.
              </p>
              <div className="philosophy-points">
                {philosophyPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className="philosophy-point"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="point-icon">{point.icon}</div>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="philosophy-visual"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="philosophy-image">
                <div className="image-placeholder">
                  <span>Consciousness in Motion</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collection Preview */}
      <section className="collection-section" id="collection">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">The Collection</h2>
            <p className="section-subtitle">
              Each piece is a statement of consciousness, designed for those who wear their awareness.
            </p>
          </motion.div>
          
          <div className="gallery-link-container">
            <h3>Behind the Scenes</h3>
            <p>Explore our photo gallery showcasing the craftsmanship and consciousness behind each Corsono piece.</p>
            <Link to="/corsono-gallery" className="btn btn-primary">View Photo Gallery</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CorsonoSection;
