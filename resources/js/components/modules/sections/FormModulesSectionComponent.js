import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import RComponent from "../../RComponent";
import ReactDOM from "react-dom";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import Permission from "../../../models/Permission";
import {Autocomplete, FormControlLabel, Switch} from "@mui/material";
import renderComponent from "../../../utils/renderComponent";
import {sleep} from "../../../utils/tools";

let primary_url = window.url_api+"/admin/roles";
let permissions_url = window.url_api+"/admin/permissions";
let modules_url = window.url_api+"/admin/modules";
const modules = [
    { label: 'Administrador', id: 1 }
];
class FormModulesSectionComponent extends RComponent {
    constructor(props) {
        super(props);
    }
    async getModules(){
        let res = await this.getItems(`${modules_url}`,{
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
        let idsModules = this.props.modules.map(r => r.id);
        res = res.filter(r =>
            {
                return !(idsModules ?? []).includes(r.id)
            }
        );

        this.state.totalModules = res.length;
        this.state.modules = res;

        this.dispatchStore(this.state)
    }
    async onInit(){
        await sleep(1000)
        this.getModules()
    }
    async componentDidMount() {
        this.subscribeStore()
        this.onInit()
    }
    handleSubmit = async (e) =>{
        e.preventDefault();
        if(this.state.form.validData()){
            if(this.state.form?.id) await this.onUpdate(`${permissions_url}/${this.state.form?.id}`, this.state.form.item);
            else await this.onCreate(`${permissions_url}`, this.state.form.item)
            this.state.openModal = false;
            this.dispatchStore(this.state)
            window.location.reload();
        }
    }
    handleSwitchChange = (permissionType) => (event) => {
        this.state.form[permissionType] = event.target.checked;
        this.dispatchStore(this.state)
    };
    render(){
        const handleClose = () => {
            this.state.openModal = false;
            this.dispatchStore(this.state)
        };
        const handleOpen = () => {
            this.state.form = new Permission();
            this.state.form.role_id = Number.parseInt(this.props.roleId ?? 0);
            this.onInit()
            this.state.openModal = true;
            this.dispatchStore(this.state)
        };
        return (
            <div>
                <Dialog
                    maxWidth="lg"
                    open={this.state.openModal}
                    //TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Permisos para el módulo"}</DialogTitle>
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <div className="w-100">
                                <div>
                                    <p>Módulos disponibles: {this.state.totalModules}</p>
                                </div>

                                {(this.state.totalModules) ?
                                    <div>
                                    <Autocomplete
                                        disablePortal
                                        options={(this.state?.modules ?? [])}
                                        getOptionLabel={(option) => `${option.name_es} | ${option.name_en}`}
                                        value={(this.state?.modules ?? []).find(r => r.id === this.state.form.module_id) || null}
                                        onChange={(event, newValue) => {
                                            this.setState(state => ({
                                                ...state,
                                                form: {
                                                    ...state.form,
                                                    module_id: newValue ? newValue.id : ''
                                                }
                                            }));
                                        }}
                                        className="col-md-12 mt-3 p-1"
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="w-100"
                                                id="role_id"
                                                name="role_id"
                                                helperText="Módulo a agregar"
                                                label="Módulos a otorgar permisos"
                                                error={this.isValid(this.state.form.role_id)}
                                            />
                                        )}
                                    />
                                    <div className={'subsection'}>
                                        <p className={'name-item-list'}>Permisos</p>
                                        <div className={'d-flex grid-grap-1 flex-wrap pt-2'}>
                                            <FormControlLabel
                                                className={'permission-item-list'}
                                                control={
                                                    <Switch
                                                        checked={!!this.state.form.can_read}
                                                        onChange={this.handleSwitchChange('can_read')}
                                                    />
                                                }
                                                label="Ver"
                                            />
                                            <FormControlLabel
                                                className={'permission-item-list'}
                                                control={
                                                    <Switch
                                                        checked={!!this.state.form.can_create}
                                                        onChange={this.handleSwitchChange('can_create')}
                                                    />
                                                }
                                                label="Crear"
                                            />
                                            <FormControlLabel
                                                className={'permission-item-list'}
                                                control={
                                                    <Switch
                                                        checked={!!this.state.form.can_update}
                                                        onChange={this.handleSwitchChange('can_update')}
                                                    />
                                                }
                                                label="Editar"
                                            />
                                            <FormControlLabel
                                                className={'permission-item-list'}
                                                control={
                                                    <Switch
                                                        checked={!!this.state.form.can_delete}
                                                        onChange={this.handleSwitchChange('can_delete')}
                                                    />
                                                }
                                                label="Eliminar"
                                            />
                                            <FormControlLabel
                                                className={'permission-item-list'}
                                                control={
                                                    <Switch
                                                        checked={!!this.state.form.is_page}
                                                        onChange={this.handleSwitchChange('is_page')}
                                                    />
                                                }
                                                label="¿Estará en el panel?"
                                            />
                                        </div>
                                    </div>
                                </div> : 'No hay módulos disponibles'}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button type="button" onClick={handleClose}>Cerrar</Button>
                            <Button type="submit">Guardar</Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <Fab type="button" onClick={handleOpen} color="primary" sx={{
                    position: "fixed",
                    bottom: (theme) => theme.spacing(2),
                    right: (theme) => theme.spacing(2)
                }} aria-label="add">
                    <AddIcon/>
                </Fab>
            </div>
        );
    }
}
export default FormModulesSectionComponent;
let name_component = document.querySelector("form-modules-section-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormModulesSectionComponent, name_component, props);
}
