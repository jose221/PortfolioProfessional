import React from 'react';
import { useNode } from '@craftjs/core';
import { Box, Typography, Paper, Chip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Work as WorkIcon
} from '@mui/icons-material';

const ExperienceContainer = styled(Box)(({ theme }) => ({
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

const ExperienceItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    backgroundColor: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: theme.spacing(1),
    position: 'relative',
    '&:hover': {
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
        transform: 'translateY(-1px)',
        transition: 'all 0.2s ease-in-out'
    }
}));

const JobHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(1)
}));

const JobTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#2c3e50',
    cursor: 'text',
    '&:focus': {
        outline: '1px dashed #667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        padding: '2px 4px',
        borderRadius: '4px'
    }
}));

const CompanyInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
}));

const CompanyName = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 500,
    color: '#667eea',
    cursor: 'text',
    '&:focus': {
        outline: '1px dashed #667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        padding: '2px 4px',
        borderRadius: '4px'
    }
}));

const JobDescription = styled(Typography)(({ theme }) => ({
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: '#495057',
    marginBottom: theme.spacing(2),
    textAlign: 'justify',
    cursor: 'text',
    minHeight: '40px',
    '&:focus': {
        outline: '1px dashed #667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        padding: theme.spacing(0.5),
        borderRadius: '4px'
    }
}));

const AchievementsList = styled(Box)(({ theme }) => ({
    '& ul': {
        margin: 0,
        paddingLeft: theme.spacing(2),
        '& li': {
            fontSize: '0.9rem',
            lineHeight: 1.5,
            color: '#495057',
            marginBottom: theme.spacing(0.5),
            '&::marker': {
                color: '#667eea'
            }
        }
    }
}));

export const CVExperience = ({ title = "Experiencia Laboral", data = [] }) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected
    }));

    const handleAddExperience = () => {
        setProp((props) => {
            const newExperience = {
                id: Date.now(),
                position: "Nuevo Puesto",
                company: "Nombre de la Empresa",
                location: "Ubicación",
                startDate: "Fecha Inicio",
                endDate: "Fecha Fin",
                description: "Descripción del puesto y responsabilidades principales...",
                achievements: ["Logro o responsabilidad destacada"]
            };
            props.data = [...(props.data || []), newExperience];
        });
    };

    const handleDeleteExperience = (experienceId) => {
        setProp((props) => {
            props.data = props.data.filter(exp => exp.id !== experienceId);
        });
    };

    const updateExperienceField = (experienceId, field, value) => {
        setProp((props) => {
            const experienceIndex = props.data.findIndex(exp => exp.id === experienceId);
            if (experienceIndex !== -1) {
                props.data[experienceIndex][field] = value;
            }
        });
    };

    return (
        <ExperienceContainer
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
                
                {selected && (
                    <IconButton
                        onClick={handleAddExperience}
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

            {data && data.length > 0 ? data.map((experience) => (
                <ExperienceItem key={experience.id} elevation={1}>
                    {selected && (
                        <IconButton
                            onClick={() => handleDeleteExperience(experience.id)}
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

                    <JobHeader>
                        <Box>
                            <JobTitle
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    updateExperienceField(experience.id, 'position', e.target.innerText);
                                }}
                            >
                                {experience.position}
                            </JobTitle>
                            
                            <CompanyInfo>
                                <CompanyName
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => {
                                        updateExperienceField(experience.id, 'company', e.target.innerText);
                                    }}
                                >
                                    {experience.company}
                                </CompanyName>
                                
                                <Typography variant="body2" color="text.secondary">
                                    •
                                </Typography>
                                
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => {
                                        updateExperienceField(experience.id, 'location', e.target.innerText);
                                    }}
                                    sx={{ cursor: 'text' }}
                                >
                                    {experience.location}
                                </Typography>
                            </CompanyInfo>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip
                                label={
                                    <Typography
                                        variant="caption"
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => {
                                            updateExperienceField(experience.id, 'startDate', e.target.innerText);
                                        }}
                                        sx={{ cursor: 'text' }}
                                    >
                                        {experience.startDate}
                                    </Typography>
                                }
                                size="small"
                                variant="outlined"
                                color="primary"
                            />
                            <Typography variant="caption" sx={{ alignSelf: 'center' }}>-</Typography>
                            <Chip
                                label={
                                    <Typography
                                        variant="caption"
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => {
                                            updateExperienceField(experience.id, 'endDate', e.target.innerText);
                                        }}
                                        sx={{ cursor: 'text' }}
                                    >
                                        {experience.endDate}
                                    </Typography>
                                }
                                size="small"
                                variant="outlined"
                                color="primary"
                            />
                        </Box>
                    </JobHeader>

                    <JobDescription
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                            updateExperienceField(experience.id, 'description', e.target.innerText);
                        }}
                    >
                        {experience.description}
                    </JobDescription>

                    {experience.achievements && experience.achievements.length > 0 && (
                        <AchievementsList>
                            <Typography variant="subtitle2" sx={{ mb: 1, color: '#495057', fontWeight: 600 }}>
                                Logros Destacados:
                            </Typography>
                            <ul>
                                {experience.achievements.map((achievement, index) => (
                                    <li
                                        key={index}
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => {
                                            setProp((props) => {
                                                const expIndex = props.data.findIndex(exp => exp.id === experience.id);
                                                if (expIndex !== -1) {
                                                    props.data[expIndex].achievements[index] = e.target.innerText;
                                                }
                                            });
                                        }}
                                        style={{ cursor: 'text' }}
                                    >
                                        {achievement}
                                    </li>
                                ))}
                            </ul>
                        </AchievementsList>
                    )}
                </ExperienceItem>
            )) : (
                <Paper
                    sx={{
                        p: 3,
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        border: '2px dashed #dee2e6'
                    }}
                >
                    <WorkIcon sx={{ fontSize: 48, color: '#adb5bd', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No hay experiencia laboral agregada
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Haz clic en el botón "+" para agregar tu primera experiencia laboral
                    </Typography>
                </Paper>
            )}
        </ExperienceContainer>
    );
};

// Craft.js settings
CVExperience.craft = {
    displayName: 'CV Experience',
    props: {
        title: "Experiencia Laboral",
        data: []
    },
    rules: {
        canDrag: true,
        canDrop: false,
        canMoveIn: false,
        canMoveOut: true
    }
};

export default CVExperience;
