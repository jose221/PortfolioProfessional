import React, { useState, useEffect } from 'react';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';
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
    Alert
} from '@mui/material';
import {
    Save as SaveIcon,
    Preview as PreviewIcon,
    Undo as UndoIcon,
    Redo as RedoIcon,
    Download as DownloadIcon,
    Settings as SettingsIcon,
    PictureAsPdf as PdfIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import html2pdf from 'html2pdf.js';

// Import CV Components
import { CVHeader } from './components/CVHeader';
import { CVSummary } from './components/CVSummary';
import { CVExperience } from './components/CVExperience';
import { CVEducation } from './components/CVEducation';
import { CVSkills } from './components/CVSkills';
import { CVContact } from './components/CVContact';
import { CVSection } from './components/CVSection';

// Import template data
import { harvardTemplateData } from './data/harvardTemplate';

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

const CVPaper = styled(Paper)(({ theme }) => ({
    width: '210mm', // A4 width
    minHeight: '297mm', // A4 height
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
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    }
}));

const FloatingToolbar = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    display: 'flex',
    gap: theme.spacing(1),
    zIndex: 1000
}));

// Data transformation utility functions
const getLocalizedText = (obj, field, lang, fallback = "Sin contenido") => {
    if (!obj) return fallback;
    
    const langField = `${field}_${lang}`;
    if (obj[langField] && obj[langField].trim() !== "") {
        return obj[langField];
    }
    
    if (obj[field] && obj[field].trim() !== "") {
        return obj[field];
    }
    
    return fallback;
};

const isEmptyData = (data) => {
    if (!data) return true;
    if (Array.isArray(data)) return data.length === 0;
    if (typeof data === 'object') return Object.keys(data).length === 0;
    if (typeof data === 'string') return data.trim() === "";
    return false;
};

const transformApiDataToTemplate = (apiData, lang = 'es') => {
    if (!apiData || !Object.keys(apiData).length) {
        return null;
    }

    const data = apiData;
    const {
        myInformation,
        myContacts,
        myKnowledges,
        myPortfolioCategories,
        myPersonalProjects,
        myProfessionalExperiences,
        myCertifications
    } = data;
    
    // Transform header data
    const header = myInformation ? {
        fullName: myInformation.name || "Sin nombre",
        title: getLocalizedText(myInformation, 'header_text', lang),
        subtitle: "" // Harvard style doesn't use subtitle
    } : null;

    // Transform contact data
    const contact = {
        email: myInformation?.email || "",
        phone: "",
        location: getLocalizedText(myInformation, 'country', lang),
        linkedin: "",
        website: "",
        github: ""
    };

    // Extract contact info from myContacts array
    if (myContacts && myContacts.length > 0) {
        myContacts.forEach(contactItem => {
            const name = getLocalizedText(contactItem, 'name', lang).toLowerCase();
            if (name.includes('teléfono') || name.includes('telephone')) {
                contact.phone = contactItem.url_path?.replace('tel:', '') || "";
            } else if (name.includes('linkedin')) {
                contact.linkedin = contactItem.url_path || "";
            } else if (name.includes('github')) {
                contact.github = contactItem.url_path || "";
            }
        });
    }

    // Transform summary data
    const summary = myInformation ? {
        content: getLocalizedText(myInformation, 'description', lang)
    } : null;

    // Transform experience data
    const experience = myProfessionalExperiences && myProfessionalExperiences.length > 0 
        ? myProfessionalExperiences.map((exp, index) => ({
            id: exp.id || index + 1,
            position: getLocalizedText(exp, 'job', lang),
            company: exp.company || "",
            location: getLocalizedText(exp, 'country', lang),
            startDate: exp.date_start ? new Date(exp.date_start).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' }) : "",
            endDate: exp.date_end ? new Date(exp.date_end).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' }) : (exp.still_working ? "Presente" : ""),
            description: getLocalizedText(exp, 'description', lang),
            achievements: [], // We'll extract from description if it contains HTML lists
            technologies: exp.portfolio || []
        }))
        : [];

    // Transform education data (using knowledge as education proxy if needed)
    const education = myKnowledges && myKnowledges.length > 0 
        ? myKnowledges.slice(0, 3).map((knowledge, index) => ({
            id: knowledge.id || index + 1,
            degree: getLocalizedText(knowledge, 'title', lang),
            institution: "Experiencia Profesional", // Since we don't have institution data
            location: "",
            graduationDate: "",
            gpa: "",
            coursework: "",
            honors: getLocalizedText(knowledge, 'description', lang)
        }))
        : [];

    // Transform skills data
    const skills = {
        technical: [],
        soft: []
    };

    if (myPortfolioCategories && myPortfolioCategories.length > 0) {
        myPortfolioCategories.forEach(category => {
            const categoryTitle = getLocalizedText(category, 'title', lang);
            if (category.Portfolios && category.Portfolios.length > 0) {
                const categorySkills = category.Portfolios.map(portfolio => ({
                    name: getLocalizedText(portfolio, 'title', lang),
                    level: portfolio.knowledge_level || portfolio.years_experience || 0,
                    years: portfolio.years_experience || 0
                }));
                
                skills.technical.push({
                    category: categoryTitle,
                    items: categorySkills
                });
            }
        });
    }

    // Transform additional sections
    const additionalSections = [];

    // Add certifications section if data exists
    if (myCertifications && myCertifications.length > 0) {
        additionalSections.push({
            title: lang === 'es' ? 'Certificaciones' : 'Certifications',
            type: 'list',
            data: myCertifications.map(cert => ({
                title: getLocalizedText(cert, 'name', lang),
                subtitle: getLocalizedText(cert, 'organization', lang),
                date: cert.date_obtained || "",
                description: getLocalizedText(cert, 'description', lang)
            }))
        });
    }

    // Add personal projects section if data exists
    if (myPersonalProjects && myPersonalProjects.length > 0) {
        additionalSections.push({
            title: lang === 'es' ? 'Proyectos Personales' : 'Personal Projects',
            type: 'projects',
            data: myPersonalProjects.map(project => ({
                title: getLocalizedText(project, 'name', lang),
                description: getLocalizedText(project, 'description', lang),
                technologies: project.technologies || [],
                url: project.url || ""
            }))
        });
    }

    return {
        templateId: "cv_template_harvard_dynamic",
        templateName: "CV Harvard Plantilla",
        header,
        contact,
        summary,
        experience,
        education,
        skills,
        additionalSections,
        lang
    };
};

