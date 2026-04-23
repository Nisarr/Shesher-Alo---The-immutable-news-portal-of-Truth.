import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthProvider';

const ArticleContext = createContext();

export const useArticles = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*, organizations(name)')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitArticle = async (articleData) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert([{
          ...articleData,
          org_id: profile.org_id,
          status: 'under_review',
          credibility_score: profile.organizations.credibility_score
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Update local state (optimistic or refresh)
      setArticles([data, ...articles]);
      return data;
    } catch (error) {
      console.error('Error submitting article:', error.message);
      throw error;
    }
  };

  const updateStatus = async (id, status, flagReason = '') => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .update({ 
          status, 
          flag_reason: flagReason,
          published_at: status === 'published' ? new Date().toISOString() : null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setArticles(articles.map(a => a.id === id ? data : a));
    } catch (error) {
      console.error('Error updating article status:', error.message);
      throw error;
    }
  };

  return (
    <ArticleContext.Provider value={{ 
      articles, 
      loading, 
      fetchArticles, 
      submitArticle, 
      updateStatus 
    }}>
      {children}
    </ArticleContext.Provider>
  );
};
