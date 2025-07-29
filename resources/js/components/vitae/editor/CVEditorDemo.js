import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import VitaeEditorContainer from './VitaeEditorContainer';

const DemoContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
}));

const DemoHeader = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

/**
 * Demo component for testing the Visual CV Editor
 * Usage: Import and render this component to test the complete CV editor system
 */
const CVEditorDemo = () => {
    return (
        <DemoContainer>
            <DemoHeader>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                    🎨 Visual CV Editor Demo - Harvard Template
                </Typography>
                <Typography variant="body2" sx={{ color: '#6c757d' }}>
                    Arrastra y edita cada sección • Haz clic en el texto para editarlo
                </Typography>
            </DemoHeader>
            
            <Box sx={{ flex: 1 }}>
                <VitaeEditorContainer />
            </Box>
        </DemoContainer>
    );
};

export default CVEditorDemo;
