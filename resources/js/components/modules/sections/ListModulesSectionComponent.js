import React, { Component, useState } from 'react';
import renderComponent from '../../../utils/renderComponent';
import RComponent from "../../RComponent";
import KnowLedge from "../../../models/KnowLedge";
import {Paper} from "@mui/material";
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
                <Paper elevation={3} >
                    hola mundo
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
