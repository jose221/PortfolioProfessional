import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RComponent from "../RComponent";
import ReactDOM from "react-dom";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import Study from "../../models/Study";
import Vitae from "../../models/Vitae";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import {
    MenuItem,
    Box,
    Typography,
    Paper,
    Chip,
    LinearProgress,
    Alert,
    Snackbar,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    Divider,
    Stack
} from "@mui/material";
import { styled } from '@mui/material/styles';

// Styled components for enhanced UI
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: theme.spacing(2),
        minWidth: '600px',
        maxWidth: '800px',
    },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '1.25rem',
}));

const FileUploadArea = styled(Paper)(({ theme, hasFile }) => ({
    border: `2px dashed ${hasFile ? theme.palette.success.main : theme.palette.grey[300]}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    background: hasFile 
        ? `linear-gradient(135deg, ${theme.palette.success.light}15 0%, ${theme.palette.success.main}10 100%)`
        : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: `${theme.palette.primary.main}08`,
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    },
}));

const FilePreview = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const StyledFab = styled(Fab)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    '&:hover': {
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        transform: 'scale(1.1)',
    },
    transition: 'all 0.3s ease-in-out',
}));

let primary_url = window.url_api+"/admin/history-curriculum-vitae";
let title_action = "Gestión de Curriculum Vitae";

class FormVitaeComponent extends RComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            uploading: false,
            uploadProgress: 0,
        };
    }

    async componentDidMount() {
        this.subscribeStore()
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ uploading: true, uploadProgress: 0 });
        
        try {
            if(this.state.form.User) delete this.state.form.User;
            if(this.state.form.validData()){
                // Simulate upload progress
                const progressInterval = setInterval(() => {
                    this.setState(prev => ({
                        uploadProgress: Math.min(prev.uploadProgress + 10, 90)
                    }));
                }, 100);

                if(this.state.form?.id) {
                    await this.onUpdate(`${primary_url}/${this.state.form?.id}`, this.state.form.item);
                } else {
                    await this.onCreate(`${primary_url}`, this.state.form.item);
                }
                
                clearInterval(progressInterval);
                this.setState({ uploadProgress: 100 });
                
                setTimeout(() => {
                    this.state.openModal = false;
                    this.state.data = this.getItems(`${primary_url}`);
                    this.setState({ uploading: false, uploadProgress: 0 });
                    this.dispatchStore(this.state);
                }, 500);
            } else {
                this.setState({ uploading: false, uploadProgress: 0 });
                this.dispatchStore(this.state);
            }
        } catch (error) {
            this.setState({ uploading: false, uploadProgress: 0 });
            console.error('Upload error:', error);
        }
    }

    render(){
        const validateFile = (path, archive_type) => {
            let archive = <ArticleIcon sx={{ fontSize: 48, color: 'primary.main' }} />;
            let chipColor = 'default';
            let chipLabel = 'Documento';
            
            if(archive_type && path){
                switch (archive_type.toLowerCase()){
                    case "pdf":
                        archive = <PictureAsPdfIcon sx={{ fontSize: 48, color: 'error.main' }} />;
                        chipColor = 'error';
                        chipLabel = 'PDF';
                        break;
                    case "doc":
                        archive = <ArticleIcon sx={{ fontSize: 48, color: 'info.main' }} />;
                        chipColor = 'info';
                        chipLabel = 'DOC';
                        break;
                    case "picture":
                        archive = <ImageIcon sx={{ fontSize: 48, color: 'success.main' }} />;
                        chipColor = 'success';
                        chipLabel = 'Imagen';
                        break;
                }
            } else {
                if(!path) archive = <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.400' }} />;
            }
            
            return { icon: archive, chipColor, chipLabel };
        };

        const handleClose = () => {
            this.state.openModal = false;
            this.dispatchStore(this.state)
        };

        const handleOpen = () => {
            this.state.form = new Vitae();
            this.state.form.user_id = this.props.user_id;
            this.state.openModal = true;
            this.dispatchStore(this.state)
        };

        const fileInfo = validateFile(this.state.form.path, this.state.form.archive_type);
        const hasFile = Boolean(this.state.form.path);

        return (
            <div>
                <StyledDialog
                    maxWidth="md"
                    open={this.state.openModal}
                    onClose={handleClose}
                    aria-describedby="cv-form-dialog"
                >
                    <StyledDialogTitle>
                        {this.state.form?.id ? 'Editar' : 'Nuevo'} Curriculum Vitae
                    </StyledDialogTitle>
                    
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent sx={{ p: 3 }}>
                            {this.state.uploading && (
                                <Box sx={{ mb: 2 }}>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={this.state.uploadProgress}
                                        sx={{ mb: 1 }}
                                    />
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Subiendo archivo... {this.state.uploadProgress}%
                                    </Typography>
                                </Box>
                            )}

                            <Stack spacing={3}>
                                {/* Form Fields */}
                                <Box display="flex" gap={2}>
                                    <TextField
                                        fullWidth
                                        error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('archive_name')}
                                        id="archive_name"
                                        label="Nombre del archivo"
                                        value={this.state.form.archive_name || ''}
                                        name="archive_name"
                                        onChange={this.handleChangeForm}
                                        helperText={this.state.form.errorMessages?.archive_name}
                                        variant="outlined"
                                    />
                                    
                                    <FormControl fullWidth error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('archive_type')}>
                                        <InputLabel>Tipo de archivo</InputLabel>
                                        <Select
                                            id="archive_type"
                                            label="Tipo de archivo"
                                            value={this.state.form.archive_type || ''}
                                            name="archive_type"
                                            onChange={this.handleChangeForm}
                                        >
                                            <MenuItem value="PDF">
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <PictureAsPdfIcon color="error" />
                                                    Archivo PDF
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="DOC">
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <ArticleIcon color="info" />
                                                    Archivo DOC
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="PICTURE">
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <ImageIcon color="success" />
                                                    Archivo Imagen
                                                </Box>
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {this.state.form.errorMessages?.archive_type}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>

                                <Divider />

                                {/* Enhanced File Upload Area */}
                                <Box>
                                    <Typography variant="h6" gutterBottom color="text.primary">
                                        Archivo del CV
                                    </Typography>
                                    
                                    <FileUploadArea 
                                        hasFile={hasFile}
                                        component="label"
                                        elevation={hasFile ? 2 : 0}
                                    >
                                        {hasFile && (
                                            <FilePreview>
                                                {fileInfo.icon}
                                                <Box>
                                                    <Typography variant="h6" color="text.primary">
                                                        Archivo seleccionado
                                                    </Typography>
                                                    <Chip 
                                                        label={fileInfo.chipLabel} 
                                                        color={fileInfo.chipColor}
                                                        size="small"
                                                        sx={{ mt: 1 }}
                                                    />
                                                </Box>
                                            </FilePreview>
                                        )}
                                        
                                        {!hasFile && (
                                            <Box>
                                                <CloudUploadIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                                    Arrastra tu archivo aquí
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                    o haz clic para seleccionar
                                                </Typography>
                                            </Box>
                                        )}
                                        
                                        <Button 
                                            variant={hasFile ? "outlined" : "contained"}
                                            component="span"
                                            startIcon={<CloudUploadIcon />}
                                            sx={{ mt: 2 }}
                                        >
                                            {hasFile ? 'Cambiar archivo' : 'Seleccionar archivo'}
                                        </Button>
                                        
                                        <input 
                                            onChange={this.handleChange} 
                                            hidden 
                                            accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/pdf,image/*" 
                                            type="file"
                                            id="path" 
                                            name="path"
                                        />
                                    </FileUploadArea>
                                    
                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                        Formatos soportados: PDF, DOC, DOCX, imágenes (JPG, PNG, etc.)
                                    </Typography>
                                </Box>
                            </Stack>
                        </DialogContent>
                        
                        <DialogActions sx={{ p: 3, pt: 0 }}>
                            <Button 
                                onClick={handleClose}
                                variant="outlined"
                                disabled={this.state.uploading}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                type="submit"
                                variant="contained"
                                disabled={this.state.uploading}
                                startIcon={this.state.uploading ? <LinearProgress size={20} /> : null}
                            >
                                {this.state.uploading ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </DialogActions>
                    </form>
                </StyledDialog>
                
                <StyledFab 
                    onClick={handleOpen} 
                    color="primary" 
                    sx={{
                        position: "fixed",
                        bottom: (theme) => theme.spacing(2),
                        right: (theme) => theme.spacing(2)
                    }} 
                    aria-label="add"
                >
                    <AddIcon/>
                </StyledFab>
            </div>
        );
    }
}

export default FormVitaeComponent;

let name_component = document.querySelector("form-vitae-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormVitaeComponent, name_component, props);
}
