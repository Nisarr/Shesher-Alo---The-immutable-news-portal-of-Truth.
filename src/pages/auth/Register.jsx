import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMockData } from '../../providers/MockProvider';
import { Flame } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    license_number: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register } = useMockData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { confirmPassword, ...orgData } = formData;
    const res = register(orgData);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={styles.authContainer}>
      <div className="card" style={styles.authCard}>
        <div style={styles.logoRow}>
          <Flame size={32} color="var(--accent)" />
          <h2 style={{fontFamily: 'Playfair Display', marginBottom: 0}}>Register Organisation</h2>
        </div>
        
        {error && <div style={styles.errorMsg}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label className="label">Organisation Name</label>
            <input type="text" name="name" required className="input-field" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Press License Number</label>
            <input type="text" name="license_number" required className="input-field" value={formData.license_number} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Official Email</label>
            <input type="email" name="email" required className="input-field" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" name="password" required className="input-field" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Confirm Password</label>
            <input type="password" name="confirmPassword" required className="input-field" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Register Organisation
          </button>
        </form>

        <div style={styles.footerLinks}>
          <p>Already registered? <Link to="/login" style={{color: 'var(--accent)', fontWeight: 600}}>Login here</Link></p>
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
    maxWidth: '550px',
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

export default Register;
