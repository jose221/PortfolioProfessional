import React from 'react';
import { useNode } from '@craftjs/core';
import { Box, Typography, Paper, Chip, Grid, LinearProgress, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Psychology as SkillsIcon
} from '@mui/icons-material';

const SkillsContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4)
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.3rem',
    fontWeight: 600,
    color: '#2c3e50',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderBottom: '2px solid #667eea',
    display: 'inline-block',
    position: 'relative'
}));

const SkillCategory = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: theme.spacing(1),
    position: 'relative'
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 600,
    color: '#495057',
    marginBottom: theme.spacing(1.5),
    cursor: 'text',
    '&:focus': {
        outline: '1px dashed #667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        padding: '2px 4px',
        borderRadius: '4px'
    }
}));

const SkillChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    cursor: 'text',
    '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 2px 8px rgba(102, 126, 234, 0.2)'
    },
    '& .MuiChip-label': {
        cursor: 'text'
    }
}));

const SoftSkillItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    '&:hover': {
        backgroundColor: 'rgba(102, 126, 234, 0.05)'
    }
}));

const SkillName = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#495057',
    cursor: 'text',
    flex: 1,
    '&:focus': {
        outline: '1px dashed #667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        padding: '2px 4px',
        borderRadius: '4px'
    }
}));

export const CVSkills = ({ title = "Habilidades", data = {}, lang = 'es' }) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected
    }));

    const { technical = [], soft = [] } = data;

    // Don't render if no skills data
    if ((!technical || technical.length === 0) && (!soft || soft.length === 0)) {
        return null;
    }

    const addSkillCategory = () => {
        setProp((props) => {
            props.data.technical.push({
                category: lang === 'es' ? 'Nueva Categoría' : 'New Category',
                items: [
                    {
                        name: lang === 'es' ? 'Nueva Habilidad' : 'New Skill',
                        level: 50,
                        years: 0
                    }
                ]
            });
        });
    };

    const removeSkillCategory = (categoryIndex) => {
        setProp((props) => {
            props.data.technical.splice(categoryIndex, 1);
        });
    };

    const updateCategoryTitle = (categoryIndex, value) => {
        setProp((props) => {
            props.data.technical[categoryIndex].category = value;
        });
    };

    const addSkillToCategory = (categoryIndex) => {
        setProp((props) => {
            props.data.technical[categoryIndex].items.push({
                name: lang === 'es' ? 'Nueva Habilidad' : 'New Skill',
                level: 50,
                years: 0
            });
        });
    };

    const removeSkillFromCategory = (categoryIndex, skillIndex) => {
        setProp((props) => {
            props.data.technical[categoryIndex].items.splice(skillIndex, 1);
        });
    };

    const updateSkill = (categoryIndex, skillIndex, field, value) => {
        setProp((props) => {
            props.data.technical[categoryIndex].items[skillIndex][field] = value;
        });
    };

    return (
        <SkillsContainer
            ref={(ref) => connect(drag(ref))}
            sx={{
                outline: selected ? '2px solid #667eea' : 'none',
                outlineOffset: '4px',
                cursor: selected ? 'move' : 'default'
            }}
        >
            <SectionTitle
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                    setProp((props) => {
                        props.title = e.target.innerText;
                    });
                }}
                sx={{
                    '&:focus': {
                        outline: '1px dashed #667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.05)',
                        padding: '4px 8px',
                        borderRadius: '4px'
                    }
                }}
            >
                {title}
            </SectionTitle>

            {/* Technical Skills */}
            {technical && technical.length > 0 && (
                <Grid container spacing={2}>
                    {technical.map((category, categoryIndex) => (
                        <Grid item xs={12} md={6} key={categoryIndex}>
                            <SkillCategory elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <CategoryTitle
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => updateCategoryTitle(categoryIndex, e.target.innerText)}
                                    >
                                        {category.category}
                                    </CategoryTitle>
                                    
                                    {selected && (
                                        <Box>
                                            <IconButton
                                                size="small"
                                                onClick={() => addSkillToCategory(categoryIndex)}
                                                sx={{ color: '#667eea', mr: 1 }}
                                            >
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => removeSkillCategory(categoryIndex)}
                                                sx={{ color: '#dc3545' }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>

                                {category.items && category.items.map((skill, skillIndex) => (
                                    <Box key={skillIndex} sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                            <SkillName
                                                contentEditable
                                                suppressContentEditableWarning
                                                onBlur={(e) => updateSkill(categoryIndex, skillIndex, 'name', e.target.innerText)}
                                            >
                                                {skill.name}
                                            </SkillName>
                                            
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {skill.years > 0 && (
                                                    <Typography variant="caption" sx={{ color: '#6c757d' }}>
                                                        {skill.years} {lang === 'es' ? 'años' : 'years'}
                                                    </Typography>
                                                )}
                                                
                                                {selected && (
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => removeSkillFromCategory(categoryIndex, skillIndex)}
                                                        sx={{ color: '#dc3545' }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </Box>
                                        
                                        {skill.level > 0 && (
                                            <LinearProgress
                                                variant="determinate"
                                                value={skill.level || 50}
                                                sx={{
                                                    height: 6,
                                                    borderRadius: 3,
                                                    backgroundColor: '#e9ecef',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: '#667eea',
                                                        borderRadius: 3
                                                    }
                                                }}
                                            />
                                        )}
                                    </Box>
                                ))}
                            </SkillCategory>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Soft Skills (if any) */}
            {soft && soft.length > 0 && (
                <SkillCategory elevation={0} sx={{ mt: 2 }}>
                    <CategoryTitle>
                        {lang === 'es' ? 'Habilidades Blandas' : 'Soft Skills'}
                    </CategoryTitle>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {soft.map((skill, index) => (
                            <SkillChip
                                key={index}
                                label={typeof skill === 'object' ? skill.name : skill}
                                variant="outlined"
                                color="secondary"
                                size="small"
                            />
                        ))}
                    </Box>
                </SkillCategory>
            )}

            {/* Add Category Button */}
            {selected && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <IconButton
                        onClick={addSkillCategory}
                        sx={{
                            backgroundColor: '#667eea',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#5a6fd8'
                            }
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            )}
        </SkillsContainer>
    );
};

// Craft.js settings
CVSkills.craft = {
    displayName: 'CV Skills',
    props: {
        title: "Habilidades",
        data: {
            technical: [],
            soft: []
        }
    },
    rules: {
        canDrag: true,
        canDrop: false,
        canMoveIn: false,
        canMoveOut: true
    }
};

export default CVSkills;
