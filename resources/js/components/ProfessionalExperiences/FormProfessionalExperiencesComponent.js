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
import KnowLedge from "../../models/KnowLedge";
import ProfessionalExperience from "../../models/ProfessionalExperience";
class FormProfessionalExperiencesComponent extends RComponent {
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
            if(this.state.form?.id) await this.onUpdate(`/api/admin/experience/professional/edit/${this.state.form?.id}`, this.state.form);
            else await this.onCreate("/api/admin/experience/professional/create", this.state.form)
            this.state.openModal = false;
            this.state.data = await this.getItems(`/api/admin/experience/professional/${this.props.user_id}`)
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
            this.state.form = new ProfessionalExperience();
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
                    <DialogTitle>{"Mi conocimiento"}</DialogTitle>
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <div className="row">
                                <TextField
                                    error={this.isValid(this.state.form.company)}
                                    className="col-md-6 mt-3 p-1"
                                    id="company"
                                    label="Nombre de la empresa"
                                    value={this.state.form.company || ' '}
                                    name="company"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el nombre de la empresa"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.country_es)}
                                    className="col-md-6 mt-3 p-1"
                                    id="country_es"
                                    label="País en español"
                                    value={this.state.form.country_es || ' '}
                                    name="country_es"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el país en español"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.country_en)}
                                    className="col-md-6 mt-3 p-1"
                                    id="country_en"
                                    label="País en inglés"
                                    value={this.state.form.country_en || ' '}
                                    name="country_en"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el país en inglés"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.description_es)}
                                    className="col-md-6 mt-3 p-1"
                                    id="description_es"
                                    label="Descripción en español"
                                    value={this.state.form.description_es || ' '}
                                    name="description_es"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe la descripción en español"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.description_en)}
                                    className="col-md-6 mt-3 p-1"
                                    id="description_en"
                                    label="Descripción en inglés"
                                    value={this.state.form.description_en || ' '}
                                    name="description_en"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe la descripción en inglés"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.job_en)}
                                    className="col-md-6 mt-3 p-1"
                                    id="job_en"
                                    label="Posición en inglés"
                                    value={this.state.form.job_en || ' '}
                                    name="job_en"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe la posición en inglés"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.job_es)}
                                    className="col-md-6 mt-3 p-1"
                                    id="job_es"
                                    label="Posición en español"
                                    value={this.state.form.job_es || ' '}
                                    name="job_es"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe la posición en español"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.date_start)}
                                    className="col-md-6 mt-3 p-1"
                                    id="date_start"
                                    label="Fecha de inicio"
                                    value={this.state.form.date_start || ' '}
                                    name="date_start"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe la fecha de inicio"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.date_end)}
                                    className="col-md-6 mt-3 p-1"
                                    id="date_end"
                                    label="Fecha de fin"
                                    value={this.state.form.date_end || ' '}
                                    name="date_end"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe la fecha de fin"
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-3 ">
                                    <div className="img-action">
                                        <img id="image-path" src={this.loadImage(this.state.form.image_path, "#image-path")} />
                                        <Button className="btn-action" variant="contained" component="label">
                                            Subir imagen
                                            <input onChange={this.handleChange} hidden accept="image/*" multiple type="file"
                                                   id="image_path" name="image_path"/>
                                        </Button>
                                    </div>
                                    <p className="description-img">Imagen</p>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button type="button" onClick={handleClose}>Cerrar</Button>
                            <Button type="submit" onClick={this.handleSubmit}>Guardar</Button>
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
export default FormProfessionalExperiencesComponent;
let name_component = document.querySelector("form-professional-experiences-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    ReactDOM.render(<FormProfessionalExperiencesComponent {...props} />, name_component);
}
