import React, { Component } from 'react';
// Import PDF configuration BEFORE react-pdf components
import '../../../utils/pdfConfig.js';
import { getCurrentWorkerUrl, getPDFVersion, manuallyRetryPDFConfig } from '../../../utils/pdfConfig.js';
import { Document, Page } from 'react-pdf';
import {
    Box,
    IconButton,
    Typography,
    Paper,
    TextField,
    Fab,
    Tooltip,
    Alert,
    Button
} from '@mui/material';
import {
    NavigateBefore as PrevIcon,
    NavigateNext as NextIcon,
    TextFields as TextIcon,
    Highlight as HighlightIcon,
    Refresh as RefreshIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const PDFContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
}));

const PDFViewport = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'auto',
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    position: 'relative',
}));

const PageContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    backgroundColor: 'white',
}));

const NavigationBar = styled(Paper)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
    gap: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
}));

const AnnotationOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    '& .annotation': {
        position: 'absolute',
        pointerEvents: 'all',
        cursor: 'pointer',
    },
    '& .text-annotation': {
        backgroundColor: 'rgba(255, 235, 59, 0.7)',
        border: '2px solid #fbc02d',
        borderRadius: '4px',
        padding: '2px 4px',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#333',
    },
    '& .highlight-annotation': {
        backgroundColor: 'rgba(255, 193, 7, 0.4)',
        border: '1px solid #ff9800',
    }
}));

const EditingTools = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    zIndex: 1000,
}));

class PDFViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1,
            loading: true,
            error: null,
            annotations: [],
            selectedTool: null,
            isAddingAnnotation: false,
            newAnnotation: { x: 0, y: 0, width: 0, height: 0, text: '', type: 'text' }
        };
        this.pageRef = React.createRef();
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({
            numPages,
            loading: false,
            error: null
        });
    };

    onDocumentLoadError = (error) => {
        console.error('Error loading PDF:', error);
        
        // Check if it's a worker-related error
        if (error.message && error.message.includes('Setting up fake worker failed')) {
            console.log('Detected PDF worker error, attempting to fix...');
            
            // Try to retry with worker config
            manuallyRetryPDFConfig();
            
            // Set a more specific error message
            this.setState({
                error: 'Error del trabajador PDF detectado. Reintentando configuración...',
                loading: false
            });
            
            // Attempt to reload after a short delay
            setTimeout(() => {
                this.setState({
                    loading: true,
                    error: null
                });
                
                // Force a re-render to retry loading
                this.forceUpdate();
            }, 2000);
        } else {
            this.setState({
                error: 'Error cargando el PDF. Verifique que el archivo sea válido.',
                loading: false
            });
        }
    };

    onWorkerError = (error) => {
        console.error('Error in PDF worker:', error);
        this.setState({
            error: 'Error en el trabajador de PDF. Por favor, inténtelo de nuevo.',
            loading: false
        });
    };

    onWorkerMessage = (message) => {
        if (message.type === 'retry') {
            manuallyRetryPDFConfig();
            this.setState({
                loading: true,
                error: null
            });
        }
    };

    goToPrevPage = () => {
        this.setState(prevState => ({
            pageNumber: Math.max(prevState.pageNumber - 1, 1)
        }));
    };

    goToNextPage = () => {
        this.setState(prevState => ({
            pageNumber: Math.min(prevState.pageNumber + 1, prevState.numPages)
        }));
    };

    handlePageChange = (event) => {
        const pageNumber = parseInt(event.target.value);
        if (pageNumber >= 1 && pageNumber <= this.state.numPages) {
            this.setState({ pageNumber });
        }
    };

    selectTool = (tool) => {
        this.setState(prevState => ({
            selectedTool: prevState.selectedTool === tool ? null : tool
        }));
    };

    handlePageClick = (event) => {
        if (!this.props.isEditing || !this.state.selectedTool) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        if (this.state.selectedTool === 'text') {
            const text = prompt('Ingrese el texto de la anotación:');
            if (text) {
                this.addAnnotation({
                    x,
                    y,
                    width: 20,
                    height: 5,
                    text,
                    type: 'text',
                    page: this.state.pageNumber
                });
            }
        } else if (this.state.selectedTool === 'highlight') {
            this.addAnnotation({
                x,
                y,
                width: 15,
                height: 3,
                text: '',
                type: 'highlight',
                page: this.state.pageNumber
            });
        }
    };

    addAnnotation = (annotation) => {
        const newAnnotation = {
            ...annotation,
            id: Date.now() + Math.random()
        };

        this.setState(prevState => {
            const newAnnotations = [...prevState.annotations, newAnnotation];
            // Notify parent component of changes
            if (this.props.onDataChange) {
                this.props.onDataChange({
                    annotations: newAnnotations,
                    type: 'pdf'
                });
            }
            return { annotations: newAnnotations };
        });
    };

    removeAnnotation = (id) => {
        this.setState(prevState => {
            const newAnnotations = prevState.annotations.filter(ann => ann.id !== id);
            if (this.props.onDataChange) {
                this.props.onDataChange({
                    annotations: newAnnotations,
                    type: 'pdf'
                });
            }
            return { annotations: newAnnotations };
        });
    };

    renderAnnotations = () => {
        const { annotations, pageNumber } = this.state;
        const pageAnnotations = annotations.filter(ann => ann.page === pageNumber);

        return pageAnnotations.map(annotation => (
            <div
                key={annotation.id}
                className={`annotation ${annotation.type}-annotation`}
                style={{
                    left: `${annotation.x}%`,
                    top: `${annotation.y}%`,
                    width: `${annotation.width}%`,
                    height: `${annotation.height}%`,
                }}
                onClick={() => this.props.isEditing && this.removeAnnotation(annotation.id)}
                title={annotation.text || 'Haga clic para eliminar'}
            >
                {annotation.type === 'text' && annotation.text}
            </div>
        ));
    };

    render() {
        const { fileData, isEditing, zoom } = this.props;
        const { numPages, pageNumber, loading, error, selectedTool } = this.state;

        if (error) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Alert severity="error" sx={{ maxWidth: 400 }}>
                        {error}
                        {error === 'Error en el trabajador de PDF. Por favor, inténtelo de nuevo.' && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => manuallyRetryPDFConfig()}
                                startIcon={<RefreshIcon />}
                            >
                                Reintentar
                            </Button>
                        )}
                    </Alert>
                </Box>
            );
        }

        return (
            <PDFContainer>
                {isEditing && (
                    <EditingTools>
                        <Tooltip title="Agregar texto">
                            <Fab
                                size="small"
                                color={selectedTool === 'text' ? 'secondary' : 'default'}
                                onClick={() => this.selectTool('text')}
                            >
                                <TextIcon />
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Resaltar">
                            <Fab
                                size="small"
                                color={selectedTool === 'highlight' ? 'secondary' : 'default'}
                                onClick={() => this.selectTool('highlight')}
                            >
                                <HighlightIcon />
                            </Fab>
                        </Tooltip>
                    </EditingTools>
                )}

                <PDFViewport>
                    <PageContainer>
                        <Document
                            file={fileData.url}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                            onLoadError={this.onDocumentLoadError}
                            onWorkerError={this.onWorkerError}
                            onWorkerMessage={this.onWorkerMessage}
                            loading={
                                <Box display="flex" justifyContent="center" alignItems="center" p={4}>
                                    <Typography>Cargando PDF...</Typography>
                                </Box>
                            }
                        >
                            <div
                                ref={this.pageRef}
                                style={{ position: 'relative', cursor: isEditing && selectedTool ? 'crosshair' : 'default' }}
                                onClick={this.handlePageClick}
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    scale={zoom}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                />
                                {isEditing && (
                                    <AnnotationOverlay>
                                        {this.renderAnnotations()}
                                    </AnnotationOverlay>
                                )}
                            </div>
                        </Document>
                    </PageContainer>
                </PDFViewport>

                {numPages && (
                    <NavigationBar elevation={3}>
                        <IconButton
                            onClick={this.goToPrevPage}
                            disabled={pageNumber <= 1}
                            color="primary"
                        >
                            <PrevIcon />
                        </IconButton>

                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2">Página</Typography>
                            <TextField
                                size="small"
                                value={pageNumber}
                                onChange={this.handlePageChange}
                                inputProps={{
                                    min: 1,
                                    max: numPages,
                                    type: 'number',
                                    style: { textAlign: 'center', width: '60px' }
                                }}
                                variant="outlined"
                            />
                            <Typography variant="body2">de {numPages}</Typography>
                        </Box>

                        <IconButton
                            onClick={this.goToNextPage}
                            disabled={pageNumber >= numPages}
                            color="primary"
                        >
                            <NextIcon />
                        </IconButton>
                    </NavigationBar>
                )}
            </PDFContainer>
        );
    }
}

export default PDFViewer;
