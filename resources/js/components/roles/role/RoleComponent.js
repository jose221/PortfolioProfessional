import React, { Component, useState } from 'react';
import renderComponent from '../../../utils/renderComponent';
import RComponent from "../../RComponent";
import Role from "../../../models/Role";
import {Paper} from "@mui/material";
import ListModulesSectionComponent from "../../modules/sections/ListModulesSectionComponent";
import {capitalizeFirstLetter, capitalizeText} from "../../../pipes/formatTextPipe";
import FormModulesSectionComponent from "../../modules/sections/FormModulesSectionComponent";
let primary_url = window.url_api+"/admin/roles";
let title = "Información  los módulos por rol"
class RoleComponent extends RComponent{
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore();
        await this.onInit();
    }
    onInit = async ()=>{
        let res = await this.getItem(`${primary_url}`, {
            params:{
                id: this.props.roleId
            }
        })
        this.state.role= res[0];
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
        this.state.form = new Role(params.row);

        this.state.openModal = true;
        this.dispatchStore(this.state)
    }
    render(){
        console.log(this.state.role?.name_es)
        return (
            <div>
                <h3>{capitalizeText(this.state.role?.name_es)} | {capitalizeText(this.state.role?.name_en)}</h3>
                <h5>{capitalizeFirstLetter(this.state.role?.description_es)} | {capitalizeFirstLetter(this.state.role?.description_en)}</h5>
                <ListModulesSectionComponent role={this.state.role} roleId={this.props.roleId}></ListModulesSectionComponent>
                <FormModulesSectionComponent />
            </div>
        )
    }
}

export default RoleComponent;
let name_component = document.querySelector("role-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(RoleComponent, name_component, props);
}
