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

// Modern UX/UI Styled Components
const ModernContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const StyledCard = styled(Card)(({ theme }) => ({
    background: '#ffffff',
    borderRadius: '24px',
    border: 'none',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const ModernHeader = styled(CardHeader)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    '& .MuiCardHeader-title': {
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '-0.025em',
    },
    '& .MuiCardHeader-subheader': {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.875rem',
        marginTop: theme.spacing(0.5),
    },
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 'none',
    fontSize: '0.875rem',
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    
    // Header styling
    '& .MuiDataGrid-columnHeaders': {
        borderBottom: '2px solid #e2e8f0',
        borderRadius: 0,
        
        '& .MuiDataGrid-columnHeader': {
            fontWeight: 700,
            fontSize: '0.875rem',
            color: '#334155',
            letterSpacing: '0.025em',
            textTransform: 'uppercase',
            
            '&:focus': {
                outline: 'none',
            },
        },
        
        '& .MuiDataGrid-columnSeparator': {
            color: '#cbd5e1',
        },
        
        '& .MuiDataGrid-sortIcon': {
            color: '#6366f1',
        },
        
        '& .MuiDataGrid-menuIcon': {
            color: '#6366f1',
        },
    },
    
    // Cell styling
    '& .MuiDataGrid-cell': {
        borderBottom: '1px solid #f1f5f9',
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        
        '&:focus': {
            outline: '2px solid #6366f1',
            outlineOffset: '-2px',
        },
    },
    
    // Row styling
    '& .MuiDataGrid-row': {
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        
        '&:hover': {
            backgroundColor: '#f8fafc',
            transform: 'translateX(4px)',
            boxShadow: '4px 0 0 #6366f1',
        },
        
        '&.Mui-selected': {
            backgroundColor: '#ede9fe',
            
            '&:hover': {
                backgroundColor: '#ddd6fe',
            },
        },
        
        '&:nth-of-type(even)': {
            backgroundColor: '#fafbfc',
        },
    },
    
    // Footer styling
    '& .MuiDataGrid-footerContainer': {
        
        '& .MuiTablePagination-root': {
            color: '#64748b',
            fontSize: '0.875rem',
        },
        
        '& .MuiTablePagination-actions button': {
            borderRadius: '12px',
            transition: 'all 0.2s ease-in-out',
            
            '&:hover': {
                backgroundColor: '#6366f1',
                color: '#ffffff',
                transform: 'scale(1.05)',
            },
        },
    },
    
    // Checkbox styling
    '& .MuiCheckbox-root': {
        color: '#94a3b8',
        borderRadius: '8px',
        transition: 'all 0.2s ease-in-out',
        
        '&.Mui-checked': {
            color: '#6366f1',
            transform: 'scale(1.1)',
        },
        
        '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
        },
    },
    
    // Scrollbar styling
    '& .MuiDataGrid-virtualScroller': {
        '&::-webkit-scrollbar': {
            width: '12px',
            height: '12px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f5f9',
            borderRadius: '12px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#cbd5e1',
            borderRadius: '12px',
            border: '2px solid #f1f5f9',
            
            '&:hover': {
                backgroundColor: '#94a3b8',
            },
        },
    },
}));

// Simplified Action Button
const ModernActionButton = styled(IconButton)(({ theme }) => ({
    borderRadius: '12px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    '&.primary': {
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: '#ffffff',
        '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        },
    },
    '&.error': {
        color: '#ef4444'
    },
}));

// Simplified Chip component
const ModernChip = styled(Chip)(({ theme }) => ({
    borderRadius: '16px',
    fontWeight: 600,
    fontSize: '0.75rem',
    height: '28px',
    transition: 'all 0.2s ease-in-out',
    '&.primary': {
        color: '#6366f1',
    },
    '&.success': {
        color: '#10b981',
    },
    '&.error': {
        color: '#ef4444',
    },
}));

// Simplified Button
const ModernButton = styled(Button)(({ theme }) => ({
    borderRadius: '12px',
    textTransform: 'none',
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: theme.spacing(0.5, 1.5),
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-1px)',
    },
}));

// Simplified Avatar
const ModernAvatar = styled(Avatar)(({ theme }) => ({
    width: '40px',
    height: '40px',
    fontSize: '1rem',
    fontWeight: 600,
    border: '2px solid #ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
}));

