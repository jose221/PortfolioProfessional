import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import RComponent from "../RComponent";
import ReactDOM from "react-dom";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import MyContact from "../../models/MyContact";
import {Autocomplete} from "@mui/material";
import User from "../../models/User";
import {sleep} from "../../utils/tools";

let primary_url = window.url_api+"/admin/user";
let register_url = window.url_api+"/admin/register";
let role_url = window.url_api+"/admin/roles";

class FormUsersComponent extends RComponent {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore()
        await sleep(1000)
        this.getRoles()
    }
    async getRoles(){
        let roles_user = await this.getItems(`${role_url}`);
        this.state.roles = roles_user;
        console.log(roles_user)
        this.dispatchStore(this.state)
    }
    handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(this.state.form)
        if(this.state.form.validData()){
            if(this.state.form?.id) await this.onUpdate(`${primary_url}/${this.state.form?.id}`, this.state.form.item);
            else await this.onCreate(`${register_url}`, this.state.form.item)
            this.state.openModal = false;
            let res = await this.getItems(`${primary_url}`,{}, true)
            this.state.data = res;
            this.dispatchStore(this.state)
            //window.location.reload();
        }else{
            this.dispatchStore(this.state)
        }
    }
    render() {

        const handleClose = () => {
            this.state.openModal = false;
            this.dispatchStore(this.state)
        };
        const handleOpen = () => {
            this.state.form = new User();
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
                    <DialogTitle>{"Nombre completo"}</DialogTitle>
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <div className="row">
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('name')}
                                    className="col-md-6 mt-3 p-1"
                                    id="name"
                                    label="Nombre completo"
                                    value={this.state.form.name || ' '}
                                    name="name"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.name}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('email')}
                                    className="col-md-6 mt-3 p-1"
                                    id="email"
                                    label="Correo eléctronico"
                                    value={this.state.form.email || ' '}
                                    name="email"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.email}
                                />
                                {!this.state.form.id && (
                                    <TextField
                                        error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('password')}
                                        className="col-md-6 mt-3 p-1"
                                        id="password"
                                        label="Contraseña"
                                        value={this.state.form.password || 'password123'}
                                        name="password"
                                        type={'password'}
                                        onChange={this.handleChangeForm}
                                        helperText={this.state.form.errorMessages?.password ?? 'Contraseña del usuario, la contraseña por default es: password123'}
                                    />
                                )}
                                <Autocomplete
                                    disablePortal
                                    options={(this.state?.roles ?? [])}
                                    getOptionLabel={(option) => `${option.name_es} | ${option.name_es}(${option.key})`}
                                    value={(this.state?.roles ?? []).find(r => r.id === this.state.form.role_id) || null}
                                    onChange={(event, newValue) => {
                                        this.setState(state => ({
                                            ...state,
                                            form: new User({
                                                ...state.form.item,
                                                role_id: newValue ? newValue.id : ''
                                            })
                                        }));
                                    }}
                                    className="col-md-6 mt-3 p-1"
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="w-100"
                                            id="role_id"
                                            name="role_id"
                                            helperText={this.state.form.errorMessages?.role_id ?? 'Rol que pertenece el usuario'}
                                            label="Rol del usuario"
                                            error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('role_id')}
                                        />
                                    )}
                                />
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
export default FormUsersComponent;
let name_component = document.querySelector("create-contacts-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormUsersComponent, name_component, props);
}
