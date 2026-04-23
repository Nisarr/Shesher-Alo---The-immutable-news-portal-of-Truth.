import React, { createContext, useContext, useState } from 'react';

const MockContext = createContext();

export const useMockData = () => useContext(MockContext);

export const MockProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, role: 'publisher' | 'admin', orgId }
  
  // Seed initial data
  const [articles, setArticles] = useState([
    {
      id: '1',
      org_id: 'org1',
      org_name: 'Daily Truth',
      headline: 'Election Results Expected By Midnight',
      body: 'The central election commission has announced that results will be finalized by midnight. Observers state that the process has been mostly peaceful with minor incidents in some regions...',
      category: 'Politics',
      source_urls: ['https://example.com/source1'],
      tags: ['election', 'national'],
      status: 'published',
      published_at: new Date(Date.now() - 3600000).toISOString(),
      credibility_score: 95
    },
    {
      id: '2',
      org_id: 'org1',
      org_name: 'Daily Truth',
      headline: 'New Economic Policy Announced',
      body: 'The finance minister revealed a new set of policies to boost export sectors and provide tax reliefs for small businesses...',
      category: 'Economy',
      source_urls: ['https://example.com/source2'],
      tags: ['economy', 'tax'],
      status: 'published',
      published_at: new Date(Date.now() - 86400000).toISOString(),
      credibility_score: 95
    }
  ]);

  const [organizations, setOrganizations] = useState([
    {
      id: 'org1',
      name: 'Daily Truth',
      license_number: 'PR-10293',
      email: 'contact@dailytruth.news',
      credibility_score: 95,
      password: 'password123'
    }
  ]);

  const login = (email, password, isAdmin) => {
    if (isAdmin) {
      if (email === 'admin@shesheralo.com' && password === 'admin') {
        setUser({ id: 'admin1', name: 'Super Admin', role: 'admin' });
        return { success: true };
      }
      return { success: false, error: 'Invalid admin credentials' };
    }
    
    const org = organizations.find(o => o.email === email && o.password === password);
    if (org) {
      setUser({ id: org.id, name: org.name, role: 'publisher', orgId: org.id, credibility_score: org.credibility_score });
      return { success: true };
    }
    return { success: false, error: 'Invalid organization credentials' };
  };

  const register = (orgData) => {
    if (organizations.some(o => o.email === orgData.email)) {
      return { success: false, error: 'Email already registered' };
    }
    const newOrg = {
      id: `org${Date.now()}`,
      credibility_score: 100,
      ...orgData
    };
    setOrganizations([...organizations, newOrg]);
    setUser({ id: newOrg.id, name: newOrg.name, role: 'publisher', orgId: newOrg.id, credibility_score: 100 });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const submitArticle = (articleData) => {
    const newArticle = {
      id: `art${Date.now()}`,
      org_id: user.orgId,
      org_name: user.name,
      status: 'under_review',
      credibility_score: user.credibility_score,
      ...articleData
    };
    setArticles([newArticle, ...articles]);
    return newArticle;
  };

  const updateArticleStatus = (id, newStatus, flagReason = '') => {
    setArticles(articles.map(a => {
      if (a.id === id) {
        return { ...a, status: newStatus, flagReason, published_at: newStatus === 'published' ? new Date().toISOString() : undefined };
      }
      return a;
    }));
  };

  const issueWarning = (orgId) => {
    setOrganizations(organizations.map(o => {
      if (o.id === orgId) {
        return { ...o, credibility_score: Math.max(0, o.credibility_score - 20) };
      }
      return o;
    }));
    // Also update logged in user score if it's the same org
    if (user && user.orgId === orgId) {
      setUser({ ...user, credibility_score: Math.max(0, user.credibility_score - 20) });
    }
    // Update credibility on their articles
    setArticles(articles.map(a => {
      if (a.org_id === orgId) {
        return { ...a, credibility_score: Math.max(0, a.credibility_score - 20) };
      }
      return a;
    }));
  };

  return (
    <MockContext.Provider value={{ 
      user, 
      articles, 
      organizations, 
      login, 
      logout,
      register,
      submitArticle,
      updateArticleStatus,
      issueWarning
    }}>
      {children}
    </MockContext.Provider>
  );
};
