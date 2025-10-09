import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const InnerLibrary: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Wisdom for Healing from Trauma',
      publishedAt: '09/10/2025'
    }
  ];

  return (
    <div className="inner-library-page">
      <main className="main-content">
        <section id="inner-library" className="inner-library-section">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="section-title">The Inner Library</h1>
            </motion.div>

            <div className="library-content">
              <div className="blog-list">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="blog-list-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link to={`/inner-library/blog/${post.id}`} className="blog-list-link">
                      {post.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InnerLibrary;