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
let primary_url = window.url_api+"/admin/my-contacts";
class CreateContactsComponent extends RComponent {
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
        console.log(this.state.form.validData())
        if(this.state.form.validData()){
            await this.onCreate(`${primary_url}`, this.state.form.item)
            this.state.openModal = false;
            this.state.data = await this.getItems(`${primary_url}`)
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
                    <DialogTitle>{"Agregar nuevo contacto"}</DialogTitle>
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <div className="row">
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('name_es')}
                                    className="col-md-6 mt-3 p-1"
                                    id="name_es"
                                    label="Contacto en español"
                                    value={this.state.form.name_es || ' '}
                                    name="name_es"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.name_es}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('name_en')}
                                    className="col-md-6 mt-3 p-1"
                                    id="name_en"
                                    label="Contacto en inglés"
                                    value={this.state.form.name_en || ' '}
                                    name="name_en"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.name_en}
                                />

                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('url_path')}
                                    className="col-md-6 mt-3 p-1"
                                    id="url_path"
                                    label="Url del contacto"
                                    value={this.state.form.url_path || ' '}
                                    name="url_path"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.url_path}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('icon_path')}
                                    className="col-md-6 mt-3 p-1"
                                    id="icon_path"
                                    label="Icono"
                                    value={this.state.form.icon_path || ' '}
                                    name="icon_path"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.url_path ?? "Clase dle icono(Tiene que ser de awesome fonts 5)"}
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
export default CreateContactsComponent;
let name_component = document.querySelector("create-contacts-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(CreateContactsComponent, name_component, props);
}
