import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminLogin from './pages/auth/AdminLogin';

import PublisherDashboard from './pages/dashboard/PublisherDashboard';
import SubmitArticle from './pages/dashboard/SubmitArticle';
import AdminDashboard from './pages/admin/AdminDashboard';

// Simple placeholder for about
const AboutUs = () => (
  <div className="container" style={{padding: '5rem 1rem', maxWidth: '800px', textAlign: 'center'}}>
    <h1 className="bn-text" style={{marginBottom: '2rem'}}>সত্যের আলো নেভানো যায় না</h1>
    <p style={{fontSize: '1.2rem', color: 'var(--text-secondary)'}}>
      Shesher Alo was created out of a necessity to have an immutable record of journalistic truth. 
      In an era where articles can be shadow-edited or silently deleted due to pressure, we ensure that once a verified organisation publishes the truth, it stays forever.
    </p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="article/:id" element={<ArticleDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="dashboard" element={<PublisherDashboard />} />
          <Route path="dashboard/submit" element={<SubmitArticle />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="about" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
