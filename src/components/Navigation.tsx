import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/corsono', label: 'Corsono' },
    { to: '/art-gallery', label: 'Inner Gallery' },
    { to: '/inner-library', label: 'Inner Library' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-logo">
            <span className="brand-text">D'Corsono</span>
          </Link>
        </div>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`} id="nav-menu">
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.to}
                className="nav-item"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link 
                  to={item.to} 
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="nav-actions">
          <button 
            className={`nav-toggle ${isOpen ? 'active' : ''}`}
            id="nav-toggle" 
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="hamburger"></span>
          </button>
          <Link to="/cart" className="cart-icon" aria-label="Shopping cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              <path d="M20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="cart-count" id="cart-count">0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
