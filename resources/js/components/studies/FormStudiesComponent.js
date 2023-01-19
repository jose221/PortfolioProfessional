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
import Study from "../../models/Study";

let primary_url = "http://localhost:8080/api/admin/studies";
class FormStudiesComponent extends RComponent {
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
            this.state.form = new Study();
            this.state.form.user_id = this.props.user_id;
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
                    <DialogTitle>{"Mis nuevo estudio"}</DialogTitle>
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <div className="row">
                                <TextField
                                    error={this.isValid(this.state.form.folio)}
                                    className="col-md-6 mt-3 p-1"
                                    id="folio"
                                    label="Folio"
                                    value={this.state.form.folio || ' '}
                                    name="folio"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el folio o la cedula profesional"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.caerrer_es)}
                                    className="col-md-6 mt-3 p-1"
                                    id="caerrer_es"
                                    label="Nombre de la carrera en español"
                                    value={this.state.form.caerrer_es || ' '}
                                    name="caerrer_es"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el nombre de la carrera en español"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.caerrer_en)}
                                    className="col-md-6 mt-3 p-1"
                                    id="caerrer_en"
                                    label="Nombre de la carrera en inglés"
                                    value={this.state.form.caerrer_en || ' '}
                                    name="caerrer_en"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el nombre de la carrera en inglés"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.school_en)}
                                    className="col-md-6 mt-3 p-1"
                                    id="school_en"
                                    label="Escuela en inglés"
                                    value={this.state.form.school_en || ' '}
                                    name="school_en"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe la escuela en inglés"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.school_es)}
                                    className="col-md-6 mt-3 p-1"
                                    id="school_es"
                                    label="Escuela en español"
                                    value={this.state.form.school_es || ' '}
                                    name="school_es"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe la escuela en español"
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
export default FormStudiesComponent;
let name_component = document.querySelector("form-studies-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    ReactDOM.render(<FormStudiesComponent {...props} />, name_component);
}
