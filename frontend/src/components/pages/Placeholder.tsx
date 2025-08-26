import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  description?: string;
}

const Placeholder: React.FC<Props> = ({ title, description }) => {
  // Special handling for contact page
  if (title === 'Contact') {
    return (
      <div style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            maxWidth: '500px',
            background: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '48px 32px',
            border: '1px solid rgba(255, 215, 0, 0.15)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ marginBottom: '32px' }}
          >
            <img 
              src="/images/logo.png" 
              alt="D'Corsono Logo" 
              style={{ 
                height: '60px', 
                width: 'auto',
                filter: 'brightness(1.2) drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))',
                marginBottom: '24px'
              }}
            />
          </motion.div>
          

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ marginBottom: '32px' }}
          >
            <div style={{
              background: 'rgba(255, 215, 0, 0.08)',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              marginBottom: '24px'
            }}>
              <h3 style={{ 
                color: 'var(--color-gold)', 
                marginBottom: '16px',
                fontSize: '1.3rem',
                fontWeight: '500'
              }}>
                Instagram
              </h3>
              <a 
                href="https://instagram.com/dannyabrhm" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#fff',
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  padding: '12px 24px',
                  background: 'rgba(255, 215, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  display: 'inline-block',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 215, 0, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 215, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                }}
              >
                @dannyabrhm
              </a>
            </div>
            
            <div style={{
              background: 'rgba(255, 215, 0, 0.08)',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid rgba(255, 215, 0, 0.2)'
            }}>
              <h3 style={{ 
                color: 'var(--color-gold)', 
                marginBottom: '16px',
                fontSize: '1.3rem',
                fontWeight: '500'
              }}>
                Email
              </h3>
              <a 
                href="mailto:danielftabraham@outlook.com"
                style={{
                  color: '#fff',
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  padding: '12px 24px',
                  background: 'rgba(255, 215, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  display: 'inline-block',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 215, 0, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 215, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                }}
              >
                danielftabraham@outlook.com
              </a>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ 
              color: '#999', 
              fontSize: '0.9rem',
              fontStyle: 'italic',
              margin: 0
            }}
          >
            Looking forward to connecting with you
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Default placeholder for other pages
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'gold', marginBottom: 12 }}>{title}</h1>
        {description && <p style={{ color: '#bbb' }}>{description}</p>}
      </div>
    </div>
  );
};

export default Placeholder;


