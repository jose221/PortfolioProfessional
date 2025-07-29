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

export const CVEducation = ({ title = "Educación", data = [] }) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected
    }));

    const handleAddEducation = () => {
        setProp((props) => {
            const newEducation = {
                id: Date.now(),
                degree: "Título/Grado",
                institution: "Nombre de la Institución",
                location: "Ubicación",
                graduationDate: "Fecha de Graduación",
                gpa: "Promedio",
                honors: "Honores/Distinciones",
                coursework: ["Materia relevante 1", "Materia relevante 2"]
            };
            props.data = [...(props.data || []), newEducation];
        });
    };

    const handleDeleteEducation = (educationId) => {
        setProp((props) => {
            props.data = props.data.filter(edu => edu.id !== educationId);
        });
    };

    const updateEducationField = (educationId, field, value) => {
        setProp((props) => {
            const educationIndex = props.data.findIndex(edu => edu.id === educationId);
            if (educationIndex !== -1) {
                props.data[educationIndex][field] = value;
            }
        });
    };

    return (
        <EducationContainer
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
                        onClick={handleAddEducation}
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

            {data && data.length > 0 ? data.map((education) => (
                <EducationItem key={education.id} elevation={1}>
                    {selected && (
                        <IconButton
                            onClick={() => handleDeleteEducation(education.id)}
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

                    <DegreeHeader>
                        <Box sx={{ flex: 1 }}>
                            <DegreeTitle
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    updateEducationField(education.id, 'degree', e.target.innerText);
                                }}
                            >
                                {education.degree}
                            </DegreeTitle>
                            
                            <InstitutionInfo>
                                <InstitutionName
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => {
                                        updateEducationField(education.id, 'institution', e.target.innerText);
                                    }}
                                >
                                    {education.institution}
                                </InstitutionName>
                                
                                <Typography variant="body2" color="text.secondary">
                                    •
                                </Typography>
                                
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => {
                                        updateEducationField(education.id, 'location', e.target.innerText);
                                    }}
                                    sx={{ cursor: 'text' }}
                                >
                                    {education.location}
                                </Typography>
                            </InstitutionInfo>

                            {/* GPA and Honors */}
                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                {education.gpa && (
                                    <Typography
                                        variant="body2"
                                        sx={{ color: '#28a745', fontWeight: 500 }}
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => {
                                            updateEducationField(education.id, 'gpa', e.target.innerText);
                                        }}
                                    >
                                        GPA: {education.gpa}
                                    </Typography>
                                )}
                                
                                {education.honors && (
                                    <Typography
                                        variant="body2"
                                        sx={{ color: '#ffc107', fontWeight: 500 }}
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => {
                                            updateEducationField(education.id, 'honors', e.target.innerText);
                                        }}
                                    >
                                        {education.honors}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        
                        <Chip
                            label={
                                <Typography
                                    variant="caption"
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => {
                                        updateEducationField(education.id, 'graduationDate', e.target.innerText);
                                    }}
                                    sx={{ cursor: 'text' }}
                                >
                                    {education.graduationDate}
                                </Typography>
                            }
                            size="small"
                            variant="outlined"
                            color="primary"
                        />
                    </DegreeHeader>

                    {/* Relevant Coursework */}
                    {education.coursework && education.coursework.length > 0 && (
                        <CourseworkContainer>
                            <Typography variant="subtitle2" sx={{ mb: 1, color: '#495057', fontWeight: 600 }}>
                                Materias Relevantes:
                            </Typography>
                            <ul>
                                {education.coursework.map((course, index) => (
                                    <li
                                        key={index}
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => {
                                            setProp((props) => {
                                                const eduIndex = props.data.findIndex(edu => edu.id === education.id);
                                                if (eduIndex !== -1) {
                                                    props.data[eduIndex].coursework[index] = e.target.innerText;
                                                }
                                            });
                                        }}
                                        style={{ cursor: 'text' }}
                                    >
                                        {course}
                                    </li>
                                ))}
                            </ul>
                        </CourseworkContainer>
                    )}
                </EducationItem>
            )) : (
                <Paper
                    sx={{
                        p: 3,
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        border: '2px dashed #dee2e6'
                    }}
                >
                    <SchoolIcon sx={{ fontSize: 48, color: '#adb5bd', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No hay educación agregada
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Haz clic en el botón "+" para agregar tu formación académica
                    </Typography>
                </Paper>
            )}
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
