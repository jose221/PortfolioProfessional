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
    Divider
} from '@mui/material';
import {
    DragIndicator as DragIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Work as WorkIcon
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

const ExperienceItem = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.divider}`,
    }
}));

const TechnologiesContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(1)
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

const VitaeExperience = ({ title, data, lang = 'es' }) => {
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
    const experienceData = Array.isArray(data) ? data : [];
    const sectionTitle = safeString(title, lang === 'es' ? 'Experiencia Laboral' : 'Work Experience');

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
            technologiesText: Array.isArray(item.technologies) ? item.technologies.join(', ') : ''
        });
        setEditDialogOpen(true);
    };

    const handleSaveEdit = () => {
        if (editingItem) {
            const updatedItem = { ...editingItem };
            
            // Convert technologies text back to array
            if (editingItem.technologiesText) {
                updatedItem.technologies = editingItem.technologiesText
                    .split(',')
                    .map(tech => tech.trim())
                    .filter(tech => tech.length > 0);
            } else {
                updatedItem.technologies = [];
            }
            
            // Remove the temporary technologiesText field
            delete updatedItem.technologiesText;
            delete updatedItem.index;
            
            setProp(props => {
                const newData = [...props.data];
                newData[editingItem.index] = updatedItem;
                props.data = newData;
            });
        }
        setEditDialogOpen(false);
        setEditingItem(null);
    };

    const renderExperienceItem = (item, index) => {
        if (!item || typeof item !== 'object') return null;

        const position = safeString(item.position, "Puesto");
        const company = safeString(item.company, "Empresa");
        const location = safeString(item.location, "");
        const startDate = safeString(item.startDate, "");
        const endDate = safeString(item.endDate, "");
        const description = safeString(item.description, "");
        const technologies = Array.isArray(item.technologies) ? item.technologies : [];

        return (
            <ExperienceItem key={item.id || index}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {position}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                            {company}
                        </Typography>
                        {location && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {location}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ textAlign: 'right', minWidth: '120px' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {startDate} {endDate && `- ${endDate}`}
                        </Typography>
                        {enabled && (
                            <IconButton size="small" onClick={() => handleEdit(item, index)}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                </Box>

                {description && (
                    <Box sx={{ mt: 1, mb: 1 }}>
                        <Typography 
                            variant="body2" 
                            sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    </Box>
                )}

                {technologies.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                            {lang === 'es' ? 'Tecnologías:' : 'Technologies:'}
                        </Typography>
                        <TechnologiesContainer>
                            {technologies.map((tech, techIndex) => {
                                const techText = safeString(tech, "");
                                if (!techText.trim()) return null;
                                
                                return (
                                    <Chip
                                        key={techIndex}
                                        label={techText}
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        sx={{ fontSize: '0.75rem' }}
                                    />
                                );
                            })}
                        </TechnologiesContainer>
                    </Box>
                )}
            </ExperienceItem>
        );
    };

    if (experienceData.length === 0) {
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
            {enabled && (isActive || isHovered) && (
                <>
                    <DragHandle ref={drag}>
                        <Tooltip title={lang === 'es' ? 'Arrastrar Sección' : 'Drag Section'}>
                            <IconButton size="small">
                                <DragIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </DragHandle>

                    <ActionButtons>
                        <Tooltip title={lang === 'es' ? 'Editar Título' : 'Edit Title'}>
                            <IconButton size="small" onClick={() => console.log('Edit title')} color="primary">
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
                <WorkIcon />
                {sectionTitle}
            </SectionTitle>

            <Box>
                {experienceData.map((item, index) => renderExperienceItem(item, index))}
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>
                    {lang === 'es' ? 'Confirmar Eliminación' : 'Confirm Deletion'}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {lang === 'es' 
                            ? '¿Estás seguro de que deseas eliminar esta sección de experiencia?' 
                            : 'Are you sure you want to delete this experience section?'
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
                    {lang === 'es' ? 'Editar Experiencia' : 'Edit Experience'}
                </DialogTitle>
                <DialogContent>
                    {editingItem && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <TextField
                                label={lang === 'es' ? 'Puesto' : 'Position'}
                                value={editingItem.position || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, position: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label={lang === 'es' ? 'Empresa' : 'Company'}
                                value={editingItem.company || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label={lang === 'es' ? 'Ubicación' : 'Location'}
                                value={editingItem.location || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                                fullWidth
                            />
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    label={lang === 'es' ? 'Fecha de Inicio' : 'Start Date'}
                                    value={editingItem.startDate || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    label={lang === 'es' ? 'Fecha de Fin' : 'End Date'}
                                    value={editingItem.endDate || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                                    fullWidth
                                />
                            </Box>
                            <TextField
                                label={lang === 'es' ? 'Descripción' : 'Description'}
                                value={editingItem.description || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                multiline
                                rows={4}
                                fullWidth
                                helperText={lang === 'es' ? 'Puedes usar HTML básico' : 'You can use basic HTML'}
                            />
                            <TextField
                                label={lang === 'es' ? 'Tecnologías (separadas por comas)' : 'Technologies (comma separated)'}
                                value={editingItem.technologiesText || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, technologiesText: e.target.value })}
                                fullWidth
                                placeholder="React, JavaScript, Node.js, Python"
                                helperText={lang === 'es' ? 'Separa cada tecnología con una coma' : 'Separate each technology with a comma'}
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

VitaeExperience.craft = {
    displayName: 'Experience Section',
    props: {
        title: 'Experiencia Laboral',
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

export { VitaeExperience };
