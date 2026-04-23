import React from 'react';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.grid}>
          <div>
            <div style={styles.logoArea}>
              <Flame size={24} color="var(--accent)" />
              <h2 style={styles.logoTitle}>শেষের আলো</h2>
            </div>
            <p style={styles.tagline}>Stand Against Yellow Journalism</p>
            <p style={styles.copyright}>&copy; {new Date().getFullYear()} শেষের আলো. All rights reserved.</p>
          </div>
          
          <div style={styles.linkGroup}>
            <h4 style={styles.groupTitle}>Platform</h4>
            <Link to="/" style={styles.link}>News Feed</Link>
            <Link to="/about" style={styles.link}>About Us</Link>
            <Link to="/register" style={styles.link}>Register Organisation</Link>
          </div>

          <div style={styles.linkGroup}>
            <h4 style={styles.groupTitle}>Legal</h4>
            <Link to="#" style={styles.link}>Terms of Service</Link>
            <Link to="#" style={styles.link}>Privacy Policy</Link>
            <Link to="/admin/login" style={styles.link}>Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'var(--card-bg)',
    borderTop: '1px solid var(--border)',
    padding: '4rem 0 2rem',
    marginTop: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  logoTitle: {
    fontSize: '1.25rem',
    marginBottom: 0,
    color: 'var(--text-primary)',
  },
  tagline: {
    color: 'var(--text-secondary)',
    marginBottom: '1rem',
    fontStyle: 'italic',
  },
  copyright: {
    color: 'var(--text-secondary)',
    fontSize: '0.875rem',
  },
  linkGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  groupTitle: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    color: 'var(--text-primary)',
  },
  link: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
  }
};

export default Footer;
