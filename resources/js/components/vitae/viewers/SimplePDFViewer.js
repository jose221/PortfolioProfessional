import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    IconButton,
    Toolbar,
    Button,
    CircularProgress,
    Alert,
    Snackbar
} from '@mui/material';
import {
    ZoomIn,
    ZoomOut,
    Fullscreen,
    Download,
    Refresh,
    OpenInNew
} from '@mui/icons-material';

/**
 * SimplePDFViewer - A PDF viewer that uses browser's native PDF rendering
 * without any external PDF.js dependencies to avoid worker configuration issues
 */
const SimplePDFViewer = ({ 
    file, 
    onSave, 
    onError,
    height = '600px',
    showToolbar = true 
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [zoom, setZoom] = useState(100);
    const [fullscreen, setFullscreen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    // Create object URL for the PDF file
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        if (file) {
            try {
                let url;
                if (file instanceof File || file instanceof Blob) {
                    url = URL.createObjectURL(file);
                } else if (typeof file === 'string') {
                    url = file;
                } else {
                    throw new Error('Invalid file format');
                }
                setPdfUrl(url);
                setError(null);
            } catch (err) {
                setError('Failed to load PDF file');
                onError?.(err);
            }
        }

        // Cleanup object URL on unmount
        return () => {
            if (pdfUrl && pdfUrl.startsWith('blob:')) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [file]);

    const handleLoad = () => {
        setLoading(false);
    };

    const handleError = () => {
        setLoading(false);
        setError('Failed to load PDF. The file may be corrupted or in an unsupported format.');
    };

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 25, 200));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 25, 50));
    };

    const handleFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    const handleDownload = () => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = file?.name || 'document.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            setSnackbar({
                open: true,
                message: 'PDF download started',
                severity: 'success'
            });
        }
    };

    const handleRefresh = () => {
        setLoading(true);
        setError(null);
        // Force reload by updating the URL with a timestamp
        if (pdfUrl) {
            const separator = pdfUrl.includes('?') ? '&' : '?';
            const refreshUrl = `${pdfUrl}${separator}t=${Date.now()}`;
            setPdfUrl(refreshUrl);
        }
    };

    const handleOpenInNewTab = () => {
        if (pdfUrl) {
            window.open(pdfUrl, '_blank');
        }
    };

    const handleSave = () => {
        if (onSave) {
            onSave(file);
            setSnackbar({
                open: true,
                message: 'PDF saved successfully',
                severity: 'success'
            });
        }
    };

    if (error) {
        return (
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button 
                    variant="outlined" 
                    onClick={handleRefresh}
                    startIcon={<Refresh />}
                >
                    Try Again
                </Button>
            </Paper>
        );
    }

    return (
        <Box
            sx={{
                position: fullscreen ? 'fixed' : 'relative',
                top: fullscreen ? 0 : 'auto',
                left: fullscreen ? 0 : 'auto',
                width: fullscreen ? '100vw' : '100%',
                height: fullscreen ? '100vh' : height,
                zIndex: fullscreen ? 9999 : 'auto',
                bgcolor: 'background.paper'
            }}
        >
            {showToolbar && (
                <Toolbar 
                    variant="dense" 
                    sx={{ 
                        bgcolor: 'grey.100',
                        borderBottom: 1,
                        borderColor: 'divider',
                        minHeight: '48px !important'
                    }}
                >
                    <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                        PDF Viewer - {zoom}%
                    </Typography>
                    
                    <IconButton size="small" onClick={handleZoomOut} disabled={zoom <= 50}>
                        <ZoomOut />
                    </IconButton>
                    
                    <IconButton size="small" onClick={handleZoomIn} disabled={zoom >= 200}>
                        <ZoomIn />
                    </IconButton>
                    
                    <IconButton size="small" onClick={handleRefresh}>
                        <Refresh />
                    </IconButton>
                    
                    <IconButton size="small" onClick={handleOpenInNewTab}>
                        <OpenInNew />
                    </IconButton>
                    
                    <IconButton size="small" onClick={handleDownload}>
                        <Download />
                    </IconButton>
                    
                    <IconButton size="small" onClick={handleFullscreen}>
                        <Fullscreen />
                    </IconButton>
                    
                    {onSave && (
                        <Button 
                            size="small" 
                            variant="contained" 
                            onClick={handleSave}
                            sx={{ ml: 1 }}
                        >
                            Save
                        </Button>
                    )}
                </Toolbar>
            )}

            <Box 
                sx={{ 
                    position: 'relative',
                    height: showToolbar ? 'calc(100% - 48px)' : '100%',
                    overflow: 'hidden'
                }}
            >
                {loading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1
                        }}
                    >
                        <CircularProgress />
                        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                            Loading PDF...
                        </Typography>
                    </Box>
                )}

                {pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        width="100%"
                        height="100%"
                        style={{
                            border: 'none',
                            transform: `scale(${zoom / 100})`,
                            transformOrigin: 'top left',
                            width: `${10000 / zoom}%`,
                            height: `${10000 / zoom}%`
                        }}
                        onLoad={handleLoad}
                        onError={handleError}
                        title="PDF Viewer"
                    />
                )}
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SimplePDFViewer;
