import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const InnerGallerySection: React.FC = () => {
  const galleryCategories = [
    {
      title: 'Original Artwork',
      description: 'Hand-crafted pieces exploring themes of consciousness, transformation, and spiritual symbolism.',
      placeholder: 'Coming Soon'
    },
    {
      title: 'Imagination Cinema',
      description: 'AI-generated videos and visual experiences exploring the depths of creative consciousness.',
      placeholder: 'Coming Soon'
    }
  ];

  return (
    <section id="inner-gallery" className="inner-gallery-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Inner Gallery</h2>
          <p className="section-subtitle">
            A sacred space for original artwork and AI-generated videos exploring consciousness through visual expression.
          </p>
        </motion.div>
        
        <div className="gallery-grid">
          {galleryCategories.map((category, index) => (
            <motion.div
              key={index}
              className="gallery-category"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <h3 className="category-title">{category.title}</h3>
              <p className="category-description">
                {category.description}
              </p>
              <div className="gallery-preview">
                <div className="preview-placeholder">
                  <span>{category.placeholder}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="gallery-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/art-gallery" className="btn btn-primary">Enter Gallery</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InnerGallerySection;
