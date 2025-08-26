import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion } from 'framer-motion';

// Simple auth context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Simple password-based auth (you should use environment variables in production)
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'dcorsono2024!';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('dcorsono_admin_auth');
    if (authToken === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('dcorsono_admin_auth', 'authenticated');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('dcorsono_admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (login(password)) {
      onLogin();
    } else {
      setError('Invalid password. Access denied.');
      setPassword('');
    }
    setIsLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, rgba(20, 20, 30, 0.95), rgba(0, 0, 0, 0.98))'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '40px 20px',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px',
            marginBottom: '8px'
          }}>
            <img 
              src="/images/logo.png" 
              alt="D'Corsono" 
              style={{ 
                height: '40px', 
                width: 'auto',
                filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(255, 215, 0, 0.4))'
              }}
            />
            <h1 style={{
              color: 'var(--color-gold)',
              fontFamily: 'var(--font-magical)',
              fontSize: '2rem',
              margin: 0,
              textShadow: '0 0 20px rgba(255, 215, 0, 0.4)'
            }}>
              Admin Access
            </h1>
          </div>
          <p style={{ color: '#bbb', marginBottom: '32px' }}>
            Protected area - Enter password to continue
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              required
              style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem',
                marginBottom: '24px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(255, 215, 0, 0.5)';
                e.target.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                color: '#ff6b6b',
                background: 'rgba(255, 107, 107, 0.1)',
                border: '1px solid rgba(255, 107, 107, 0.3)',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '16px',
                fontSize: '0.9rem'
              }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '16px',
              background: isLoading 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'linear-gradient(90deg, var(--color-gold), #fff)',
              color: isLoading ? '#999' : '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? '🔓 Authenticating...' : '🚀 Access Admin'}
          </motion.button>
        </form>

        <p style={{ 
          color: '#666', 
          fontSize: '0.8rem', 
          marginTop: '24px',
          lineHeight: '1.4'
        }}>
          This admin area is protected to ensure only authorized users can upload images and manage content.
        </p>
      </motion.div>
    </div>
  );
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(!isAuthenticated);

  useEffect(() => {
    setShowLogin(!isAuthenticated);
  }, [isAuthenticated]);

  if (showLogin) {
    return <AdminLogin onLogin={() => setShowLogin(false)} />;
  }

  return <>{children}</>;
};
