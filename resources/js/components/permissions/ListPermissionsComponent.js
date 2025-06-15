import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import RComponent from "../RComponent";
import IconButton from '@mui/material/IconButton';
import KnowLedge from "../../models/KnowLedge";
let primary_url = window.url_api+"/admin/roles";
class ListRolesComponent extends RComponent{
    constructor(props) {
        super(props);
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
        const changedField = Object.keys(newRow).find(field =>
            newRow[field] !== oldRow[field] &&
            ['key', 'name_es', 'name_en', 'description_es', 'description_en'].includes(field)
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

            </div>
        )
    }
}

export default ListRolesComponent;
let name_component = document.querySelector("list-roles-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(ListRolesComponent, name_component, props);
}
