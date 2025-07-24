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
import SunEditor from "suneditor-react";
import FormHelperText from "@mui/material/FormHelperText";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Certification from "../../models/Certification";

let primary_url = window.url_api+"/admin/certifications";
class FormCertificationsComponent extends RComponent {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore()
    }
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
    render() {

        const handleClose = () => {
            this.state.openModal = false;
            this.dispatchStore(this.state)
        };
        const handleOpen = () => {
            this.state.form = new Certification();
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
                    <DialogTitle>{"Mi certificación"}</DialogTitle>
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <div className="row">
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('name')}
                                    className="col-md-6 mt-3 p-1"
                                    id="name"
                                    label="Nombre de la certificación"
                                    value={this.state.form.name || ''}
                                    name="name"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.name}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('category')}
                                    className="col-md-6 mt-3 p-1"
                                    id="category"
                                    label="Categoría"
                                    value={this.state.form.category || ''}
                                    name="category"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.category}
                                />
                            </div>
                            <div className="row">
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('issuing_organization')}
                                    className="col-md-6 mt-3 p-1"
                                    id="issuing_organization"
                                    label="Organización emisora"
                                    value={this.state.form.issuing_organization || ''}
                                    name="issuing_organization"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.issuing_organization}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('credential_id')}
                                    className="col-md-6 mt-3 p-1"
                                    id="credential_id"
                                    label="ID de credencial"
                                    value={this.state.form.credential_id || ''}
                                    name="credential_id"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.credential_id}
                                />
                            </div>
                            <div className="row">
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('credential_url')}
                                    className="col-md-12 mt-3 p-1"
                                    id="credential_url"
                                    label="URL de credencial"
                                    type="url"
                                    value={this.state.form.credential_url || ''}
                                    name="credential_url"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.credential_url}
                                />
                            </div>
                            <div className="row">
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('issue_date')}
                                    className="col-md-6 mt-3 p-1"
                                    id="issue_date"
                                    label="Fecha de emisión"
                                    type="date"
                                    value={this.state.form.issue_date || ''}
                                    name="issue_date"
                                    onChange={this.handleChangeForm}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText={this.state.form.errorMessages?.issue_date}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('expiration_date')}
                                    className="col-md-6 mt-3 p-1"
                                    id="expiration_date"
                                    label="Fecha de expiración"
                                    type="date"
                                    value={this.state.form.expiration_date || ''}
                                    name="expiration_date"
                                    onChange={this.handleChangeForm}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText={this.state.form.errorMessages?.expiration_date}
                                />
                            </div>
                            <div className="row">
                                <FormControl className="col-md-6 mt-3 p-1">
                                    <InputLabel id="status-label">Estado</InputLabel>
                                    <Select
                                        error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('status')}
                                        labelId="status-label"
                                        id="status"
                                        value={this.state.form.status || 'active'}
                                        name="status"
                                        label="Estado"
                                        onChange={this.handleChangeForm}
                                    >
                                        <MenuItem value="active">Activo</MenuItem>
                                        <MenuItem value="expired">Expirado</MenuItem>
                                        <MenuItem value="revoked">Revocado</MenuItem>
                                        <MenuItem value="pending">Pendiente</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className="col-md-6 mt-3 p-1 d-flex align-items-center">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.form.renewal_required || false}
                                                onChange={(e) => this.handleChangeForm({
                                                    target: {
                                                        name: 'renewal_required',
                                                        value: e.target.checked
                                                    }
                                                })}
                                                name="renewal_required"
                                            />
                                        }
                                        label="Renovación requerida"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className={(this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description')) ? 'col-md-12 mt-3 p-1 textarea-editor error':'col-md-12 mt-3 p-1 textarea-editor'}>
                                    <label>Descripción</label>
                                    <SunEditor lang="es"
                                               id="outlined-error"
                                               placeholder="Descripción de la certificación"
                                               name="description"
                                               height="200px"
                                               onChange={(e)=>this.handleChangeForm({target:{name: 'description', value:e}})}
                                               setContents={this.state.form.description || ''}
                                    />
                                    <FormHelperText error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description') && this.state.form.errorMessages?.description}>{this.state.form.errorMessages?.description}</FormHelperText>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 ">
                                    <div className="img-action">
                                        <img id="image-certification" src={this.loadImage(this.state.form.image_path, "#image-certification")} />
                                        <Button className="btn-action" variant="contained" component="label">
                                            Subir imagen
                                            <input onChange={this.handleChange} hidden accept="image/*" multiple type="file"
                                                   id="image_path" name="image_path"/>
                                        </Button>
                                    </div>
                                    <p className="description-img">Imagen de la certificación</p>
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
export default FormCertificationsComponent;
let name_component = document.querySelector("form-certifications-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormCertificationsComponent, name_component, props);
}
