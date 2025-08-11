import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Stepper,
    Step,
    StepLabel,
    Typography,
    IconButton,
    Fade,
    LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Close as CloseIcon,
    ArrowBack as BackIcon,
    ArrowForward as NextIcon,
    Save as SaveIcon,
    Palette as PaletteIcon,
    ViewList as ListIcon,
    Description as TemplateIcon
} from '@mui/icons-material';

import TemplateSelector from './TemplateSelector';
import SectionSorter from './SectionSorter';
import ColorPickerGroup from './ColorPickerGroup';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: theme.spacing(2),
        maxWidth: '900px',
        width: '90vw',
        maxHeight: '90vh',
        overflow: 'hidden'
    }
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: theme.spacing(3),
    position: 'relative',
    '& .MuiTypography-root': {
        fontWeight: 600,
        fontSize: '1.5rem'
    }
}));

const StepContent = styled(Box)(({ theme }) => ({
    minHeight: '400px',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column'
}));

const steps = [
    {
        id: 'template',
        labelEs: 'Seleccionar Plantilla',
        labelEn: 'Select Template',
        icon: TemplateIcon,
        descriptionEs: 'Elige el diseño base para tu CV',
        descriptionEn: 'Choose the base design for your CV'
    },
    {
        id: 'sections',
        labelEs: 'Organizar Secciones',
        labelEn: 'Organize Sections',
        icon: ListIcon,
        descriptionEs: 'Define el orden y las secciones a incluir',
        descriptionEn: 'Define the order and sections to include'
    },
    {
        id: 'colors',
        labelEs: 'Personalizar Colores',
        labelEn: 'Customize Colors',
        icon: PaletteIcon,
        descriptionEs: 'Ajusta la paleta de colores',
        descriptionEn: 'Adjust the color palette'
    }
];

const InitialConfigModal = ({ 
    open, 
    onClose, 
    onSave, 
    initialTemplate = 'Harvard',
    initialSections = [],
    initialColors = {},
    lang = 'es' 
}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [config, setConfig] = useState({
        template: initialTemplate,
        sections: initialSections,
        colors: initialColors
    });

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1);
        }
    };

    const handleTemplateSelect = (template) => {
        setConfig(prev => ({
            ...prev,
            template
        }));
    };

    const handleSectionsChange = (sections) => {
        setConfig(prev => ({
            ...prev,
            sections
        }));
    };

    const handleSectionToggle = (sectionId) => {
        setConfig(prev => ({
            ...prev,
            sections: prev.sections.map(section => 
                section.id === sectionId 
                    ? { ...section, enabled: !section.enabled }
                    : section
            )
        }));
    };

    const handleColorsChange = (colors) => {
        setConfig(prev => ({
            ...prev,
            colors
        }));
    };

    const handleSave = React.useCallback(() => {
        if (!onSave) {
            return;
        }
        
        if (typeof onSave !== 'function') {
            return;
        }
        
        try {
            onSave(config);
        } catch (error) {
            // Error calling onSave
        }
    }, [config, onSave]);

    const isStepValid = () => {
        switch (activeStep) {
            case 0: // Template
                return config.template && config.template.length > 0;
            case 1: // Sections
                return config.sections && config.sections.length > 0;
            case 2: // Colors
                return config.colors && Object.keys(config.colors).length > 0;
            default:
                return false;
        }
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <TemplateSelector
                        selectedTemplate={config.template}
                        onTemplateSelect={handleTemplateSelect}
                        lang={lang}
                    />
                );
            case 1:
                return (
                    <SectionSorter
                        sections={config.sections}
                        onSectionsChange={handleSectionsChange}
                        onSectionToggle={handleSectionToggle}
                        lang={lang}
                    />
                );
            case 2:
                return (
                    <ColorPickerGroup
                        colors={config.colors}
                        onColorsChange={handleColorsChange}
                        lang={lang}
                    />
                );
            default:
                return null;
        }
    };

    const currentStep = steps[activeStep];
    const progress = ((activeStep + 1) / steps.length) * 100;

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            disableEscapeKeyDown
        >
            <StyledDialogTitle>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography variant="h5" component="div">
                            {lang === 'es' ? 'Configuración Inicial del CV' : 'Initial CV Configuration'}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                            {lang === 'es' 
                                ? 'Personaliza tu CV antes de comenzar a editarlo'
                                : 'Customize your CV before you start editing it'
                            }
                        </Typography>
                    </Box>
                    <IconButton 
                        onClick={onClose} 
                        sx={{ color: 'white' }}
                        disabled={false} // We can allow closing, but they'll need to configure again
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                    <LinearProgress 
                        variant="determinate" 
                        value={progress} 
                        sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.3)',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: 'white'
                            }
                        }}
                    />
                </Box>
            </StyledDialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <Box sx={{ p: 2 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((step, index) => {
                            const IconComponent = step.icon;
                            return (
                                <Step key={step.id}>
                                    <StepLabel
                                        StepIconComponent={() => (
                                            <Box
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: '50%',
                                                    backgroundColor: index <= activeStep ? 'primary.main' : 'grey.300',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <IconComponent fontSize="small" />
                                            </Box>
                                        )}
                                    >
                                        <Typography variant="body2" fontWeight="bold">
                                            {lang === 'es' ? step.labelEs : step.labelEn}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {lang === 'es' ? step.descriptionEs : step.descriptionEn}
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>

                <StepContent>
                    <Fade in={true} key={activeStep}>
                        <Box sx={{ flex: 1 }}>
                            {renderStepContent()}
                        </Box>
                    </Fade>
                </StepContent>
            </DialogContent>

            <DialogActions sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    startIcon={<BackIcon />}
                >
                    {lang === 'es' ? 'Anterior' : 'Previous'}
                </Button>
                
                <Box sx={{ flex: 1 }} />
                
                {activeStep < steps.length - 1 ? (
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        endIcon={<NextIcon />}
                    >
                        {lang === 'es' ? 'Siguiente' : 'Next'}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSave}
                        disabled={!isStepValid()}
                        startIcon={<SaveIcon />}
                        sx={{ minWidth: '160px' }}
                    >
                        {lang === 'es' ? 'Guardar y Continuar' : 'Save and Continue'}
                    </Button>
                )}
            </DialogActions>
        </StyledDialog>
    );
};

export default InitialConfigModal;
