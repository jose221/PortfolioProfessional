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
    Undo as UndoIcon,
    Redo as RedoIcon,
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
import PreviewModeButton from './components/PreviewModeButton';
import SaveOptionsModal from './components/SaveOptionsModal';
import { enablePreviewMode, disablePreviewMode } from '../../../redux/actions/preview-mode.js';
import { useDispatch } from 'react-redux';


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
                title: getLocalizedText(knowledge, 'title', lang, "Conocimiento"),
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
const VitaeEditorContent = ({ data, lang, onOpenConfiguration, enabledSections = [], themeColors = {} }) => {
    const { actions, query, enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    const [templateData, setTemplateData] = useState(null);
    
    // Function to check if a section is enabled
    const isSectionEnabled = (sectionId) => {
        if (enabledSections.length === 0) {
            // If no configuration is provided, show all sections (default behavior)
            return true;
        }
        return enabledSections.some(section => section.id === sectionId && section.enabled);
    };
    
    // Create a mapping of section components
    const sectionComponents = {
        header: {
            component: CVHeader,
            data: templateData?.header,
            isEmpty: () => !templateData?.header || isEmptyData(templateData.header),
            title: null // Header doesn't need a title
        },
        contact: {
            component: CVContact,
            data: templateData?.contact,
            isEmpty: () => !templateData?.contact || isEmptyData(templateData.contact),
            title: null // Contact doesn't need a title
        },
        summary: {
            component: CVSummary,
            data: templateData?.summary,
            isEmpty: () => !templateData?.summary || isEmptyData(templateData.summary.content),
            title: lang === 'es' ? "Resumen Profesional" : "Professional Summary"
        },
        experience: {
            component: VitaeExperience,
            data: templateData?.experience,
            isEmpty: () => !templateData?.experience || templateData.experience.length === 0,
            title: lang === 'es' ? "Experiencia Laboral" : "Work Experience"
        },
        education: {
            component: VitaeEducation,
            data: templateData?.education,
            isEmpty: () => !templateData?.education || templateData.education.length === 0,
            title: lang === 'es' ? "Educación" : "Education"
        },
        studies: {
            component: VitaeStudies,
            data: templateData?.studies,
            isEmpty: () => !templateData?.studies || templateData.studies.length === 0,
            title: lang === 'es' ? "Estudios" : "Studies"
        },
        knowledges: {
            component: VitaeKnowledges,
            data: templateData?.knowledges,
            isEmpty: () => !templateData?.knowledges || templateData.knowledges.length === 0,
            title: lang === 'es' ? 'Conocimientos Técnicos' : 'Technical Knowledge'
        },
        certifications: {
            component: VitaeCertifications,
            data: templateData?.certifications,
            isEmpty: () => !templateData?.certifications || templateData.certifications.length === 0,
            title: lang === 'es' ? 'Certificaciones' : 'Certifications'
        },
        stacks: {
            component: VitaeStacks,
            data: templateData?.stacks,
            isEmpty: () => !templateData?.stacks || templateData.stacks.length === 0,
            title: lang === 'es' ? 'Habilidades y Competencias' : 'Skills & Competencies'
        }
    };
    
    // Function to render sections in the configured order
    const renderSectionsInOrder = () => {
        if (enabledSections.length === 0) {
            // If no configuration, render all sections in default order
            return Object.keys(sectionComponents).map(sectionId => 
                renderSection(sectionId, sectionComponents[sectionId])
            ).filter(Boolean);
        }
        
        // Render sections in the user-configured order
        return enabledSections
            .filter(section => section.enabled)
            .map(section => {
                const sectionConfig = sectionComponents[section.id];
                if (!sectionConfig) {
                    // Section component not found
                    return null;
                }
                return renderSection(section.id, sectionConfig);
            })
            .filter(Boolean);
    };
    
    // Function to render a single section
    const renderSection = (sectionId, config) => {
        if (!config || config.isEmpty()) {
            return null;
        }
        
        const Component = config.component;
        const props = {
            id: `${sectionId}-section`,
            data: config.data,
            lang: lang,
            canvas: true,
            'data-section': sectionId
        };
        
        if (config.title) {
            props.title = config.title;
        }
        
        return (
            <Element
                key={sectionId}
                is={Component}
                {...props}
            />
        );
    };
    


    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customSectionData, setCustomSectionData] = useState({ title: '', content: '' });
    const [showSaveOptionsModal, setShowSaveOptionsModal] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    // CSS Pagination Hook
    // Estado simple para paginación CSS
    const [paginationEnabled, setPaginationEnabled] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    // Constantes para página A4
    const PAGE_HEIGHT = 792; // px
    const PAGE_MARGIN = 40; // px
    const EFFECTIVE_PAGE_HEIGHT = PAGE_HEIGHT - (PAGE_MARGIN * 2);

    // Función para calcular saltos de página inteligentes
    const calculatePageBreaks = useCallback(() => {
        const container = document.querySelector('#cv-container');
        if (!container) return;

        const sections = container.querySelectorAll('[data-section]');
        if (sections.length === 0) return;

        let currentPageHeight = 0;
        let currentPage = 1;

        // Limpiar clases existentes
        sections.forEach(section => {
            section.classList.remove('page-break-before');
        });

        sections.forEach((section, index) => {
            const sectionHeight = section.offsetHeight || 0;
            

            
            // Verificar si la sección cabe en la página actual
            if (currentPageHeight + sectionHeight > EFFECTIVE_PAGE_HEIGHT && currentPageHeight > 0) {
                // Nueva página necesaria
                section.classList.add('page-break-before');
                currentPage++;
                currentPageHeight = sectionHeight;

            } else {
                currentPageHeight += sectionHeight;
            }
            
            // Marcar sección con página actual
            section.setAttribute('data-page', currentPage);
        });
        
        setTotalPages(currentPage);

    }, [EFFECTIVE_PAGE_HEIGHT]);

    // Función para alternar paginación
    const togglePagination = useCallback(() => {
        setPaginationEnabled(prev => {
            const newValue = !prev;
            
            // Aplicar o remover clase CSS al contenedor usando querySelector
            const container = document.querySelector('#cv-container');
            if (container) {
                if (newValue) {
                    container.classList.add('pagination-enabled');
                    // Calcular saltos de página después de aplicar estilos
                    setTimeout(() => {
                        calculatePageBreaks();
                    }, 100);
                } else {
                    container.classList.remove('pagination-enabled');
                    // Limpiar saltos de página
                    const sections = container.querySelectorAll('[data-section]');
                    sections.forEach(section => {
                        section.classList.remove('page-break-before');
                        section.removeAttribute('data-page');
                    });
                    setTotalPages(1);
                }
            }
            
            return newValue;
        });
    }, [calculatePageBreaks]);



    // Transform API data to template format
    useEffect(() => {
        if (data) {
            const transformed = transformApiDataToTemplate(data, lang);

            if (transformed) {
                setTemplateData(transformed);

            }
        }
    }, [data, lang]);

    const handleSave = () => {
        setShowSaveOptionsModal(true);
    };

    // Function to export CV data as JSON (original functionality)
    const exportCVAsJSON = () => {
        try {
            // Get the current editor state from Craft.js
            const editorState = query.serialize();
            
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
                            'VitaeEducation',
                            'VitaeKnowledges',
                            'VitaeSkills',
                            'VitaeCertifications',
                            'VitaeExperience',
                            'VitaeCustomSection',
                            'VitaeStudies',
                            'VitaeStacks'
                        ]
                    }
                },
                config: {
                    language: lang,
                    enabledSections: enabledSections || [],
                    themeColors: themeColors || {},
                    originalData: data // Include original API data for reference
                },
                metadata: {
                    exportedBy: 'VitaeEditorContainer',
                    description: lang === 'es' ? 'Exportación de CV desde el editor' : 'CV export from editor'
                }
            };
            
            // Convert to JSON string
            const jsonString = JSON.stringify(exportData, null, 2);
            
            // Create data URL (more reliable than blob for downloads)
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);
            
            // Create download link
            const link = document.createElement('a');
            link.href = dataStr;
            const filename = `cv-export-${new Date().toISOString().split('T')[0]}.json`;
            link.download = filename;
            link.setAttribute('download', filename);
            link.style.display = 'none';
            link.rel = 'noopener';
            
            // Add to DOM and trigger download
            document.body.appendChild(link);
            link.click();
            
            // Clean up after a short delay
            setTimeout(() => {
                document.body.removeChild(link);
            }, 100);
            
            return true;
        } catch (error) {
            console.error('Error exporting CV as JSON:', error);
            return false;
        }
    };

    // Function to save CV to history (API call)
    const saveCVToHistory = async () => {
        try {
            setSaveLoading(true);
            
            // Generate PDF blob first
            const pdfBlob = await generatePDFBlob();
            if (!pdfBlob) {
                throw new Error('Failed to generate PDF');
            }

            // Create FormData to send to API
            const formData = new FormData();
            
            // Add PDF file
            const filename = `cv-${new Date().toISOString().split('T')[0]}.pdf`;
            formData.append('path', pdfBlob, filename);
            
            // Add other required fields (adjust based on your FormVitaeComponent structure)
            formData.append('name', data?.myInformation?.name || 'CV Sin Nombre');
            formData.append('description', lang === 'es' ? 'CV generado desde el editor' : 'CV generated from editor');
            
            // Make API call to save CV
            const primary_url = window.url_api + "/admin/history-curriculum-vitae";
            const response = await fetch(primary_url, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            setNotification({
                open: true,
                message: lang === 'es' ? 'CV guardado en el historial exitosamente' : 'CV saved to history successfully',
                severity: 'success'
            });

            return true;
        } catch (error) {
            console.error('Error saving CV to history:', error);
            setNotification({
                open: true,
                message: lang === 'es' ? `Error al guardar en el historial: ${error.message}` : `Error saving to history: ${error.message}`,
                severity: 'error'
            });
            return false;
        } finally {
            setSaveLoading(false);
        }
    };

    // Function to generate PDF blob for saving
    const generatePDFBlob = async () => {
        try {
            dispatch(enablePreviewMode());
            const element = document.querySelector('[data-cv-content]');
            const container = document.querySelector('#cv-container');
            
            if (!element || !container) {
                throw new Error('CV content not found');
            }

            // Apply intelligent page breaks
            const applyIntelligentPageBreaks = () => {
                const sections = container.querySelectorAll('[data-section]');
                const EFFECTIVE_HEIGHT_PX = 752; // A4 height minus margins
                
                let currentPageHeight = 0;
                let pageNumber = 1;
                
                sections.forEach(section => {
                    section.classList.remove('pdf-page-break-before');
                    section.style.pageBreakInside = 'avoid';
                    section.style.breakInside = 'avoid';
                });
                
                sections.forEach((section) => {
                    const sectionHeight = section.offsetHeight || 0;
                    
                    if (currentPageHeight + sectionHeight > EFFECTIVE_HEIGHT_PX && currentPageHeight > 0) {
                        section.classList.add('pdf-page-break-before');
                        section.style.pageBreakBefore = 'always';
                        pageNumber++;
                        currentPageHeight = sectionHeight;
                    } else {
                        currentPageHeight += sectionHeight;
                    }
                    
                    section.setAttribute('data-pdf-page', pageNumber);
                });
                
                return pageNumber;
            };

            const totalPages = applyIntelligentPageBreaks();

            const opt = {
                margin: [10, 10, 10, 10],
                filename: `cv-${new Date().toISOString().split('T')[0]}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    width: element.offsetWidth,
                    height: element.offsetHeight
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait',
                    compress: true
                },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            // Generate PDF as blob
            const pdfBlob = await html2pdf().set(opt).from(element).outputPdf('blob');

            // Clean up page breaks
            const sections = container.querySelectorAll('[data-section]');
            sections.forEach(section => {
                section.classList.remove('pdf-page-break-before');
                section.style.pageBreakBefore = '';
                section.style.pageBreakInside = '';
                section.style.breakInside = '';
                section.removeAttribute('data-pdf-page');
            });

            dispatch(disablePreviewMode());
            return pdfBlob;
        } catch (error) {
            dispatch(disablePreviewMode());
            throw error;
        }
    };

    // Save Options Modal Handlers
    const handleSaveToHistory = async () => {
        const success = await saveCVToHistory();
        if (success) {
            setShowSaveOptionsModal(false);
        }
    };

    const handleDownloadOnly = async () => {
        setSaveLoading(true);
        try {
            await handleDownloadPDF();
            setShowSaveOptionsModal(false);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        } finally {
            setSaveLoading(false);
        }
    };

    const handleBothActions = async () => {
        setSaveLoading(true);
        try {
            // First save to history
            const saveSuccess = await saveCVToHistory();
            
            if (saveSuccess) {
                // Then download PDF
                await handleDownloadPDF();
                setShowSaveOptionsModal(false);
                
                setNotification({
                    open: true,
                    message: lang === 'es' ? 'CV guardado en historial y descargado exitosamente' : 'CV saved to history and downloaded successfully',
                    severity: 'success'
                });
            }
        } catch (error) {
            console.error('Error in both actions:', error);
        } finally {
            setSaveLoading(false);
        }
    };

    const handleCloseSaveModal = () => {
        if (!saveLoading) {
            setShowSaveOptionsModal(false);
        }
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
    const dispatch = useDispatch();
    const handleDownloadPDF = async () => {
        try {
            dispatch(enablePreviewMode());
            const element = document.querySelector('[data-cv-content]');
            const container = document.querySelector('#cv-container');
            
            if (!element || !container) {
                setNotification({
                    open: true,
                    message: 'No se pudo encontrar el contenido del CV',
                    severity: 'error'
                });
                return;
            }

            // Mostrar indicador de carga
            setNotification({
                open: true,
                message: lang === 'es' ? 'Generando PDF con paginado inteligente...' : 'Generating PDF with smart pagination...',
                severity: 'info'
            });

            // PASO 1: Definir constantes de página
            const PAGE_HEIGHT_MM = 297; // A4 height in mm
            const PAGE_MARGIN_MM = 5;    // márgenes mínimos en mm
            const EFFECTIVE_HEIGHT_MM = PAGE_HEIGHT_MM - (PAGE_MARGIN_MM * 2);
            const PX_TO_MM = 0.264583;   // conversion factor
            const EFFECTIVE_HEIGHT_PX = EFFECTIVE_HEIGHT_MM / PX_TO_MM;
            
            // PASO 2: Aplicar estilos de paginado temporalmente
            const originalClasses = container.className;
            container.classList.add('pdf-generation-mode');
            
            // PASO 3: Calcular y aplicar saltos de página inteligentes
            const applyIntelligentPageBreaks = () => {
                const sections = container.querySelectorAll('[data-section]');
                
                let currentPageHeight = 0;
                let pageNumber = 1;
                
                // Limpiar clases existentes
                sections.forEach(section => {
                    section.classList.remove('pdf-page-break-before');
                    section.style.pageBreakInside = 'avoid';
                    section.style.breakInside = 'avoid';
                });
                
                sections.forEach((section, index) => {
                    const sectionHeight = section.offsetHeight || 0;
                    

                    
                    // Verificar si la sección cabe en la página actual
                    if (currentPageHeight + sectionHeight > EFFECTIVE_HEIGHT_PX && currentPageHeight > 0) {
                        // Nueva página necesaria
                        section.classList.add('pdf-page-break-before');
                        section.style.pageBreakBefore = 'always';
                        pageNumber++;
                        currentPageHeight = sectionHeight;

                    } else {
                        currentPageHeight += sectionHeight;
                    }
                    
                    section.setAttribute('data-pdf-page', pageNumber);
                });
                

                return pageNumber;
            };
            
            // Aplicar saltos de página después de que los estilos se hayan aplicado
            await new Promise(resolve => setTimeout(resolve, 200));
            const totalPages = applyIntelligentPageBreaks();
            
            // PASO 3: Configuración de alta calidad para PDF
            const opt = {
                margin: [12, 0, 2, 0],
                filename: `CV_${templateData?.header?.fullName?.replace(/\s+/g, '_') || 'Professional'}.pdf`,
                image: { 
                    type: 'jpeg', 
                    quality: 1.0 // Máxima calidad
                },
                html2canvas: {
                    scale: 2, // Escala reducida para evitar cortes
                    useCORS: true,
                    letterRendering: true,
                    allowTaint: false,
                    backgroundColor: '#ffffff',
                    removeContainer: false,
                    imageTimeout: 15000,
                    logging: false,
                    width: null, // Permitir ancho automático
                    height: null // Permitir altura automática
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait',
                    compress: false // No comprimir para mejor calidad
                },
                pagebreak: {
                    mode: ['avoid-all', 'css', 'legacy'],
                    before: '.pdf-page-break-before',
                    after: '.pdf-page-break-after',
                    avoid: '[data-section]'
                }
            };

            // PASO 4: Generar PDF

            await html2pdf().set(opt).from(element).save();
            
            // PASO 5: Restaurar estado original
            container.className = originalClasses;
            const sections = container.querySelectorAll('[data-section]');
            sections.forEach(section => {
                section.classList.remove('pdf-page-break-before');
                section.style.pageBreakBefore = '';
                section.style.pageBreakInside = '';
                section.style.breakInside = '';
                section.removeAttribute('data-pdf-page');
            });

            setNotification({
                open: true,
                message: `${lang === 'es' ? 'PDF generado exitosamente' : 'PDF generated successfully'} (${totalPages} ${lang === 'es' ? 'páginas' : 'pages'})`,
                severity: 'success'
            });
            dispatch(disablePreviewMode());
        } catch (error) {
            // Error generating PDF
            setNotification({
                open: true,
                message: lang === 'es' ? 'Error al generar el PDF' : 'Error generating PDF',
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

                        {/* Configuration Button */}
                        {onOpenConfiguration && (
                            <Tooltip title={lang === 'es' ? 'Configurar CV' : 'Configure CV'}>
                                <IconButton onClick={onOpenConfiguration} color="inherit">
                                    <SettingsIcon />
                                </IconButton>
                            </Tooltip>
                        )}

                        <PreviewModeButton />
                        
                        {/* Indicador de Páginas */}
                        {paginationEnabled && (
                            <Box sx={{
                                ml: 1,
                                px: 2,
                                py: 0.5,
                                backgroundColor: 'success.main',
                                color: 'white',
                                borderRadius: 2,
                                fontSize: '0.875rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                            }}>
                                📄 {totalPages} {lang === 'es' ? (totalPages === 1 ? 'Página' : 'Páginas') : (totalPages === 1 ? 'Page' : 'Pages')}
                            </Box>
                        )}

                
                    </Box>
                </Toolbar>
            </EditorToolbar>

            <CVCanvas>
                {/* Renderizado tradicional - el paginado se manejará con CSS */}
                <CVPaper elevation={8} data-cv-content>
                    <Frame>
                            <Element
                                is={Container}
                                id="cv-container"
                                maxWidth={false}
                                sx={{ padding: 0 }}
                                canvas

                            >
                            {/* Dynamic Section Rendering - Respects user-configured order and enabled/disabled state */}
                            {renderSectionsInOrder()}
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

            {/* Save Options Modal */}
            <SaveOptionsModal
                open={showSaveOptionsModal}
                onClose={handleCloseSaveModal}
                onSaveToHistory={handleSaveToHistory}
                onDownloadOnly={handleDownloadOnly}
                onBoth={handleBothActions}
                lang={lang}
                loading={saveLoading}
            />

        </EditorContainer>
    );
};

// Main Container Component with Craft.js Provider
const VitaeEditorContainer = ({ data, lang = 'es', onOpenConfiguration, enabledSections = [], themeColors = {} }) => {
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
            <VitaeEditorContent data={data} lang={lang} onOpenConfiguration={onOpenConfiguration} enabledSections={enabledSections} themeColors={themeColors} />
        </Editor>
    );
};

export default VitaeEditorContainer;
