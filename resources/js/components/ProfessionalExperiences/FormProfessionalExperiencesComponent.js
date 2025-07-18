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
import SunEditor from "suneditor-react";
import FormHelperText from "@mui/material/FormHelperText";
import {Autocomplete, FormControlLabel, Switch} from "@mui/material";
import Alert from "@mui/material/Alert";
let primary_url = window.url_api+"/admin/professional-experience";
class FormProfessionalExperiencesComponent extends RComponent {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore()
    }
    handleSubmit = async (e) =>{
        e.preventDefault();
        if(this.state.form.validData()){
            let params = this.state.form.item;
            if(this.state.form?.id) await this.onUpdate(`${primary_url}/${this.state.form?.id}`, params);
            else await this.onCreate(`${primary_url}`, params)

            this.state.openModal = false;
            this.state.data = await this.getItems(`${primary_url}`)
            this.state.form = new ProfessionalExperience();
            this.dispatchStore(this.state)
            //window.location.reload();
        }
        this.dispatchStore(this.state)
    }
    handleSwitchChange = (permissionType) => (event) => {
        this.state.form[permissionType] = event.target.checked;
        this.dispatchStore(this.state)
    };
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
                                    error={this.state.form?.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('company')}
                                    className="col-md-12 mt-3 p-1"
                                    id="company"
                                    label="Nombre de la empresa"
                                    value={this.state.form.company || ' '}
                                    name="company"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.company}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('country_es')}
                                    className="col-md-6 mt-3 p-1"
                                    id="country_es"
                                    label="País en español"
                                    value={this.state.form.country_es || ' '}
                                    name="country_es"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.country_es}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('country_en')}
                                    className="col-md-6 mt-3 p-1"
                                    id="country_en"
                                    label="País en inglés"
                                    value={this.state.form.country_en || ' '}
                                    name="country_en"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.country_en}
                                />
                                <div className={(this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description_es') && this.state.form.errorMessages?.description_en) ? 'col-md-6 mt-3 p-1 textarea-editor error':'col-md-6 mt-3 p-1 textarea-editor'}>
                                    <label>Descripción en español</label>
                                    <SunEditor lang="es"
                                               id="outlined-error"
                                               placeholder="Descripción en español"
                                               name="description_es"
                                               height="100%"
                                               onChange={(e)=>this.handleChangeForm({target:{name: 'description_es', value:e}})}
                                               setContents={this.state.form.description_es || ''}
                                    />
                                    <FormHelperText error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description_es') && this.state.form.errorMessages?.description_es}>{this.state.form.errorMessages?.description_es}</FormHelperText>
                                </div>
                                <div className={(this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description_en') && this.state.form.errorMessages?.description_en) ? 'col-md-6 mt-3 p-1 textarea-editor error':'col-md-6 mt-3 p-1 textarea-editor'}>
                                    <label>Descripción en inglés</label>
                                    <SunEditor lang="es"
                                               id="outlined-error"
                                               placeholder="Descripción en inglés"
                                               name="description_en"
                                               height="100%"
                                               onChange={(e)=>this.handleChangeForm({target:{name: 'description_en', value:e}})}
                                               setContents={this.state.form.description_en || ''}
                                    />
                                    <FormHelperText error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description_en') && this.state.form.errorMessages?.description_en}>{this.state.form.errorMessages?.description_en}</FormHelperText>
                                </div>
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('job_en')}
                                    className="col-md-6 mt-3 p-1"
                                    id="job_en"
                                    label="Posición en inglés"
                                    value={this.state.form.job_en || ' '}
                                    name="job_en"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.job_en}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('job_es')}
                                    className="col-md-6 mt-3 p-1"
                                    id="job_es"
                                    label="Posición en español"
                                    value={this.state.form.job_es || ' '}
                                    name="job_es"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.job_es}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('date_start')}
                                    className="col-md-6 mt-3 p-1"
                                    id="date_start"
                                    label="Fecha de inicio"
                                    value={this.state.form.date_start || ' '}
                                    name="date_start"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.date_start}
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Autocomplete
                                    multiple
                                    type="array"
                                    onChange={(event, new_value) => this.handleChangeAutocomplete(event, new_value, 'portfolio', 'multiple')}
                                    className="col-md-6 mt-3 p-1"
                                    id="portfolio"
                                    name="portfolio"
                                    options={this.state.dataAutocomplete.portfolios || []}
                                    getOptionLabel={(option) => option.code}
                                    value={this.state.form.portfolio || []}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Portafolio"
                                            placeholder="Selecciona las caráctetisticas de tu experiencia profesional"
                                        />
                                    )}
                                />
                            </div>
                            <div
                                className="col-md-6 mt-3 p-1 row"
                            >
                                <FormControlLabel
                                    className={'permission-item-list w-100'}
                                    control={
                                        <Switch
                                            checked={!!this.state.form.still_working}
                                            onChange={this.handleSwitchChange('still_working')}
                                        />
                                    }
                                    label="¿Aún trabaja?"
                                />
                                {!this.state.form.still_working && (
                                    <TextField
                                        className="mt-3 p-1 w-100"
                                        error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('date_end')}
                                        id="date_end"
                                        label="Fecha de fin"
                                        value={this.state.form.date_end || ' '}
                                        name="date_end"
                                        onChange={this.handleChangeForm}
                                        helperText={this.state.form.errorMessages?.date_end}
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                )}
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
export default FormProfessionalExperiencesComponent;
let name_component = document.querySelector("form-professional-experiences-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormProfessionalExperiencesComponent, name_component, props);
}
