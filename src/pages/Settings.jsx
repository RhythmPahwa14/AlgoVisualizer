import React from 'react';
import { useTheme } from '../ThemeContext';
import { Moon, Sun } from 'lucide-react';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ 
      padding: '2rem',
      minHeight: '100vh',
      background: 'var(--bg-dark, #0d1117)',
      color: 'var(--text-primary, #e6edf3)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: 'var(--text-primary, #e6edf3)'
        }}>
          Settings
        </h1>
        
        <div style={{
          background: 'var(--bg-secondary, #21262d)',
          border: '1px solid var(--border-color, #30363d)',
          borderRadius: '12px',
          padding: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'var(--text-primary, #e6edf3)'
          }}>
            Appearance
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '1rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: 'var(--text-secondary, #8b949e)'
            }}>
              Theme
            </label>
            
            <button
              onClick={toggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'var(--accent-color, #58a6ff)',
                color: 'var(--bg-dark, #0d1117)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
          
          <div style={{
            padding: '1rem',
            background: 'var(--bg-tertiary, #30363d)',
            borderRadius: '8px',
            color: 'var(--text-secondary, #8b949e)',
            fontSize: '0.9rem'
          }}>
            <p>More settings will be available in future updates!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
