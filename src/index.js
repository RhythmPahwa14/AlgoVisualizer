import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/components.css';
import './styles/theme.css';
import { ThemeProvider } from './hooks/useTheme';


ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);