import React, { Component } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    IconButton,
    Toolbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Alert,
    Fab,
    Tooltip
} from '@mui/material';
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Download as DownloadIcon,
    ZoomIn as ZoomInIcon,
    ZoomOut as ZoomOutIcon,
    Fullscreen as FullscreenIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Import viewers/editors
import ReliablePDFViewer from './viewers/ReliablePDFViewer';
import ImageEditor from './viewers/ImageEditor';
import WordViewer from './viewers/WordViewer';

const StyledPaper = styled(Paper)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const ViewerContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
}));

const ToolbarContainer = styled(Toolbar)(({ theme }) => ({
    background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
    color: 'white',
    minHeight: '56px !important',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
}));

const FloatingActionContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    zIndex: 1000,
}));

class CVViewerEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            isLoading: true,
            error: null,
            zoom: 1,
            fullscreen: false,
            fileData: null,
            editedData: null,
            hasChanges: false
        };
    }

    componentDidMount() {
        this.loadFile();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fileInfo?.path !== this.props.fileInfo?.path) {
            this.loadFile();
        }
    }

    loadFile = async () => {
        const { fileInfo } = this.props;
        if (!fileInfo || !fileInfo.path) {
            this.setState({ error: 'No file information provided', isLoading: false });
            return;
        }

        this.setState({ isLoading: true, error: null });

        try {
            // Construct the full URL for the file
            const fileUrl = `${fileInfo.path}`;

            this.setState({
                fileData: {
                    url: fileUrl,
                    type: fileInfo.archive_type,
                    name: fileInfo.archive_name
                },
                isLoading: false
            });
        } catch (error) {
            console.error('Error loading file:', error);
            this.setState({
                error: 'Error loading file: ' + error.message,
                isLoading: false
            });
        }
    };

    getFileType = () => {
        const { fileInfo } = this.props;
        if (!fileInfo) return 'unknown';

        const type = fileInfo.archive_type?.toUpperCase();
        if (type === 'PDF') return 'pdf';
        if (['JPG', 'JPEG', 'PNG', 'GIF', 'BMP', 'WEBP'].includes(type)) return 'image';
        if (['DOC', 'DOCX'].includes(type)) return 'word';
        return 'unknown';
    };

    toggleEdit = () => {
        this.setState(prevState => ({
            isEditing: !prevState.isEditing
        }));
    };

    handleSave = async () => {
        const { editedData } = this.state;
        const { onSave } = this.props;

        if (editedData && onSave) {
            try {
                await onSave(editedData);
                this.setState({ hasChanges: false });
            } catch (error) {
                console.error('Error saving file:', error);
                this.setState({ error: 'Error saving file: ' + error.message });
            }
        }
    };

    handleDownload = () => {
        const { fileData } = this.state;
        if (fileData) {
            const link = document.createElement('a');
            link.href = fileData.url;
            link.download = fileData.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    handleZoomIn = () => {
        this.setState(prevState => ({
            zoom: Math.min(prevState.zoom + 0.25, 3)
        }));
    };

    handleZoomOut = () => {
        this.setState(prevState => ({
            zoom: Math.max(prevState.zoom - 0.25, 0.25)
        }));
    };

    toggleFullscreen = () => {
        this.setState(prevState => ({
            fullscreen: !prevState.fullscreen
        }));
    };

    handleDataChange = (newData) => {
        this.setState({
            editedData: newData,
            hasChanges: true
        });
    };

    renderViewer = () => {
        const { fileData, isEditing, zoom } = this.state;
        const fileType = this.getFileType();

        if (!fileData) return null;

        const commonProps = {
            fileData,
            isEditing,
            zoom,
            onDataChange: this.handleDataChange
        };

        switch (fileType) {
            case 'pdf':
                return <ReliablePDFViewer {...commonProps} />;
            case 'image':
                return <ImageEditor {...commonProps} />;
            case 'word':
                return <WordViewer {...commonProps} />;
            default:
                return (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <Alert severity="warning">
                            Tipo de archivo no soportado: {this.props.fileInfo?.archive_type}
                        </Alert>
                    </Box>
                );
        }
    };

    render() {
        const { isLoading, error, isEditing, zoom, fullscreen, hasChanges } = this.state;
        const { fileInfo } = this.props;
        const fileType = this.getFileType();

        if (isLoading) {
            return (
                <StyledPaper>
                    <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                        <CircularProgress size={60} />
                        <Typography variant="h6" sx={{ ml: 2 }}>
                            Cargando archivo...
                        </Typography>
                    </Box>
                </StyledPaper>
            );
        }

        if (error) {
            return (
                <StyledPaper>
                    <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                        <Alert severity="error" sx={{ maxWidth: 400 }}>
                            {error}
                        </Alert>
                    </Box>
                </StyledPaper>
            );
        }

        const ViewerComponent = fullscreen ? Dialog : StyledPaper;
        const viewerProps = fullscreen ? {
            open: true,
            onClose: this.toggleFullscreen,
            maxWidth: false,
            fullWidth: true,
            PaperProps: { sx: { height: '95vh', m: 2 } }
        } : {};

        return (
            <ViewerComponent {...viewerProps}>
                {fullscreen && (
                    <DialogTitle>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">
                                {fileInfo?.archive_name} - {fileType.toUpperCase()}
                            </Typography>
                            <IconButton onClick={this.toggleFullscreen} color="inherit">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </DialogTitle>
                )}

                <ToolbarContainer>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6" component="div">
                            {!fullscreen && `${fileInfo?.archive_name} - ${fileType.toUpperCase()}`}
                        </Typography>
                        {isEditing && (
                            <Typography variant="body2" sx={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1
                            }}>
                                Modo Edición
                            </Typography>
                        )}
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <Tooltip title="Zoom Out">
                            <IconButton color="inherit" onClick={this.handleZoomOut}>
                                <ZoomOutIcon />
                            </IconButton>
                        </Tooltip>

                        <Typography variant="body2" sx={{ minWidth: 60, textAlign: 'center' }}>
                            {Math.round(zoom * 100)}%
                        </Typography>

                        <Tooltip title="Zoom In">
                            <IconButton color="inherit" onClick={this.handleZoomIn}>
                                <ZoomInIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}>
                            <IconButton color="inherit" onClick={this.toggleFullscreen}>
                                <FullscreenIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Descargar">
                            <IconButton color="inherit" onClick={this.handleDownload}>
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </ToolbarContainer>

                <ViewerContainer>
                    {this.renderViewer()}

                    <FloatingActionContainer>
                        {fileType !== 'word' && (
                            <Tooltip title={isEditing ? "Ver" : "Editar"}>
                                <Fab
                                    color={isEditing ? "secondary" : "primary"}
                                    onClick={this.toggleEdit}
                                    size="medium"
                                >
                                    <EditIcon />
                                </Fab>
                            </Tooltip>
                        )}

                        {isEditing && hasChanges && (
                            <Tooltip title="Guardar cambios">
                                <Fab
                                    color="success"
                                    onClick={this.handleSave}
                                    size="medium"
                                    sx={{
                                        backgroundColor: '#4caf50',
                                        '&:hover': { backgroundColor: '#45a049' }
                                    }}
                                >
                                    <SaveIcon />
                                </Fab>
                            </Tooltip>
                        )}
                    </FloatingActionContainer>
                </ViewerContainer>
            </ViewerComponent>
        );
    }
}

export default CVViewerEditor;
