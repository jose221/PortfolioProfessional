import React, { useState, useEffect, useCallback } from 'react';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {
    Box,
    Container,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Paper,
    Tooltip,
    Zoom,
    Fab,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import {
    Save as SaveIcon,
    Preview as PreviewIcon,
    Undo as UndoIcon,
    Redo as RedoIcon,
    Download as DownloadIcon,
    Settings as SettingsIcon,
    PictureAsPdf as PdfIcon,
    Add as AddIcon,
    Description as DescriptionIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import html2pdf from 'html2pdf.js';

// Import CV Components
import { CVHeader } from './components/CVHeader';
import { CVSummary } from './components/CVSummary';
import { CVContact } from './components/CVContact';
import { VitaeKnowledges } from './components/VitaeKnowledges';
import { VitaeCertifications } from './components/VitaeCertifications';
import { VitaeExperience } from './components/VitaeExperience';
import { VitaeCustomSection } from './components/VitaeCustomSection';
import { VitaeStudies } from './components/VitaeStudies';
import { VitaeStacks } from './components/VitaeStacks';
import PreviewModeButton from './components/PreviewModeButton';
import { enablePreviewMode, disablePreviewMode } from '../../../redux/actions/preview-mode.js';
import { useDispatch } from 'react-redux';

// Import contexts
import { useTheme } from './contexts/ThemeContext';
import { useSectionOrder } from './contexts/SectionOrderContext';

const EditorContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative'
}));

const EditorToolbar = styled(AppBar)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    color: theme.palette.text.primary
}));

const CVCanvas = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255,255,255,0.3)',
        borderRadius: '4px',
        '&:hover': {
            background: 'rgba(255,255,255,0.5)',
        },
    },
}));

const CVPaper = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'themeColors'
})(({ theme, themeColors }) => ({
    width: '210mm',
    minHeight: '297mm',
    padding: theme.spacing(4),
    margin: 'auto',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    background: '#ffffff',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: themeColors?.header || '#2c3e50',
    },
    // Apply theme colors to CV content
    '& .cv-header': {
        backgroundColor: themeColors?.header || '#2c3e50',
        color: '#ffffff'
    },
    '& .section-title': {
        color: themeColors?.sectionTitle || '#34495e'
    },
    '& .cv-text': {
        color: themeColors?.text || '#2c3e50'
    },
    '& .cv-icon': {
        color: themeColors?.icons || '#3498db'
    }
}));

const FloatingToolbar = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    zIndex: 1000
}));

// Utility functions
const getLocalizedText = (obj, field, lang, fallback = "") => {
    if (!obj || typeof obj !== 'object') return fallback;

    const langField = `${field}_${lang}`;
    if (obj[langField] && typeof obj[langField] === 'string' && obj[langField].trim() !== "") {
        return obj[langField];
    }

    if (obj[field] && typeof obj[field] === 'string' && obj[field].trim() !== "") {
        return obj[field];
    }

    return fallback;
};

const isEmptyData = (data) => {
    if (!data) return true;
    if (Array.isArray(data)) return data.length === 0;
    if (typeof data === 'object') return Object.keys(data).length === 0;
    return false;
};

const safeString = (value, fallback = "") => {
    return (value && typeof value === 'string') ? value : fallback;
};

