import React, { useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { useSelector } from 'react-redux';
import { getPreviewMode } from '../../../../redux/selectors/preview-mode-selectors';
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
    Divider
} from '@mui/material';
import {
    DragIndicator as DragIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    EmojiEvents as CertificationIcon
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

const CertificationItem = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.divider}`,
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

const VitaeCertifications = ({ title, data, lang = 'es' }) => {
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
    const [editingItem, setEditingItem] = useState(null);

    // Validate and sanitize data
    const certificationsData = Array.isArray(data) ? data : [];
    const sectionTitle = safeString(title, lang === 'es' ? 'Certificaciones' : 'Certifications');

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        // Use Craft.js actions to properly delete the node
        actions.delete(id);
        setDeleteDialogOpen(false);
    };

    const handleEdit = (item, index) => {
        setEditingItem({ ...item, index });
        setEditDialogOpen(true);
    };

    const handleSaveEdit = () => {
        if (editingItem) {
            setProp(props => {
                const newData = [...props.data];
                newData[editingItem.index] = editingItem;
                props.data = newData;
            });
        }
        setEditDialogOpen(false);
        setEditingItem(null);
    };

    const renderCertificationItem = (item, index) => {
        if (!item || typeof item !== 'object') return null;

        const certTitle = safeString(item.title, "Certificación");
        const certSubtitle = safeString(item.subtitle, "");
        const certDate = safeString(item.date, "");
        const certDescription = safeString(item.description, "");

        return (
            <CertificationItem key={item.id || index}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {certTitle}
                        </Typography>
                        {certSubtitle && (
                            <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                                {certSubtitle}
                            </Typography>
                        )}
                        {certDescription && (
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, lineHeight: 1.6 }}>
                                {certDescription}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ textAlign: 'right', minWidth: '120px' }}>
                        {certDate && (
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {certDate}
                            </Typography>
                        )}
                        {enabled && !isPreviewMode && (
                            <IconButton 
                                size="small" 
                                onClick={() => handleEdit(item, index)} 
                                color="primary"
                                sx={{ ml: 1 }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                </Box>
            </CertificationItem>
        );
    };

    if (certificationsData.length === 0) {
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
                        <Tooltip title={lang === 'es' ? 'Eliminar Sección' : 'Delete Section'}>
                            <IconButton size="small" onClick={handleDelete} color="error">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </ActionButtons>
                </>
            )}

            <SectionTitle variant="h5">
                <CertificationIcon />
                {sectionTitle}
            </SectionTitle>

            <Box>
                {certificationsData.map((item, index) => renderCertificationItem(item, index))}
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>
                    {lang === 'es' ? 'Confirmar Eliminación' : 'Confirm Deletion'}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {lang === 'es' 
                            ? '¿Estás seguro de que deseas eliminar esta sección de certificaciones?' 
                            : 'Are you sure you want to delete this certifications section?'
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
                    {lang === 'es' ? 'Editar Certificación' : 'Edit Certification'}
                </DialogTitle>
                <DialogContent>
                    {editingItem && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <TextField
                                label={lang === 'es' ? 'Título de la Certificación' : 'Certification Title'}
                                value={editingItem.title || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label={lang === 'es' ? 'Organización' : 'Organization'}
                                value={editingItem.subtitle || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label={lang === 'es' ? 'Fecha' : 'Date'}
                                value={editingItem.date || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
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

VitaeCertifications.craft = {
    displayName: 'Certifications Section',
    props: {
        title: 'Certificaciones',
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

export { VitaeCertifications };
