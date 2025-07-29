import React from 'react';
import { useNode } from '@craftjs/core';
import { Box, Typography, Paper, Chip, Grid, Link, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Extension as SectionIcon,
    Language as LanguageIcon,
    Work as ProjectIcon,
    Star as CertificationIcon
} from '@mui/icons-material';

const SectionContainer = styled(Box)(({ theme }) => ({
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

const SectionItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2.5),
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

const EditableText = styled(Typography)(({ theme }) => ({
    cursor: 'text',
    '&:focus': {
        outline: '1px dashed #667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        padding: '2px 4px',
        borderRadius: '4px'
    }
}));

const getIconForType = (type) => {
    const iconProps = { fontSize: 'small', sx: { color: '#667eea', mr: 1 } };
    switch (type) {
        case 'certifications': 
        case 'list': 
            return <CertificationIcon {...iconProps} />;
        case 'languages': 
        case 'skills': 
            return <LanguageIcon {...iconProps} />;
        case 'projects': 
            return <ProjectIcon {...iconProps} />;
        default: 
            return <SectionIcon {...iconProps} />;
    }
};

// Component for rendering list-type sections (certifications, etc.)
const ListSection = ({ data, sectionId, setProp, selected }) => {
    const handleAddItem = () => {
        setProp((props) => {
            const newItem = {
                name: "Nuevo Item",
                issuer: "Emisor/Organización",
                date: "Fecha",
                credentialId: "ID Credencial"
            };
            props.data = [...(props.data || []), newItem];
        });
    };

    const handleDeleteItem = (itemIndex) => {
        setProp((props) => {
            props.data = props.data.filter((_, i) => i !== itemIndex);
        });
    };

    const updateItem = (itemIndex, field, value) => {
        setProp((props) => {
            if (props.data[itemIndex]) {
                props.data[itemIndex][field] = value;
            }
        });
    };

    return (
        <Box>
            {selected && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <IconButton
                        onClick={handleAddItem}
                        color="primary"
                        size="small"
                        sx={{ 
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.2)' }
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            )}

            {data && data.length > 0 ? data.map((item, index) => (
                <SectionItem key={index} elevation={1}>
                    {selected && (
                        <IconButton
                            onClick={() => handleDeleteItem(index)}
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

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <EditableText
                                variant="h6"
                                sx={{ fontWeight: 600, color: '#2c3e50', mb: 1 }}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateItem(index, 'name', e.target.innerText)}
                            >
                                {item.name}
                            </EditableText>
                            
                            <EditableText
                                variant="body2"
                                sx={{ color: '#667eea', fontWeight: 500 }}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateItem(index, 'issuer', e.target.innerText)}
                            >
                                {item.issuer}
                            </EditableText>
                            
                            {item.credentialId && (
                                <EditableText
                                    variant="caption"
                                    sx={{ color: '#6c757d', display: 'block', mt: 0.5 }}
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateItem(index, 'credentialId', e.target.innerText)}
                                >
                                    ID: {item.credentialId}
                                </EditableText>
                            )}
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                            <Chip
                                label={
                                    <EditableText
                                        variant="caption"
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => updateItem(index, 'date', e.target.innerText)}
                                        sx={{ cursor: 'text' }}
                                    >
                                        {item.date}
                                    </EditableText>
                                }
                                size="small"
                                variant="outlined"
                                color="primary"
                            />
                        </Grid>
                    </Grid>
                </SectionItem>
            )) : (
                <Paper
                    sx={{
                        p: 3,
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        border: '2px dashed #dee2e6'
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        No hay elementos. Haz clic en "+" para agregar.
                    </Typography>
                </Paper>
            )}
        </Box>
    );
};

// Component for skills-type sections (languages, etc.)
const SkillsSection = ({ data, sectionId, setProp, selected }) => {
    const handleAddSkill = () => {
        setProp((props) => {
            const newSkill = { name: "Nueva Habilidad", level: "Nivel" };
            props.data = [...(props.data || []), newSkill];
        });
    };

    return (
        <Box>
            {selected && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <IconButton
                        onClick={handleAddSkill}
                        color="primary"
                        size="small"
                        sx={{ 
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.2)' }
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            )}

            <SectionItem elevation={1}>
                <Grid container spacing={2}>
                    {data && data.length > 0 ? data.map((skill, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <EditableText
                                    variant="body2"
                                    sx={{ fontWeight: 500, color: '#495057' }}
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => {
                                        setProp((props) => {
                                            if (props.data[index]) {
                                                props.data[index].name = e.target.innerText;
                                            }
                                        });
                                    }}
                                >
                                    {skill.name}
                                </EditableText>
                                
                                <Chip
                                    label={
                                        <EditableText
                                            variant="caption"
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={(e) => {
                                                setProp((props) => {
                                                    if (props.data[index]) {
                                                        props.data[index].level = e.target.innerText;
                                                    }
                                                });
                                            }}
                                            sx={{ cursor: 'text' }}
                                        >
                                            {skill.level}
                                        </EditableText>
                                    }
                                    size="small"
                                    variant="outlined"
                                    color="secondary"
                                />
                            </Box>
                        </Grid>
                    )) : (
                        <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                                No hay habilidades. Haz clic en "+" para agregar.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </SectionItem>
        </Box>
    );
};

// Component for projects-type sections
const ProjectsSection = ({ data, sectionId, setProp, selected }) => {
    const handleAddProject = () => {
        setProp((props) => {
            const newProject = {
                name: "Nuevo Proyecto",
                description: "Descripción del proyecto",
                technologies: ["Tech1", "Tech2"],
                url: "https://proyecto.com",
                date: "Fecha"
            };
            props.data = [...(props.data || []), newProject];
        });
    };

    return (
        <Box>
            {selected && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <IconButton
                        onClick={handleAddProject}
                        color="primary"
                        size="small"
                        sx={{ 
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.2)' }
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            )}

            {data && data.length > 0 ? data.map((project, index) => (
                <SectionItem key={index} elevation={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <EditableText
                                variant="h6"
                                sx={{ fontWeight: 600, color: '#2c3e50', mb: 1 }}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    setProp((props) => {
                                        if (props.data[index]) {
                                            props.data[index].name = e.target.innerText;
                                        }
                                    });
                                }}
                            >
                                {project.name}
                            </EditableText>
                            
                            <EditableText
                                variant="body2"
                                sx={{ color: '#495057', mb: 1, lineHeight: 1.5 }}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    setProp((props) => {
                                        if (props.data[index]) {
                                            props.data[index].description = e.target.innerText;
                                        }
                                    });
                                }}
                            >
                                {project.description}
                            </EditableText>
                            
                            {project.technologies && (
                                <Box sx={{ mb: 1 }}>
                                    {project.technologies.map((tech, techIndex) => (
                                        <Chip
                                            key={techIndex}
                                            label={tech}
                                            size="small"
                                            variant="outlined"
                                            sx={{ mr: 0.5, mb: 0.5 }}
                                        />
                                    ))}
                                </Box>
                            )}
                            
                            {project.url && (
                                <Link
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ fontSize: '0.85rem', color: '#667eea' }}
                                >
                                    {project.url}
                                </Link>
                            )}
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                            <Chip
                                label={project.date}
                                size="small"
                                variant="outlined"
                                color="primary"
                            />
                        </Grid>
                    </Grid>
                </SectionItem>
            )) : (
                <Paper
                    sx={{
                        p: 3,
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        border: '2px dashed #dee2e6'
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        No hay proyectos. Haz clic en "+" para agregar.
                    </Typography>
                </Paper>
            )}
        </Box>
    );
};

export const CVSection = ({ title = "Sección Adicional", data = [], type = "list" }) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected
    }));

    const renderSectionContent = () => {
        switch (type) {
            case 'skills':
                return <SkillsSection data={data} setProp={setProp} selected={selected} />;
            case 'projects':
                return <ProjectsSection data={data} setProp={setProp} selected={selected} />;
            case 'list':
            case 'certifications':
            default:
                return <ListSection data={data} setProp={setProp} selected={selected} />;
        }
    };

    return (
        <SectionContainer
            ref={(ref) => connect(drag(ref))}
            sx={{
                outline: selected ? '2px solid #667eea' : 'none',
                outlineOffset: '4px'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getIconForType(type)}
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

            {renderSectionContent()}
        </SectionContainer>
    );
};

// Craft.js settings
CVSection.craft = {
    displayName: 'CV Section',
    props: {
        title: "Sección Adicional",
        data: [],
        type: "list"
    },
    rules: {
        canDrag: true,
        canDrop: false,
        canMoveIn: false,
        canMoveOut: true
    }
};

export default CVSection;