// Transform API data
const transformApiDataToTemplate = (apiData, lang = 'es', enabledSections = []) => {
    if (!apiData || typeof apiData !== 'object') {
        return {};
    }

    const enabledSectionIds = enabledSections.map(s => s.id);

    return {
        // Header (always enabled)
        header: {
            name: safeString(apiData.name || apiData.nombre),
            title: getLocalizedText(apiData, 'title', lang, getLocalizedText(apiData, 'titulo', lang)),
            email: safeString(apiData.email),
            phone: safeString(apiData.phone || apiData.telefono),
            location: getLocalizedText(apiData, 'location', lang, getLocalizedText(apiData, 'ubicacion', lang)),
            website: safeString(apiData.website || apiData.sitio_web),
            linkedin: safeString(apiData.linkedin),
            github: safeString(apiData.github),
        },

        // Summary
        summary: enabledSectionIds.includes('summary') ? {
            content: getLocalizedText(apiData, 'summary', lang, getLocalizedText(apiData, 'resumen', lang))
        } : null,

        // Contact
        contact: enabledSectionIds.includes('contact') ? {
            email: safeString(apiData.email),
            phone: safeString(apiData.phone || apiData.telefono),
            location: getLocalizedText(apiData, 'location', lang, getLocalizedText(apiData, 'ubicacion', lang)),
            website: safeString(apiData.website || apiData.sitio_web),
            linkedin: safeString(apiData.linkedin),
            github: safeString(apiData.github),
        } : null,

        // Experience
        experience: enabledSectionIds.includes('experience') && apiData.experience && Array.isArray(apiData.experience) 
            ? apiData.experience.map(exp => ({
                company: getLocalizedText(exp, 'company', lang, getLocalizedText(exp, 'empresa', lang)),
                position: getLocalizedText(exp, 'position', lang, getLocalizedText(exp, 'cargo', lang)),
                startDate: safeString(exp.start_date || exp.fecha_inicio),
                endDate: safeString(exp.end_date || exp.fecha_fin),
                current: Boolean(exp.current || exp.actual),
                description: getLocalizedText(exp, 'description', lang, getLocalizedText(exp, 'descripcion', lang)),
                achievements: exp.achievements || exp.logros || []
            })) : null,

        // Certifications
        certifications: enabledSectionIds.includes('certifications') && apiData.certifications && Array.isArray(apiData.certifications)
            ? apiData.certifications.map(cert => ({
                name: getLocalizedText(cert, 'name', lang, getLocalizedText(cert, 'nombre', lang)),
                issuer: getLocalizedText(cert, 'issuer', lang, getLocalizedText(cert, 'emisor', lang)),
                date: safeString(cert.date || cert.fecha),
                expiryDate: safeString(cert.expiry_date || cert.fecha_expiracion),
                credentialId: safeString(cert.credential_id || cert.id_credencial),
                url: safeString(cert.url)
            })) : null,

        // Knowledge
        knowledges: enabledSectionIds.includes('knowledges') && apiData.knowledges && Array.isArray(apiData.knowledges)
            ? apiData.knowledges.map(knowledge => ({
                name: getLocalizedText(knowledge, 'name', lang, getLocalizedText(knowledge, 'nombre', lang)),
                category: getLocalizedText(knowledge, 'category', lang, getLocalizedText(knowledge, 'categoria', lang)),
                level: safeString(knowledge.level || knowledge.nivel),
                description: getLocalizedText(knowledge, 'description', lang, getLocalizedText(knowledge, 'descripcion', lang))
            })) : null,

        // Studies
        studies: enabledSectionIds.includes('studies') && apiData.studies && Array.isArray(apiData.studies)
            ? apiData.studies.map(study => ({
                title: getLocalizedText(study, 'title', lang, getLocalizedText(study, 'titulo', lang)),
                institution: getLocalizedText(study, 'institution', lang, getLocalizedText(study, 'institucion', lang)),
                date: safeString(study.date || study.fecha),
                duration: safeString(study.duration || study.duracion),
                description: getLocalizedText(study, 'description', lang, getLocalizedText(study, 'descripcion', lang))
            })) : null,

        // Stacks/Technologies
        stacks: enabledSectionIds.includes('stacks') && apiData.stacks && Array.isArray(apiData.stacks)
            ? apiData.stacks.map(stack => ({
                name: getLocalizedText(stack, 'name', lang, getLocalizedText(stack, 'nombre', lang)),
                category: getLocalizedText(stack, 'category', lang, getLocalizedText(stack, 'categoria', lang)),
                level: safeString(stack.level || stack.nivel),
                yearsExperience: stack.years_experience || stack.años_experiencia || 0,
                description: getLocalizedText(stack, 'description', lang, getLocalizedText(stack, 'descripcion', lang))
            })) : null
    };
};

