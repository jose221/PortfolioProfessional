import React, { useState, useEffect } from 'react';
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
    Add as AddIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import html2pdf from 'html2pdf.js';

// Import CV Components
import { CVHeader } from './components/CVHeader';
import { CVSummary } from './components/CVSummary';
import { CVContact } from './components/CVContact';
import { VitaeEducation } from './components/VitaeEducation';
import { VitaeKnowledges } from './components/VitaeKnowledges';
import { VitaeSkills } from './components/VitaeSkills';
import { VitaeCertifications } from './components/VitaeCertifications';
import { VitaeExperience } from './components/VitaeExperience';
import { VitaeCustomSection } from './components/VitaeCustomSection';
import { VitaeStudies } from './components/VitaeStudies';
import { VitaeStacks } from './components/VitaeStacks';


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
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
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
    if (typeof data === 'string') return data.trim() === "";
    return false;
};

const safeString = (value, fallback = "") => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') return fallback;
    return String(value || fallback);
};

const transformApiDataToTemplate = (apiData, lang = 'es') => {
    if (!apiData || !Object.keys(apiData).length) {
        return null;
    }
    console.log("apiData",apiData)
    const {
        myInformation,
        myContacts,
        myKnowledges,
        myPersonalProjects,
        myProfessionalExperiences,
        myCertifications,
        myStudies,
        mySkills,
        myVitaeStacks
    } = apiData;

    // Transform header data
    const header = myInformation ? {
        fullName: safeString(myInformation.name, "Sin nombre"),
        title: getLocalizedText(myInformation, 'header_text', lang, ""),
        subtitle: ""
    } : null;

    // Transform contact data
    const contact = {
        email: safeString(myInformation?.email, ""),
        phone: "",
        location: getLocalizedText(myInformation, 'country', lang, ""),
        linkedin: "",
        website: "",
        github: ""
    };

    // Extract contact info from myContacts array
    if (myContacts && Array.isArray(myContacts)) {
        myContacts.forEach(contactItem => {
            if (!contactItem || typeof contactItem !== 'object') return;

            const name = getLocalizedText(contactItem, 'name', lang).toLowerCase();
            const urlPath = safeString(contactItem.url_path, "");

            if (name.includes('teléfono') || name.includes('telephone') || name.includes('phone')) {
                contact.phone = urlPath.replace('tel:', '');
            } else if (name.includes('linkedin')) {
                contact.linkedin = urlPath;
            } else if (name.includes('github')) {
                contact.github = urlPath;
            }
        });
    }

    // Transform summary data
    const summary = myInformation ? {
        content: getLocalizedText(myInformation, 'description', lang, "")
    } : null;

    // Transform experience data
    const experience = myProfessionalExperiences && Array.isArray(myProfessionalExperiences)
        ? myProfessionalExperiences.map((exp, index) => {
            if (!exp || typeof exp !== 'object') return null;

            return {
                id: exp.id || index + 1,
                position: getLocalizedText(exp, 'job', lang, "Puesto"),
                company: safeString(exp.company, "Empresa"),
                location: getLocalizedText(exp, 'country', lang, ""),
                startDate: exp.date_start ? new Date(exp.date_start).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' }) : "",
                endDate: exp.date_end ? new Date(exp.date_end).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' }) : (exp.still_working ? "Presente" : ""),
                description: getLocalizedText(exp, 'description', lang, ""),
                technologies: Array.isArray(exp.portfolio) ? exp.portfolio.map(tech => {
                    if (!tech || typeof tech !== 'object') return safeString(tech, "");
                    return getLocalizedText(tech, 'title', lang, safeString(tech.code, ""));
                }) : []
            };
        }).filter(Boolean)
        : [];

    // Transform education data
    const education = myInformation && myInformation.myEducation && Array.isArray(myInformation.myEducation)
        ? myInformation.myEducation.map((edu, index) => {
            if (!edu || typeof edu !== 'object') return null;

            return {
                id: edu.id || index + 1,
                degree: getLocalizedText(edu, 'title', lang, "Título"),
                institution: getLocalizedText(edu, 'institution', lang, "Institución"),
                location: getLocalizedText(edu, 'country', lang, ""),
                graduationDate: edu.date_end ? new Date(edu.date_end).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }) : "",
                gpa: safeString(edu.gpa, ""),
                coursework: getLocalizedText(edu, 'coursework', lang, ""),
                honors: getLocalizedText(edu, 'honors', lang, "")
            };
        }).filter(Boolean)
        : [];

    // Transform studies data
    const studies = myStudies && Array.isArray(myStudies)
        ? myStudies.map((study, index) => {
            if (!study || typeof study !== 'object') return null;

            return {
                id: study.id || index + 1,
                degree: getLocalizedText(study, 'caerrer', lang, "Carrera"),
                institution: getLocalizedText(study, 'school', lang, "Institución"),
                folio: safeString(study.folio, ""),
                graduationDate: "",
                gpa: "",
                coursework: "",
                honors: ""
            };
        }).filter(Boolean)
        : [];

    // Transform skills data (prioritize mySkills, fallback to myPortfolioCategories)
    let skills = [];

    // First try mySkills if it exists and has data
    if (mySkills && Array.isArray(mySkills) && mySkills.length > 0) {
        skills = mySkills.map((skill, index) => {
            if (!skill || typeof skill !== 'object') return null;

            return {
                id: skill.id || index + 1,
                title: getLocalizedText(skill, 'title', lang, "Habilidad"),
                knowledge_level: skill.knowledge_level,
                years_experience: skill.years_experience,
                description: getLocalizedText(skill, 'description', lang, "")
            };
        }).filter(Boolean);
    }

    // Fallback to myPortfolioCategories if mySkills is empty
    if (skills.length === 0 && myVitaeStacks && Array.isArray(myVitaeStacks)) {
        myVitaeStacks.forEach(category => {
            if (category.Portfolios && category.Portfolios.length > 0) {
                category.Portfolios.forEach(portfolio => {
                    const skillTitle = getLocalizedText(portfolio, 'title', lang);
                    if (typeof skillTitle === 'string' && skillTitle.trim() !== '') {
                        skills.push(skillTitle.trim());
                    } else if (portfolio.title && typeof portfolio.title === 'string') {
                        skills.push(portfolio.title.trim());
                    } else if (portfolio.name && typeof portfolio.name === 'string') {
                        skills.push(portfolio.name.trim());
                    }
                });
            }
        });
    }

    // Transform knowledges data
    const knowledges = myKnowledges && Array.isArray(myKnowledges)
        ? myKnowledges.map((knowledge, index) => {
            if (!knowledge || typeof knowledge !== 'object') return null;

            return {
                id: knowledge.id || index + 1,
                name: getLocalizedText(knowledge, 'title', lang, "Conocimiento"),
                description: getLocalizedText(knowledge, 'description', lang, "")
            };
        }).filter(Boolean)
        : [];

    // Transform certifications data
    const certifications = myCertifications && Array.isArray(myCertifications)
        ? myCertifications.map((cert, index) => {
            if (!cert || typeof cert !== 'object') return null;

            return {
                id: cert.id || index + 1,
                title: safeString(cert.name, "Certificación"),
                subtitle: safeString(cert.issuing_organization, "Organización"),
                date: safeString(cert.issue_date, ""),
                description: safeString(cert.description, "")
            };
        }).filter(Boolean)
        : [];

    // Transform stacks data
    const stacks = myVitaeStacks && Array.isArray(myVitaeStacks)
        ? myVitaeStacks.map((stack, index) => {
            if (!stack || typeof stack !== 'object') return null;

            return {
                id: stack.id || index + 1,
                title: getLocalizedText(stack, 'title', lang, "Tecnología"),
                description: getLocalizedText(stack, 'description', lang, ""),
                Portfolios: Array.isArray(stack.Portfolios) ? stack.Portfolios : [],
            };
        }).filter(Boolean)
        : [];
    console.log("la experiencia", experience)
    console.log("los stacks", stacks)
    return {
        templateId: "cv_template_harvard_dynamic",
        templateName: "CV Harvard Plantilla",
        header,
        contact,
        summary,
        experience,
        education,
        studies,
        skills,
        knowledges,
        certifications,
        stacks,
        lang
    };
};

