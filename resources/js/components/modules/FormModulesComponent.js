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
import Module from "../../models/Module";
import {FormControlLabel, Switch} from "@mui/material";

let primary_url = window.url_api+"/admin/modules";
class FormModulesComponent extends RComponent {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore()
    }
    handleSwitchChange = (attributeForm) => (event) => {
        this.state.form[attributeForm] = event.target.checked;
        this.dispatchStore(this.state)
    };
    handleSubmit = async (e) =>{
        e.preventDefault();
        if(this.state.form.validData()){
            if(this.state.form?.id) await this.onUpdate(`${primary_url}/${this.state.form?.id}`, this.state.form.item);
            else await this.onCreate(`${primary_url}`, this.state.form.item)
            this.state.openModal = false;
            this.state.data = await this.getItems(`${primary_url}`)
            this.dispatchStore(this.state)
            //window.location.reload();
        }else{
            this.dispatchStore(this.state)
        }
    }
    render(){

        const handleClose = () => {
            this.state.openModal = false;
            this.dispatchStore(this.state)
        };
        const handleOpen = () => {
            this.state.form = new Module();
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
                    <DialogTitle>{"Mis nuevo Módulo"}</DialogTitle>
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <div className="row">
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('path')}
                                    error={this.isValid(this.state.form.path)}
                                    className="col-md-8 mt-3 p-1"
                                    id="path"
                                    label="Path"
                                    value={this.state.form.path || ' '}
                                    name="path"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.path}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('tag')}
                                    className="col-md-4 mt-3 p-1"
                                    id="tag"
                                    label="Etiqueta"
                                    value={this.state.form.tag || ' '}
                                    name="tag"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.tag}
                                />
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
                                    label="Nombre del Módulo en español"
                                    value={this.state.form.name_es || ' '}
                                    name="name_es"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.name_es}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('name_en')}
                                    className="col-md-6 mt-3 p-1"
                                    id="name_en"
                                    label="Nombre del Módulo en inglés"
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
                            <FormControlLabel
                                className={'permission-item-list'}
                                control={
                                    <Switch
                                        checked={!!this.state.form.hidden}
                                        onChange={this.handleSwitchChange('hidden')}
                                    />
                                }
                                label="Oculto"
                            />
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
export default FormModulesComponent;
let name_component = document.querySelector("form-modules-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormModulesComponent, name_component, props);
}
