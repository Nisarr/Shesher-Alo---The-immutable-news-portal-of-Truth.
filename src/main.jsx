import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './providers/ThemeProvider.jsx';
import { AuthProvider } from './providers/AuthProvider.jsx';
import { ArticleProvider } from './providers/ArticleProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ArticleProvider>
          <App />
        </ArticleProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
