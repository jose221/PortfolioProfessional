import React, { Component } from 'react';
import {
    Box,
    IconButton,
    Typography,
    Paper,
    TextField,
    Fab,
    Tooltip,
    Alert,
    Button,
    CircularProgress
} from '@mui/material';
import {
    NavigateBefore as PrevIcon,
    NavigateNext as NextIcon,
    ZoomIn as ZoomInIcon,
    ZoomOut as ZoomOutIcon,
    Fullscreen as FullscreenIcon,
    Download as DownloadIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Alternative PDF Viewer using iframe approach (more reliable)
const PDFContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
}));

const PDFToolbar = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const PDFViewport = styled(Box)(({ theme }) => ({
    flex: 1,
    overflow: 'auto',
    backgroundColor: theme.palette.grey[200],
    position: 'relative',
}));

const PDFFrame = styled('iframe')(({ theme }) => ({
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: 'white',
}));

class AlternativePDFViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            zoom: 100,
            isFullscreen: false
        };
        this.iframeRef = React.createRef();
    }

    componentDidMount() {
        this.loadPDF();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fileData?.url !== this.props.fileData?.url) {
            this.loadPDF();
        }
    }

    loadPDF = () => {
        this.setState({ loading: true, error: null });
        
        // Simulate loading time
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    };

    onPDFLoad = () => {
        this.setState({ loading: false, error: null });
    };

    onPDFError = () => {
        this.setState({
            loading: false,
            error: 'Error cargando el PDF. El archivo puede estar dañado o no ser un PDF válido.'
        });
    };

    handleZoomIn = () => {
        this.setState(prevState => ({
            zoom: Math.min(prevState.zoom + 25, 200)
        }));
    };

    handleZoomOut = () => {
        this.setState(prevState => ({
            zoom: Math.max(prevState.zoom - 25, 50)
        }));
    };

    handleFullscreen = () => {
        if (!document.fullscreenElement) {
            this.iframeRef.current?.requestFullscreen?.();
            this.setState({ isFullscreen: true });
        } else {
            document.exitFullscreen();
            this.setState({ isFullscreen: false });
        }
    };

    handleDownload = () => {
        const { fileData } = this.props;
        if (fileData?.url) {
            const link = document.createElement('a');
            link.href = fileData.url;
            link.download = fileData.name || 'document.pdf';
            link.click();
        }
    };

    getPDFUrl = () => {
        const { fileData } = this.props;
        if (!fileData?.url) return '';
        
        // Add zoom parameter for better control
        const baseUrl = fileData.url;
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}zoom=${this.state.zoom}`;
    };

    render() {
        const { fileData, isEditing } = this.props;
        const { loading, error, zoom, isFullscreen } = this.state;

        if (!fileData?.url) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Alert severity="info">
                        No hay archivo PDF para mostrar
                    </Alert>
                </Box>
            );
        }

        if (error) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Alert 
                        severity="error" 
                        sx={{ maxWidth: 400 }}
                        action={
                            <Button color="inherit" size="small" onClick={this.loadPDF}>
                                Reintentar
                            </Button>
                        }
                    >
                        {error}
                    </Alert>
                </Box>
            );
        }

        return (
            <PDFContainer>
                <PDFToolbar>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" color="text.secondary">
                            PDF Viewer
                        </Typography>
                        {loading && <CircularProgress size={16} />}
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <Tooltip title="Alejar">
                            <IconButton 
                                size="small" 
                                onClick={this.handleZoomOut}
                                disabled={zoom <= 50}
                            >
                                <ZoomOutIcon />
                            </IconButton>
                        </Tooltip>
                        
                        <Typography variant="body2" sx={{ minWidth: 60, textAlign: 'center' }}>
                            {zoom}%
                        </Typography>
                        
                        <Tooltip title="Acercar">
                            <IconButton 
                                size="small" 
                                onClick={this.handleZoomIn}
                                disabled={zoom >= 200}
                            >
                                <ZoomInIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Pantalla completa">
                            <IconButton size="small" onClick={this.handleFullscreen}>
                                <FullscreenIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Descargar">
                            <IconButton size="small" onClick={this.handleDownload}>
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </PDFToolbar>

                <PDFViewport>
                    {loading ? (
                        <Box 
                            display="flex" 
                            justifyContent="center" 
                            alignItems="center" 
                            height="100%"
                        >
                            <Box textAlign="center">
                                <CircularProgress sx={{ mb: 2 }} />
                                <Typography variant="body2" color="text.secondary">
                                    Cargando PDF...
                                </Typography>
                            </Box>
                        </Box>
                    ) : (
                        <PDFFrame
                            ref={this.iframeRef}
                            src={`${fileData.url}#zoom=${zoom}`}
                            title="PDF Viewer"
                            onLoad={this.onPDFLoad}
                            onError={this.onPDFError}
                        />
                    )}
                </PDFViewport>

                {isEditing && (
                    <Box 
                        position="absolute" 
                        bottom={16} 
                        right={16}
                        display="flex"
                        gap={1}
                    >
                        <Alert severity="info" sx={{ fontSize: '0.875rem' }}>
                            💡 Para editar PDFs, use herramientas externas y vuelva a subir el archivo
                        </Alert>
                    </Box>
                )}
            </PDFContainer>
        );
    }
}

export default AlternativePDFViewer;
