import React from 'react';
import { Link } from 'react-router-dom';

const CorsonoPage: React.FC = () => {
  return (
    <div>
      <section className="corsono-hero" style={{ paddingTop: 80 }}>
        <div className="hero-background"><div className="hero-overlay" /></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="brand-name">Corsono</span>
                <span className="hero-subtitle">Quiet Luxury, Conscious Style</span>
              </h1>
              <p className="hero-description">Where consciousness meets craftsmanship. Each piece embodies the alchemy of style, designed for those who understand that true luxury is an act of awareness.</p>
              <div className="hero-actions">
                <a href="#collection" className="btn btn-primary">Explore Collection</a>
                <Link to="/corsono-gallery" className="btn btn-secondary">Photo Gallery</Link>
                <a href="#philosophy" className="btn btn-outline">Our Philosophy</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="collection" className="collection-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The Collection</h2>
            <p className="section-subtitle">Each piece is a statement of consciousness.</p>
          </div>
          <div className="gallery-link-container" style={{ textAlign: 'center', marginTop: 40, padding: '40px 0', borderTop: '1px solid rgba(255,215,0,0.2)' }}>
            <h3 style={{ color: '#FFD700', marginBottom: 16 }}>Behind the Scenes</h3>
            <p style={{ color: '#ccc', marginBottom: 24 }}>Explore our photo gallery showcasing the craftsmanship behind Corsono.</p>
            <Link to="/corsono-gallery" className="btn btn-primary">View Photo Gallery</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorsonoPage;


