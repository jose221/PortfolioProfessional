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

export const CVSkills = ({ title = "Habilidades", data = {} }) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected
    }));

    const { technical = [], soft = [] } = data;

    const handleAddTechnicalCategory = () => {
        setProp((props) => {
            const newCategory = {
                category: "Nueva Categoría",
                items: ["Habilidad 1", "Habilidad 2"]
            };
            props.data.technical = [...(props.data.technical || []), newCategory];
        });
    };

    const handleAddSoftSkill = () => {
        setProp((props) => {
            props.data.soft = [...(props.data.soft || []), "Nueva Habilidad Blanda"];
        });
    };

    const handleDeleteTechnicalCategory = (index) => {
        setProp((props) => {
            props.data.technical = props.data.technical.filter((_, i) => i !== index);
        });
    };

    const handleDeleteSoftSkill = (index) => {
        setProp((props) => {
            props.data.soft = props.data.soft.filter((_, i) => i !== index);
        });
    };

    const updateTechnicalCategory = (categoryIndex, field, value) => {
        setProp((props) => {
            if (props.data.technical[categoryIndex]) {
                props.data.technical[categoryIndex][field] = value;
            }
        });
    };

    const updateSoftSkill = (skillIndex, value) => {
        setProp((props) => {
            if (props.data.soft[skillIndex] !== undefined) {
                props.data.soft[skillIndex] = value;
            }
        });
    };

    return (
        <SkillsContainer
            ref={(ref) => connect(drag(ref))}
            sx={{
                outline: selected ? '2px solid #667eea' : 'none',
                outlineOffset: '4px'
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
            </Box>

            <Grid container spacing={3}>
                {/* Technical Skills */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: '#495057', fontWeight: 600 }}>
                            Habilidades Técnicas
                        </Typography>
                        {selected && (
                            <IconButton
                                onClick={handleAddTechnicalCategory}
                                color="primary"
                                size="small"
                                sx={{ 
                                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                    '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.2)' }
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        )}
                    </Box>

                    {technical && technical.length > 0 ? technical.map((category, categoryIndex) => (
                        <SkillCategory key={categoryIndex} elevation={0}>
                            {selected && (
                                <IconButton
                                    onClick={() => handleDeleteTechnicalCategory(categoryIndex)}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        color: '#dc3545'
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            )}

                            <CategoryTitle
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    updateTechnicalCategory(categoryIndex, 'category', e.target.innerText);
                                }}
                            >
                                {category.category}
                            </CategoryTitle>

                            <Box>
                                {category.items?.map((skill, skillIndex) => (
                                    <SkillChip
                                        key={skillIndex}
                                        label={
                                            <span
                                                contentEditable
                                                suppressContentEditableWarning
                                                onBlur={(e) => {
                                                    setProp((props) => {
                                                        if (props.data.technical[categoryIndex]?.items[skillIndex] !== undefined) {
                                                            props.data.technical[categoryIndex].items[skillIndex] = e.target.innerText;
                                                        }
                                                    });
                                                }}
                                                style={{ cursor: 'text' }}
                                            >
                                                {skill}
                                            </span>
                                        }
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                    />
                                ))}
                            </Box>
                        </SkillCategory>
                    )) : (
                        <Paper
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                backgroundColor: '#f8f9fa',
                                border: '2px dashed #dee2e6'
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                No hay habilidades técnicas. Haz clic en "+" para agregar.
                            </Typography>
                        </Paper>
                    )}
                </Grid>

                {/* Soft Skills */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: '#495057', fontWeight: 600 }}>
                            Habilidades Blandas
                        </Typography>
                        {selected && (
                            <IconButton
                                onClick={handleAddSoftSkill}
                                color="secondary"
                                size="small"
                                sx={{ 
                                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                    '&:hover': { backgroundColor: 'rgba(255, 107, 107, 0.2)' }
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        )}
                    </Box>

                    <SkillCategory elevation={0}>
                        {soft && soft.length > 0 ? soft.map((skill, skillIndex) => (
                            <SoftSkillItem key={skillIndex}>
                                <SkillName
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => {
                                        updateSoftSkill(skillIndex, e.target.innerText);
                                    }}
                                >
                                    {skill}
                                </SkillName>
                                
                                {selected && (
                                    <IconButton
                                        onClick={() => handleDeleteSoftSkill(skillIndex)}
                                        size="small"
                                        sx={{ color: '#dc3545', ml: 1 }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </SoftSkillItem>
                        )) : (
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', p: 2 }}>
                                No hay habilidades blandas. Haz clic en "+" para agregar.
                            </Typography>
                        )}
                    </SkillCategory>
                </Grid>
            </Grid>

            {/* Empty State */}
            {(!technical || technical.length === 0) && (!soft || soft.length === 0) && (
                <Paper
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        border: '2px dashed #dee2e6'
                    }}
                >
                    <SkillsIcon sx={{ fontSize: 48, color: '#adb5bd', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No hay habilidades agregadas
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Haz clic en los botones "+" para agregar tus habilidades técnicas y blandas
                    </Typography>
                </Paper>
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