// Main Editor Component (without Craft.js context)
const VitaeEditorContent = ({ data, lang }) => {
    const { actions, query, enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    const [templateData, setTemplateData] = useState(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

    // Transform API data to template format
    useEffect(() => {
        if (data) {
            const transformed = transformApiDataToTemplate(data, lang);
        
            if (transformed) {
                setTemplateData(transformed);
                console.log('CV Data transformed successfully:', transformed);
            } else {
                setNotification({ 
                    open: true, 
                    message: 'No se pudieron cargar los datos del CV', 
                    severity: 'error' 
                });
            }
        }
    }, [data, lang]);

    const handleSave = () => {
        const json = query.serialize();
        console.log('Saving CV:', json);
        setNotification({ 
            open: true, 
            message: 'CV guardado correctamente', 
            severity: 'success' 
        });
    };

    const handlePreview = () => {
        const newPreviewMode = !isPreviewMode;
        setIsPreviewMode(newPreviewMode);
        actions.setOptions({ enabled: !newPreviewMode });
    };

    const handleUndo = () => {
        actions.history.undo();
    };

    const handleRedo = () => {
        actions.history.redo();
    };

    const handleDownloadPDF = async () => {
        try {
            const element = document.querySelector('[data-cv-content]');
            if (!element) {
                setNotification({ 
                    open: true, 
                    message: 'No se pudo encontrar el contenido del CV', 
                    severity: 'error' 
                });
                return;
            }

            const opt = {
                margin: [10, 10, 10, 10],
                filename: `CV_${templateData?.header?.fullName?.replace(/\s+/g, '_') || 'Harvard'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    letterRendering: true
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait' 
                }
            };

            await html2pdf().set(opt).from(element).save();
            
            setNotification({ 
                open: true, 
                message: 'CV descargado correctamente', 
                severity: 'success' 
            });
        } catch (error) {
            console.error('Error downloading PDF:', error);
            setNotification({ 
                open: true, 
                message: 'Error al descargar el CV', 
                severity: 'error' 
            });
        }
    };

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    if (!templateData) {
        return (
            <EditorContainer>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh',
                    color: 'white' 
                }}>
                    <Typography variant="h6">Cargando datos del CV...</Typography>
                </Box>
            </EditorContainer>
        );
    }

    return (
        <EditorContainer>
            <EditorToolbar position="static" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        CV Harvard Plantilla - Editor Visual {templateData.header?.fullName && `- ${templateData.header.fullName}`}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Deshacer">
                            <IconButton onClick={handleUndo} color="inherit">
                                <UndoIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Rehacer">
                            <IconButton onClick={handleRedo} color="inherit">
                                <RedoIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={isPreviewMode ? "Editar" : "Vista Previa"}>
                            <Button
                                variant={isPreviewMode ? "contained" : "outlined"}
                                onClick={handlePreview}
                                startIcon={<PreviewIcon />}
                                sx={{ ml: 2 }}
                            >
                                {isPreviewMode ? "Editar" : "Vista Previa"}
                            </Button>
                        </Tooltip>

                        <Tooltip title="Descargar PDF">
                            <Button
                                variant="outlined"
                                onClick={handleDownloadPDF}
                                startIcon={<PdfIcon />}
                                sx={{ ml: 1 }}
                            >
                                PDF
                            </Button>
                        </Tooltip>

                        <Button
                            variant="contained"
                            onClick={handleSave}
                            startIcon={<SaveIcon />}
                            sx={{
                                ml: 1,
                                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                                }
                            }}
                        >
                            Guardar
                        </Button>
                    </Box>
                </Toolbar>
            </EditorToolbar>

            <CVCanvas>
                <CVPaper elevation={8} data-cv-content>
                    <Frame>
                        <Element
                            is={Container}
                            maxWidth={false}
                            sx={{ padding: 0 }}
                            canvas
                        >
                            {/* CV Header */}
                            {templateData.header && !isEmptyData(templateData.header) && (
                                <Element
                                    is={CVHeader}
                                    data={templateData.header}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Contact Information */}
                            {templateData.contact && !isEmptyData(templateData.contact) && (
                                <Element
                                    is={CVContact}
                                    data={templateData.contact}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Professional Summary */}
                            {templateData.summary && !isEmptyData(templateData.summary.content) && (
                                <Element
                                    is={CVSummary}
                                    title={lang === 'es' ? "Resumen Profesional" : "Professional Summary"}
                                    data={templateData.summary}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Work Experience */}
                            {templateData.experience && templateData.experience.length > 0 && (
                                <Element
                                    is={CVExperience}
                                    title={lang === 'es' ? "Experiencia Laboral" : "Work Experience"}
                                    data={templateData.experience}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Education */}
                            {templateData.education && templateData.education.length > 0 && (
                                <Element
                                    is={CVEducation}
                                    title={lang === 'es' ? "Educación" : "Education"}
                                    data={templateData.education}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Skills */}
                            {templateData.skills && (templateData.skills.technical.length > 0 || templateData.skills.soft.length > 0) && (
                                <Element
                                    is={CVSkills}
                                    title={lang === 'es' ? "Habilidades" : "Skills"}
                                    data={templateData.skills}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Additional Sections (dynamically rendered) */}
                            {templateData.additionalSections?.map((section, index) => (
                                !isEmptyData(section.data) && (
                                    <Element
                                        key={`section-${index}`}
                                        is={CVSection}
                                        title={section.title}
                                        data={section.data}
                                        type={section.type}
                                        lang={lang}
                                        canvas
                                    />
                                )
                            ))}
                        </Element>
                    </Frame>
                </CVPaper>
            </CVCanvas>

            {/* Floating Action Buttons */}
            {!isPreviewMode && (
                <FloatingToolbar>
                    <Tooltip title="Configuración">
                        <Fab
                            size="medium"
                            sx={{
                                background: 'rgba(255,255,255,0.9)'
                            }}
                        >
                            <SettingsIcon />
                        </Fab>
                    </Tooltip>

                    <Tooltip title="Descargar CV como PDF">
                        <Fab
                            color="secondary"
                            size="medium"
                            onClick={handleDownloadPDF}
                            sx={{
                                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)'
                            }}
                        >
                            <DownloadIcon />
                        </Fab>
                    </Tooltip>
                </FloatingToolbar>
            )}

            {/* Notification Snackbar */}
            <Snackbar
                open={notification.open}
                autoHideDuration={4000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert 
                    onClose={handleCloseNotification} 
                    severity={notification.severity}
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </EditorContainer>
    );
};

// Main Container Component with Craft.js Provider
const VitaeEditorContainer = ({ data, lang = 'es' }) => {
    return (
        <Editor
            resolver={{
                Box,
                Container,
                CVHeader,
                CVSummary,
                CVExperience,
                CVEducation,
                CVSkills,
                CVContact,
                CVSection
            }}
            onRender={({ render }) => <div>{render}</div>}
        >
            <VitaeEditorContent data={data} lang={lang} />
        </Editor>
    );
};

export default VitaeEditorContainer;
