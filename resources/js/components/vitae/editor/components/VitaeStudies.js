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
    Divider,
    Chip
} from '@mui/material';
import {
    DragIndicator as DragIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    MenuBook as StudiesIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SectionContainer = styled(Paper)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    boxShadow: 'none',
    borderColor: 'none'
}));


const ActionButtons = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(0),
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
    paddingBottom: theme.spacing(1),
    fontSize: '15px'
}));

const StudyItem = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(1.7),
    padding: theme.spacing(1.5),
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

const VitaeStudies = ({ title, data, lang = 'es' }) => {
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
    const studiesData = Array.isArray(data) ? data : [];
    const sectionTitle = safeString(title, lang === 'es' ? 'Estudios' : 'Studies');

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

    const renderStudyItem = (item, index) => {
        if (!item || typeof item !== 'object') return null;

        const degree = safeString(item.degree, "Carrera");
        const institution = safeString(item.institution, "Institución");
        const folio = safeString(item.folio, "");
        const graduationDate = safeString(item.graduationDate, "");
        const gpa = safeString(item.gpa, "");
        const coursework = safeString(item.coursework, "");
        const honors = safeString(item.honors, "");

        return (
            <StudyItem key={item.id || index}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '13px' }}>
                            {degree}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500, fontSize: '12px' }}>
                            {institution}
                        </Typography>
                        {folio && (
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0, fontSize: '12px' }}>
                                {lang === 'es' ? 'Folio:' : 'Folio:'} {folio}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ textAlign: 'right', minWidth: '120px' }}>
                        {graduationDate && (
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '12px' }}>
                                {graduationDate}
                            </Typography>
                        )}
                        {gpa && (
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '12px' }}>
                                GPA: {gpa}
                            </Typography>
                        )}
                        {enabled && !isPreviewMode && (
                            <IconButton size="small" onClick={() => handleEdit(item, index)}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                </Box>

                {coursework && (
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, fontSize: '12px' }}>
                            {lang === 'es' ? 'Materias Relevantes:' : 'Relevant Coursework:'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '12px' }}>
                            {coursework}
                        </Typography>
                    </Box>
                )}

                {honors && (
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, fontSize: '12px' }}>
                            {lang === 'es' ? 'Reconocimientos:' : 'Honors:'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '12px' }}>
                            {honors}
                        </Typography>
                    </Box>
                )}
            </StudyItem>
        );
    };

    if (studiesData.length === 0) {
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
                <StudiesIcon />
                {sectionTitle}
            </SectionTitle>

            <Box>
                {studiesData.map((item, index) => renderStudyItem(item, index))}
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>
                    {lang === 'es' ? 'Confirmar Eliminación' : 'Confirm Deletion'}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {lang === 'es' 
                            ? '¿Estás seguro de que deseas eliminar esta sección de estudios?' 
                            : 'Are you sure you want to delete this studies section?'
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
                    {lang === 'es' ? 'Editar Estudio' : 'Edit Study'}
                </DialogTitle>
                <DialogContent>
                    {editingItem && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <TextField
                                label={lang === 'es' ? 'Carrera/Título' : 'Degree/Title'}
                                value={editingItem.degree || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, degree: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label={lang === 'es' ? 'Institución' : 'Institution'}
                                value={editingItem.institution || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label={lang === 'es' ? 'Folio' : 'Folio'}
                                value={editingItem.folio || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, folio: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label={lang === 'es' ? 'Fecha de Graduación' : 'Graduation Date'}
                                value={editingItem.graduationDate || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, graduationDate: e.target.value })}
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

VitaeStudies.craft = {
    displayName: 'Studies Section',
    props: {
        title: 'Estudios',
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

export { VitaeStudies };
