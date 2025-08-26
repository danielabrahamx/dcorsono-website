import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  function isValidEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    setMessage('Thank you for subscribing!');
    setEmail('');
  }

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">D'Corsono</h3>
          <p className="footer-description">
            Where consciousness meets creativity. A journey through clothing, technology, wisdom, and mastery.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Brands</h4>
          <ul className="footer-links">
            <li><Link to="/corsono">Corsono Clothing</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Explore</h4>
          <ul className="footer-links">
            <li><Link to="/art-gallery">Inner Gallery</Link></li>
            <li><Link to="/inner-library">Inner Library</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Connect</h4>
          <ul className="footer-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="mailto:danielftabraham@outlook.com">Email</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Newsletter</h4>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
          {message && (
            <div role="status" aria-live="polite" style={{ marginTop: 8, color: '#ccc' }}>{message}</div>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2024 D'Corsono. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


