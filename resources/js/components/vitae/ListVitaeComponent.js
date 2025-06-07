import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
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
let primary_url = window.url_api+"/admin/history-curriculum-vitae";
let primary_url_user = window.url_api+"/admin/user";
let title = "Información de mi Historial de CV";
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
                headerName: 'Mostrar',
                description: 'Mostrar cv para el usuario',
                width: 100,
                sortable: false, editable: false,
                renderCell: (params) =>{
                    const icon = (params.row.User?.id == this.props.user_id) ? <VisibilityIcon /> : <VisibilityOffIcon />;
                    const color = (params.row.User?.id == this.props.user_id) ? "success" : "error";


                    return <IconButton onClick={()=>this.actionShowInUser(params)} aria-label="edit" color={color}>
                        {icon}
                    </IconButton>
                },
            },
            {
                field: 'Editar',
                type: 'edit',
                width: 70,
                sortable: false, editable: false,
                renderCell: (params) =><IconButton onClick={()=>this.openEdit(params)} aria-label="edit" color="secondary">
                    <EditIcon />
                </IconButton>,
            },
            { field: 'id', headerName: 'ID', width: 70 },
            {field: 'archive_name', headerName: 'Nombre del archivo', width: 400, type: 'string', sortable: true, editable: true},
            {field: 'archive_type', headerName: 'Url', width: 100,
                type: 'action', description: 'Tipo de archivo',editable: false,
                renderCell: (params) => {
                let archive = <ArticleIcon color="primary" />;
                switch (params.row.archive_type.toLowerCase()){
                    case "pdf":
                        archive = <PictureAsPdfIcon  color="error" />
                        break;
                    case "image":
                        archive = <ImageIcon  color="success" />;
                        break;
                }
                return archive;
                },  sortable: false, },
            {field: 'path', headerName: 'Url', width: 400,
                type: 'action', description: 'url del archivo',editable: false,
                renderCell: (params) => <a target="_blank" href={ this.loadImage(params.row.path) || ''}>Seleccionar archivo</a>,  sortable: false, },
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
                            <h5 className="subtitle-text pb-3 ico-r"> <PersonIcon /> {title} </h5>
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

export default ListVitaeComponent;
let name_component = document.querySelector("list-vitae-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    ReactDOM.render(<ListVitaeComponent {...props} />, name_component);
}
