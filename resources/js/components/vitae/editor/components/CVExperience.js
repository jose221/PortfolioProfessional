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
    fontSize: '13px !important',
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
    fontSize: '12px',
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
    fontSize: '12px',
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
    fontSize: '12px',
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
            fontSize: '12px',
            lineHeight: 1.5,
            color: '#495057',
            marginBottom: theme.spacing(0.5),
            '&::marker': {
                color: '#667eea'
            }
        }
    }
}));

export const CVExperience = ({ title = "Experiencia Laboral", data = [], lang = 'es' }) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected
    }));

    // Don't render if no experience data
    if (!data || !Array.isArray(data) || data.length === 0) {
        return null;
    }

    const addExperience = () => {
        setProp((props) => {
            props.data.push({
                id: Date.now(),
                position: lang === 'es' ? 'Nuevo Puesto' : 'New Position',
                company: lang === 'es' ? 'Nueva Empresa' : 'New Company',
                location: '',
                startDate: '',
                endDate: '',
                description: '',
                achievements: [],
                technologies: []
            });
        });
    };

    const removeExperience = (index) => {
        setProp((props) => {
            props.data.splice(index, 1);
        });
    };

    const updateExperience = (index, field, value) => {
        setProp((props) => {
            props.data[index][field] = value;
        });
    };

    return (
        <ExperienceContainer
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

            {data.map((experience, index) => (
                <ExperienceItem key={experience.id || index} elevation={1}>
                    <JobHeader>
                        <Box>
                            <JobTitle
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateExperience(index, 'position', e.target.innerText)}
                            >
                                {experience.position || (lang === 'es' ? 'Puesto' : 'Position')}
                            </JobTitle>
                            
                            <CompanyInfo>
                                <WorkIcon sx={{ color: '#667eea', fontSize: '13px' }} />
                                <CompanyName
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateExperience(index, 'company', e.target.innerText)}
                                >
                                    {experience.company || (lang === 'es' ? 'Empresa' : 'Company')}
                                </CompanyName>
                                
                                {experience.location && (
                                    <Typography variant="body2" sx={{ color: '#6c757d' }}>
                                        • {experience.location}
                                    </Typography>
                                )}
                                
                                {(experience.startDate || experience.endDate) && (
                                    <Typography variant="body2" sx={{ color: '#6c757d' }}>
                                        • {experience.startDate} - {experience.endDate || (lang === 'es' ? 'Presente' : 'Present')}
                                    </Typography>
                                )}
                            </CompanyInfo>
                        </Box>

                        <IconButton
                            size="small"
                            onClick={() => removeExperience(index)}
                            sx={{ color: '#dc3545' }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </JobHeader>

                    {experience.description && (
                        <Typography
                            component="div"
                            variant="body2"
                            sx={{
                                color: '#495057',
                                lineHeight: 1.6,
                                marginBottom: 2,
                                cursor: 'text',
                                '&:focus': {
                                    outline: '1px dashed #667eea',
                                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                                    padding: '8px',
                                    borderRadius: '4px'
                                },
                                '& p': {
                                    margin: '0 0 8px 0',
                                    '&:last-child': { marginBottom: 0 }
                                },
                                '& ul, & ol': {
                                    paddingLeft: '20px',
                                    margin: '8px 0'
                                },
                                '& li': {
                                    marginBottom: '4px'
                                }
                            }}
                            contentEditable
                            suppressContentEditableWarning
                            dangerouslySetInnerHTML={{ __html: experience.description }}
                            onBlur={(e) => updateExperience(index, 'description', e.target.innerHTML)}
                        />
                    )}

                    {experience.technologies && experience.technologies.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                            {experience.technologies.map((tech, techIndex) => (
                                <Chip
                                    key={techIndex}
                                    label={typeof tech === 'object' ? (tech.title_es || tech.title_en || tech.title || tech.code) : tech}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        fontSize: '12px',
                                        height: '24px',
                                        borderColor: '#667eea',
                                        color: '#667eea'
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </ExperienceItem>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <IconButton
                    onClick={addExperience}
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
