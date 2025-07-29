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
    Fab
} from '@mui/material';
import {
    Save as SaveIcon,
    Preview as PreviewIcon,
    Undo as UndoIcon,
    Redo as RedoIcon,
    Download as DownloadIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

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

// Main Editor Component (without Craft.js context)
const VitaeEditorContent = () => {
    const { actions, query, enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    const [templateData, setTemplateData] = useState(harvardTemplateData);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    // Load template data on component mount
    useEffect(() => {
        // Initialize with Harvard template data
        console.log('Loading Harvard CV Template with data:', templateData);
    }, [templateData]);

    const handleSave = () => {
        const json = query.serialize();
        console.log('Saving CV:', json);
        // TODO: Implement save functionality
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

    const handleDownload = () => {
        // TODO: Implement PDF/Word export
        console.log('Download CV functionality - to be implemented');
    };

    return (
        <EditorContainer>
            <EditorToolbar position="static" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        CV Harvard Plantilla - Editor Visual
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
                <CVPaper elevation={8}>
                    <Frame>
                        <Element
                            is={Container}
                            maxWidth={false}
                            sx={{ padding: 0 }}
                            canvas
                        >
                            {/* CV Header */}
                            <Element
                                is={CVHeader}
                                data={templateData.header}
                                canvas
                            />

                            {/* Contact Information */}
                            <Element
                                is={CVContact}
                                data={templateData.contact}
                                canvas
                            />

                            {/* Professional Summary */}
                            <Element
                                is={CVSummary}
                                title="Professional Summary"
                                data={templateData.summary}
                                canvas
                            />

                            {/* Work Experience */}
                            <Element
                                is={CVExperience}
                                title="Work Experience"
                                data={templateData.experience}
                                canvas
                            />

                            {/* Education */}
                            <Element
                                is={CVEducation}
                                title="Education"
                                data={templateData.education}
                                canvas
                            />

                            {/* Skills */}
                            <Element
                                is={CVSkills}
                                title="Skills"
                                data={templateData.skills}
                                canvas
                            />

                            {/* Additional Sections (dynamically rendered) */}
                            {templateData.additionalSections?.map((section, index) => (
                                <Element
                                    key={`section-${index}`}
                                    is={CVSection}
                                    title={section.title}
                                    data={section.data}
                                    type={section.type}
                                    canvas
                                />
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

                    <Tooltip title="Descargar CV">
                        <Fab
                            color="secondary"
                            size="medium"
                            onClick={handleDownload}
                            sx={{
                                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)'
                            }}
                        >
                            <DownloadIcon />
                        </Fab>
                    </Tooltip>
                </FloatingToolbar>
            )}
        </EditorContainer>
    );
};

// Main Container Component with Craft.js Provider
const VitaeEditorContainer = () => {
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
            <VitaeEditorContent />
        </Editor>
    );
};

export default VitaeEditorContainer;
