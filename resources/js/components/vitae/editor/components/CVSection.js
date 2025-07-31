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
const ListSection = ({ data, sectionId, setProp, selected, lang }) => {
    const handleAddItem = () => {
        setProp((props) => {
            const newItem = {
                title: lang === 'es' ? "Nuevo Item" : "New Item",
                subtitle: lang === 'es' ? "Organización" : "Organization",
                date: "",
                description: ""
            };
            props.data = [...(props.data || []), newItem];
        });
    };

    const handleDeleteItem = (index) => {
        setProp((props) => {
            props.data.splice(index, 1);
        });
    };

    const updateItem = (index, field, value) => {
        setProp((props) => {
            props.data[index][field] = value;
        });
    };

    if (!data || data.length === 0) return null;

    return (
        <Box>
            {data.map((item, index) => (
                <SectionItem key={index} elevation={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ flex: 1 }}>
                            <EditableText
                                variant="h6"
                                sx={{ fontWeight: 600, color: '#2c3e50', mb: 0.5 }}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateItem(index, 'title', e.target.innerText)}
                            >
                                {item.title || item.name || (lang === 'es' ? 'Título' : 'Title')}
                            </EditableText>
                            
                            {(item.subtitle || item.organization) && (
                                <EditableText
                                    variant="body2"
                                    sx={{ color: '#667eea', fontWeight: 500, mb: 1 }}
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateItem(index, 'subtitle', e.target.innerText)}
                                >
                                    {item.subtitle || item.organization}
                                </EditableText>
                            )}
                            
                            {item.date && (
                                <Typography variant="caption" sx={{ color: '#6c757d', display: 'block', mb: 1 }}>
                                    {item.date}
                                </Typography>
                            )}
                            
                            {item.description && (
                                <Typography
                                    component="div"
                                    variant="body2"
                                    sx={{
                                        color: '#495057',
                                        lineHeight: 1.6,
                                        mb: 1,
                                        '& p': { margin: '0 0 8px 0', '&:last-child': { marginBottom: 0 } },
                                        '& ul, & ol': { paddingLeft: '20px', margin: '8px 0' },
                                        '& li': { marginBottom: '4px' }
                                    }}
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                />
                            )}
                        </Box>
                        
                        {selected && (
                            <IconButton
                                size="small"
                                onClick={() => handleDeleteItem(index)}
                                sx={{ color: '#dc3545' }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                </SectionItem>
            ))}
            
            {selected && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <IconButton
                        onClick={handleAddItem}
                        sx={{
                            backgroundColor: '#667eea',
                            color: 'white',
                            '&:hover': { backgroundColor: '#5a6fd8' }
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

// Component for rendering project-type sections
const ProjectSection = ({ data, sectionId, setProp, selected, lang }) => {
    const handleAddProject = () => {
        setProp((props) => {
            const newProject = {
                title: lang === 'es' ? "Nuevo Proyecto" : "New Project",
                description: "",
                technologies: [],
                url: ""
            };
            props.data = [...(props.data || []), newProject];
        });
    };

    const handleDeleteProject = (index) => {
        setProp((props) => {
            props.data.splice(index, 1);
        });
    };

    const updateProject = (index, field, value) => {
        setProp((props) => {
            props.data[index][field] = value;
        });
    };

    if (!data || data.length === 0) return null;

    return (
        <Box>
            {data.map((project, index) => (
                <SectionItem key={index} elevation={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ flex: 1 }}>
                            <EditableText
                                variant="h6"
                                sx={{ fontWeight: 600, color: '#2c3e50', mb: 1 }}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateProject(index, 'title', e.target.innerText)}
                            >
                                {project.title || (lang === 'es' ? 'Título del Proyecto' : 'Project Title')}
                            </EditableText>
                            
                            {project.url && (
                                <Link 
                                    href={project.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    sx={{ color: '#667eea', fontSize: '0.9rem', display: 'block', mb: 1 }}
                                >
                                    {project.url}
                                </Link>
                            )}
                            
                            {project.description && (
                                <Typography
                                    component="div"
                                    variant="body2"
                                    sx={{
                                        color: '#495057',
                                        lineHeight: 1.6,
                                        mb: 1,
                                        '& p': { margin: '0 0 8px 0', '&:last-child': { marginBottom: 0 } },
                                        '& ul, & ol': { paddingLeft: '20px', margin: '8px 0' },
                                        '& li': { marginBottom: '4px' }
                                    }}
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                            )}
                            
                            {project.technologies && project.technologies.length > 0 && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {project.technologies.map((tech, techIndex) => (
                                        <Chip
                                            key={techIndex}
                                            label={typeof tech === 'object' ? (tech.name || tech.title) : tech}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                fontSize: '0.75rem',
                                                height: '24px',
                                                borderColor: '#667eea',
                                                color: '#667eea'
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}
                        </Box>
                        
                        {selected && (
                            <IconButton
                                size="small"
                                onClick={() => handleDeleteProject(index)}
                                sx={{ color: '#dc3545' }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                </SectionItem>
            ))}
            
            {selected && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <IconButton
                        onClick={handleAddProject}
                        sx={{
                            backgroundColor: '#667eea',
                            color: 'white',
                            '&:hover': { backgroundColor: '#5a6fd8' }
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export const CVSection = ({ title = "Sección Adicional", data = [], type = "list", lang = 'es' }) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected
    }));

    // Don't render if no data
    if (!data || (Array.isArray(data) && data.length === 0)) {
        return null;
    }

    const renderSectionContent = () => {
        switch (type) {
            case 'projects':
                return (
                    <ProjectSection 
                        data={data} 
                        setProp={setProp} 
                        selected={selected} 
                        lang={lang}
                    />
                );
            case 'list':
            case 'certifications':
            default:
                return (
                    <ListSection 
                        data={data} 
                        setProp={setProp} 
                        selected={selected} 
                        lang={lang}
                    />
                );
        }
    };

    return (
        <SectionContainer
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
                    display: 'flex',
                    alignItems: 'center',
                    '&:focus': {
                        outline: '1px dashed #667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.05)',
                        padding: '4px 8px',
                        borderRadius: '4px'
                    }
                }}
            >
                {getIconForType(type)}
                {title}
            </SectionTitle>

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
