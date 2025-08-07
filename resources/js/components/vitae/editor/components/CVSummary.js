import React from 'react';
import { useNode } from '@craftjs/core';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const SummaryContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(1)
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '15px',
    fontWeight: 600,
    color: '#2c3e50',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderBottom: '2px solid #667eea',
    display: 'inline-block',
    position: 'relative'
}));

const SummaryContent = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2, 2),
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: theme.spacing(1),
    boxShadow: 'none',
    position: 'relative'
}));

const SummaryText = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    lineHeight: 1.6,
    color: '#495057',
    textAlign: 'justify',
    cursor: 'text',
    minHeight: '60px',
    '&:focus': {
        outline: '2px dashed #667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        padding: theme.spacing(1),
        borderRadius: theme.spacing(0.5)
    },
    '&:empty::before': {
        content: '"Haz clic aquí para agregar tu resumen profesional..."',
        color: '#adb5bd',
        fontStyle: 'italic'
    }
}));

export const CVSummary = ({ title = "Resumen Profesional", data = {}, lang = 'es' }) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected
    }));

    const { content = "" } = data;

    // Don't render if no content
    if (!content || content.trim() === "" || content === "Sin contenido") {
        return null;
    }

    // Function to strip HTML tags for editing but preserve for display
    const stripHtml = (html) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    // Function to convert newlines to HTML for editing
    const textToHtml = (text) => {
        return text.replace(/\n/g, '<br />');
    };

    return (
        <SummaryContainer
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

            <SummaryContent elevation={0}>
                <SummaryText
                    component="div"
                    contentEditable
                    suppressContentEditableWarning
                    dangerouslySetInnerHTML={{ __html: content }}
                    onBlur={(e) => {
                        setProp((props) => {
                            props.data.content = e.target.innerHTML;
                        });
                    }}
                    sx={{
                        '&:focus': {
                            outline: '2px dashed #667eea',
                            backgroundColor: 'rgba(102, 126, 234, 0.05)',
                            padding: '8px',
                            borderRadius: '4px'
                        },
                        '& p': {
                            margin: '0 0 0 0',
                            '&:last-child': {
                                marginBottom: 0
                            }
                        },
                        '& ul, & ol': {
                            paddingLeft: '20px',
                            margin: '8px 0'
                        },
                        '& li': {
                            marginBottom: '4px'
                        }
                    }}
                />
            </SummaryContent>
        </SummaryContainer>
    );
};

// Craft.js settings
CVSummary.craft = {
    displayName: 'CV Summary',
    props: {
        title: "Resumen Profesional",
        data: {
            content: ""
        }
    },
    rules: {
        canDrag: true,
        canDrop: false,
        canMoveIn: false,
        canMoveOut: true
    }
};

export default CVSummary;
