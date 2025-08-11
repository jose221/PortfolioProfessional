import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Chip,
    IconButton
} from '@mui/material';
import {
    Save as SaveIcon,
    Download as DownloadIcon,
    SaveAlt as SaveAltIcon,
    Close as CloseIcon,
    History as HistoryIcon,
    GetApp as GetAppIcon,
    CloudDownload as CloudDownloadIcon
} from '@mui/icons-material';

const SaveOptionsModal = ({ 
    open, 
    onClose, 
    onSaveToHistory, 
    onDownloadOnly, 
    onBoth, 
    lang = 'es',
    loading = false 
}) => {
    const texts = {
        es: {
            title: '¿Cómo deseas guardar tu CV?',
            subtitle: 'Selecciona una de las siguientes opciones:',
            saveToHistory: {
                title: 'Guardar PDF',
                description: 'Guarda el PDF como tu CV principal'
            },
            downloadOnly: {
                title: 'Solo Descargar',
                description: 'Descarga el PDF directamente sin guardarlo en el historial'
            },
            both: {
                title: 'Guardar y Descargar',
                description: 'Guarda en el historial Y descarga el PDF al mismo tiempo',
                recommended: 'Recomendado'
            },
            cancel: 'Cancelar',
            processing: 'Procesando...'
        },
        en: {
            title: 'How do you want to save your CV?',
            subtitle: 'Select one of the following options:',
            saveToHistory: {
                title: 'Save to History',
                description: 'Save the CV to your personal history for later access'
            },
            downloadOnly: {
                title: 'Download Only',
                description: 'Download the PDF directly without saving to history'
            },
            both: {
                title: 'Save and Download',
                description: 'Save to history AND download the PDF at the same time',
                recommended: 'Recommended'
            },
            cancel: 'Cancel',
            processing: 'Processing...'
        }
    };

    const t = texts[lang] || texts.es;

    const handleOptionClick = (action) => {
        if (loading) return;
        
        switch (action) {
            case 'history':
                onSaveToHistory();
                break;
            case 'download':
                onDownloadOnly();
                break;
            case 'both':
                onBoth();
                break;
            default:
                break;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            maxWidth="sm"
            fullWidth
            disableEscapeKeyDown={loading}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div">
                        {t.title}
                    </Typography>
                    {!loading && (
                        <IconButton
                            onClick={onClose}
                            size="small"
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </Box>
            </DialogTitle>

            <DialogContent>
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2 }}
                >
                    {t.subtitle}
                </Typography>

                <List>
                    {/* Save to History Option */}
                    <ListItem disablePadding>
                        <ListItemButton 
                            onClick={() => handleOptionClick('history')}
                            disabled={loading}
                            sx={{ borderRadius: 1, mb: 1 }}
                        >
                            <ListItemIcon>
                                <HistoryIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={t.saveToHistory.title}
                                secondary={t.saveToHistory.description}
                            />
                        </ListItemButton>
                    </ListItem>

                    {/* Download Only Option */}
                    <ListItem disablePadding>
                        <ListItemButton 
                            onClick={() => handleOptionClick('download')}
                            disabled={loading}
                            sx={{ borderRadius: 1, mb: 1 }}
                        >
                            <ListItemIcon>
                                <GetAppIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={t.downloadOnly.title}
                                secondary={t.downloadOnly.description}
                            />
                        </ListItemButton>
                    </ListItem>

                    {/* Both Options */}
                    <ListItem disablePadding>
                        <ListItemButton 
                            onClick={() => handleOptionClick('both')}
                            disabled={loading}
                            sx={{ 
                                borderRadius: 1, 
                                mb: 1,
                                border: '2px solid',
                                borderColor: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'primary.light',
                                    borderColor: 'primary.dark',
                                }
                            }}
                        >
                            <ListItemIcon>
                                <CloudDownloadIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {t.both.title}
                                        <Chip 
                                            label={t.both.recommended} 
                                            size="small" 
                                            color="primary"
                                            variant="outlined"
                                        />
                                    </Box>
                                }
                                secondary={t.both.description}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </DialogContent>

            <DialogActions>
                <Button 
                    onClick={onClose} 
                    disabled={loading}
                >
                    {t.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SaveOptionsModal;
