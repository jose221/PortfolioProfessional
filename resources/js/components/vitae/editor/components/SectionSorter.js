import React, { useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Switch,
    Paper,
    Chip,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    DragHandle as DragIcon,
    KeyboardArrowUp as UpIcon,
    KeyboardArrowDown as DownIcon,
    Person as HeaderIcon,
    Description as SummaryIcon,
    ContactPhone as ContactIcon,
    Work as ExperienceIcon,
    School as EducationIcon,
    Psychology as SkillsIcon,
    EmojiEvents as CertificationsIcon,
    MenuBook as KnowledgesIcon,
    LibraryBooks as StudiesIcon,
    DeveloperBoard as StacksIcon,
    Extension as CustomIcon
} from '@mui/icons-material';

const DraggableListItem = styled(ListItem, {
    shouldForwardProp: (prop) => prop !== 'isDragging'
})(({ theme, isDragging }) => ({
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.2s ease',
    cursor: 'grab',
    opacity: isDragging ? 0.5 : 1,
    transform: isDragging ? 'rotate(2deg)' : 'none',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    '&:active': {
        cursor: 'grabbing',
    }
}));

const SectionContainer = styled(Paper)(({ theme }) => ({
    maxHeight: '400px',
    overflowY: 'auto',
    padding: theme.spacing(1),
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.grey[100],
        borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.grey[400],
        borderRadius: '3px',
        '&:hover': {
            background: theme.palette.grey[600],
        },
    },
}));

const sectionIcons = {
    header: HeaderIcon,
    summary: SummaryIcon,
    contact: ContactIcon,
    experience: ExperienceIcon,
    education: EducationIcon,
    skills: SkillsIcon,
    certifications: CertificationsIcon,
    knowledges: KnowledgesIcon,
    studies: StudiesIcon,
    stacks: StacksIcon,
    custom: CustomIcon
};

const SectionSorter = ({ sections, onSectionsChange, onSectionToggle, lang = 'es' }) => {
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.outerHTML);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        
        if (draggedIndex === null || draggedIndex === dropIndex) return;

        const newSections = [...sections];
        const draggedSection = newSections[draggedIndex];
        
        // Remove dragged item
        newSections.splice(draggedIndex, 1);
        
        // Insert at new position
        newSections.splice(dropIndex, 0, draggedSection);
        
        onSectionsChange(newSections);
        setDraggedIndex(null);
    };

    const moveSection = (fromIndex, toIndex) => {
        if (toIndex < 0 || toIndex >= sections.length) return;
        
        const newSections = [...sections];
        const [movedSection] = newSections.splice(fromIndex, 1);
        newSections.splice(toIndex, 0, movedSection);
        
        onSectionsChange(newSections);
    };

    const getSectionIcon = (sectionId) => {
        const IconComponent = sectionIcons[sectionId] || sectionIcons.custom;
        return <IconComponent />;
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                {lang === 'es' ? 'Organiza las Secciones de tu CV' : 'Organize Your CV Sections'}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {lang === 'es' 
                    ? 'Arrastra las secciones para cambiar su orden y activa/desactiva las que desees incluir:'
                    : 'Drag sections to change their order and toggle which ones to include:'
                }
            </Typography>

            <SectionContainer elevation={1}>
                <List disablePadding>
                    {sections.map((section, index) => (
                        <DraggableListItem
                            key={section.id}
                            isDragging={draggedIndex === index}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <DragIcon color="action" />
                            </ListItemIcon>
                            
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                {getSectionIcon(section.id)}
                            </ListItemIcon>
                            
                            <ListItemText
                                primary={
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography variant="body1">
                                            {lang === 'es' ? section.name : section.nameEn}
                                        </Typography>
                                        {section.required && (
                                            <Chip 
                                                label={lang === 'es' ? 'Requerido' : 'Required'} 
                                                size="small" 
                                                color="primary" 
                                                variant="outlined"
                                            />
                                        )}
                                        {section.isCustom && (
                                            <Chip 
                                                label={lang === 'es' ? 'Personalizada' : 'Custom'} 
                                                size="small" 
                                                color="secondary" 
                                                variant="outlined"
                                            />
                                        )}
                                    </Box>
                                }
                                secondary={`${lang === 'es' ? 'Posición' : 'Position'}: ${index + 1}`}
                            />
                            
                            <ListItemSecondaryAction>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <IconButton
                                        size="small"
                                        onClick={() => moveSection(index, index - 1)}
                                        disabled={index === 0}
                                    >
                                        <UpIcon />
                                    </IconButton>
                                    
                                    <IconButton
                                        size="small"
                                        onClick={() => moveSection(index, index + 1)}
                                        disabled={index === sections.length - 1}
                                    >
                                        <DownIcon />
                                    </IconButton>
                                    
                                    <Switch
                                        checked={section.enabled}
                                        onChange={() => onSectionToggle(section.id)}
                                        disabled={section.required}
                                        size="small"
                                    />
                                </Box>
                            </ListItemSecondaryAction>
                        </DraggableListItem>
                    ))}
                </List>
            </SectionContainer>

            <Box sx={{ mt: 2, p: 2, bgcolor: 'info.50', borderRadius: 1 }}>
                <Typography variant="body2" color="info.main">
                    <strong>{lang === 'es' ? 'Consejo:' : 'Tip:'}</strong>{' '}
                    {lang === 'es' 
                        ? 'Las secciones desactivadas no aparecerán en tu CV final. Las secciones requeridas no se pueden desactivar.'
                        : 'Disabled sections will not appear in your final CV. Required sections cannot be disabled.'
                    }
                </Typography>
            </Box>
        </Box>
    );
};

export default SectionSorter;
