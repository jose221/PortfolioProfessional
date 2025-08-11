import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tooltip } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import { togglePreviewMode } from '../../../../redux/actions/preview-mode.js';
import { getPreviewMode } from '../../../../redux/selectors/preview-mode-selectors.js';

const PreviewModeButton = ({ lang = 'es' }) => {
    const dispatch = useDispatch();
    const isPreviewMode = useSelector(getPreviewMode);

    const handleTogglePreview = () => {
        dispatch(togglePreviewMode());
    };

    const buttonText = isPreviewMode 
        ? (lang === 'es' ? 'Editar' : 'Edit')
        : (lang === 'es' ? 'Vista Previa' : 'Preview');

    const tooltipText = isPreviewMode 
        ? (lang === 'es' ? 'Editar CV' : 'Edit CV')
        : (lang === 'es' ? 'Vista Previa' : 'Preview Mode');

    return (
        <Tooltip title={tooltipText}>
            <Button
                variant={isPreviewMode ? "contained" : "outlined"}
                onClick={handleTogglePreview}
                startIcon={isPreviewMode ? <EditIcon /> : <PreviewIcon />}
                sx={{ 
                    ml: 2,
                    minWidth: '120px'
                }}
                color={isPreviewMode ? "secondary" : "primary"}
            >
                {buttonText}
            </Button>
        </Tooltip>
    );
};

export default PreviewModeButton;
