import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../ThemeContext';

/**
 * ThemeToggle Component
 * 
 * A circular button that allows users to switch between light and dark themes.
 * The component persists user preferences in localStorage and updates the UI accordingly.
 * 
 * @returns {JSX.Element} A themed toggle button with sun/moon icons
 */
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    /**
     * Handle theme change when user clicks the toggle button
     * Delegates to the context's toggleTheme function
     */
    const handleThemeChange = () => {
        toggleTheme();
    };

    /**
     * Get dynamic styles based on current theme
     * @returns {Object} CSS styles object for the container
     */
    const getContainerStyles = () => ({
        position: 'fixed',
        left: '25px',
        bottom: '25px',
        height: '55px',
        width: '55px',
        borderRadius: '50%',
        backgroundColor: theme === 'dark' ? '#1f2937' : '#f59e0b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: `2px solid ${theme === 'dark' ? '#374151' : '#fbbf24'}`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000
    });

    /**
     * Get icon styles based on current theme
     * @returns {Object} CSS styles object for the icon
     */
    const getIconStyles = () => ({
        transition: 'all 0.3s ease',
        color: theme === 'dark' ? '#fbbf24' : '#1f2937',
        stroke: theme === 'dark' ? '#fbbf24' : '#1f2937'
    });

    // Apply hover effects through CSS class
    const hoverStyles = `
        .theme-toggle-container:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
    `;

    return (
        <>
            <style>{`
                .theme-toggle-container {
                    ${Object.entries(getContainerStyles()).map(([key, value]) => 
                      `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`).join('\n                    ')}
                }
                
                .theme-toggle-icon {
                    ${Object.entries(getIconStyles()).map(([key, value]) => 
                      `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value} !important;`).join('\n                    ')}
                }
                
                ${hoverStyles}
            `}</style>
            <div 
                className='theme-toggle-container' 
                onClick={handleThemeChange}
                role="button"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                {theme === 'dark' ? 
                    <Sun className='theme-toggle-icon' /> : 
                    <Moon className='theme-toggle-icon' />
                }
            </div>
        </>
    );
};

export default ThemeToggle;