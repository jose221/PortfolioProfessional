import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { SectionOrderProvider, useSectionOrder } from '../contexts/SectionOrderContext';
import InitialConfigModal from './InitialConfigModal';
import VitaeEditorContainerEnhanced from '../VitaeEditorContainerEnhanced';

const LoadingContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
}));

const EditorLoaderContent = ({ data, lang = 'es' }) => {
    const { theme, isConfigured, markAsConfigured, updateTheme, updateColors } = useTheme();
    const { sections, updateSectionOrder } = useSectionOrder();

    const handleConfigSave = React.useCallback((config) => {
        console.log('=== EDITOR LOADER: handleConfigSave called ===');
        console.log('Config received:', config);
        console.log('Current theme:', theme);
        console.log('Current sections:', sections);
        
        if (!config) {
            console.error('No config provided to handleConfigSave');
            return;
        }
        
        try {
            // Update theme with selected template and colors
            console.log('Updating theme with:', { template: config.template });
            if (updateTheme && typeof updateTheme === 'function') {
                updateTheme({ template: config.template });
            }
            
            console.log('Updating colors with:', config.colors);
            if (updateColors && typeof updateColors === 'function') {
                updateColors(config.colors);
            }
            
            // Update section order
            console.log('Updating section order with:', config.sections);
            if (updateSectionOrder && typeof updateSectionOrder === 'function') {
                updateSectionOrder(config.sections);
            }
            
            // Mark as configured
            console.log('Marking as configured...');
            if (markAsConfigured && typeof markAsConfigured === 'function') {
                markAsConfigured();
            }
            
            console.log('=== Configuration save completed successfully ===');
        } catch (error) {
            console.error('Error in handleConfigSave:', error);
        }
    }, [updateTheme, updateColors, updateSectionOrder, markAsConfigured, theme, sections]);

    // Debug context initialization
    console.log('=== EDITOR LOADER CONTEXT DEBUG ===');
    console.log('theme:', theme);
    console.log('sections:', sections);
    console.log('isConfigured:', isConfigured);
    console.log('updateTheme:', typeof updateTheme);
    console.log('updateColors:', typeof updateColors);
    console.log('updateSectionOrder:', typeof updateSectionOrder);
    console.log('markAsConfigured:', typeof markAsConfigured);
    console.log('====================================');
    
    // Show loading while contexts are initializing
    if (!theme || !sections) {
        console.log('Showing loading screen - missing theme or sections');
        return (
            <LoadingContainer>
                <CircularProgress size={60} sx={{ color: 'white', mb: 3 }} />
                <Typography variant="h6" gutterBottom>
                    {lang === 'es' ? 'Cargando Editor...' : 'Loading Editor...'}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {lang === 'es' 
                        ? 'Preparando tu experiencia de edición'
                        : 'Preparing your editing experience'
                    }
                </Typography>
            </LoadingContainer>
        );
    }

    // Show configuration modal if not configured
    if (!isConfigured) {
        return (
            <InitialConfigModal
                open={true}
                onClose={() => {}} // Prevent closing without configuration
                onSave={handleConfigSave}
                initialTemplate={theme.template || 'Harvard'}
                initialSections={sections || []}
                initialColors={theme.colors || {
                    header: '#2c3e50',
                    sectionTitle: '#34495e',
                    text: '#2c3e50',
                    icons: '#3498db'
                }}
                lang={lang}
            />
        );
    }

    // Show the editor with applied configuration
    return (
        <Fade in={true} timeout={500}>
            <Box>
                <VitaeEditorContainerEnhanced data={data} lang={lang} />
            </Box>
        </Fade>
    );
};

const EditorLoader = ({ data, lang = 'es' }) => {
    return (
        <ThemeProvider>
            <SectionOrderProvider>
                <EditorLoaderContent data={data} lang={lang} />
            </SectionOrderProvider>
        </ThemeProvider>
    );
};

export default EditorLoader;
