import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useMockData } from '../../providers/MockProvider';
import { CheckCircle, AlertTriangle, ShieldCheck, FileText, UserCheck, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const { user, articles, organizations, updateArticleStatus, issueWarning } = useMockData();
  const [activeTab, setActiveTab] = useState('queue'); // 'queue', 'articles', 'orgs'

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" />;
  }

  const flaggedArticles = articles.filter(a => a.status === 'flagged');
  const allPublished = articles.filter(a => a.status === 'published');
  
  const handleApprove = (id) => {
    updateArticleStatus(id, 'published', '');
  };

  const handleIssueWarning = (articleId, orgId) => {
    const reason = prompt("Enter reason for disciplinary warning:");
    if (!reason) return;
    
    // update status to rejected
    updateArticleStatus(articleId, 'rejected', reason);
    // issue warning to org logic (drops credibility)
    issueWarning(orgId);
  };

  const getCredColor = (score) => {
    if (score >= 90) return 'var(--success)';
    if (score >= 70) return 'var(--warning)';
    return 'var(--error)';
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 0' }}>
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ShieldCheck size={36} color="var(--accent)" />
          <h1 style={{ marginBottom: 0 }}>Platform Authority Admin</h1>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div className="card" style={styles.statCard}>
          <FileText size={32} color="#3B82F6" />
          <div>
            <div style={styles.statLabel}>Total Published</div>
            <div style={styles.statValue}>{allPublished.length}</div>
          </div>
        </div>
        <div className="card" style={styles.statCard}>
          <AlertTriangle size={32} color="var(--warning)" />
          <div>
            <div style={styles.statLabel}>Pending Review (Flagged)</div>
            <div style={styles.statValue}>{flaggedArticles.length}</div>
          </div>
        </div>
        <div className="card" style={styles.statCard}>
          <UserCheck size={32} color="var(--success)" />
          <div>
            <div style={styles.statLabel}>Registered Organisations</div>
            <div style={styles.statValue}>{organizations.length}</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={styles.tabs}>
          <button 
            style={{ ...styles.tabBtn, borderBottom: activeTab === 'queue' ? '2px solid var(--accent)' : '2px solid transparent', color: activeTab === 'queue' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
            onClick={() => setActiveTab('queue')}
          >
            Flagged Queue {flaggedArticles.length > 0 && <span className="badge badge-warning" style={{marginLeft:'0.5rem'}}>{flaggedArticles.length}</span>}
          </button>
          <button 
            style={{ ...styles.tabBtn, borderBottom: activeTab === 'articles' ? '2px solid var(--accent)' : '2px solid transparent', color: activeTab === 'articles' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
            onClick={() => setActiveTab('articles')}
          >
            All Articles
          </button>
          <button 
            style={{ ...styles.tabBtn, borderBottom: activeTab === 'orgs' ? '2px solid var(--accent)' : '2px solid transparent', color: activeTab === 'orgs' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
            onClick={() => setActiveTab('orgs')}
          >
            Organisations
          </button>
        </div>

        {activeTab === 'queue' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Headline</th>
                  <th style={styles.th}>Organisation</th>
                  <th style={styles.th}>AI Flag Reason</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {flaggedArticles.map(a => (
                  <tr key={a.id}>
                    <td style={styles.td} className="bn-text"><strong>{a.headline}</strong></td>
                    <td style={styles.td}>{a.org_name}</td>
                    <td style={{ ...styles.td, color: 'var(--error)' }}>{a.flagReason}</td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleApprove(a.id)} className="btn-primary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button onClick={() => handleIssueWarning(a.id, a.org_id)} className="btn-danger" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
                          <AlertTriangle size={14} /> Warn & Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {flaggedArticles.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ ...styles.td, textAlign: 'center', padding: '2rem' }}>
                      Queue is completely clear!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'articles' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Headline</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(a => (
                  <tr key={a.id}>
                    <td style={styles.td} className="bn-text">{a.headline}</td>
                    <td style={styles.td}>{a.status}</td>
                    <td style={styles.td}>
                      <a href={`/article/${a.id}`} target="_blank" rel="noreferrer" style={{color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                        <Eye size={16} /> View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orgs' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Org Name</th>
                  <th style={styles.th}>License No.</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Credibility Score</th>
                </tr>
              </thead>
              <tbody>
                {organizations.map(o => (
                  <tr key={o.id}>
                    <td style={styles.td}><strong>{o.name}</strong></td>
                    <td style={styles.td}>{o.license_number}</td>
                    <td style={styles.td}>{o.email}</td>
                    <td style={styles.td}>
                      <span className="badge" style={{ backgroundColor: `${getCredColor(o.credibility_score)}22`, color: getCredColor(o.credibility_score) }}>
                        {o.credibility_score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

const styles = {
  header: {
    marginBottom: '2rem',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '1.5rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1,
  },
  tabs: {
    display: 'flex',
    gap: '1.5rem',
    borderBottom: '1px solid var(--border)',
    marginBottom: '1.5rem',
  },
  tabBtn: {
    padding: '0.75rem 0',
    fontWeight: 600,
    fontSize: '1rem',
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
  }
};

export default AdminDashboard;
