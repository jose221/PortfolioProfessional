import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Collapse from '@mui/material/Collapse';
import RComponent from "../RComponent";
import PersonIcon from "@mui/icons-material/Person";
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
class ContactsComponent extends RComponent {
    constructor(props) {
        super(props);
        this.state.data = [];
        //this.getItem(`/api/admin/user/${this.props.id}`);
    }

    async componentDidMount() {
        let res = await this.getItems(`/api/admin/contacts/${this.props.id}`)
        console.log(res);
        //let data = new User(res);
        await this.setState({data: res});
    }
    handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(this.state.data.getRequired())
        //if(this.state.data.validData()){
            //await this.onUpdate(`/api/admin/user/${this.props.id}`, this.state.data.getItem())
        //}
    }
    render() {
        let columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            {field: 'name_en', headerName: 'Nombre en ingles', width: 200, type: 'string', description: 'Nombre que se verá inglés', sortable: true},
            {field: 'name_es', headerName: 'Nombre en español', width: 200, type: 'string', description: 'Nombre que se verá en español', sortable: true},
            {field: 'url_path', headerName: 'Url', width: 400,
                type: 'string', description: 'Url del contacto',
                renderCell: (params) => <a href={params.row.url_path || ''}>{params.row.url_path || ''}</a>,  sortable: true},
            {field: 'icon_path', headerName: 'Icono', width: 100,
                type: 'string', description: 'icono del contacto de awesome fonts',
                renderCell: (params) => <i className={ params.row.icon_path+' fa-2x text-center'}></i>,  sortable: true},
            { headerName: 'Acciones', width: 120,
                type: 'string', description: 'Acciones de la tabla',
                renderCell: (params) => {

                return (
                    <div className="flex">
                        <IconButton aria-label="edit" color="secondary">
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="error">
                            <DeleteIcon />
                        </IconButton>

                    </div>
                );
                },  sortable: true},

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
                        <h5 className="subtitle-text pb-3 ico-r"> <PersonIcon /> Información de contacto </h5>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={this.state.data}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[4]}
                                checkboxSelection
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
export default ContactsComponent;
let name_component = document.querySelector("contacts-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    ReactDOM.render(<ContactsComponent {...props} />, name_component);
}
