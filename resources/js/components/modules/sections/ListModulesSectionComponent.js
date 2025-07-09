import React, { Component, useState } from 'react';
import renderComponent from '../../../utils/renderComponent';
import RComponent from "../../RComponent";
import KnowLedge from "../../../models/KnowLedge";
import {Chip, FormControlLabel, Paper, Switch} from "@mui/material";
import FormModulesSectionComponent from "./FormModulesSectionComponent";
let primary_url = window.url_api+"/admin/modules/by-role";
let permission_url = window.url_api+"/admin/permissions";
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
        this.state.items = res;
        this.dispatchStore(this.state)
    }
    handleSwitchChange = (idx, idx2, permissionType) => (event) => {

        const newRow = this.state.items[idx].Permissions[idx2];
        newRow[permissionType] = event.target.checked;
        this.state.items[idx].Permissions[idx2] = newRow;

        this.handleEdit(`${permission_url}/${newRow.id}`, {
            id: newRow.id,
            value: newRow[permissionType],
            field: permissionType
        });
    };

    onRowSelectionModelChange = (params)=>{
        this.state.ids = params;
        this.dispatchStore(this.state)
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
                <div className={'pt-2 h-100 mb-2'}>
                    {(this.state.items ?? []).map((item, idx) => (
                        <Paper className={'p-3 mt-3'} elevation={2} key={idx}>
                            <div className={'d-flex justify-content-between align-items-center'}>
                                <p className={'name-item-list'}>
                                    {item.name_es} | {item.name_en}
                                </p>
                                <Chip
                                    className={'key-item-list'}
                                    color="primary"
                                    variant="outlined"
                                    label={item.key}
                                />
                            </div>
                            {(item.Permissions ?? []).map((permission,idx2)=>(
                                <div className={'d-flex grid-grap-1 flex-wrap pt-2 justify-content-between'} key={permission.id ?? idx2}>
                                    <div>
                                        <FormControlLabel
                                            className={'permission-item-list'}
                                            control={
                                                <Switch
                                                    checked={!!permission.can_read}
                                                    onChange={this.handleSwitchChange(idx, idx2, 'can_read')}
                                                />
                                            }
                                            label="Ver"
                                        />
                                        <FormControlLabel
                                            className={'permission-item-list'}
                                            control={
                                                <Switch
                                                    checked={!!permission.can_create}
                                                    onChange={this.handleSwitchChange(idx, idx2, 'can_create')}
                                                />
                                            }
                                            label="Crear"
                                        />
                                        <FormControlLabel
                                            className={'permission-item-list'}
                                            control={
                                                <Switch
                                                    checked={!!permission.can_update}
                                                    onChange={this.handleSwitchChange(idx, idx2, 'can_update')}
                                                />
                                            }
                                            label="Editar"
                                        />
                                        <FormControlLabel
                                            className={'permission-item-list'}
                                            control={
                                                <Switch
                                                    checked={!!permission.can_delete}
                                                    onChange={this.handleSwitchChange(idx, idx2, 'can_delete')}
                                                />
                                            }
                                            label="Eliminar"
                                        />
                                    </div>
                                    <div>
                                        <FormControlLabel
                                            className={'permission-item-list'}
                                            control={
                                                <Switch
                                                    checked={!!permission.is_page}
                                                    onChange={this.handleSwitchChange(idx, idx2, 'is_page')}
                                                />
                                            }
                                            label="¿Estará en el panel?"
                                        />
                                    </div>
                                </div>
                            ))}
                        </Paper>
                    ))}

                </div>
                <FormModulesSectionComponent modules={this.state.items} role={this.state.role} roleId={this.props.roleId} />
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
