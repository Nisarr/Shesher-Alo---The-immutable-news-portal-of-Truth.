import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMockData } from '../providers/MockProvider';
import { Lock, ShieldCheck, AlertTriangle, XCircle, ArrowLeft, Link as LinkIcon } from 'lucide-react';

const ArticleDetail = () => {
  const { id } = useParams();
  const { articles } = useMockData();
  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Article not found</h2>
        <Link to="/" className="btn-primary" style={{ marginTop: '1rem' }}>Return to Home</Link>
      </div>
    );
  }

  const dateStr = new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const getCredibilityBadge = (score) => {
    if (score >= 90) return { label: 'Verified Source', color: 'var(--success)', icon: <ShieldCheck size={16} /> };
    if (score >= 70) return { label: 'Exercise Caution', color: 'var(--warning)', icon: <AlertTriangle size={16} /> };
    return { label: 'Low Credibility', color: 'var(--error)', icon: <XCircle size={16} /> };
  };

  const cred = getCredibilityBadge(article.credibility_score);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* Immutability Banner */}
      <div style={styles.immutableBanner}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Lock size={18} />
          <span><strong>Immutable Record</strong> — Published on {dateStr}. This article has never been modified and cannot be removed.</span>
        </div>
      </div>

      {article.flagReason && (
        <div style={styles.warningBanner}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} />
            <span><strong>Editorial Notice:</strong> This article was reviewed by the শেষের আলো editorial board. Review reason: {article.flagReason}.</span>
          </div>
        </div>
      )}

      <div className="container" style={styles.articleContainer}>
        <Link to="/" style={styles.backLink}>
          <ArrowLeft size={16} /> Back to Feed
        </Link>

        <span className="badge badge-info" style={{ marginBottom: '1.5rem' }}>{article.category}</span>
        
        <h1 style={styles.headline} className="bn-text">{article.headline}</h1>
        
        <div style={styles.metaRow}>
          <div style={styles.orgInfo}>
            <span style={styles.orgName}>{article.org_name}</span>
            <span style={styles.date}>{dateStr}</span>
          </div>
          <div style={{ ...styles.credBadge, color: cred.color, borderColor: cred.color }}>
            {cred.icon}
            {cred.label} ({article.credibility_score})
          </div>
        </div>

        <div className="divider"></div>

        <div style={styles.body} className="bn-body">
          {article.body.split('\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '1rem' }}>{paragraph}</p>
          ))}
        </div>

        <div className="divider"></div>

        <div style={styles.sourcesSection}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <LinkIcon size={20} /> Sources
          </h3>
          <ul style={styles.sourceList}>
            {article.source_urls.map((url, idx) => (
              <li key={idx}>
                <a href={url} target="_blank" rel="noopener noreferrer" style={styles.sourceLink}>
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  immutableBanner: {
    backgroundColor: 'var(--accent-light)',
    color: '#D98C15',
    padding: '0.75rem',
    fontSize: '0.9rem',
    borderBottom: '1px solid rgba(245, 166, 35, 0.3)',
  },
  warningBanner: {
    backgroundColor: 'rgba(198, 40, 40, 0.1)',
    color: 'var(--error)',
    padding: '0.75rem',
    fontSize: '0.9rem',
    borderBottom: '1px solid rgba(198, 40, 40, 0.3)',
  },
  articleContainer: {
    maxWidth: '800px',
    marginTop: '2rem',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
    fontWeight: 500,
  },
  headline: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    marginBottom: '2rem',
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  orgInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  orgName: {
    fontWeight: 700,
    fontSize: '1.1rem',
  },
  date: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
  },
  credBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: '1px solid',
    fontWeight: 600,
    backgroundColor: 'var(--bg)',
  },
  body: {
    fontSize: '1.1rem',
    lineHeight: 1.8,
    color: 'var(--text-primary)',
  },
  sourcesSection: {
    backgroundColor: 'var(--card-bg)',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid var(--border)',
  },
  sourceList: {
    listStylePosition: 'inside',
    paddingLeft: '1rem',
  },
  sourceLink: {
    color: '#3B82F6',
    textDecoration: 'underline',
    wordBreak: 'break-all',
  }
};

export default ArticleDetail;
