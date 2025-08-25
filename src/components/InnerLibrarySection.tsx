import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const InnerLibrarySection: React.FC = () => {
  const blogPosts = [
    {
      title: 'The Alchemy of Consciousness: Beyond Material Reality',
      excerpt: 'Exploring how ancient alchemical wisdom reveals consciousness as an active, dynamic force rather than a passive state of being.',
      categories: ['Occult Science', 'Consciousness'],
      image: 'Alchemy & Consciousness'
    },
    {
      title: 'Art as a Portal to Higher Consciousness',
      excerpt: 'How creative expression becomes a gateway to deeper awareness and spiritual understanding.',
      categories: ['Art & Creativity', 'Consciousness'],
      image: 'Consciousness & Art'
    }
  ];

  const wisdomCategories = [
    {
      title: 'Ancient Alchemy',
      description: 'Texts and insights from the alchemical tradition, exploring the transformation of consciousness'
    },
    {
      title: 'Gnostic Wisdom',
      description: 'Ancient knowledge about consciousness, reality, and spiritual awakening'
    },
    {
      title: 'Kemetic Science',
      description: 'Egyptian spiritual and scientific knowledge about consciousness and creation'
    },
    {
      title: 'Consciousness Studies',
      description: 'Modern explorations of awareness, meditation, and spiritual development'
    },
    {
      title: 'Creative Philosophy',
      description: 'The intersection of art, consciousness, and transformation'
    }
  ];

  return (
    <section id="inner-library" className="inner-library-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">The Inner Library</h2>
          <p className="section-subtitle">
            A repository of wisdom, insights, and explorations into consciousness, creativity, and the alchemy of being.
          </p>
        </motion.div>
        
        <div className="library-content">
          <div className="library-section">
            <motion.h3 
              className="library-section-title"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Latest Insights
            </motion.h3>
            <div className="blog-grid">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={index}
                  className="blog-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="blog-image">
                    <div className="image-placeholder">
                      <span>{post.image}</span>
                    </div>
                  </div>
                  <div className="blog-content">
                    <div className="blog-categories">
                      {post.categories.map((category, catIndex) => (
                        <span key={catIndex} className={`category ${category.toLowerCase().replace(/[^a-z]/g, '')}`}>
                          {category}
                        </span>
                      ))}
                    </div>
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="blog-excerpt">
                      {post.excerpt}
                    </p>
                    <Link to="/inner-library/blog" className="blog-link">Read More</Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
          
          <div className="library-section">
            <motion.h3 
              className="library-section-title"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Occult Science & Wisdom
            </motion.h3>
            <div className="wisdom-grid">
              {wisdomCategories.map((wisdom, index) => (
                <motion.div
                  key={index}
                  className="wisdom-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="wisdom-title">{wisdom.title}</h4>
                  <p className="wisdom-description">{wisdom.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div 
          className="library-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/inner-library" className="btn btn-primary">Enter the Library</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InnerLibrarySection;
