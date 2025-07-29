import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import RComponent from "../RComponent";
import Vitae from "../../models/Vitae";
import CVViewerEditor from './CVViewerEditor';

import {
    Typography,
    CardHeader,
    Box,
    Divider,
    Grid,
    Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for better visual appeal
const StyledCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    },
}));

const InfoSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: '#f8f9fa',
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
}));

const ViewerSection = styled(Box)(({ theme }) => ({
    height: '70vh',
    minHeight: '500px',
    marginTop: theme.spacing(2),
}));

let primary_url = window.url_api+"/admin/history-curriculum-vitae";
let primary_url_user = window.url_api+"/admin/user";
let title = "Información de mi Historial de CV";
let url_storage = window.url_image || "http://localhost:8080";

class InfoVitaeComponent extends RComponent{
    constructor(props) {
        super(props);
        this.state = {
            information: null,
            snackbar: {
                open: false,
                message: '',
                severity: 'info'
            }
        }
    }
    async componentDidMount() {
        this.subscribeStore();
        await this.onInit();
    }
    onInit = async ()=>{
        let res = await this.getItem(`${primary_url}/${this.props.id}`)
        res.path = url_storage+res.path
        console.log(res)
        this.state.information = res;
        this.dispatchStore(this.state)
    }

    handleSaveCV = async (editedData) => {
        try {
            // Here you can implement the save functionality
            // This could involve sending the edited data to your backend
            console.log('Saving CV data:', editedData);

            // Example API call (adjust according to your backend)
            // const response = await this.putItem(`${primary_url}/${this.props.id}`, {
            //     edited_data: editedData
            // });

            this.setState({
                snackbar: {
                    open: true,
                    message: 'CV guardado exitosamente',
                    severity: 'success'
                }
            });
        } catch (error) {
            console.error('Error saving CV:', error);
            this.setState({
                snackbar: {
                    open: true,
                    message: 'Error al guardar el CV',
                    severity: 'error'
                }
            });
        }
    };

    handleCloseSnackbar = () => {
        this.setState({
            snackbar: { ...this.state.snackbar, open: false }
        });
    };

    getFileTypeIcon = (type) => {
        switch (type?.toUpperCase()) {
            case 'PDF':
                return '📄';
            case 'JPG':
            case 'JPEG':
            case 'PNG':
            case 'GIF':
            case 'BMP':
            case 'WEBP':
                return '🖼️';
            case 'DOC':
            case 'DOCX':
                return '📝';
            default:
                return '📎';
        }
    };

    render(){
        const { information, snackbar } = this.state;

        if (!information) {
            return (
                <StyledCard>
                    <CardContent>
                        <Typography variant="h6" align="center">
                            Cargando información del CV...
                        </Typography>
                    </CardContent>
                </StyledCard>
            );
        }

        return (
            <Box>
                <StyledCard>
                    <CardHeader
                        title={
                            <Typography variant="h4" component="h1" sx={{
                                fontWeight: 'bold',
                                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}>
                                {title}
                            </Typography>
                        }
                        sx={{ pb: 1 }}
                    />

                    <CardContent>
                        <InfoSection>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" gutterBottom>
                                        {this.getFileTypeIcon(information.archive_type)} {information.archive_name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        ID: {information.id}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Última actualización: {new Date(information.updated_at).toLocaleDateString() || 'No disponible'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                                        <Chip
                                            label={information.archive_type}
                                            color="primary"
                                            variant="outlined"
                                            size="small"
                                        />
                                        <Typography variant="body2" color="textSecondary">
                                            Usuario: {information.user_id}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </InfoSection>

                        <Divider sx={{ my: 2 }} />

                        <ViewerSection>
                            <CVViewerEditor
                                fileInfo={information}
                                onSave={this.handleSaveCV}
                            />
                        </ViewerSection>
                    </CardContent>
                </StyledCard>

                <Snackbar
                    open={snackbar?.open || false}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackbar}
                >
                    <Alert
                        onClose={this.handleCloseSnackbar}
                        severity={snackbar?.severity || 'info'}
                        sx={{ width: '100%' }}
                    >
                        {snackbar?.message}
                    </Alert>
                </Snackbar>
            </Box>
        );
    }
}

export default InfoVitaeComponent;
let name_component = document.querySelector("info-vitae-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    console.log(props)
    renderComponent(InfoVitaeComponent, name_component, props);
}
