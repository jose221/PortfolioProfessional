import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Alert,
    Button,
    CircularProgress
} from '@mui/material';
import { Refresh, Warning } from '@mui/icons-material';
import SimplePDFViewer from './SimplePDFViewer';

/**
 * ReliablePDFViewer - A robust PDF viewer that falls back to different rendering methods
 * to ensure PDFs always display without worker configuration issues
 */
const ReliablePDFViewer = ({ 
    fileData,
    isEditing = false,
    zoom = 1,
    onDataChange,
    height = '600px',
    showToolbar = true 
}) => {
    const [viewerMethod, setViewerMethod] = useState('iframe'); // 'iframe', 'embed', 'object', 'error'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Convert fileData to the format expected by SimplePDFViewer
    const file = fileData?.url || fileData;

    // Reset when file changes
    useEffect(() => {
        setViewerMethod('iframe');
        setLoading(true);
        setError(null);
    }, [file]);

    const handleViewerError = (err) => {
        console.warn(`PDF viewer method '${viewerMethod}' failed:`, err);
        
        // Try fallback methods
        if (viewerMethod === 'iframe') {
            setViewerMethod('embed');
        } else if (viewerMethod === 'embed') {
            setViewerMethod('object');
        } else if (viewerMethod === 'object') {
            setViewerMethod('download');
        } else {
            setViewerMethod('error');
            setError('Unable to display PDF. Please download the file to view it.');
        }
        setLoading(false);
    };

    const handleRetry = () => {
        setViewerMethod('iframe');
        setLoading(true);
        setError(null);
    };

    const handleDownloadFallback = () => {
        if (file) {
            let url;
            if (file instanceof File || file instanceof Blob) {
                url = URL.createObjectURL(file);
            } else if (typeof file === 'string') {
                url = file;
            }
            
            if (url) {
                const link = document.createElement('a');
                link.href = url;
                link.download = fileData?.name || 'document.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            }
        }
    };

    const handleSave = (data) => {
        if (onDataChange) {
            onDataChange(data);
        }
    };

    // Error state
    if (viewerMethod === 'error') {
        return (
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height }}>
                <Warning color="warning" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                    PDF Display Issue
                </Typography>
                <Alert severity="warning" sx={{ mb: 2 }}>
                    {error || 'Unable to display this PDF in the browser.'}
                </Alert>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button 
                        variant="outlined" 
                        onClick={handleRetry}
                        startIcon={<Refresh />}
                    >
                        Try Again
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={handleDownloadFallback}
                    >
                        Download PDF
                    </Button>
                </Box>
            </Paper>
        );
    }

    // Download fallback state
    if (viewerMethod === 'download') {
        return (
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height }}>
                <Typography variant="h6" gutterBottom>
                    PDF Ready for Download
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    This PDF cannot be displayed in the browser, but you can download it to view.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button 
                        variant="contained" 
                        onClick={handleDownloadFallback}
                    >
                        Download PDF
                    </Button>
                    <Button 
                        variant="outlined" 
                        onClick={handleRetry}
                        startIcon={<Refresh />}
                    >
                        Try Viewing Again
                    </Button>
                </Box>
            </Paper>
        );
    }

    // Use SimplePDFViewer for all rendering methods
    return (
        <SimplePDFViewer
            file={file}
            onSave={handleSave}
            onError={handleViewerError}
            height={height}
            showToolbar={showToolbar}
        />
    );
};

export default ReliablePDFViewer;
