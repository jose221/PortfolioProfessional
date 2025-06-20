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
import Role from "../../../models/Role";
import {Autocomplete, FormControlLabel, Switch} from "@mui/material";

let primary_url = window.url_api+"/admin/roles";
const modules = [
    { label: 'Administrador', id: 1 }
];
class FormModulesSectionComponent extends RComponent {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore()
    }
    handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(this.state.form)
        if(this.state.form.validData()){
            if(this.state.form?.id) await this.onUpdate(`${primary_url}/${this.state.form?.id}`, this.state.form);
            else await this.onCreate(`${primary_url}`, this.state.form)
            this.state.openModal = false;
            this.state.data = await this.getItems(`${primary_url}`)
            this.dispatchStore(this.state)
            //window.location.reload();
        }
    }
    render(){

        const handleClose = () => {
            this.state.openModal = false;
            this.dispatchStore(this.state)
        };
        const handleOpen = () => {
            this.state.form = new Role();
            //this.state.form.user_id = this.props.user_id;
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
                    <DialogTitle>{"Mis nuevo rol"}</DialogTitle>
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <div className="w-100">
                                <div>
                                    <p>Módulos disponibles: 3</p>
                                </div>
                                <Autocomplete
                                    disablePortal
                                    options={modules}
                                    getOptionLabel={(option) => option.label}
                                    value={modules.find(r => r.id === this.state.form.module_id) || null}
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
                            </div>
                            <div className={'subsection'}>
                                <p className={'name-item-list'}>Permisos</p>
                                <div className={'d-flex grid-grap-1 flex-wrap pt-2'}>
                                    <FormControlLabel className={'permission-item-list'} control={<Switch defaultChecked />} label="Ver" />
                                    <FormControlLabel className={'permission-item-list'} control={<Switch defaultChecked />} label="Crear" />
                                    <FormControlLabel className={'permission-item-list'} control={<Switch defaultChecked />} label="Editar" />
                                    <FormControlLabel className={'permission-item-list'} control={<Switch defaultChecked />} label="Eliminar" />
                                </div>
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
