import React from 'react';
import { useMockData } from '../providers/MockProvider';
import ArticleCard from '../components/ArticleCard';
import { ShieldCheck, BrainCircuit, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { articles } = useMockData();
  const publishedArticles = articles.filter(a => a.status === 'published');

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div className="container" style={styles.heroContainer}>
          <h1 style={styles.heroTitle} className="bn-text">সত্যের আলো নেভানো যায় না।</h1>
          <p style={styles.heroSubtitle}>The light of truth cannot be extinguished.</p>
          <p style={styles.heroTagline}>Stand Against Yellow Journalism</p>
          
          <div style={styles.ctaGroup}>
            <a href="#feed" className="btn-primary" style={styles.btnLarge}>
              Read the News
            </a>
            <Link to="/register" className="btn-secondary" style={styles.btnLarge}>
              Register Your Organisation
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={styles.howItWorks}>
        <div className="container">
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <div style={styles.stepsGrid}>
            <div style={styles.stepCard}>
              <div style={styles.iconWrapper}><ShieldCheck size={32} /></div>
              <h3>1. Submit</h3>
              <p>Organisation submits verified news with reliable sources.</p>
            </div>
            <div style={styles.stepCard}>
              <div style={styles.iconWrapper}><BrainCircuit size={32} /></div>
              <h3>2. AI Review</h3>
              <p>AI scans for misinformation, vulgarity, and unverified claims.</p>
            </div>
            <div style={styles.stepCard}>
              <div style={styles.iconWrapper}><Lock size={32} /></div>
              <h3>3. Permanent Publish</h3>
              <p>Once live, it stays. Forever. No editing or deletion possible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live News Feed */}
      <section id="feed" style={styles.newsSection}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Live News Feed</h2>
            <div style={styles.liveIndicator}>
              <div style={styles.pulse}></div>
              <span>Live Updates</span>
            </div>
          </div>
          
          <div style={styles.newsGrid}>
            {publishedArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
            {publishedArticles.length === 0 && (
              <p>No articles published yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section style={styles.missionSection}>
        <div className="container">
          <div style={styles.missionCard}>
            <h2 style={styles.sectionTitle}>Our Mission</h2>
            <p style={styles.missionText}>
              শেষে আলো exists to combat the rapid spread of fake news and yellow journalism. 
              We provide a platform for brave, verified news organisations to publish truth without compromise.
            </p>
            <blockquote style={styles.quote}>
              "Once truth is published here, no one — no political party, no pressure group — can erase it."
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  heroSection: {
    padding: '6rem 0',
    textAlign: 'center',
    borderBottom: '4px solid var(--accent)',
  },
  heroContainer: {
    maxWidth: '800px',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: 'var(--text-secondary)',
    fontStyle: 'italic',
    marginBottom: '2rem',
  },
  heroTagline: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '3rem',
  },
  ctaGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnLarge: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
  },
  howItWorks: {
    backgroundColor: 'var(--card-bg)',
    padding: '5rem 0',
  },
  sectionTitle: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  stepCard: {
    textAlign: 'center',
    padding: '2rem',
  },
  iconWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-light)',
    color: 'var(--accent)',
    marginBottom: '1.5rem',
  },
  newsSection: {
    padding: '5rem 0',
    minHeight: '600px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem',
  },
  liveIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--error)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontSize: '0.85rem',
  },
  pulse: {
    width: '10px',
    height: '10px',
    backgroundColor: 'var(--error)',
    borderRadius: '50%',
    boxShadow: '0 0 0 0 rgba(198, 40, 40, 0.7)',
    animation: 'pulse 2s infinite',
  },
  newsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
  },
  missionSection: {
    padding: '5rem 0',
    backgroundColor: 'var(--bg)',
  },
  missionCard: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'var(--card-bg)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
  },
  missionText: {
    fontSize: '1.2rem',
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
  },
  quote: {
    fontSize: '1.5rem',
    fontWeight: 700,
    fontFamily: 'Playfair Display, serif',
    color: 'var(--accent)',
    fontStyle: 'italic',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  }
};

export default Home;
