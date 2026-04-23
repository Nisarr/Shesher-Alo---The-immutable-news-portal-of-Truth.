import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './providers/ThemeProvider.jsx';
import { MockProvider } from './providers/MockProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <MockProvider>
        <App />
      </MockProvider>
    </ThemeProvider>
  </StrictMode>,
);
