import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    InputAdornment,
    Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Person as HeaderIcon,
    Title as TitleIcon,
    TextFields as TextIcon,
    Extension as IconsIcon
} from '@mui/icons-material';

const ColorPreview = styled(Box)(({ theme, color }) => ({
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: color,
    border: `2px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    }
}));

const ColorSection = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
}));

const presetColors = {
    header: [
        '#2c3e50', '#34495e', '#1a252f', '#2980b9', '#8e44ad',
        '#c0392b', '#d35400', '#f39c12', '#27ae60', '#16a085'
    ],
    sectionTitle: [
        '#34495e', '#2c3e50', '#7f8c8d', '#3498db', '#9b59b6',
        '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c'
    ],
    text: [
        '#2c3e50', '#34495e', '#7f8c8d', '#5d6d7e', '#212529',
        '#495057', '#6c757d', '#343a40', '#17a2b8', '#28a745'
    ],
    icons: [
        '#3498db', '#2980b9', '#9b59b6', '#8e44ad', '#e74c3c',
        '#c0392b', '#e67e22', '#d35400', '#f1c40f', '#f39c12'
    ]
};

const colorLabels = {
    header: {
        es: 'Color del Encabezado',
        en: 'Header Color',
        description: {
            es: 'Color de fondo del encabezado principal',
            en: 'Background color of the main header'
        },
        icon: HeaderIcon
    },
    sectionTitle: {
        es: 'Color de Títulos de Sección',
        en: 'Section Title Color',
        description: {
            es: 'Color de los títulos de cada sección',
            en: 'Color of each section title'
        },
        icon: TitleIcon
    },
    text: {
        es: 'Color del Texto General',
        en: 'General Text Color',
        description: {
            es: 'Color del texto principal del contenido',
            en: 'Color of the main content text'
        },
        icon: TextIcon
    },
    icons: {
        es: 'Color de los Iconos',
        en: 'Icons Color',
        description: {
            es: 'Color de los iconos decorativos',
            en: 'Color of decorative icons'
        },
        icon: IconsIcon
    }
};

const ColorPickerGroup = ({ colors, onColorsChange, lang = 'es' }) => {
    const handleColorChange = (colorType, color) => {
        onColorsChange({
            ...colors,
            [colorType]: color
        });
    };

    const handleInputChange = (colorType, value) => {
        // Validate hex color
        if (value.match(/^#[0-9A-F]{6}$/i) || value === '') {
            handleColorChange(colorType, value);
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                {lang === 'es' ? 'Personaliza los Colores' : 'Customize Colors'}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {lang === 'es' 
                    ? 'Selecciona los colores que mejor representen tu estilo profesional:'
                    : 'Select colors that best represent your professional style:'
                }
            </Typography>

            <Grid container spacing={3}>
                {Object.entries(colorLabels).map(([colorType, label]) => {
                    const IconComponent = label.icon;
                    const currentColor = colors[colorType] || '#2c3e50';
                    
                    return (
                        <Grid item xs={12} sm={6} key={colorType}>
                            <ColorSection elevation={1}>
                                <Box display="flex" alignItems="center" gap={2} mb={2}>
                                    <IconComponent color="primary" />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {lang === 'es' ? label.es : label.en}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {lang === 'es' ? label.description.es : label.description.en}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box display="flex" alignItems="center" gap={2} mb={2}>
                                    <ColorPreview color={currentColor} />
                                    <TextField
                                        size="small"
                                        value={currentColor}
                                        onChange={(e) => handleInputChange(colorType, e.target.value)}
                                        placeholder="#2c3e50"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">#</InputAdornment>
                                            ),
                                        }}
                                        sx={{ minWidth: '120px' }}
                                    />
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {lang === 'es' ? 'Colores sugeridos:' : 'Suggested colors:'}
                                </Typography>
                                
                                <Box display="flex" flexWrap="wrap" gap={1}>
                                    {presetColors[colorType].map((presetColor, index) => (
                                        <ColorPreview
                                            key={index}
                                            color={presetColor}
                                            onClick={() => handleColorChange(colorType, presetColor)}
                                            sx={{ 
                                                width: '30px', 
                                                height: '30px',
                                                border: currentColor === presetColor 
                                                    ? '3px solid #3498db' 
                                                    : '2px solid #e0e0e0'
                                            }}
                                        />
                                    ))}
                                </Box>
                            </ColorSection>
                        </Grid>
                    );
                })}
            </Grid>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'warning.50', borderRadius: 1 }}>
                <Typography variant="body2" color="warning.main">
                    <strong>{lang === 'es' ? 'Nota:' : 'Note:'}</strong>{' '}
                    {lang === 'es' 
                        ? 'Asegúrate de que los colores tengan suficiente contraste para una buena legibilidad.'
                        : 'Make sure colors have sufficient contrast for good readability.'
                    }
                </Typography>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    {lang === 'es' ? 'Vista previa:' : 'Preview:'}
                </Typography>
                {Object.entries(colors).map(([colorType, color]) => (
                    <Chip
                        key={colorType}
                        label={lang === 'es' ? colorLabels[colorType].es : colorLabels[colorType].en}
                        size="small"
                        sx={{ 
                            backgroundColor: color,
                            color: '#ffffff',
                            fontWeight: 'bold'
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default ColorPickerGroup;
