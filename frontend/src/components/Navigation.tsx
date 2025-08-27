import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from './auth/AdminAuth';

const Navigation: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const links = [
    { to: '/', label: 'Home' },
    { to: '/corsono', label: 'Corsono' },
    { to: '/corsono-gallery', label: 'Gallery' },
    { to: '/art-gallery', label: 'Art' },
    { to: '/inner-library', label: 'Inner Library' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content" style={{ gap: 16 }}>
          <Link to="/" className="brand" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/images/logo.png?v=1" 
              alt="D'Corsono Logo" 
              style={{ 
                height: '40px', 
                width: 'auto',
                filter: 'brightness(1.1)',
                transition: 'all 0.3s ease',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.filter = 'brightness(1.3) drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'brightness(1.1)';
              }}
              onError={(e) => {
                console.error('Logo failed to load:', e.currentTarget.src);
                // Fallback to text if image fails
                e.currentTarget.style.display = 'none';
                const fallbackText = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallbackText && fallbackText.style) {
                  fallbackText.style.marginLeft = '0';
                }
              }}
              onLoad={(e) => {
                console.log('Logo loaded successfully:', e.currentTarget.src);
              }}
            />
            
          </Link>
          
          {/* Mobile Navigation Toggle */}
          <button 
            className="mobile-nav-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile navigation menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="nav desktop-nav">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => isActive ? 'active' : undefined}
                style={{ marginRight: 16 }}
              >
                {l.label}
              </NavLink>
            ))}
            
            {/* Admin links - only visible when authenticated */}
            {isAuthenticated && (
              <>
                <NavLink
                  to="/admin/products"
                  className={({ isActive }) => isActive ? 'active' : undefined}
                  style={{ 
                    marginRight: 16,
                    color: 'var(--color-gold)',
                    fontSize: '0.9rem'
                  }}
                >
                  🔧 Admin
                </NavLink>
                <button
                  onClick={logout}
                  style={{
                    background: 'rgba(255, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 0, 0, 0.3)',
                    color: '#ff6b6b',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 0, 0, 0.1)';
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </nav>
          
          {/* Mobile Navigation Menu */}
          <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <nav className="nav mobile-nav">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) => isActive ? 'active' : undefined}
                  onClick={closeMobileMenu}
                >
                  {l.label}
                </NavLink>
              ))}
              
              {/* Admin links - only visible when authenticated */}
              {isAuthenticated && (
                <>
                  <NavLink
                    to="/admin/products"
                    className={({ isActive }) => isActive ? 'active' : undefined}
                    onClick={closeMobileMenu}
                    style={{ 
                      color: 'var(--color-gold)',
                      fontSize: '0.9rem'
                    }}
                  >
                    🔧 Admin
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    style={{
                      background: 'rgba(255, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 0, 0, 0.3)',
                      color: '#ff6b6b',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      width: '100%',
                      marginTop: '8px'
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;


