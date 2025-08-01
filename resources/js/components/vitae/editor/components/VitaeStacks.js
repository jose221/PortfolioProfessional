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
    Chip,
    TextField
} from '@mui/material';
import {
    DragIndicator as DragIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Add as AddIcon,
    Psychology as SkillsIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SectionContainer = styled(Paper)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    position: 'relative',
    border: '2px solid transparent',
    transition: 'all 0.3s ease',
    '&:hover': {
        borderColor: theme.palette.primary.light,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }
}));

const DragHandle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(0.5),
    left: theme.spacing(0.5),
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
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
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
    marginBottom: theme.spacing(1.5),
    fontWeight: 600,
    fontSize: '1.1rem',
    color: theme.palette.primary.main,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    paddingBottom: theme.spacing(0.5)
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '0.95rem',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    '&:first-of-type': {
        marginTop: 0,
    }
}));

const SkillsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
}));

const SkillItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: '1 1 100%',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.grey[200]}`,
    backgroundColor: theme.palette.background.paper,
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.grey[50],
        borderColor: theme.palette.primary.light,
    }
}));

const SkillName = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    lineHeight: 1.2,
    marginBottom: theme.spacing(0.5),
    cursor: 'pointer',
    padding: theme.spacing(0.25),
    borderRadius: theme.spacing(0.5),
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));

const SkillDescription = styled(Typography)(({ theme }) => ({
    fontSize: '0.8rem',
    color: theme.palette.text.secondary,
    lineHeight: 1.3,
    marginBottom: theme.spacing(0.5),
    flex: 1,
    cursor: 'pointer',
    padding: theme.spacing(0.25),
    borderRadius: theme.spacing(0.5),
    minHeight: '1.5rem',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:empty:before': {
        content: '"Hacer clic para agregar descripción"',
        color: theme.palette.text.disabled,
        fontStyle: 'italic',
    }
}));

const YearsText = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontStyle: 'italic',
    cursor: 'pointer',
    padding: theme.spacing(0.25),
    borderRadius: theme.spacing(0.5),
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));

const InlineInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        fontSize: 'inherit',
        fontWeight: 'inherit',
        color: 'inherit',
        padding: 0,
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.25),
        border: 'none',
        outline: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.spacing(0.5),
    }
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

// VitaeSkillItem Component
const VitaeSkillItem = ({ item, lang, onUpdate, enabled }) => {
    if (!item || typeof item !== 'object') return null;

    const [editing, setEditing] = useState({ field: null, value: '' });
    const title = getLocalizedText(item, 'title', lang, 'Habilidad');
    const description = getLocalizedText(item, 'description', lang, '');
    const years = item.years_experience;

    const getExperienceText = (years) => {
        if (!years || years === 0) return lang === 'es' ? 'Nuevo' : 'New';
        if (years === 1) return lang === 'es' ? '1 año' : '1 year';
        return lang === 'es' ? `${years} años` : `${years} years`;
    };

    const handleStartEdit = (field, currentValue) => {
        if (!enabled) return;
        setEditing({ field, value: currentValue || '' });
    };

    const handleSaveEdit = (field) => {
        if (editing.field === field && onUpdate) {
            const langField = `${field}_${lang}`;
            onUpdate({
                ...item,
                [langField]: editing.value,
                updated_at: new Date().toISOString()
            });
        }
        setEditing({ field: null, value: '' });
    };

    const handleKeyPress = (e, field) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSaveEdit(field);
        } else if (e.key === 'Escape') {
            setEditing({ field: null, value: '' });
        }
    };

    const handleYearEdit = (newYears) => {
        if (onUpdate) {
            onUpdate({
                ...item,
                years_experience: parseInt(newYears) || 0,
                updated_at: new Date().toISOString()
            });
        }
        setEditing({ field: null, value: '' });
    };

    return (
        <SkillItem sx={{ paddingRight: '15px' }}>
            {editing.field === 'title' ? (
                <InlineInput
                    value={editing.value}
                    onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                    onKeyDown={(e) => handleKeyPress(e, 'title')}
                    onBlur={() => handleSaveEdit('title')}
                    autoFocus
                    fullWidth
                    variant="outlined"
                    size="small"
                />
            ) : (
                <SkillName 
                    onClick={() => handleStartEdit('title', title)}
                    sx={{ cursor: enabled ? 'pointer' : 'default' }}
                >
                    {title}
                </SkillName>
            )}
            
            {editing.field === 'description' ? (
                <InlineInput
                    value={editing.value}
                    onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                    onKeyDown={(e) => handleKeyPress(e, 'description')}
                    onBlur={() => handleSaveEdit('description')}
                    autoFocus
                    fullWidth
                    multiline
                    maxRows={3}
                    variant="outlined"
                    size="small"
                />
            ) : (
                <SkillDescription 
                    onClick={() => handleStartEdit('description', description)}
                    sx={{ cursor: enabled ? 'pointer' : 'default' }}
                >
                    {description ? description.replace(/<[^>]*>/g, '').trim() : ''}
                </SkillDescription>
            )}
            
            {editing.field === 'years' ? (
                <InlineInput
                    type="number"
                    value={editing.value}
                    onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleYearEdit(editing.value);
                        } else if (e.key === 'Escape') {
                            setEditing({ field: null, value: '' });
                        }
                    }}
                    onBlur={() => handleYearEdit(editing.value)}
                    autoFocus
                    inputProps={{ min: 0, max: 50 }}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100px' }}
                />
            ) : (
                years !== null && years !== undefined && (
                    <YearsText 
                        onClick={() => handleStartEdit('years', years.toString())}
                        sx={{ cursor: enabled ? 'pointer' : 'default' }}
                    >
                        {getExperienceText(years)} de experiencia
                    </YearsText>
                )
            )}
        </SkillItem>
    );
};

// VitaeSkillCategory Component
const VitaeSkillCategory = ({ category, lang }) => {
    if (!category || typeof category !== 'object') return null;

    const title = getLocalizedText(category, 'title', lang, 'Categoría');
    const skills = Array.isArray(category.Portfolios) ? category.Portfolios : [];

    if (skills.length === 0) return null;

    return (
        <Box sx={{ mb: 2 }}>
            <CategoryTitle>{title}</CategoryTitle>
            <SkillsContainer>
                {skills.map((skill, index) => (
                    <VitaeSkillItem 
                        key={skill.id || index} 
                        item={skill} 
                        lang={lang} 
                    />
                ))}
            </SkillsContainer>
        </Box>
    );
};

// Main VitaeStacks Component
const VitaeStacks = ({ title, data, lang = 'es' }) => {
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
    const [addSkillDialogOpen, setAddSkillDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newSkill, setNewSkill] = useState({
        title_es: '',
        title_en: '',
        description_es: '',
        description_en: '',
        years_experience: 0,
        knowledge_level: 50
    });

    // Validate and sanitize data
    const skillsData = Array.isArray(data) ? data : [];
    const sectionTitle = safeString(title, lang === 'es' ? 'Habilidades y Competencias' : 'Skills & Competencies');

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        // Use Craft.js actions to properly delete the node
        actions.delete(id);
        setDeleteDialogOpen(false);
    };

    const handleEditTitle = () => {
        setEditDialogOpen(true);
    };

    const handleSaveTitle = () => {
        setProp(props => {
            props.title = document.getElementById('section-title-input').value;
        });
        setEditDialogOpen(false);
    };

    const handleAddSkill = (categoryIndex) => {
        setEditingCategory(categoryIndex);
        setNewSkill({
            title_es: '',
            title_en: '',
            description_es: '',
            description_en: '',
            years_experience: 0,
            knowledge_level: 50
        });
        setAddSkillDialogOpen(true);
    };

    const handleSaveNewSkill = () => {
        if (editingCategory !== null && skillsData[editingCategory]) {
            setProp(props => {
                const newId = Math.max(0, ...props.data.flatMap(cat => cat.Portfolios?.map(p => p.id) || [])) + 1;
                const skillToAdd = {
                    ...newSkill,
                    id: newId,
                    portfolio_categories_id: props.data[editingCategory].id,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                
                if (!props.data[editingCategory].Portfolios) {
                    props.data[editingCategory].Portfolios = [];
                }
                props.data[editingCategory].Portfolios.push(skillToAdd);
            });
        }
        setAddSkillDialogOpen(false);
        setEditingCategory(null);
    };

    const handleUpdateSkill = (categoryIndex, skillIndex, updatedSkill) => {
        setProp(props => {
            props.data[categoryIndex].Portfolios[skillIndex] = updatedSkill;
        });
    };

    const handleDeleteSkill = (categoryIndex, skillIndex) => {
        setProp(props => {
            props.data[categoryIndex].Portfolios.splice(skillIndex, 1);
        });
    };

    if (skillsData.length === 0) {
        return null;
    }

    return (
        <SectionContainer
            ref={(ref) => connect(ref)}
            elevation={isActive || isHovered ? 2 : 0}
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
                            <IconButton size="small" onClick={handleEditTitle} color="primary">
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

            <SectionTitle variant="h6">
                <SkillsIcon sx={{ fontSize: '1.2rem' }} />
                {sectionTitle}
            </SectionTitle>

            <Box>
                {skillsData.map((category, categoryIndex) => (
                    <Box key={category.id || categoryIndex} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <CategoryTitle>{getLocalizedText(category, 'title', lang, 'Categoría')}</CategoryTitle>
                            {enabled && (
                                <Tooltip title={lang === 'es' ? 'Agregar Habilidad' : 'Add Skill'}>
                                    <IconButton size="small" onClick={() => handleAddSkill(categoryIndex)} color="primary">
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                        <SkillsContainer>
                            {(category.Portfolios || []).map((skill, skillIndex) => (
                                <Box key={skill.id || skillIndex} sx={{ position: 'relative' }}>
                                    <VitaeSkillItem 
                                        item={skill} 
                                        lang={lang} 
                                        enabled={enabled}
                                        onUpdate={(updatedSkill) => handleUpdateSkill(categoryIndex, skillIndex, updatedSkill)}
                                    />
                                    {enabled && (
                                        <Tooltip title={lang === 'es' ? 'Eliminar' : 'Delete'}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDeleteSkill(categoryIndex, skillIndex)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 3,
                                                    right: -1,
                                                    width: 24,
                                                    height: 24,
                                                    minWidth: 'unset',
                                                    color: 'rgba(244, 67, 54, 0.9)',
                                                    opacity: 0.8,
                                                    zIndex: 2,
                                                    border: '0',
                                                    '&:hover': {
                                                        background: 'rgba(244, 67, 54, 1)',
                                                        opacity: 1,
                                                        transform: 'scale(1.1)',
                                                        color: 'white',
                                                    },
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                <DeleteIcon sx={{ fontSize: '0.7rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                            ))}
                        </SkillsContainer>
                    </Box>
                ))}
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

            {/* Edit Title Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {lang === 'es' ? 'Editar Título de Sección' : 'Edit Section Title'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="section-title-input"
                        label={lang === 'es' ? 'Título de la Sección' : 'Section Title'}
                        defaultValue={sectionTitle}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>
                        {lang === 'es' ? 'Cancelar' : 'Cancel'}
                    </Button>
                    <Button onClick={handleSaveTitle} variant="contained">
                        {lang === 'es' ? 'Guardar' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Skill Dialog */}
            <Dialog open={addSkillDialogOpen} onClose={() => setAddSkillDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {lang === 'es' ? 'Agregar Habilidad' : 'Add Skill'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label={lang === 'es' ? 'Nombre (Español)' : 'Name (Spanish)'}
                            value={newSkill.title_es}
                            onChange={(e) => setNewSkill({ ...newSkill, title_es: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label={lang === 'es' ? 'Nombre (Inglés)' : 'Name (English)'}
                            value={newSkill.title_en}
                            onChange={(e) => setNewSkill({ ...newSkill, title_en: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label={lang === 'es' ? 'Descripción (Español)' : 'Description (Spanish)'}
                            value={newSkill.description_es}
                            onChange={(e) => setNewSkill({ ...newSkill, description_es: e.target.value })}
                            multiline
                            rows={2}
                            fullWidth
                        />
                        <TextField
                            label={lang === 'es' ? 'Descripción (Inglés)' : 'Description (English)'}
                            value={newSkill.description_en}
                            onChange={(e) => setNewSkill({ ...newSkill, description_en: e.target.value })}
                            multiline
                            rows={2}
                            fullWidth
                        />
                        <TextField
                            label={lang === 'es' ? 'Años de Experiencia' : 'Years of Experience'}
                            type="number"
                            value={newSkill.years_experience}
                            onChange={(e) => setNewSkill({ ...newSkill, years_experience: parseInt(e.target.value) || 0 })}
                            inputProps={{ min: 0, max: 50 }}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddSkillDialogOpen(false)}>
                        {lang === 'es' ? 'Cancelar' : 'Cancel'}
                    </Button>
                    <Button onClick={handleSaveNewSkill} variant="contained">
                        {lang === 'es' ? 'Guardar' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </SectionContainer>
    );
};

VitaeStacks.craft = {
    displayName: 'Skills Section',
    props: {
        title: 'Habilidades y Competencias',
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

export { VitaeStacks };
