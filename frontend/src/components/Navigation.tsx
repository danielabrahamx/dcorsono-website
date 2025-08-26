import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from './auth/AdminAuth';

const Navigation: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  
  const links = [
    { to: '/', label: 'Home' },
    { to: '/corsono', label: 'Corsono' },
    { to: '/corsono-gallery', label: 'Photo Gallery' },
    { to: '/art-gallery', label: 'Art Gallery' },
    { to: '/inner-library', label: 'Inner Library' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content" style={{ gap: 16 }}>
          <Link to="/" className="brand" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/images/logo.png" 
              alt="D'Corsono Logo" 
              style={{ 
                height: '40px', 
                width: 'auto',
                filter: 'brightness(1.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.filter = 'brightness(1.3) drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'brightness(1.1)';
              }}
            />
            <span style={{ 
              color: 'gold', 
              fontWeight: 700,
              fontFamily: 'var(--font-magical)',
              fontSize: '1.2rem',
              textShadow: '0 0 10px rgba(255, 215, 0, 0.4)'
            }}>
              D'Corsono
            </span>
          </Link>
          <nav className="nav">
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
        </div>
      </div>
    </header>
  );
};

export default Navigation;