// Simplified Status Badge
const StatusBadge = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    borderRadius: '16px',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&.visible': {
        color: ' #10b981',
    },
    '&.hidden': {
        color: '#ef4444',
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
        try {
            let res = await this.getItems(`${primary_url}`)
            this.state.data = res;
            this.dispatchStore(this.state)
        } catch (error) {
            console.error('❌ Error en onInit:', error);
        }
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
                width: 140,
                sortable: false,
                editable: false,
                renderCell: (params) => {
                    const isVisible = params.row.User?.id == this.props.user_id;
                    const status = isVisible ? 'visible' : 'hidden';
                    const icon = isVisible ? <VisibilityIcon sx={{ fontSize: 16 }} /> : <VisibilityOffIcon sx={{ fontSize: 16 }} />;
                    const text = isVisible ? 'Visible' : 'Oculto';
                    const tooltipText = isVisible ? "CV visible - Click para ocultar" : "CV oculto - Click para mostrar";

                    return (
                        <Tooltip title={tooltipText} arrow>
                            <StatusBadge 
                                className={status}
                                onClick={() => this.actionShowInUser(params)}
                            >
                                {icon}
                                {text}
                            </StatusBadge>
                        </Tooltip>
                    );
                },
            },
            {
                field: 'Editar',
                type: 'edit',
                headerName: 'Acciones',
                width: 120,
                sortable: false,
                editable: false,
                renderCell: (params) => (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Editar CV" arrow>
                            <ModernActionButton 
                                onClick={() => this.openEdit(params)} 
                                aria-label="edit"
                            >
                                <EditIcon sx={{ fontSize: 18 }} />
                            </ModernActionButton>
                        </Tooltip>
                    </Box>
                ),
            },
            {
                field: 'id',
                headerName: 'ID',
                width: 80,
                renderCell: (params) => (
                    <ModernChip
                        className="primary"
                        label={`#${params.value}`}
                        size="small"
                    />
                ),
                sortable: false,
            },
            {
                field: 'archive_name',
                headerName: 'Nombre del Archivo',
                width: 280,
                editable: true,
                renderCell: (params) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ModernAvatar sx={{ 
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            width: 40,
                            height: 40
                        }}>
                            <ArticleIcon sx={{ fontSize: 20, color: '#ffffff' }} />
                        </ModernAvatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography 
                                variant="body2" 
                                fontWeight={600}
                                sx={{ 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    color: '#1e293b',
                                    fontSize: '0.875rem'
                                }}
                            >
                                {params.value}
                            </Typography>
                        </Box>
                    </Box>
                ),
            },
            {
                field: 'extension',
                headerName: 'Tipo de Archivo',
                width: 150,
                renderCell: (params) => {
                    let icon, variant, label;
                    switch (params.value?.toLowerCase()) {
                        case 'pdf':
                            icon = <PictureAsPdfIcon sx={{ fontSize: 18 }} />;
                            variant = "error";
                            label = "PDF";
                            break;
                        case 'jpg':
                        case 'jpeg':
                        case 'png':
                        case 'gif':
                            icon = <ImageIcon sx={{ fontSize: 18 }} />;
                            variant = "success";
                            label = "Imagen";
                            break;
                        default:
                            icon = <ArticleIcon sx={{ fontSize: 18 }} />;
                            variant = "default";
                            label = "Archivo";
                            break;
                    }

                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            {icon}
                            <ModernChip
                                className={variant}
                                label={label}
                                size="small"
                            />
                        </Box>
                    );
                },
                sortable: false,
            },
            {
                field: 'path',
                headerName: 'Descargar',
                width: 140,
                type: 'action',
                description: 'Descargar archivo',
                editable: false,
                renderCell: (params) => (
                    <ModernButton
                        variant="outlined"
                        size="small"
                        href={this.loadImage(params.row.path) || ''}
                        target="_blank"
                        startIcon={<RemoveRedEyeIcon sx={{ fontSize: 16 }} />}
                    >
                        Ver
                    </ModernButton>
                ),
                sortable: false,
            },
        ];
        return (
            <ModernContainer>
                <Backdrop
                    sx={{ 
                        color: '#fff', 
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)'
                    }}
                    open={this.state.isLoading}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <CircularProgress 
                            size={60} 
                            thickness={4}
                            sx={{ color: '#6366f1' }}
                        />
                        <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                            Cargando CVs...
                        </Typography>
                    </Box>
                </Backdrop>
                
                <Snackbar 
                    open={this.state.isSuccess} 
                    autoHideDuration={6000}  
                    onClose={this.successHandleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert 
                        onClose={this.successHandleClose} 
                        severity="success" 
                        sx={{ 
                            width: '100%',
                            borderRadius: '16px',
                            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
                        }}
                    >
                        {this.state.isSuccessMessage}
                    </Alert>
                </Snackbar>
                
                <StyledCard>
                    <ModernHeader
                        action={
                            <Stack direction="row" spacing={2}>
                                <Tooltip title="Eliminar seleccionados" arrow>
                                    <ModernActionButton 
                                        className="error"
                                        disabled={this.state.ids.length <= 0} 
                                        aria-label="delete" 
                                        onClick={this.handleDelete}
                                    >
                                        <DeleteIcon sx={{ fontSize: 18 }} />
                                    </ModernActionButton>
                                </Tooltip>
                            </Stack>
                        }
                    />
                    
                    <CardContent sx={{ padding: 0 }}>
                        <StyledDataGrid
                            rows={this.state.data}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 25, 50]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            processRowUpdate={this.processRowUpdate}
                            onRowSelectionModelChange={this.onRowSelectionModelChange}
                            onCellClick={(params, e) => this.onCellClick(params, e)}
                            sx={{ minHeight: 600 }}
                        />
                    </CardContent>
                </StyledCard>
            </ModernContainer>
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
