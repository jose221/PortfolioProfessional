import React, { useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { useSelector } from 'react-redux';
import { getPreviewMode } from '../../../../redux/selectors/preview-mode-selectors';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {
    Box,
    Typography,
    Paper,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import {
    DragIndicator as DragIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Extension as CustomIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SectionContainer = styled(Paper)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    position: 'relative',
    border: '2px solid transparent',
    transition: 'all 0.3s ease',
    '&:hover': {
        borderColor: theme.palette.primary.light,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    }
}));

const DragHandle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    cursor: 'grab',
    opacity: 0.6,
    '&:hover': {
        opacity: 1,
    },
    '&:active': {
        cursor: 'grabbing',
    }
}));

const ActionButtons = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    display: 'flex',
    gap: theme.spacing(0.5),
    opacity: 0.7,
    '&:hover': {
        opacity: 1,
    }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontWeight: 600,
    color: theme.palette.primary.main,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    paddingBottom: theme.spacing(1)
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: theme.palette.text.primary,
    '& ul, & ol': {
        paddingLeft: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
    '& li': {
        marginBottom: theme.spacing(0.5),
    },
    '& p': {
        marginBottom: theme.spacing(1),
    },
    '& h1, & h2, & h3, & h4, & h5, & h6': {
        fontWeight: 600,
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1.5),
    },
    '& strong': {
        fontWeight: 600,
    },
    '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    }
}));

// Utility functions
const safeString = (value, fallback = "") => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') return fallback;
    return String(value || fallback);
};

const VitaeCustomSection = ({ title, content, lang = 'es' }) => {
    const {
        connectors: { connect, drag },
        actions: { setProp },
        isActive,
        isHovered,
        id
    } = useNode((state) => ({
        isActive: state.events.selected,
        isHovered: state.events.hovered,
    }));

    const { enabled, actions } = useEditor((state) => ({
        enabled: state.options.enabled
    }));
    
    // Redux Preview Mode
    const isPreviewMode = useSelector(getPreviewMode);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingContent, setEditingContent] = useState('');

    // Validate and sanitize data
    const sectionTitle = safeString(title, lang === 'es' ? 'Sección Personalizada' : 'Custom Section');
    const sectionContent = safeString(content, '');

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        // Use Craft.js actions to properly delete the node
        actions.delete(id);
        setDeleteDialogOpen(false);
    };

    const handleEdit = () => {
        setEditingTitle(sectionTitle);
        setEditingContent(sectionContent);
        setEditDialogOpen(true);
    };

    const handleSaveEdit = () => {
        setProp(props => {
            props.title = editingTitle;
            props.content = editingContent;
        });
        setEditDialogOpen(false);
        setEditingTitle('');
        setEditingContent('');
    };

    // Don't render if both title and content are empty
    if (!sectionTitle.trim() && !sectionContent.trim()) {
        return null;
    }

    return (
        <SectionContainer
            ref={(ref) => connect(ref)}
            elevation={isActive || isHovered ? 3 : 1}
            sx={{
                borderColor: isActive ? 'primary.main' : 'transparent',
                position: 'relative'
            }}
        >
            {enabled && !isPreviewMode && (
                <>
                    <DragHandle ref={(ref) => drag(ref)}>
                        <DragIcon sx={{ color: 'text.secondary' }} />
                    </DragHandle>
                    
                    <ActionButtons>
                        <Tooltip title={lang === 'es' ? 'Editar Sección' : 'Edit Section'}>
                            <IconButton size="small" onClick={handleEdit} color="primary">
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={lang === 'es' ? 'Eliminar Sección' : 'Delete Section'}>
                            <IconButton size="small" onClick={handleDelete} color="error">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </ActionButtons>
                </>
            )}

            <SectionTitle variant="h5">
                <CustomIcon />
                {sectionTitle}
            </SectionTitle>

            {sectionContent && (
                <ContentWrapper
                    dangerouslySetInnerHTML={{ __html: sectionContent }}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>
                    {lang === 'es' ? 'Confirmar Eliminación' : 'Confirm Deletion'}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {lang === 'es' 
                            ? '¿Estás seguro de que deseas eliminar esta sección personalizada?' 
                            : 'Are you sure you want to delete this custom section?'
                        }
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        {lang === 'es' ? 'Cancelar' : 'Cancel'}
                    </Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        {lang === 'es' ? 'Eliminar' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>
                    {lang === 'es' ? 'Editar Sección Personalizada' : 'Edit Custom Section'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label={lang === 'es' ? 'Título de la Sección' : 'Section Title'}
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                {lang === 'es' ? 'Contenido:' : 'Content:'}
                            </Typography>
                            <SunEditor
                                lang={lang}
                                setContents={editingContent}
                                onChange={(content) => setEditingContent(content)}
                                setOptions={{
                                    height: 300,
                                    buttonList: [
                                        ['undo', 'redo'],
                                        ['font', 'fontSize', 'formatBlock'],
                                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                        ['fontColor', 'hiliteColor'],
                                        ['removeFormat'],
                                        ['outdent', 'indent'],
                                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                                        ['table', 'link'],
                                        ['fullScreen', 'showBlocks', 'codeView']
                                    ],
                                    formats: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                                    font: ['Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New'],
                                    fontSize: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72]
                                }}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>
                        {lang === 'es' ? 'Cancelar' : 'Cancel'}
                    </Button>
                    <Button onClick={handleSaveEdit} variant="contained">
                        {lang === 'es' ? 'Guardar' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </SectionContainer>
    );
};

VitaeCustomSection.craft = {
    displayName: 'Custom Section',
    props: {
        title: 'Nueva Sección Personalizada',
        content: '<p>Contenido personalizado...</p>',
        lang: 'es'
    },
    rules: {
        canDrag: true,
        canDrop: false,
        canMoveIn: false,
        canMoveOut: true,
    },
};

export { VitaeCustomSection };
