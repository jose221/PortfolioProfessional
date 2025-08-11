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
    { id: 'contact', name: 'Información de Contacto', nameEn: 'Contact Information', enabled: true, required: false },
    { id: 'summary', name: 'Resumen Profesional', nameEn: 'Professional Summary', enabled: true, required: true },
    { id: 'experience', name: 'Experiencia Laboral', nameEn: 'Work Experience', enabled: true, required: false },
    { id: 'studies', name: 'Estudios', nameEn: 'Studies', enabled: true, required: false },
    { id: 'certifications', name: 'Certificaciones', nameEn: 'Certifications', enabled: true, required: false },
    { id: 'knowledges', name: 'Conocimientos', nameEn: 'Knowledge', enabled: true, required: false },
    { id: 'stacks', name: 'Habilidades y Competencias', nameEn: 'Skills and Competencies', enabled: true, required: false },
];

const defaultColors = {
    header: '#2c3e50',
    headerText: '#2c3e50',
    sectionTitle: '#34495e',
    text: '#2c3e50',
    icons: '#34495e'
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
                    // Error parsing saved theme
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
                    // Error parsing saved sections
                }
            }
            
            setIsConfigured(true);
        }
        
        setIsLoading(false);
    }, []);

    const handleConfigSave = (newConfig) => {
        try {
            
        } catch (error) {
            // Error saving configuration
        }
    };

    const handleExportEditorCV = (newConfig) => {
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
        } catch (error) {
            // Error saving configuration
        }
    };

    const handleOpenConfigModal = () => {
        setShowConfigModal(true);
    };

    const handleCloseConfigModal = () => {
        setShowConfigModal(false);
    };

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
