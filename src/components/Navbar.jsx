import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../providers/ThemeProvider';
import { useMockData } from '../providers/MockProvider';
import { Flame, Moon, Sun, LogOut } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useMockData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.navContainer}>
        {/* Logo Area */}
        <Link to="/" style={styles.logoArea}>
          <Flame size={28} color="var(--accent)" />
          <div>
            <h1 style={styles.logoTitle}>শেষের আলো</h1>
          </div>
        </Link>

        {/* Links Area */}
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>News Feed</Link>
          {user ? (
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} style={styles.link}>
              Dashboard
            </Link>
          ) : (
            <Link to="/about" style={styles.link}>About Us</Link>
          )}
        </div>

        {/* Actions Area */}
        <div style={styles.actions}>
          <button onClick={toggleTheme} style={styles.iconBtn} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {user ? (
            <div style={styles.userMenu}>
              <span style={styles.userName}>{user.name}</span>
              <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem' }}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem' }}>
              Publisher Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'var(--bg)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '4rem',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoTitle: {
    fontSize: '1.5rem',
    marginBottom: 0,
    color: 'var(--text-primary)',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  iconBtn: {
    color: 'var(--text-primary)',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userName: {
    fontWeight: 600,
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  }
};

export default Navbar;
