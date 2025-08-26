import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3>D'Corsono</h3>

          </div>
          <div>
            <h4>Explore</h4>
            <ul className="footer-links">
              <li><Link to="/corsono">Corsono</Link></li>
              <li><Link to="/corsono-gallery">Gallery</Link></li>
              <li><Link to="/art-gallery">Art Gallery</Link></li>
              <li><Link to="/inner-library">Inner Library</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 D'Corsono</span>
          <div className="footer-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


