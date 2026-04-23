import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMockData } from '../../providers/MockProvider';
import { AlertTriangle, Plus, Trash2, ArrowRight } from 'lucide-react';

const SubmitArticle = () => {
  const { user, submitArticle, updateArticleStatus } = useMockData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    headline: '',
    category: 'Politics',
    body: '',
    tags: '',
  });
  const [sourceUrls, setSourceUrls] = useState(['']);
  const [isPermanent, setIsPermanent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!user || user.role !== 'publisher') {
    navigate('/login');
    return null;
  }

  const handleUrlChange = (index, value) => {
    const urls = [...sourceUrls];
    urls[index] = value;
    setSourceUrls(urls);
  };

  const addUrlField = () => {
    setSourceUrls([...sourceUrls, '']);
  };

  const removeUrlField = (index) => {
    const urls = sourceUrls.filter((_, i) => i !== index);
    setSourceUrls(urls.length ? urls : ['']);
  };

  const calculateWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const validUrls = sourceUrls.filter(url => url.trim().length > 0);
    if (validUrls.length === 0) {
      setError("⚠️ At least one verified source URL is required before publishing.");
      return;
    }

    if (calculateWordCount(formData.body) < 150) {
      setError("⚠️ Article body must be at least 150 words.");
      return;
    }

    setIsSubmitting(true);
    
    // Create initially under_review
    const article = submitArticle({
      headline: formData.headline,
      category: formData.category,
      body: formData.body,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      source_urls: validUrls,
    });

    // Simulate AI Moderation
    setTimeout(() => {
      const flaggedTerms = ["unverified", "rumor", "allegedly claimed without proof", "fake"];
      const lowerBody = formData.body.toLowerCase();
      let isFlagged = false;
      let flagReason = '';

      for (let term of flaggedTerms) {
        if (lowerBody.includes(term)) {
          isFlagged = true;
          flagReason = `AI detected unverified claims ("${term}")`;
          break;
        }
      }

      const finalStatus = isFlagged ? 'flagged' : 'published';
      updateArticleStatus(article.id, finalStatus, flagReason);
      
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 4000); // 4 seconds delay
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
      <h2 style={{ marginBottom: '2rem' }}>Submit New Article</h2>

      {error && <div style={styles.errorMsg}>{error}</div>}

      <div className="card">
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label className="label">Headline</label>
            <input 
              type="text" 
              required 
              className="input-field bn-text" 
              value={formData.headline}
              onChange={e => setFormData({...formData, headline: e.target.value})}
              style={{ fontSize: '1.25rem', padding: '1rem' }}
            />
          </div>

          <div>
            <label className="label">Category</label>
            <select 
              className="input-field" 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="Politics">Politics</option>
              <option value="Economy">Economy</option>
              <option value="Crime">Crime</option>
              <option value="International">International</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="label">
              Body <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                (Min 150 words. Current: {calculateWordCount(formData.body)})
              </span>
            </label>
            <textarea 
              required 
              className="input-field bn-body" 
              rows="10"
              value={formData.body}
              onChange={e => setFormData({...formData, body: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label className="label">Source URLs</label>
            {sourceUrls.map((url, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input 
                  type="url" 
                  className="input-field" 
                  placeholder="https://example.com/proof"
                  value={url}
                  onChange={e => handleUrlChange(idx, e.target.value)}
                />
                <button type="button" className="btn-secondary" style={{ padding: '0 1rem' }} onClick={() => removeUrlField(idx)}>
                  <Trash2 size={18} color="var(--error)" />
                </button>
              </div>
            ))}
            <button type="button" className="btn-secondary" onClick={addUrlField} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              <Plus size={16} /> Add Another Source
            </button>
          </div>

          <div>
            <label className="label">Tags (comma-separated)</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. politics, election, 2026"
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
            />
          </div>

          {/* CRITICAL: Friction Confirmation */}
          <div style={styles.frictionBox}>
            <div style={styles.frictionHeader}>
              <AlertTriangle size={24} />
              <h3 style={{ marginBottom: 0, color: 'inherit' }}>Permanent Public Record</h3>
            </div>
            <p style={{ marginBottom: '1rem', fontWeight: 500 }}>
              Once published, this article cannot be edited, modified, or deleted — not by you, not by anyone. শেষের আলো is built on the principle that truth, once spoken, must stand forever.
            </p>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={isPermanent}
                onChange={e => setIsPermanent(e.target.checked)}
                style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: 600 }}>I understand this is permanent. I take full legal and ethical responsibility for this content.</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={!isPermanent || isSubmitting}
            style={styles.submitBtn}
          >
            {isSubmitting ? (
              <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div className="animate-spin" style={{ width: '18px', height: '18px', border: '3px solid #1A1A2E', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
                AI Moderation in Progress...
              </span>
            ) : (
              <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                Submit for Editorial Review <ArrowRight size={18} />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  errorMsg: {
    backgroundColor: 'rgba(198, 40, 40, 0.1)',
    color: 'var(--error)',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontWeight: 600,
    borderLeft: '4px solid var(--error)',
  },
  frictionBox: {
    backgroundColor: 'var(--accent-light)',
    border: '2px solid var(--accent)',
    borderRadius: '8px',
    padding: '1.5rem',
    color: '#D98C15',
    marginTop: '1rem',
  },
  frictionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    cursor: 'pointer',
    color: 'var(--text-primary)',
  },
  submitBtn: {
    width: '100%',
    padding: '1.25rem',
    fontSize: '1.1rem',
    marginTop: '1rem',
    justifyContent: 'center',
  }
};

export default SubmitArticle;
