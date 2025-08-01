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
    Chip,
    LinearProgress
} from '@mui/material';
import {
    DragIndicator as DragIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Build as SkillsIcon
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

const SkillItem = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[200]}`,
    '&:last-child': {
        marginBottom: 0,
    }
}));

const ProgressBarContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.spacing(1),
    height: 8,
    overflow: 'hidden'
}));

// Utility functions
const safeString = (value, fallback = "") => {
    if (typeof value === 'string' && value.trim() !== '') return value.trim();
    if (value && typeof value === 'object') return fallback;
    return fallback;
};

const getLocalizedText = (obj, field, lang, fallback = "") => {
    if (!obj || typeof obj !== 'object') return fallback;
    
    const langField = `${field}_${lang}`;
    if (obj[langField] && typeof obj[langField] === 'string' && obj[langField].trim() !== "") {
        return obj[langField].trim();
    }
    
    if (obj[field] && typeof obj[field] === 'string' && obj[field].trim() !== "") {
        return obj[field].trim();
    }
    
    return fallback;
};

const VitaeSkills = ({ title, data, lang = 'es' }) => {
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
    const [editingSkills, setEditingSkills] = useState('');

    // Process skills data - expecting either array of strings or array of objects
    const skillsData = Array.isArray(data) ? data : [];
    const sectionTitle = safeString(title, lang === 'es' ? 'Habilidades' : 'Skills');

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        // Use Craft.js actions to properly delete the node
        actions.delete(id);
        setDeleteDialogOpen(false);
    };

    const handleEdit = () => {
        // For simple string array, join with commas
        if (skillsData.length > 0 && typeof skillsData[0] === 'string') {
            setEditingSkills(skillsData.join(', '));
        } else {
            // For object array, extract titles
            const titles = skillsData.map(skill => {
                if (typeof skill === 'object') {
                    return getLocalizedText(skill, 'title', lang, 'Habilidad');
                }
                return String(skill || '');
            }).filter(Boolean);
            setEditingSkills(titles.join(', '));
        }
        setEditDialogOpen(true);
    };

    const handleSaveEdit = () => {
        const newSkills = editingSkills.split(',').map(s => s.trim()).filter(Boolean);
        setProp(props => {
            props.data = newSkills;
        });
        setEditDialogOpen(false);
        setEditingSkills('');
    };

    const renderSkillItem = (skill, index) => {
        // Handle both string and object formats
        if (typeof skill === 'string') {
            return (
                <SkillItem key={index}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {skill}
                    </Typography>
                </SkillItem>
            );
        }

        if (typeof skill === 'object' && skill !== null) {
            const skillTitle = getLocalizedText(skill, 'title', lang, 'Habilidad');
            const skillLevel = skill.knowledge_level;
            const skillYears = skill.years_experience;
            const skillDescription = getLocalizedText(skill, 'description', lang, '');

            return (
                <SkillItem key={skill.id || index}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                            {skillTitle}
                        </Typography>
                        
                        {/* Level Progress Bar */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="body2" sx={{ minWidth: '60px', fontWeight: 500 }}>
                                {lang === 'es' ? 'Nivel:' : 'Level:'}
                            </Typography>
                            {skillLevel !== null && skillLevel !== undefined ? (
                                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ProgressBarContainer sx={{ flex: 1 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={Math.min(Math.max(skillLevel, 0), 100)}
                                            sx={{
                                                height: 8,
                                                borderRadius: 1,
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 1,
                                                    background: 'linear-gradient(90deg, #4caf50, #81c784)',
                                                }
                                            }}
                                        />
                                    </ProgressBarContainer>
                                    <Typography variant="body2" sx={{ minWidth: '35px', fontWeight: 500 }}>
                                        {skillLevel}%
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    —
                                </Typography>
                            )}
                        </Box>

                        {/* Years Experience */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="body2" sx={{ minWidth: '60px', fontWeight: 500 }}>
                                {lang === 'es' ? 'Años:' : 'Years:'}
                            </Typography>
                            {skillYears !== null && skillYears !== undefined ? (
                                <Chip
                                    label={`${skillYears} ${lang === 'es' ? 'años' : 'years'}`}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                />
                            ) : (
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    —
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    {/* Description HTML */}
                    {skillDescription && skillDescription !== 'Sin contenido' && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                                {lang === 'es' ? 'Descripción:' : 'Description:'}
                            </Typography>
                            <Box
                                sx={{
                                    '& p': { margin: '8px 0' },
                                    '& ul, & ol': { paddingLeft: '20px', margin: '8px 0' },
                                    '& li': { margin: '4px 0' },
                                    color: 'text.secondary',
                                    fontSize: '0.875rem'
                                }}
                                dangerouslySetInnerHTML={{ __html: skillDescription }}
                            />
                        </Box>
                    )}
                </SkillItem>
            );
        }

        return null;
    };

    if (skillsData.length === 0) {
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
                        <Tooltip title={lang === 'es' ? 'Editar Habilidades' : 'Edit Skills'}>
                            <IconButton size="small" onClick={handleEdit}>
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
                <SkillsIcon />
                {sectionTitle}
            </SectionTitle>

            <Box>
                {skillsData.map((skill, index) => renderSkillItem(skill, index))}
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>
                    {lang === 'es' ? 'Confirmar Eliminación' : 'Confirm Deletion'}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {lang === 'es' 
                            ? '¿Estás seguro de que deseas eliminar esta sección de habilidades?' 
                            : 'Are you sure you want to delete this skills section?'
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
                    {lang === 'es' ? 'Editar Habilidades' : 'Edit Skills'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={lang === 'es' ? 'Habilidades (separadas por comas)' : 'Skills (comma separated)'}
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={editingSkills}
                        onChange={(e) => setEditingSkills(e.target.value)}
                        sx={{ mt: 1 }}
                    />
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

VitaeSkills.craft = {
    displayName: 'Skills Section',
    props: {
        title: 'Habilidades',
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

export { VitaeSkills };
