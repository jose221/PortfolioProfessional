import React from 'react';
import { useNode } from '@craftjs/core';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderContainer = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3, 0),
    borderBottom: '2px solid #667eea',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-2px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100px',
        height: '2px',
        background: 'linear-gradient(90deg, #667eea, #764ba2)',
    }
}));

const NameTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: theme.spacing(1),
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    letterSpacing: '0.5px'
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
    color: '#667eea',
    fontWeight: 500,
    marginBottom: theme.spacing(0.5),
    fontStyle: 'italic'
}));

export const CVHeader = ({ data = {}, lang = 'es' }) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected
    }));

    const {
        fullName = "Sin nombre",
        title = ""
    } = data;

    // Don't render if no meaningful data
    if (!fullName || fullName === "Sin nombre") {
        return null;
    }

    return (
        <HeaderContainer
            ref={(ref) => connect(drag(ref))}
            sx={{
                outline: selected ? '2px solid #667eea' : 'none',
                outlineOffset: '4px',
                cursor: selected ? 'move' : 'default'
            }}
        >
            <NameTypography
                variant="h3"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                    setProp((props) => {
                        props.data.fullName = e.target.innerText;
                    });
                }}
                sx={{
                    '&:focus': {
                        outline: '1px dashed #667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.05)'
                    }
                }}
            >
                {fullName}
            </NameTypography>

            {title && title.trim() !== "" && (
                <TitleTypography
                    variant="h5"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                        setProp((props) => {
                            props.data.title = e.target.innerText;
                        });
                    }}
                    sx={{
                        '&:focus': {
                            outline: '1px dashed #667eea',
                            backgroundColor: 'rgba(102, 126, 234, 0.05)'
                        }
                    }}
                >
                    {title}
                </TitleTypography>
            )}
        </HeaderContainer>
    );
};

// Craft.js settings for the component
CVHeader.craft = {
    displayName: 'CV Header',
    props: {
        data: {
            fullName: "Sin nombre",
            title: ""
        }
    },
    rules: {
        canDrag: true,
        canDrop: false,
        canMoveIn: false,
        canMoveOut: true
    }
};

export default CVHeader;
