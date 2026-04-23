import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMockData } from '../../providers/MockProvider';
import { FileText, Clock, AlertTriangle, ShieldCheck, PenTool } from 'lucide-react';

const PublisherDashboard = () => {
  const { user, articles } = useMockData();

  if (!user || user.role !== 'publisher') {
    return <Navigate to="/login" />;
  }

  const myArticles = articles.filter(a => a.org_id === user.orgId);
  const total = myArticles.length;
  const underReview = myArticles.filter(a => a.status === 'under_review').length;
  const flagged = myArticles.filter(a => a.status === 'flagged').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published': return <span className="badge badge-success">✅ Published</span>;
      case 'under_review': return <span className="badge badge-info">🔍 AI Review</span>;
      case 'flagged': return <span className="badge badge-warning">⚠️ Flagged</span>;
      case 'rejected': return <span className="badge badge-error">❌ Rejected</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const getCredColor = (score) => {
    if (score >= 90) return 'var(--success)';
    if (score >= 70) return 'var(--warning)';
    return 'var(--error)';
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 0' }}>
      <div style={styles.headerRow}>
        <h1 style={{ marginBottom: 0 }}>Dashboard</h1>
        <Link to="/dashboard/submit" className="btn-primary">
          <PenTool size={18} /> Submit New Article
        </Link>
      </div>

      <div style={styles.statsGrid}>
        <div className="card" style={styles.statCard}>
          <FileText size={32} color="var(--text-secondary)" />
          <div>
            <div style={styles.statLabel}>Total Published</div>
            <div style={styles.statValue}>{total}</div>
          </div>
        </div>
        <div className="card" style={styles.statCard}>
          <Clock size={32} color="#3B82F6" />
          <div>
            <div style={styles.statLabel}>Under Review</div>
            <div style={styles.statValue}>{underReview}</div>
          </div>
        </div>
        <div className="card" style={styles.statCard}>
          <AlertTriangle size={32} color="var(--warning)" />
          <div>
            <div style={styles.statLabel}>Flagged</div>
            <div style={styles.statValue}>{flagged}</div>
          </div>
        </div>
        <div className="card" style={{ ...styles.statCard, justifyContent: 'space-between', borderLeft: `4px solid ${getCredColor(user.credibility_score)}` }}>
          <div>
            <div style={styles.statLabel}>Credibility Score</div>
            <div style={{...styles.statValue, color: getCredColor(user.credibility_score)}}>
              {user.credibility_score}
            </div>
          </div>
          <div style={{ ...styles.scoreCircle, borderColor: getCredColor(user.credibility_score) }}>
            {user.credibility_score >= 90 ? <ShieldCheck size={28} color={getCredColor(user.credibility_score)} /> : 
             <AlertTriangle size={28} color={getCredColor(user.credibility_score)} />}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '1rem', overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '1.5rem', paddingLeft: '0.5rem' }}>Your Articles</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Headline</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Submitted On</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {myArticles.map(article => (
              <tr key={article.id} style={styles.tr}>
                <td style={styles.td} className="bn-text"><strong>{article.headline}</strong></td>
                <td style={styles.td}>{article.category}</td>
                <td style={styles.td}>
                  {new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString()}
                </td>
                <td style={styles.td}>{getStatusBadge(article.status)}</td>
                <td style={styles.td}>
                  <Link to={`/article/${article.id}`} className="btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {myArticles.length === 0 && (
              <tr>
                <td colSpan="5" style={{ ...styles.td, textAlign: 'center', padding: '2rem' }}>
                  No articles submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1.5rem',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    fontWeight: 500,
    marginBottom: '0.25rem',
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: 700,
    lineHeight: 1,
  },
  scoreCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '3px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '1rem',
    borderBottom: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    fontWeight: 600,
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid var(--border)',
  },
  tr: {
    transition: 'background-color 0.2s',
  }
};

// adding hover style via global css or assuming row doesn't need hover
export default PublisherDashboard;
