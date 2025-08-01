import React, { useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';
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
    TextField,
    Chip,
    Grid
} from '@mui/material';
import {
    DragIndicator as DragIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Psychology as KnowledgeIcon
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

const KnowledgeItem = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey[200]}`,
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.grey[100],
        borderColor: theme.palette.primary.light,
    }
}));

// Utility functions
const safeString = (value, fallback = "") => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') return fallback;
    return String(value || fallback);
};

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

const VitaeKnowledges = ({ title, data, lang = 'es' }) => {
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

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Validate and sanitize data
    const knowledgesData = Array.isArray(data) ? data : [];
    const sectionTitle = safeString(title, lang === 'es' ? 'Conocimientos Técnicos' : 'Technical Knowledge');

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        // Use Craft.js actions to properly delete the node
        actions.delete(id);
        setDeleteDialogOpen(false);
    };

    const handleEdit = (item, index) => {
        setEditingItem({ 
            ...item, 
            index,
            title: getLocalizedText(item, 'title', lang, "Conocimiento"),
            description: getLocalizedText(item, 'description', lang, "")
        });
        setEditDialogOpen(true);
    };

    const handleSaveEdit = () => {
        if (editingItem) {
            setProp(props => {
                const newData = [...props.data];
                // Update the original object with localized fields
                const originalItem = newData[editingItem.index];
                const titleField = `title_${lang}`;
                const descField = `description_${lang}`;
                
                newData[editingItem.index] = {
                    ...originalItem,
                    [titleField]: editingItem.title,
                    [descField]: editingItem.description
                };
                props.data = newData;
            });
        }
        setEditDialogOpen(false);
        setEditingItem(null);
    };

    const renderKnowledgeItem = (item, index) => {
        if (!item || typeof item !== 'object') return null;

        const title = getLocalizedText(item, 'title', lang, "Conocimiento");
        const description = getLocalizedText(item, 'description', lang, "");

        return (
            <KnowledgeItem key={item.id || index}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {title}
                        </Typography>
                    </Box>
                    {enabled && (
                        <IconButton size="small" onClick={() => handleEdit(item, index)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    )}
                </Box>

                {description && description !== 'Sin contenido' && (
                    <Box 
                        sx={{
                            mt: 1,
                            '& p': { 
                                margin: '8px 0',
                                lineHeight: 1.6,
                                color: 'text.secondary'
                            },
                            '& ul, & ol': { 
                                paddingLeft: '20px', 
                                margin: '8px 0',
                                color: 'text.secondary'
                            },
                            '& li': { 
                                margin: '4px 0',
                                lineHeight: 1.5
                            },
                            '& a': {
                                color: 'primary.main',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            },
                            '& strong, & b': {
                                fontWeight: 600,
                                color: 'text.primary'
                            },
                            '& em, & i': {
                                fontStyle: 'italic'
                            },
                            fontSize: '0.875rem'
                        }}
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                )}
            </KnowledgeItem>
        );
    };

    if (knowledgesData.length === 0) {
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
            {enabled && (
                <>
                    <DragHandle ref={(ref) => drag(ref)}>
                        <DragIcon sx={{ color: 'text.secondary' }} />
                    </DragHandle>
                    
                    <ActionButtons>
                        <Tooltip title={lang === 'es' ? 'Eliminar Sección' : 'Delete Section'}>
                            <IconButton size="small" onClick={handleDelete} color="error">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </ActionButtons>
                </>
            )}

            <SectionTitle variant="h5">
                <KnowledgeIcon />
                {sectionTitle}
            </SectionTitle>

            <Box>
                {knowledgesData.map((item, index) => renderKnowledgeItem(item, index))}
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>
                    {lang === 'es' ? 'Confirmar Eliminación' : 'Confirm Deletion'}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {lang === 'es' 
                            ? '¿Estás seguro de que deseas eliminar esta sección de conocimientos?' 
                            : 'Are you sure you want to delete this knowledge section?'
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
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>
                    {lang === 'es' ? 'Editar Conocimiento' : 'Edit Knowledge'}
                </DialogTitle>
                <DialogContent>
                    {editingItem && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <TextField
                                label={lang === 'es' ? 'Nombre del Conocimiento' : 'Knowledge Name'}
                                value={editingItem.title || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label={lang === 'es' ? 'Descripción' : 'Description'}
                                value={editingItem.description || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                multiline
                                rows={3}
                                fullWidth
                            />
                        </Box>
                    )}
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

VitaeKnowledges.craft = {
    displayName: 'Knowledge Section',
    props: {
        title: 'Conocimientos Técnicos',
        data: [],
        lang: 'es'
    },
    rules: {
        canDrag: true,
        canDrop: false,
        canMoveIn: false,
        canMoveOut: true,
    },
};

export { VitaeKnowledges };
