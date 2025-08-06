import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import VitaeEditorContainer from '../VitaeEditorContainer';
import InitialConfigModal from './InitialConfigModal';

const LoadingContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
}));

const defaultSections = [
    { id: 'header', name: 'Encabezado', nameEn: 'Header', enabled: true, required: true },
    { id: 'summary', name: 'Resumen Profesional', nameEn: 'Professional Summary', enabled: true, required: false },
    { id: 'contact', name: 'Información de Contacto', nameEn: 'Contact Information', enabled: true, required: false },
    { id: 'experience', name: 'Experiencia Laboral', nameEn: 'Work Experience', enabled: true, required: false },
    { id: 'education', name: 'Educación', nameEn: 'Education', enabled: true, required: false },
    { id: 'skills', name: 'Habilidades y Competencias', nameEn: 'Skills & Competencies', enabled: true, required: false },
    { id: 'certifications', name: 'Certificaciones', nameEn: 'Certifications', enabled: true, required: false },
    { id: 'knowledges', name: 'Conocimientos', nameEn: 'Knowledge', enabled: true, required: false },
    { id: 'studies', name: 'Estudios', nameEn: 'Studies', enabled: true, required: false },
    { id: 'stacks', name: 'Tecnologías', nameEn: 'Technologies', enabled: true, required: false }
];

const defaultColors = {
    header: '#2c3e50',
    sectionTitle: '#34495e',
    text: '#2c3e50',
    icons: '#3498db'
};

const SimpleEditorLoader = ({ data, lang = 'es' }) => {
    const [isConfigured, setIsConfigured] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [editorKey, setEditorKey] = useState(Date.now()); // Force re-render key
    const [config, setConfig] = useState({
        template: 'Harvard',
        sections: defaultSections,
        colors: defaultColors
    });

    useEffect(() => {
        console.log('SimpleEditorLoader: Checking configuration...');
        
        // Check if already configured
        const configured = localStorage.getItem('vitae-configured') === 'true';
        
        if (configured) {
            // Load saved configuration
            const savedTheme = localStorage.getItem('vitae-theme');
            const savedSections = localStorage.getItem('vitae-section-order');
            
            if (savedTheme) {
                try {
                    const theme = JSON.parse(savedTheme);
                    setConfig(prev => ({
                        ...prev,
                        template: theme.template || 'Harvard',
                        colors: theme.colors || defaultColors
                    }));
                } catch (e) {
                    console.error('Error parsing saved theme:', e);
                }
            }
            
            if (savedSections) {
                try {
                    const sections = JSON.parse(savedSections);
                    setConfig(prev => ({
                        ...prev,
                        sections: sections || defaultSections
                    }));
                } catch (e) {
                    console.error('Error parsing saved sections:', e);
                }
            }
            
            setIsConfigured(true);
        }
        
        setIsLoading(false);
    }, []);

    const handleConfigSave = (newConfig) => {
        console.log('SimpleEditorLoader: Saving configuration...', newConfig);
        
        try {
            // Save to localStorage
            localStorage.setItem('vitae-configured', 'true');
            localStorage.setItem('vitae-theme', JSON.stringify({
                template: newConfig.template,
                colors: newConfig.colors
            }));
            localStorage.setItem('vitae-section-order', JSON.stringify(newConfig.sections));
            
            // Update state
            setConfig(newConfig);
            setIsConfigured(true);
            setShowConfigModal(false); // Close modal after saving
            
            // Force editor re-render by changing key
            setEditorKey(Date.now());
            
            console.log('Configuration saved successfully! Editor will re-render...');
        } catch (error) {
            console.error('Error saving configuration:', error);
        }
    };

    const handleOpenConfigModal = () => {
        console.log('Opening configuration modal from menu...');
        setShowConfigModal(true);
    };

    const handleCloseConfigModal = () => {
        console.log('Closing configuration modal...');
        setShowConfigModal(false);
    };

    console.log('=== SimpleEditorLoader Debug ===');
    console.log('Is loading:', isLoading);
    console.log('Is configured:', isConfigured);
    console.log('Editor key:', editorKey);
    console.log('Config:', config);
    console.log('Show config modal:', showConfigModal);
    console.log('Enabled sections:', config.sections.filter(section => section.enabled).map(s => s.id));
    console.log('================================');

    if (isLoading) {
        return (
            <LoadingContainer>
                <CircularProgress size={60} sx={{ color: 'white', mb: 3 }} />
                <Typography variant="h6" gutterBottom>
                    {lang === 'es' ? 'Cargando Editor...' : 'Loading Editor...'}
                </Typography>
            </LoadingContainer>
        );
    }

    if (!isConfigured) {
        return (
            <InitialConfigModal
                open={true}
                onClose={() => {}} // Prevent closing without configuration
                onSave={handleConfigSave}
                initialTemplate={config.template}
                initialSections={config.sections}
                initialColors={config.colors}
                lang={lang}
            />
        );
    }

    // Show the original editor (working version) with configuration modal overlay
    return (
        <>
            <VitaeEditorContainer 
                key={editorKey} // Force re-render when config changes
                data={data} 
                lang={lang} 
                onOpenConfiguration={handleOpenConfigModal}
                enabledSections={config.sections.filter(section => section.enabled)}
                themeColors={config.colors}
            />
            
            {/* Configuration modal that can be opened from menu */}
            {showConfigModal && (
                <InitialConfigModal
                    open={showConfigModal}
                    onClose={handleCloseConfigModal}
                    onSave={handleConfigSave}
                    initialTemplate={config.template}
                    initialSections={config.sections}
                    initialColors={config.colors}
                    lang={lang}
                />
            )}
        </>
    );
};

export default SimpleEditorLoader;