// Section component mapping
const sectionComponents = {
    header: CVHeader,
    summary: CVSummary,
    contact: CVContact,
    experience: VitaeExperience,
    certifications: VitaeCertifications,
    knowledges: VitaeKnowledges,
    studies: VitaeStudies,
    stacks: VitaeStacks,
    custom: VitaeCustomSection
};

// Dynamic Section Renderer
const renderSections = (transformedData, enabledSections, customSections) => {
    return enabledSections.map((section, index) => {
        const SectionComponent = sectionComponents[section.id] || sectionComponents.custom;
        const sectionData = transformedData[section.id];
        
        // Skip if no data and not custom section
        if (!sectionData && !section.isCustom) return null;
        
        // Handle custom sections
        if (section.isCustom) {
            const customSection = customSections.find(cs => cs.id === section.id);
            if (!customSection) return null;
            
            return (
                <Element
                    key={`section-${section.id}-${index}`}
                    is={VitaeCustomSection}
                    canvas
                    title={customSection.name}
                    content={customSection.content}
                />
            );
        }
        
        return (
            <Element
                key={`section-${section.id}-${index}`}
                is={SectionComponent}
                canvas
                {...sectionData}
            />
        );
    });
};

// Main Editor Component
const VitaeEditorContentEnhanced = ({ data, lang }) => {
    const { theme } = useTheme();
    const { getEnabledSections, customSections, addCustomSection } = useSectionOrder();
    const dispatch = useDispatch();
    
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customSectionData, setCustomSectionData] = useState({ title: '', content: '' });

    // Get enabled sections and transform data accordingly
    const enabledSections = getEnabledSections();
    const transformedData = transformApiDataToTemplate(data, lang, enabledSections);

    const { actions, query, enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    // Event handlers
    const handleSave = useCallback(() => {
        console.log('🔄 Iniciando exportación...');
        
        try {
            // Debug: Check if query is available
            console.log('📊 Query object:', query);
            console.log('🎨 Theme object:', theme);
            console.log('📋 Enabled sections:', enabledSections);
            
            // Get the current editor state from Craft.js
            let editorState = null;
            try {
                editorState = query.serialize();
                console.log('✅ Editor state serialized:', editorState);
            } catch (serializeError) {
                console.warn('⚠️ Error serializing editor state:', serializeError);
                // Fallback: create a basic state representation
                editorState = {
                    ROOT: {
                        type: { resolvedName: 'Container' },
                        isCanvas: true,
                        props: {},
                        displayName: 'Container',
                        custom: {},
                        hidden: false,
                        nodes: [],
                        linkedNodes: {}
                    }
                };
            }
            
            // Get current theme and section configuration
            const currentConfig = {
                theme: {
                    template: theme?.template || 'Harvard',
                    colors: theme?.colors || {}
                },
                sections: {
                    enabled: enabledSections || [],
                    custom: customSections || [],
                    order: sectionOrder || []
                },
                language: lang,
                originalData: data // Include original API data for reference
            };
            
            console.log('⚙️ Current config:', currentConfig);
            
            // Create the export object compatible with Craft.js
            const exportData = {
                version: '1.0.0',
                timestamp: new Date().toISOString(),
                craftjs: {
                    state: editorState,
                    resolver: {
                        // List of components that need to be available when importing
                        components: [
                            'Box',
                            'Container', 
                            'CVHeader',
                            'CVSummary',
                            'CVContact',
                            'VitaeKnowledges',
                            'VitaeCertifications',
                            'VitaeExperience',
                            'VitaeCustomSection',
                            'VitaeStudies',
                            'VitaeStacks'
                        ]
                    }
                },
                config: currentConfig,
                metadata: {
                    exportedBy: 'VitaeEditorContainerEnhanced',
                    description: lang === 'es' ? 'Exportación de CV desde el editor' : 'CV export from editor'
                }
            };
            
            console.log('📦 Export data prepared:', exportData);
            
            // Convert to JSON string
            const jsonString = JSON.stringify(exportData, null, 2);
            console.log('📄 JSON string length:', jsonString.length);
            
            // Create blob and download
            const blob = new Blob([jsonString], { type: 'application/json' });
            console.log('🗂️ Blob created:', blob.size, 'bytes');
            
            const url = URL.createObjectURL(blob);
            console.log('🔗 URL created:', url);
            
            // Create download link
            const link = document.createElement('a');
            link.href = url;
            const filename = `cv-export-${new Date().toISOString().split('T')[0]}.json`;
            link.download = filename;
            
            console.log('📥 Download filename:', filename);
            
            // Add to DOM, click, and remove
            document.body.appendChild(link);
            console.log('🖱️ Triggering download click...');
            link.click();
            document.body.removeChild(link);
            
            // Clean up the URL object
            URL.revokeObjectURL(url);
            console.log('🧹 URL cleaned up');
            
            setNotification({
                open: true,
                message: lang === 'es' ? 'CV exportado y descargado exitosamente' : 'CV exported and downloaded successfully',
                severity: 'success'
            });
            
            console.log('✅ Export completed successfully');
            
        } catch (error) {
            console.error('❌ Error exporting CV:', error);
            console.error('Stack trace:', error.stack);
            setNotification({
                open: true,
                message: lang === 'es' ? `Error al exportar el CV: ${error.message}` : `Error exporting CV: ${error.message}`,
                severity: 'error'
            });
        }
    }, [lang, query, theme, enabledSections, customSections, sectionOrder, data]);

    const handleUndo = () => {
        actions.history.undo();
    };

    const handleRedo = () => {
        actions.history.redo();
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setCustomSectionData({ title: '', content: '' });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCustomSectionData({ title: '', content: '' });
    };

    const handleSaveCustomSection = () => {
        if (customSectionData.title.trim()) {
            addCustomSection(customSectionData);
            setNotification({
                open: true,
                message: lang === 'es' ? 'Sección personalizada agregada' : 'Custom section added',
                severity: 'success'
            });
            handleCloseModal();
        }
    };

    const handleDownloadPDF = useCallback(() => {
        const element = document.getElementById('cv-content');
        if (!element) return;

        setNotification({
            open: true,
            message: lang === 'es' ? 'Generando PDF...' : 'Generating PDF...',
            severity: 'info'
        });

        const opt = {
            margin: 0,
            filename: 'cv.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 1, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            setNotification({
                open: true,
                message: lang === 'es' ? 'PDF descargado exitosamente' : 'PDF downloaded successfully',
                severity: 'success'
            });
        }).catch(() => {
            setNotification({
                open: true,
                message: lang === 'es' ? 'Error al generar PDF' : 'Error generating PDF',
                severity: 'error'
            });
        });
    }, [lang]);

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    return (
        <EditorContainer>
            <EditorToolbar position="static" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        {lang === 'es' ? 'Editor de CV' : 'CV Editor'} - {theme.template}
                    </Typography>
                    <PreviewModeButton />
                </Toolbar>
            </EditorToolbar>

            <CVCanvas>
                <CVPaper id="cv-content" themeColors={theme.colors}>
                    <Frame>
                        <Element is={Container} canvas>
                            {renderSections(transformedData, enabledSections, customSections)}
                        </Element>
                    </Frame>
                </CVPaper>
            </CVCanvas>

            {enabled && (
                <FloatingToolbar>
                    <Tooltip title={lang === 'es' ? 'Guardar' : 'Save'} placement="left">
                        <Zoom in={true}>
                            <Fab
                                color="primary"
                                size="medium"
                                onClick={handleSave}
                            >
                                <SaveIcon />
                            </Fab>
                        </Zoom>
                    </Tooltip>

                    <Tooltip title={lang === 'es' ? 'Deshacer' : 'Undo'} placement="left">
                        <Zoom in={true}>
                            <Fab
                                size="small"
                                onClick={handleUndo}
                                sx={{ bgcolor: 'grey.600', '&:hover': { bgcolor: 'grey.700' } }}
                            >
                                <UndoIcon />
                            </Fab>
                        </Zoom>
                    </Tooltip>

                    <Tooltip title={lang === 'es' ? 'Rehacer' : 'Redo'} placement="left">
                        <Zoom in={true}>
                            <Fab
                                size="small"
                                onClick={handleRedo}
                                sx={{ bgcolor: 'grey.600', '&:hover': { bgcolor: 'grey.700' } }}
                            >
                                <RedoIcon />
                            </Fab>
                        </Zoom>
                    </Tooltip>

                    <Tooltip title={lang === 'es' ? 'Agregar Sección' : 'Add Section'} placement="left">
                        <Zoom in={true}>
                            <Fab
                                size="small"
                                onClick={handleOpenModal}
                                sx={{ bgcolor: 'green.600', '&:hover': { bgcolor: 'green.700' } }}
                            >
                                <AddIcon />
                            </Fab>
                        </Zoom>
                    </Tooltip>

                    <Tooltip title={lang === 'es' ? 'Descargar PDF' : 'Download PDF'} placement="left">
                        <Zoom in={true}>
                            <Fab
                                size="medium"
                                sx={{
                                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #ff5252, #d84315)',
                                    }
                                }}
                                onClick={handleDownloadPDF}
                            >
                                <PdfIcon />
                            </Fab>
                        </Zoom>
                    </Tooltip>
                </FloatingToolbar>
            )}

            {/* Notification Snackbar */}
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>

            {/* Custom Section Modal */}
            <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
                <DialogTitle>{lang === 'es' ? 'Crear Nueva Sección' : 'Create New Section'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="section-title"
                        label={lang === 'es' ? 'Título de la Sección' : 'Section Title'}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={customSectionData.title}
                        onChange={(e) => setCustomSectionData({ ...customSectionData, title: e.target.value })}
                    />
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            {lang === 'es' ? 'Contenido:' : 'Content:'}
                        </Typography>
                        <SunEditor
                            lang={lang}
                            setContents={customSectionData.content}
                            onChange={(content) => setCustomSectionData(prev => ({ ...prev, content: content }))}
                            setOptions={{
                                height: 200,
                                buttonList: [
                                    ['undo', 'redo'],
                                    ['bold', 'underline', 'italic', 'strike'],
                                    ['removeFormat'],
                                    ['outdent', 'indent'],
                                    ['list', 'lineHeight'],
                                    ['link']
                                ]
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>{lang === 'es' ? 'Cancelar' : 'Cancel'}</Button>
                    <Button onClick={handleSaveCustomSection} variant="contained">{lang === 'es' ? 'Guardar' : 'Save'}</Button>
                </DialogActions>
            </Dialog>
        </EditorContainer>
    );
};

// Main Container Component with Craft.js Provider
const VitaeEditorContainerEnhanced = ({ data, lang = 'es' }) => {
    return (
        <Editor
            resolver={{
                Box,
                Container,
                CVHeader,
                CVSummary,
                CVContact,
                VitaeKnowledges,
                VitaeCertifications,
                VitaeExperience,
                VitaeCustomSection,
                VitaeStudies,
                VitaeStacks
            }}
            onRender={({ render }) => <div>{render}</div>}
        >
            <VitaeEditorContentEnhanced data={data} lang={lang} />
        </Editor>
    );
};

export default VitaeEditorContainerEnhanced;
