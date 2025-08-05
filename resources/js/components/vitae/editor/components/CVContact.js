import React from 'react';
import { useNode } from '@craftjs/core';
import { Box, Typography, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    LinkedIn as LinkedInIcon,
    Language as WebsiteIcon,
    GitHub as GitHubIcon
} from '@mui/icons-material';

const ContactContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: '#f8f9fa',
    borderRadius: theme.spacing(1),
    border: '1px solid #e9ecef'
}));

const ContactItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: '0',
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    '&:hover': {
        backgroundColor: 'rgba(102, 126, 234, 0.05)'
    }
}));

const ContactText = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    color: '#495057',
    fontWeight: 400,
    cursor: 'text',
    '&:focus': {
        outline: '1px dashed #667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        padding: theme.spacing(0.5),
        borderRadius: theme.spacing(0.5)
    }
}));

const getIconForType = (type) => {
    const iconProps = { fontSize: 'small', sx: { color: '#667eea' } };
    switch (type) {
        case 'email': return <EmailIcon {...iconProps} />;
        case 'phone': return <PhoneIcon {...iconProps} />;
        case 'location': return <LocationIcon {...iconProps} />;
        case 'linkedin': return <LinkedInIcon {...iconProps} />;
        case 'website': return <WebsiteIcon {...iconProps} />;
        case 'github': return <GitHubIcon {...iconProps} />;
        default: return <EmailIcon {...iconProps} />;
    }
};

export const CVContact = ({ data = {}, lang = 'es' }) => {
    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp }
    } = useNode((state) => ({
        selected: state.events.selected
    }));

    const {
        email = "",
        phone = "",
        location = "",
        linkedin = "",
        website = "",
        github = ""
    } = data;

    // Create array of contact items that have actual values
    const contactItems = [
        { type: 'email', value: email, key: 'email' },
        { type: 'phone', value: phone, key: 'phone' },
        { type: 'location', value: location, key: 'location' },
        { type: 'linkedin', value: linkedin, key: 'linkedin' },
        { type: 'website', value: website, key: 'website' },
        { type: 'github', value: github, key: 'github' }
    ].filter(item => item.value && item.value.trim() !== "");

    // Don't render if no contact information
    if (contactItems.length === 0) {
        return null;
    }

    return (
        <ContactContainer
            ref={(ref) => connect(drag(ref))}
            sx={{
                outline: selected ? '2px solid #667eea' : 'none',
                outlineOffset: '4px',
                cursor: selected ? 'move' : 'default'
            }}
        >
            <Grid container spacing={2}>
                {contactItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={item.key}>
                        <ContactItem>
                            {getIconForType(item.type)}
                            <ContactText
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    setProp((props) => {
                                        props.data[item.key] = e.target.innerText;
                                    });
                                }}
                            >
                                {item.value}
                            </ContactText>
                        </ContactItem>
                    </Grid>
                ))}
            </Grid>
        </ContactContainer>
    );
};

// Craft.js settings
CVContact.craft = {
    displayName: 'CV Contact',
    props: {
        data: {
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            website: "",
            github: ""
        }
    },
    rules: {
        canDrag: true,
        canDrop: false,
        canMoveIn: false,
        canMoveOut: true
    }
};

export default CVContact;
