import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
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
          <Link to="/" className="brand" style={{ textDecoration: 'none', color: 'gold', fontWeight: 700 }}>D'Corsono</Link>
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
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;


