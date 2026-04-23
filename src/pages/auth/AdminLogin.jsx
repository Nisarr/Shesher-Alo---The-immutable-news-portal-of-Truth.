import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../../providers/MockProvider';
import { ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useMockData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // login(email, password, isAdmin)
    const res = login(email, password, true);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="container" style={styles.authContainer}>
      <div className="card" style={styles.authCard}>
        <div style={styles.headerBar}>
          <ShieldCheck size={32} color="white" />
          <h2 style={{fontFamily: 'Playfair Display', marginBottom: 0, color: 'white'}}>Admin Area</h2>
        </div>
        
        <div style={{ padding: '2rem' }}>
          {error && <div style={styles.errorMsg}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div>
              <label className="label">Admin Email</label>
              <input 
                type="email" 
                required 
                className="input-field" 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Master Password</label>
              <input 
                type="password" 
                required 
                className="input-field" 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {/* Darker button for Admin */}
            <button type="submit" style={styles.adminBtn}>
              Admin Login
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Strictly for authorized editors only.
          </div>
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
    padding: '4rem 1rem',
  },
  authCard: {
    width: '100%',
    maxWidth: '450px',
    padding: 0, // override default card padding to make edge-to-edge header
    overflow: 'hidden',
  },
  headerBar: {
    backgroundColor: '#1A1A2E',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  adminBtn: {
    backgroundColor: '#1A1A2E',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: 600,
    width: '100%',
    marginTop: '1rem',
  },
  errorMsg: {
    backgroundColor: 'rgba(198, 40, 40, 0.1)',
    color: 'var(--error)',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1.25rem',
    fontSize: '0.9rem',
    textAlign: 'center',
  }
};

export default AdminLogin;
