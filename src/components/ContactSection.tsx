import React from 'react';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  return (
    <section className="contact-cta" id="contact">
      <div className="container">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="cta-title">Ready to Explore?</h2>
          <p className="cta-description">
            Whether you're interested in consciousness, clothing, creativity, or ancient wisdom, 
            there's a path here for you. Let's connect and explore together.
          </p>
          <motion.div 
            className="cta-actions"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href="#contact" className="btn btn-primary">Get in Touch</a>
            <a href="mailto:danielftabraham@outlook.com" className="btn btn-whatsapp">Email</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
