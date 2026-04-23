import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMockData } from '../../providers/MockProvider';
import { Flame } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useMockData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const res = login(email, password, false);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="container" style={styles.authContainer}>
      <div className="card" style={styles.authCard}>
        <div style={styles.logoRow}>
          <Flame size={32} color="var(--accent)" />
          <h2 style={{fontFamily: 'Playfair Display', marginBottom: 0}}>Publisher Login</h2>
        </div>
        
        {error && <div style={styles.errorMsg}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label className="label">Official Email</label>
            <input 
              type="email" 
              required 
              className="input-field" 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input 
              type="password" 
              required 
              className="input-field" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Login to Dashboard
          </button>
        </form>

        <div style={styles.footerLinks}>
          <p>New organisation? <Link to="/register" style={{color: 'var(--accent)', fontWeight: 600}}>Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  authContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 4rem - 200px)',
    padding: '2rem 1rem',
  },
  authCard: {
    width: '100%',
    maxWidth: '450px',
  },
  logoRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  errorMsg: {
    backgroundColor: 'rgba(198, 40, 40, 0.1)',
    color: 'var(--error)',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1.25rem',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  footerLinks: {
    marginTop: '2rem',
    textAlign: 'center',
    fontSize: '0.95rem',
  }
};

export default Login;
