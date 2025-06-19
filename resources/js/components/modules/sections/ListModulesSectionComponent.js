import React, { Component, useState } from 'react';
import renderComponent from '../../../utils/renderComponent';
import RComponent from "../../RComponent";
import KnowLedge from "../../../models/KnowLedge";
import {Chip, FormControlLabel, Paper, Switch} from "@mui/material";
let primary_url = window.url_api+"/admin/modules/by-role";
let title = "Información  los módulos por rol"
class ListModulesSectionComponent extends RComponent{
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore();
        await this.onInit();
    }
    onInit = async ()=>{
        console.log(this.props)
        let res = await this.getItems(`${primary_url}`,{
            params:{
                permissions:{
                    role_id: this.props.roleId
                }
            }
        }, true,{
            headers: {
                'Content-Type': 'application/json'
            },
        })
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
            <div className={'pt-2 h-100'}>
                <Paper className={'p-3 mt-2'} elevation={2} >
                    <div className={'d-flex justify-content-between align-items-center'}>
                        <p className={'name-item-list'}> name_es | name_en </p>
                        <Chip className={'key-item-list'}  color="primary" variant="outlined" label="key" />
                    </div>
                    <div className={'d-flex grid-grap-1 flex-wrap pt-2'}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Ver" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Crear" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Editar" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Eliminar" />
                    </div>
                </Paper>
                <Paper className={'p-3 mt-2'} elevation={2} >
                    <div className={'d-flex justify-content-between align-items-center'}>
                        <p className={'name-item-list'}> name_es | name_en </p>
                        <Chip className={'key-item-list'}  color="primary" variant="outlined" label="key" />
                    </div>
                    <div className={'d-flex grid-grap-1 flex-wrap pt-2'}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Ver" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Crear" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Editar" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Eliminar" />
                    </div>
                </Paper>
            </div>
        )
    }
}

export default ListModulesSectionComponent;
let name_component = document.querySelector("list-modules-section-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(ListModulesSectionComponent, name_component, props);
}
