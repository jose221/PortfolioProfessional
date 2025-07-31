import React from 'react';
import { useNode } from '@craftjs/core';
import { Box, Typography, Paper, Chip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    School as SchoolIcon
} from '@mui/icons-material';

const EducationContainer = styled(Box)(({ theme }) => ({
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

const EducationItem = styled(Paper)(({ theme }) => ({
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

const DegreeHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(1)
}));

const DegreeTitle = styled(Typography)(({ theme }) => ({
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

const InstitutionInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
}));

const InstitutionName = styled(Typography)(({ theme }) => ({
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

const CourseworkContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
    '& ul': {
        margin: 0,
        paddingLeft: theme.spacing(2),
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: theme.spacing(0.5),
        '& li': {
            fontSize: '0.85rem',
            lineHeight: 1.4,
            color: '#6c757d',
            listStyle: 'none',
            position: 'relative',
            paddingLeft: theme.spacing(2),
            '&::before': {
                content: '"▪"',
                color: '#667eea',
                position: 'absolute',
                left: 0
            }
        }
    }
}));

export const CVEducation = ({ title = "Educación", data = [], lang = 'es' }) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected
    }));

    // Don't render if no education data
    if (!data || !Array.isArray(data) || data.length === 0) {
        return null;
    }

    const addEducation = () => {
        setProp((props) => {
            props.data.push({
                id: Date.now(),
                degree: lang === 'es' ? 'Nuevo Título' : 'New Degree',
                institution: lang === 'es' ? 'Nueva Institución' : 'New Institution',
                location: '',
                graduationDate: '',
                gpa: '',
                coursework: '',
                honors: ''
            });
        });
    };

    const removeEducation = (index) => {
        setProp((props) => {
            props.data.splice(index, 1);
        });
    };

    const updateEducation = (index, field, value) => {
        setProp((props) => {
            props.data[index][field] = value;
        });
    };

    return (
        <EducationContainer
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

            {data.map((education, index) => (
                <EducationItem key={education.id || index} elevation={1}>
                    <DegreeHeader>
                        <Box>
                            <DegreeTitle
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateEducation(index, 'degree', e.target.innerText)}
                            >
                                {education.degree || (lang === 'es' ? 'Título' : 'Degree')}
                            </DegreeTitle>
                            
                            <InstitutionInfo>
                                <SchoolIcon sx={{ color: '#667eea', fontSize: '1.1rem' }} />
                                <InstitutionName
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateEducation(index, 'institution', e.target.innerText)}
                                >
                                    {education.institution || (lang === 'es' ? 'Institución' : 'Institution')}
                                </InstitutionName>
                                
                                {education.location && (
                                    <Typography variant="body2" sx={{ color: '#6c757d' }}>
                                        • {education.location}
                                    </Typography>
                                )}
                                
                                {education.graduationDate && (
                                    <Typography variant="body2" sx={{ color: '#6c757d' }}>
                                        • {education.graduationDate}
                                    </Typography>
                                )}
                                
                                {education.gpa && (
                                    <Chip
                                        label={`GPA: ${education.gpa}`}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            fontSize: '0.75rem',
                                            height: '24px',
                                            borderColor: '#667eea',
                                            color: '#667eea'
                                        }}
                                    />
                                )}
                            </InstitutionInfo>
                        </Box>

                        <IconButton
                            size="small"
                            onClick={() => removeEducation(index)}
                            sx={{ color: '#dc3545' }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </DegreeHeader>

                    {education.coursework && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#495057',
                                lineHeight: 1.6,
                                marginBottom: 1,
                                fontStyle: 'italic'
                            }}
                        >
                            <strong>{lang === 'es' ? 'Materias relevantes:' : 'Relevant Coursework:'}</strong> {education.coursework}
                        </Typography>
                    )}

                    {education.honors && (
                        <Typography
                            component="div"
                            variant="body2"
                            sx={{
                                color: '#495057',
                                lineHeight: 1.6,
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
                            dangerouslySetInnerHTML={{ __html: education.honors }}
                            onBlur={(e) => updateEducation(index, 'honors', e.target.innerHTML)}
                        />
                    )}
                </EducationItem>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <IconButton
                    onClick={addEducation}
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
        </EducationContainer>
    );
};

// Craft.js settings
CVEducation.craft = {
    displayName: 'CV Education',
    props: {
        title: "Educación",
        data: []
    },
    rules: {
        canDrag: true,
        canDrop: false,
        canMoveIn: false,
        canMoveOut: true
    }
};

export default CVEducation;
