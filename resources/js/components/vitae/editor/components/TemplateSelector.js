import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActionArea,
    Chip,
    Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    School as HarvardIcon,
    BusinessCenter as ModernIcon,
    Description as SimpleIcon
} from '@mui/icons-material';

const TemplateCard = styled(Card)(({ theme, selected }) => ({
    height: '200px',
    transition: 'all 0.3s ease',
    border: selected ? `3px solid ${theme.palette.primary.main}` : '2px solid transparent',
    transform: selected ? 'scale(1.02)' : 'scale(1)',
    boxShadow: selected 
        ? '0 8px 25px rgba(0,0,0,0.15)' 
        : '0 4px 12px rgba(0,0,0,0.1)',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    }
}));

const TemplateIcon = styled(Box)(({ theme }) => ({
    fontSize: '3rem',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1)
}));

const templates = [
    {
        id: 'Harvard',
        name: 'Harvard',
        nameEs: 'Harvard',
        description: 'Professional and academic template',
        descriptionEs: 'Plantilla profesional y académica',
        icon: HarvardIcon,
        available: true,
        features: ['Clean design', 'Academic focus', 'Professional layout']
    },
    {
        id: 'Modern',
        name: 'Modern',
        nameEs: 'Moderno',
        description: 'Contemporary and creative template',
        descriptionEs: 'Plantilla contemporánea y creativa',
        icon: ModernIcon,
        available: false,
        features: ['Creative design', 'Modern layout', 'Color accents']
    },
    {
        id: 'Simple',
        name: 'Simple',
        nameEs: 'Simple',
        description: 'Minimalist and clean template',
        descriptionEs: 'Plantilla minimalista y limpia',
        icon: SimpleIcon,
        available: false,
        features: ['Minimalist design', 'Clean layout', 'Easy to read']
    }
];

const TemplateSelector = ({ selectedTemplate, onTemplateSelect, lang = 'es' }) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                {lang === 'es' ? 'Selecciona una Plantilla' : 'Select a Template'}
            </Typography>
            
            <Grid container spacing={3}>
                {templates.map((template) => {
                    const IconComponent = template.icon;
                    const isSelected = selectedTemplate === template.id;
                    const isAvailable = template.available;
                    
                    return (
                        <Grid item xs={12} sm={6} md={4} key={template.id}>
                            <TemplateCard 
                                selected={isSelected}
                                sx={{ 
                                    opacity: isAvailable ? 1 : 0.6,
                                    cursor: isAvailable ? 'pointer' : 'not-allowed'
                                }}
                            >
                                <CardActionArea
                                    onClick={() => isAvailable && onTemplateSelect(template.id)}
                                    disabled={!isAvailable}
                                    sx={{ height: '100%', p: 2 }}
                                >
                                    <CardContent sx={{ 
                                        textAlign: 'center', 
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        <TemplateIcon>
                                            <IconComponent fontSize="inherit" />
                                        </TemplateIcon>
                                        
                                        <Typography variant="h6" gutterBottom>
                                            {lang === 'es' ? template.nameEs : template.name}
                                        </Typography>
                                        
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {lang === 'es' ? template.descriptionEs : template.description}
                                        </Typography>
                                        
                                        {!isAvailable && (
                                            <Chip 
                                                label={lang === 'es' ? 'Próximamente' : 'Coming Soon'} 
                                                size="small" 
                                                color="default"
                                                sx={{ mt: 1 }}
                                            />
                                        )}
                                        
                                        {isSelected && isAvailable && (
                                            <Chip 
                                                label={lang === 'es' ? 'Seleccionado' : 'Selected'} 
                                                size="small" 
                                                color="primary"
                                                sx={{ mt: 1 }}
                                            />
                                        )}
                                    </CardContent>
                                </CardActionArea>
                            </TemplateCard>
                        </Grid>
                    );
                })}
            </Grid>
            
            {selectedTemplate && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
                    <Typography variant="body2" color="primary.main">
                        {lang === 'es' 
                            ? `Has seleccionado la plantilla: ${templates.find(t => t.id === selectedTemplate)?.nameEs}`
                            : `You have selected the template: ${templates.find(t => t.id === selectedTemplate)?.name}`
                        }
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default TemplateSelector;
