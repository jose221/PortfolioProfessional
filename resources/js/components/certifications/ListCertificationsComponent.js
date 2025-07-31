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
import Certification from "../../models/Certification";
let primary_url = window.url_api+"/admin/certifications";
class ListCertificationsComponent extends RComponent{
    constructor(props) {
        super(props);
        //this.getItem(`/api/admin/user/${this.props.id}`);
    }
    async componentDidMount() {
        this.subscribeStore();
        await this.onInit();
    }
    onInit = async ()=>{
        let res = await this.getItems(`${primary_url}`)
        this.state.data = res;
        this.dispatchStore(this.state)
    }
    onRowSelectionModelChange = (params)=>{
        this.state.ids = params;
        this.dispatchStore(this.state)
    }
    processRowUpdate = (newRow, oldRow)=>{
        const editableFields = ['name', 'description', 'category', 'issuing_organization', 'credential_id', 'credential_url', 'status'];
        const changedField = Object.keys(newRow).find(field =>
            newRow[field] !== oldRow[field] &&
            editableFields.includes(field)
        );

        if(changedField && newRow[changedField] !== '') {
            this.handleEdit(`${primary_url}/${newRow.id}`, {
                id: newRow.id,
                value: newRow[changedField],
                field: changedField
            });
        }
        return newRow;
    }
    handleDelete = async()=>{
        await this.onDelete(`${primary_url}/delete`, this.state.ids)
        await this.onInit();
    }
    openEdit = async(params)=>{
        this.state.form = new Certification(params.row);

        this.state.openModal = true;
        this.dispatchStore(this.state)
    }
    render(){
        let columns = [
            {
                field: 'Editar',
                type: 'edit',
                width: 60,
                sortable: false, editable: false,
                renderCell: (params) =><IconButton onClick={()=>this.openEdit(params)} aria-label="edit" color="secondary">
                    <EditIcon />
                </IconButton>,
            },
            {
                field: 'Detalles',
                type: 'action',
                width: 70,
                sortable: false, editable: false,
                renderCell: (params) =><IconButton onClick={()=>this.goToHref(`/admin/certifications/show/${params.id}`)} color="success">
                    <RemoveRedEyeIcon />
                </IconButton>,
            },
            { field: 'id', headerName: 'ID', width: 70 },
            {field: 'image_path', headerName: 'Imagen', width: 100,
                type: 'string', description: 'Imagen de la certificación',
                renderCell: (params) => <Avatar sx={{ bgcolor: green[500] }} src={ this.loadImage(params.row.image_path)} variant="square">
                </Avatar>,  sortable: true, },
            {field: 'name', headerName: 'Nombre', width: 200, type: 'string', description: 'Nombre de la certificación', sortable: true, editable: true},
            {field: 'category', headerName: 'Categoría', width: 150, type: 'string', description: 'Categoría de la certificación', sortable: true, editable: true},
            {field: 'issuing_organization', headerName: 'Organización emisora', width: 200, type: 'string', description: 'Organización que emitió la certificación', sortable: true, editable: true},
            {field: 'credential_id', headerName: 'ID de credencial', width: 150, type: 'string', description: 'ID de la credencial', sortable: true, editable: true},
            {field: 'credential_url', headerName: 'URL de credencial', width: 200, type: 'string', description: 'URL de la credencial', sortable: true,
                renderCell: (params) => params.row.credential_url ? <a href={params.row.credential_url} target="_blank" rel="noopener noreferrer">Ver credencial</a> : '-'},
            {field: 'issue_date', headerName: 'Fecha de emisión', width: 150, type: 'string', description: 'Fecha de emisión de la certificación', sortable: true},
            {field: 'expiration_date', headerName: 'Fecha de expiración', width: 150, type: 'string', description: 'Fecha de expiración de la certificación', sortable: true},
            {field: 'status', headerName: 'Estado', width: 120, type: 'string', description: 'Estado de la certificación', sortable: true, editable: true,
                renderCell: (params) => <span style={{color: params.row.status === 'active' ? 'green' : 'red'}}>{params.row.status}</span>},
            {field: 'renewal_required', headerName: 'Renovación requerida', width: 150, type: 'boolean', description: 'Si se requiere renovación', sortable: true,
                renderCell: (params) => params.row.renewal_required ? 'Sí' : 'No'},
            {field: 'description', headerName: 'Descripción', minWidth: 200, type: 'string', description: 'Descripción de la certificación', sortable: true, editable: true,
                renderCell: (params) =><div>{params.row.description}</div>}
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
                <Card className="container">
                    <CardContent>
                        <div className="d-flex justify-content-between">
                            <h5 className="subtitle-text pb-3 ico-r"> <PersonIcon /> Información de certificaciones </h5>
                            <div>
                                <IconButton disabled={this.state.ids.length <=0} aria-label="delete" onClick={this.handleDelete} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid
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
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default ListCertificationsComponent;
let name_component = document.querySelector("list-certifications-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(ListCertificationsComponent, name_component, props);
}
