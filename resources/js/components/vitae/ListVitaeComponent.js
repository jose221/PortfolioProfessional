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
let primary_url = "/api/admin/vitae";
let title = "Informacion de mi Historial de CV";
class ListVitaeComponent extends RComponent{
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore();
        await this.onInit();
    }
    onInit = async ()=>{
        let res = await this.getItems(`${primary_url}/${this.props.user_id}`)
        this.state.data = res;
        this.dispatchStore(this.state)
    }
    onSelectionModelChange = (params)=>{
        this.state.ids = params;
        this.dispatchStore(this.state)
    }
    onCellEditCommit = (params)=>{
        if(params.value != "") this.handleEdit(`${primary_url}/edit/${params.id}`, params);
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
        let res = await this.onUpdate(`${primary_url}/show-user/${params.row.id}`, {
            user_id: this.props.user_id
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
                    const icon = params.row.selected ? <VisibilityIcon /> : <VisibilityOffIcon />;
                    const color = params.row.selected ? "success" : "error";


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
                renderCell: (params) => <a target="_blank" href={params.row.path || ''}>Seleccionar archivo</a>,  sortable: false, },
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
                                pageSize={10}
                                rowsPerPageOptions={[2]}
                                checkboxSelection
                                onCellEditCommit={(params)=>this.onCellEditCommit(params)}
                                onSelectionModelChange={(params)=> this.onSelectionModelChange(params)}
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
