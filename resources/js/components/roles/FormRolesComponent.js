import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import RComponent from "../RComponent";
import User from "../../models/User";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Study from "../../models/Study";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Role from "../../models/Role";

let primary_url = window.url_api+"/admin/roles";

class FormComponent extends RComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,   // hereda el estado base de RComponent
            form: {},
        }
    }

    async componentDidMount() {
        this.subscribeStore();
    }

    handleSubmit = async (e) =>{
        e.preventDefault();
        if(this.state.form.validData()){
            if(this.state.form?.id){
                if(this.state.form.password){
                    delete this.state.form.password
                }
                await this.onUpdate(`${primary_url}/${this.state.form?.id}`, this.state.form.item);
            }
            else await this.onCreate(`${primary_url}`, this.state.form.item)
            this.state.openModal = false;
            this.state.data = await this.getItems(`${primary_url}`)
            this.dispatchStore(this.state)
            //window.location.reload();
        }else{
            this.dispatchStore(this.state)
        }
    }

    successHandleClose = () => {
        this.state.openModal = false;
        this.dispatchStore(this.state);
    }
    handleOpen = () => {
        this.state.form = new Role();
        this.state.form.user_id = this.props.user_id;
        this.state.openModal = true;
        this.dispatchStore(this.state)
    };

    render() {
        return (
            <div>
                <Dialog
                    maxWidth="lg"
                    open={this.state.openModal}
                    //TransitionComponent={Transition}
                    keepMounted
                    onClose={this.successHandleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Mis nuevo rol"}</DialogTitle>
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <div className="row">
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('key')}
                                    className="col-md-6 mt-3 p-1"
                                    id="key"
                                    label="Key"
                                    value={this.state.form.key || ' '}
                                    name="key"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.key}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('name_es')}
                                    className="col-md-6 mt-3 p-1"
                                    id="name_es"
                                    label="Nombre del rol en español"
                                    value={this.state.form.name_es || ' '}
                                    name="name_es"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.name_es}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('name_en')}
                                    className="col-md-6 mt-3 p-1"
                                    id="name_en"
                                    label="Nombre del rol en inglés"
                                    value={this.state.form.name_en || ' '}
                                    name="name_en"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.name_en}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description_en')}
                                    className="col-md-6 mt-3 p-1"
                                    id="description_en"
                                    label="Descripción en inglés"
                                    value={this.state.form.description_en || ' '}
                                    name="description_en"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.description_en}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description_es')}
                                    className="col-md-6 mt-3 p-1"
                                    id="description_es"
                                    label="Descripción en español"
                                    value={this.state.form.description_es || ' '}
                                    name="description_es"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.description_es}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button type="button" onClick={this.successHandleClose}>Cerrar</Button>
                            <Button type="submit">Guardar</Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <Fab type="button" onClick={this.handleOpen} color="primary" sx={{
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

export default FormComponent;

// Renderizado desde un elemento personalizado, igual que tus otros formularios
let name_component = document.querySelector("form-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormComponent, name_component, props);
}
