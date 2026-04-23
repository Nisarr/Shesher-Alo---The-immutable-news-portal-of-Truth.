import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, AlertTriangle, XCircle } from 'lucide-react';

const ArticleCard = ({ article }) => {
  const dateStr = new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  const getCredibilityBadge = (score) => {
    if (score >= 90) return { label: 'Verified Source', color: 'var(--success)', icon: <ShieldCheck size={14} /> };
    if (score >= 70) return { label: 'Exercise Caution', color: 'var(--warning)', icon: <AlertTriangle size={14} /> };
    return { label: 'Low Credibility', color: 'var(--error)', icon: <XCircle size={14} /> };
  };

  const cred = getCredibilityBadge(article.credibility_score);

  return (
    <Link to={`/article/${article.id}`} style={styles.cardLink}>
      <div className="card" style={styles.cardWrapper}>
        <div style={styles.metaTop}>
          <span className="badge badge-info">{article.category}</span>
          <span style={styles.date}>{dateStr}</span>
        </div>
        
        <h3 style={styles.headline} className="bn-text">{article.headline}</h3>
        
        <div style={styles.orgInfo}>
          <span style={styles.orgName}>{article.organizations?.name || article.org_name}</span>
          <span style={{ ...styles.credBadge, color: cred.color }}>
            {cred.icon}
            {cred.label} ({article.credibility_score})
          </span>
        </div>
        
        <div style={styles.immutableBanner}>
          <Lock size={12} />
          <span>Immutable Record</span>
        </div>
      </div>
    </Link>
  );
};

const styles = {
  cardLink: {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    height: '100%',
  },
  cardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    paddingBottom: '2.5rem', // space for immutable banner
  },
  metaTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  date: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  headline: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    flexGrow: 1,
  },
  orgInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    borderTop: '1px solid var(--border)',
    paddingTop: '1rem',
    marginTop: 'auto',
  },
  orgName: {
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  credBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  immutableBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'var(--accent-light)',
    color: '#D98C15',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    borderBottomLeftRadius: '7px',
    borderBottomRightRadius: '7px',
  }
};

export default ArticleCard;
