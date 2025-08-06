import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

const defaultTheme = {
    template: 'Harvard',
    colors: {
        header: '#2c3e50',
        sectionTitle: '#34495e',
        text: '#2c3e50',
        icons: '#3498db'
    }
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('vitae-theme');
        return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
    });

    const [isConfigured, setIsConfigured] = useState(() => {
        return localStorage.getItem('vitae-configured') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('vitae-theme', JSON.stringify(theme));
    }, [theme]);

    const updateTheme = (newTheme) => {
        setTheme(prev => ({
            ...prev,
            ...newTheme
        }));
    };

    const updateColors = (colors) => {
        setTheme(prev => ({
            ...prev,
            colors: {
                ...prev.colors,
                ...colors
            }
        }));
    };

    const markAsConfigured = () => {
        localStorage.setItem('vitae-configured', 'true');
        setIsConfigured(true);
    };

    const resetConfiguration = () => {
        localStorage.removeItem('vitae-configured');
        localStorage.removeItem('vitae-theme');
        localStorage.removeItem('vitae-section-order');
        setIsConfigured(false);
        setTheme(defaultTheme);
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            updateTheme,
            updateColors,
            isConfigured,
            markAsConfigured,
            resetConfiguration
        }}>
            {children}
        </ThemeContext.Provider>
    );
};
