import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import RComponent from "../RComponent";
import PersonIcon from "@mui/icons-material/Person";
import  { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import { deepOrange, green } from '@mui/material/colors';
import KnowLedge from "../../models/KnowLedge";
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import Vitae from "../../models/Vitae";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Typography,
    Chip,
    Tooltip,
    Button,
    CardHeader,
    Divider,
    Stack
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

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 'none',
    '& .MuiDataGrid-cell': {
        borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
        padding: theme.spacing(1),
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: theme.palette.grey[50],
        borderBottom: '2px solid rgba(25, 118, 210, 0.2)',
        '& .MuiDataGrid-columnHeader': {
            fontWeight: 600,
            fontSize: '0.875rem',
        },
    },
    '& .MuiDataGrid-row': {
        '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.04)',
        },
        '&.Mui-selected': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
            '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.12)',
            },
        },
    },
    '& .MuiDataGrid-footerContainer': {
        borderTop: '2px solid rgba(224, 224, 224, 0.5)',
        backgroundColor: theme.palette.grey[50],
    },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.1)',
    },
}));

let primary_url = window.url_api+"/admin/history-curriculum-vitae";
let primary_url_user = window.url_api+"/admin/user";

class ListVitaeComponent extends RComponent{
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore();
        await this.onInit();
    }
    onInit = async ()=>{
        let res = await this.getItems(`${primary_url}`)
        console.log(res)
        this.state.data = res;
        this.dispatchStore(this.state)
    }
    onRowSelectionModelChange = (params)=>{
        this.state.ids = params;
        this.dispatchStore(this.state)
    }
    processRowUpdate = (newRow, oldRow)=>{
        if(newRow.archive_name !== oldRow.archive_name) {
            this.handleEdit(`${primary_url}/${newRow.id}`, {id: newRow.id, value: newRow.archive_name, field: 'archive_name'});
        }
        return newRow;
    }
    handleDelete = async()=>{
        await this.onDelete(`${primary_url}/delete`, this.state.ids)
        await this.onInit();
    }
    openEdit = async(params)=>{
        this.state.form = new Vitae(params.row);

        this.state.openModal = true;
        this.dispatchStore(this.state)
    }
    actionShowInUser = async(params)=>{
        let res = await this.onUpdate(`${primary_url_user}/${this.props.user_id}`, {
            cv: params.row.id
        });
        await this.onInit();
    }
    render(){
        let columns = [
            {
                field: 'selected',
                type: 'action',
                headerName: 'Estado',
                description: 'Mostrar/Ocultar CV para el usuario',
                width: 100,
                sortable: false,
                editable: false,
                renderCell: (params) =>{
                    const isVisible = params.row.User?.id == this.props.user_id;
                    const icon = isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />;
                    const color = isVisible ? "success" : "error";
                    const tooltipText = isVisible ? "CV visible - Click para ocultar" : "CV oculto - Click para mostrar";

                    return (
                        <Tooltip title={tooltipText}>
                            <ActionButton onClick={()=>this.actionShowInUser(params)} aria-label="visibility" color={color}>
                                {icon}
                            </ActionButton>
                        </Tooltip>
                    );
                },
            },
            {
                field: 'Editar',
                type: 'edit',
                headerName: 'Editar',
                width: 80,
                sortable: false,
                editable: false,
                renderCell: (params) => (
                    <Tooltip title="Editar CV">
                        <ActionButton onClick={()=>this.openEdit(params)} aria-label="edit" color="primary">
                            <EditIcon />
                        </ActionButton>
                    </Tooltip>
                ),
            },
            {
                field: 'id',
                headerName: 'ID',
                width: 70,
                renderCell: (params) => (
                    <Chip
                        label={params.value}
                        size="small"
                        variant="outlined"
                        color="primary"
                    />
                ),
            },
            {
                field: 'archive_name',
                headerName: 'Nombre del archivo',
                width: 400,
                type: 'string',
                sortable: true,
                editable: true,
                renderCell: (params) => (
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {params.value}
                    </Typography>
                ),
            },
            {
                field: 'archive_type',
                headerName: 'Tipo',
                width: 120,
                type: 'action',
                description: 'Tipo de archivo',
                editable: false,
                renderCell: (params) => {
                    let archive = <ArticleIcon color="primary" />;
                    let chipColor = "primary";
                    let chipLabel = "DOC";

                    switch (params.row.archive_type.toLowerCase()){
                        case "pdf":
                            archive = <PictureAsPdfIcon color="error" />;
                            chipColor = "error";
                            chipLabel = "PDF";
                            break;
                        case "image":
                        case "picture":
                            archive = <ImageIcon color="success" />;
                            chipColor = "success";
                            chipLabel = "IMG";
                            break;
                    }

                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {archive}
                            <Chip
                                label={chipLabel}
                                size="small"
                                color={chipColor}
                                variant="filled"
                            />
                        </Box>
                    );
                },
                sortable: false,
            },
            {
                field: 'path',
                headerName: 'Archivo',
                width: 150,
                type: 'action',
                description: 'Descargar archivo',
                editable: false,
                renderCell: (params) => (
                    <Button
                        variant="outlined"
                        size="small"
                        href={this.loadImage(params.row.path) || ''}
                        target="_blank"
                        sx={{
                            textTransform: 'none',
                            borderRadius: '20px',
                            fontSize: '0.75rem'
                        }}
                    >
                        Ver archivo
                    </Button>
                ),
                sortable: false,
            },
        ];
        return (
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Snackbar open={this.state.isSuccess} autoHideDuration={6000}  onClose={this.successHandleClose}>
                    <Alert onClose={this.successHandleClose} severity="success" sx={{ width: '100%' }}>
                        {this.state.isSuccessMessage}
                    </Alert>
                </Snackbar>
                <StyledCard className="container">
                    <CardHeader
                        action={
                            <Stack direction="row" spacing={1}>
                                <Tooltip title="Eliminar">
                                    <ActionButton disabled={this.state.ids.length <=0} aria-label="delete" onClick={this.handleDelete} color="error">
                                        <DeleteIcon />
                                    </ActionButton>
                                </Tooltip>
                            </Stack>
                        }
                    />
                    <CardContent>
                        <Divider />
                        <StyledDataGrid
                            rows={this.state.data}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[10]}
                            checkboxSelection
                            processRowUpdate={this.processRowUpdate}
                            onRowSelectionModelChange={this.onRowSelectionModelChange}
                            onCellClick={(params, e)=> this.onCellClick(params,e)}
                        />
                    </CardContent>
                </StyledCard>
            </div>
        )
    }
}

export default ListVitaeComponent;
let name_component = document.querySelector("list-vitae-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(ListVitaeComponent, name_component, props);
}
