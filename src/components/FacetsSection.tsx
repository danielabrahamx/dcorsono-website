import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FacetsSection: React.FC = () => {
  const facets = [
    {
      id: 'corsono',
      title: 'Corsono',
      description: 'Quiet luxury clothing brand embodying the alchemy of style and consciousness.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
      ),
      links: [
        { to: '/corsono', text: 'Explore Collection' },
        { to: '/corsono-gallery', text: 'Photo Gallery' }
      ]
    },
    {
      id: 'inner-gallery',
      title: 'Inner Gallery',
      description: 'Original artwork and AI-generated videos exploring consciousness through visual expression.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      links: [
        { to: '/art-gallery', text: 'Enter Gallery' }
      ]
    },
    {
      id: 'inner-library',
      title: 'Inner Library',
      description: 'Ancient wisdom, consciousness studies, and creative philosophy from alchemy to modern insights.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      links: [
        { to: '/inner-library', text: 'Enter Library' }
      ]
    }
  ];

  return (
    <section className="facets-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">The Many Facets of Consciousness</h2>
          <p className="section-subtitle">
            Each aspect represents a different expression of the same underlying truth: 
            consciousness is not a thing, but an act.
          </p>
        </motion.div>
        
        <div className="facets-grid">
          {facets.map((facet, index) => (
            <motion.div
              key={facet.id}
              className="facet-card"
              data-facet={facet.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="facet-icon">
                {facet.icon}
              </div>
              <h3 className="facet-title">{facet.title}</h3>
              <p className="facet-description">
                {facet.description}
              </p>
              <div className="facet-links">
                {facet.links.map((link, linkIndex) => (
                  <Link key={linkIndex} to={link.to} className="facet-link">
                    {link.text}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacetsSection;