// Main Editor Component
const   VitaeEditorContent = ({ data, lang }) => {
    const { actions, query, enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    const [templateData, setTemplateData] = useState(null);

    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customSectionData, setCustomSectionData] = useState({ title: '', content: '' });

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

    const handleUndo = () => {
        actions.history.undo();
    };

    const handleRedo = () => {
        actions.history.redo();
    };

    const handleOpenModal = () => {
        setCustomSectionData({ title: 'Nueva Sección', content: '<p>Contenido inicial...</p>' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveCustomSection = () => {
        if (!customSectionData.title.trim()) return;

        const newNode = {
            type: VitaeCustomSection,
            props: {
                title: customSectionData.title,
                content: customSectionData.content,
                lang: lang
            }
        };
        actions.add(newNode, 'cv-container');
        handleCloseModal();
        setNotification({
            open: true,
            message: 'Sección personalizada añadida',
            severity: 'success'
        });
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
                                id="cv-container"
                                maxWidth={false}
                                sx={{ padding: 0 }}
                                canvas
                            >
                            {/* CV Header */}
                            {templateData.header && !isEmptyData(templateData.header) && (
                                <Element
                                    is={CVHeader}
                                    id="header-section"
                                    data={templateData.header}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Contact Information */}
                            {templateData.contact && !isEmptyData(templateData.contact) && (
                                <Element
                                    is={CVContact}
                                    id="contact-section"
                                    data={templateData.contact}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Professional Summary */}
                            {templateData.summary && !isEmptyData(templateData.summary.content) && (
                                <Element
                                    is={CVSummary}
                                    id="summary-section"
                                    title={lang === 'es' ? "Resumen Profesional" : "Professional Summary"}
                                    data={templateData.summary}
                                    lang={lang}
                                    canvas
                                />
                            )}
                            {/* Work Experience */}
                            {templateData.experience && templateData.experience.length > 0 && (
                                <Element
                                    is={VitaeExperience}
                                    id="experience-section"
                                    title={lang === 'es' ? "Experiencia Laboral" : "Work Experience"}
                                    data={templateData.experience}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Education */}
                            {templateData.education && templateData.education.length > 0 && (
                                <Element
                                    is={VitaeEducation}
                                    id="education-section"
                                    title={lang === 'es' ? "Educación" : "Education"}
                                    data={templateData.education}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Studies */}
                            {templateData.studies && templateData.studies.length > 0 && (
                                <Element
                                    is={VitaeStudies}
                                    id="studies-section"
                                    title={lang === 'es' ? "Estudios" : "Studies"}
                                    data={templateData.studies}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Knowledges */}
                            {templateData.knowledges && templateData.knowledges.length > 0 && (
                                <Element
                                    is={VitaeKnowledges}
                                    id="knowledges-section"
                                    title={lang === 'es' ? 'Conocimientos Técnicos' : 'Technical Knowledge'}
                                    data={templateData.knowledges}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Certifications */}
                            {templateData.certifications && templateData.certifications.length > 0 && (
                                <Element
                                    is={VitaeCertifications}
                                    id="certifications-section"
                                    title={lang === 'es' ? 'Certificaciones' : 'Certifications'}
                                    data={templateData.certifications}
                                    lang={lang}
                                    canvas
                                />
                            )}

                            {/* Stacks */}
                            {templateData.stacks && templateData.stacks.length > 0 && (
                                <Element
                                    is={VitaeStacks}
                                    id="stacks-section"
                                    title={lang === 'es' ? 'Tecnologías' : 'Stacks'}
                                    data={templateData.stacks}
                                    lang={lang}
                                    canvas
                                />
                            )}
                        </Element>
                    </Frame>
                </CVPaper>
            </CVCanvas>

            {/* Floating Action Buttons */}
            {enabled && (
                <FloatingToolbar>
                    <Tooltip title={lang === 'es' ? 'Añadir Sección' : 'Add Section'} placement="left">
                        <Zoom in={enabled}>
                            <Fab color="primary" aria-label="add section" onClick={handleOpenModal}>
                                <AddIcon />
                            </Fab>
                        </Zoom>
                    </Tooltip>
                    <Tooltip title={lang === 'es' ? 'Guardar Cambios' : 'Save Changes'} placement="left">
                        <Zoom in={enabled}>
                            <Fab color="secondary" aria-label="save" onClick={handleSave}>
                                <SaveIcon />
                            </Fab>
                        </Zoom>
                    </Tooltip>
                    <Tooltip title="Descargar PDF" placement="left">
                        <Zoom in={enabled}>
                            <Fab
                                sx={{
                                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #ff5252, #d84315)',
                                    }
                                }}
                                aria-label="download pdf"
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
const VitaeEditorContainer = ({ data, lang = 'es' }) => {
    return (
        <Editor
            resolver={{
                Box,
                Container,
                CVHeader,
                CVSummary,
                CVContact,
                VitaeEducation,
                VitaeKnowledges,
                VitaeSkills,
                VitaeCertifications,
                VitaeExperience,
                VitaeCustomSection,
                VitaeStudies,
                VitaeStacks
            }}
            onRender={({ render }) => <div>{render}</div>}
        >
            <VitaeEditorContent data={data} lang={lang} />
        </Editor>
    );
};

export default VitaeEditorContainer;
