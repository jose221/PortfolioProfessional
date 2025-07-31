import React, { Component } from 'react';
import mammoth from 'mammoth';
import {
    Box,
    Paper,
    Typography,
    Alert,
    CircularProgress,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    Download as DownloadIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ViewerContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
}));

const DocumentContainer = styled(Paper)(({ theme }) => ({
    flex: 1,
    margin: theme.spacing(2),
    padding: theme.spacing(3),
    overflow: 'auto',
    backgroundColor: 'white',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    '& h1, & h2, & h3, & h4, & h5, & h6': {
        color: '#1976d2',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    '& p': {
        marginBottom: theme.spacing(1),
        lineHeight: 1.6,
        textAlign: 'justify',
    },
    '& ul, & ol': {
        paddingLeft: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
    '& li': {
        marginBottom: theme.spacing(0.5),
    },
    '& table': {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: theme.spacing(2),
        '& th, & td': {
            border: '1px solid #ddd',
            padding: theme.spacing(1),
            textAlign: 'left',
        },
        '& th': {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
        }
    },
    '& strong, & b': {
        fontWeight: 'bold',
    },
    '& em, & i': {
        fontStyle: 'italic',
    }
}));

const ActionBar = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
}));

const EditableContent = styled(Box)(({ theme }) => ({
    '& [contenteditable="true"]': {
        outline: 'none',
        border: '1px dashed #1976d2',
        padding: theme.spacing(0.5),
        borderRadius: theme.spacing(0.5),
        '&:focus': {
            border: '2px solid #1976d2',
            backgroundColor: 'rgba(25, 118, 210, 0.05)',
        }
    }
}));

class WordViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlContent: '',
            loading: true,
            error: null,
            isEditing: false,
            editedContent: '',
            showEditDialog: false,
            originalText: ''
        };
        this.contentRef = React.createRef();
    }

    componentDidMount() {
        this.loadDocument();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fileData?.url !== this.props.fileData?.url) {
            this.loadDocument();
        }
    }

    loadDocument = async () => {
        const { fileData } = this.props;
        
        if (!fileData || !fileData.url) {
            this.setState({ 
                error: 'No se pudo cargar el documento',
                loading: false 
            });
            return;
        }

        this.setState({ loading: true, error: null });

        try {
            // Fetch the document
            const response = await fetch(fileData.url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            
            // Convert Word document to HTML using mammoth
            const result = await mammoth.convertToHtml({ arrayBuffer });
            
            this.setState({
                htmlContent: result.value,
                originalText: result.value,
                loading: false
            });

            // Log any warnings from mammoth
            if (result.messages.length > 0) {
                console.warn('Mammoth conversion warnings:', result.messages);
            }

        } catch (error) {
            console.error('Error loading Word document:', error);
            this.setState({
                error: `Error cargando el documento: ${error.message}`,
                loading: false
            });
        }
    };

    handleContentChange = () => {
        if (this.contentRef.current) {
            const newContent = this.contentRef.current.innerHTML;
            this.setState({ editedContent: newContent });
            
            // Notify parent component of changes
            if (this.props.onDataChange) {
                this.props.onDataChange({
                    htmlContent: newContent,
                    type: 'word'
                });
            }
        }
    };

    toggleEditMode = () => {
        this.setState(prevState => {
            const newEditingState = !prevState.isEditing;
            
            if (newEditingState) {
                // Enable editing
                this.makeContentEditable();
            } else {
                // Disable editing
                this.makeContentReadOnly();
            }
            
            return { isEditing: newEditingState };
        });
    };

    makeContentEditable = () => {
        if (this.contentRef.current) {
            const editableElements = this.contentRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
            editableElements.forEach(element => {
                element.contentEditable = true;
                element.addEventListener('input', this.handleContentChange);
                element.style.cursor = 'text';
            });
        }
    };

    makeContentReadOnly = () => {
        if (this.contentRef.current) {
            const editableElements = this.contentRef.current.querySelectorAll('[contenteditable="true"]');
            editableElements.forEach(element => {
                element.contentEditable = false;
                element.removeEventListener('input', this.handleContentChange);
                element.style.cursor = 'default';
            });
        }
    };

    downloadAsHtml = () => {
        const { htmlContent, editedContent } = this.state;
        const content = editedContent || htmlContent;
        
        const htmlDocument = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${this.props.fileData.name}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1, h2, h3, h4, h5, h6 {
            color: #333;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        p {
            margin-bottom: 10px;
            text-align: justify;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f5f5f5;
            font-weight: bold;
        }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;

        const blob = new Blob([htmlDocument], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.props.fileData.name}_edited.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    showEditDialog = () => {
        this.setState({ 
            showEditDialog: true,
            editedContent: this.state.htmlContent 
        });
    };

    handleDialogSave = () => {
        this.setState(prevState => ({
            htmlContent: prevState.editedContent,
            showEditDialog: false
        }));
        
        if (this.props.onDataChange) {
            this.props.onDataChange({
                htmlContent: this.state.editedContent,
                type: 'word'
            });
        }
    };

    render() {
        const { fileData, zoom } = this.props;
        const { htmlContent, loading, error, isEditing, showEditDialog, editedContent } = this.state;

        if (loading) {
            return (
                <ViewerContainer>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress size={60} />
                        <Typography variant="h6" sx={{ ml: 2 }}>
                            Convirtiendo documento...
                        </Typography>
                    </Box>
                </ViewerContainer>
            );
        }

        if (error) {
            return (
                <ViewerContainer>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <Alert severity="error" sx={{ maxWidth: 600 }}>
                            <Typography variant="h6" gutterBottom>
                                Error al cargar el documento
                            </Typography>
                            <Typography variant="body2">
                                {error}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                <strong>Nota:</strong> Solo se admiten archivos .docx. Los archivos .doc antiguos no son compatibles.
                            </Typography>
                        </Alert>
                    </Box>
                </ViewerContainer>
            );
        }

        return (
            <ViewerContainer>
                <ActionBar>
                    <Typography variant="h6" component="div">
                        {fileData.name}
                    </Typography>
                    <Box display="flex" gap={1}>
                        <Button
                            startIcon={<EditIcon />}
                            variant="outlined"
                            onClick={this.showEditDialog}
                            size="small"
                        >
                            Editar Texto
                        </Button>
                        <Button
                            startIcon={<DownloadIcon />}
                            variant="contained"
                            onClick={this.downloadAsHtml}
                            size="small"
                        >
                            Descargar HTML
                        </Button>
                    </Box>
                </ActionBar>

                <DocumentContainer 
                    ref={this.contentRef}
                    style={{ 
                        transform: `scale(${zoom})`,
                        transformOrigin: 'top left',
                        width: `${100 / zoom}%`
                    }}
                >
                    <EditableContent>
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </EditableContent>
                </DocumentContainer>

                {/* Edit Dialog */}
                <Dialog
                    open={showEditDialog}
                    onClose={() => this.setState({ showEditDialog: false })}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        Editar Contenido del Documento
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            multiline
                            rows={20}
                            value={editedContent}
                            onChange={(e) => this.setState({ editedContent: e.target.value })}
                            variant="outlined"
                            placeholder="Contenido HTML del documento..."
                            sx={{ mt: 1 }}
                        />
                        <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                            Puede editar el HTML directamente. Use etiquetas como &lt;p&gt;, &lt;h1&gt;, &lt;strong&gt;, etc.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ showEditDialog: false })}>
                            Cancelar
                        </Button>
                        <Button onClick={this.handleDialogSave} variant="contained">
                            Guardar Cambios
                        </Button>
                    </DialogActions>
                </Dialog>
            </ViewerContainer>
        );
    }
}

export default WordViewer;
