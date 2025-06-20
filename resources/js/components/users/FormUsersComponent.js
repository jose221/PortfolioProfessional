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

let primary_url = window.url_api+"/admin/user";
const roles = [
    { label: 'Administrador', id: 1 }
];
class FormUsersComponent extends RComponent {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.state.form = new MyContact();
        this.state.form.user_id = this.props.user_id;
        this.dispatchStore(this.state)
        this.subscribeStore()
    }
    handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(this.state.form)
        if(this.state.form.validData()){
            await this.onCreate(`${primary_url}`, this.state.form)
            this.state.openModal = false;
            this.state.data = await this.getItems(`${primary_url}`)
            this.dispatchStore(this.state)
            //window.location.reload();
        }
    }
    render() {

        const handleClose = () => {
            this.state.openModal = false;
            this.dispatchStore(this.state)
        };
        const handleOpen = () => {
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
                                    error={this.isValid(this.state.form.name)}
                                    className="col-md-6 mt-3 p-1"
                                    id="name"
                                    label="Nombre completo"
                                    value={this.state.form.name || ' '}
                                    name="name"
                                    onChange={this.handleChangeForm}
                                    helperText="Nombre completo del usuario"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.email)}
                                    className="col-md-6 mt-3 p-1"
                                    id="email"
                                    label="Correo eléctronico"
                                    value={this.state.form.email || ' '}
                                    name="email"
                                    onChange={this.handleChangeForm}
                                    helperText="Correo del usuario"
                                />
                                {!this.state.form.id && (
                                    <TextField
                                        error={this.isValid(this.state.form.password)}
                                        className="col-md-6 mt-3 p-1"
                                        id="password"
                                        label="Contraseña"
                                        value={this.state.form.password || 'password123'}
                                        name="password"
                                        type={'password'}
                                        onChange={this.handleChangeForm}
                                        helperText="Contraseña del usuario, la contraseña por default es: password123"
                                    />
                                )}
                                <Autocomplete
                                    disablePortal
                                    options={roles}
                                    getOptionLabel={(option) => option.label}
                                    value={roles.find(r => r.id === this.state.form.role_id) || null}
                                    onChange={(event, newValue) => {
                                        this.setState(state => ({
                                            ...state,
                                            form: {
                                                ...state.form,
                                                role_id: newValue ? newValue.id : ''
                                            }
                                        }));
                                    }}
                                    className="col-md-6 mt-3 p-1"
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="w-100"
                                            id="role_id"
                                            name="role_id"
                                            helperText="Rol que pertenece el usuario"
                                            label="Rol del usuario"
                                            error={this.isValid(this.state.form.role_id)}
                                        />
                                    )}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button type="button" onClick={handleClose}>Cerrar</Button>
                            <Button type="submit" onClick={handleClose}>Guardar</Button>
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
