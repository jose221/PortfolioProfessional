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
let primary_url = window.url_api+"/admin/knowledges";
class ListKnowLedgesComponent extends RComponent{
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
        const editableFields = ['title_es', 'title_en', 'description_es', 'description_en'];
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
        this.state.form = new KnowLedge(params.row);

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
                renderCell: (params) =><IconButton onClick={()=>this.goToHref(`/admin/knowledges/show/${params.id}`)} color="success">
                    <RemoveRedEyeIcon />
                </IconButton>,
            },
            { field: 'id', headerName: 'ID', width: 70 },
            {field: 'icon_path', headerName: 'url del icono', width: 100,
                type: 'string', description: 'Url deñ icono',
                renderCell: (params) => <Avatar sx={{ bgcolor: green[500] }} src={ this.loadImage(params.row.icon_path)} variant="square">
                </Avatar>,  sortable: true, },
            {field: 'title_es', headerName: 'Titulo en español', width: 200, type: 'string', description: 'Titulo en español', sortable: true, editable: true},
            {field: 'title_en', headerName: 'Titulo en inglés', width: 200, type: 'string', description: 'Titulo en inglés', sortable: true, editable: true},
            {field: 'description_es', headerName: 'Descripción en español', width: 200, type: 'string', description: 'La descripción puede cambiarse pero en formato html', sortable: true, editable: true,
                renderCell: (params) =><div dangerouslySetInnerHTML={{__html: params.row.description_es}} />},
            {field: 'description_en', headerName: 'Descripción en inglés', minWidth: 200, type: 'string', description: 'La descripción puede cambiarse pero en formato html', sortable: true, editable: true,
                renderCell: (params) =><div dangerouslySetInnerHTML={{__html: params.row.description_en}} />}
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
                            <h5 className="subtitle-text pb-3 ico-r"> <PersonIcon /> Información de conocimientos </h5>
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

export default ListKnowLedgesComponent;
let name_component = document.querySelector("list-knowledges-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(ListKnowLedgesComponent, name_component, props);
}
