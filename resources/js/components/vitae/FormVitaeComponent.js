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
import Vitae from "../../models/Vitae";


import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import {MenuItem} from "@mui/material";

let primary_url = window.url_api+"/admin/history-curriculum-vitae";
let title_action = "Mis curriculums";

class FormVitaeComponent extends RComponent {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore()
    }
    handleSubmit = async (e) =>{
        e.preventDefault();
        if(this.state.form.User) delete this.state.form.User;
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
        const validateFile = (path, archive_type)=>{
            let archive = <ArticleIcon className="upload-file" color="primary" />;
            if(archive_type && path){
                switch (archive_type.toLowerCase()){
                    case "pdf":
                        archive = <PictureAsPdfIcon className="upload-file"  color="error" />
                        break;
                    case "image":
                        archive = <ImageIcon className="upload-file" color="success" />;
                        break;
                }
            }else{
                if(!path) archive = "";
            }
            return archive;
        }
        const handleClose = () => {
            this.state.openModal = false;
            this.dispatchStore(this.state)
        };
        const handleOpen = () => {
            this.state.form = new Vitae();
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
                    <DialogTitle>{title_action}</DialogTitle>
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <div className="row">
                                <TextField
                                    error={this.isValid(this.state.form.archive_name)}
                                    className="col-md-6 mt-3 p-1"
                                    id="archive_name"
                                    label="Nombre del archivo"
                                    value={this.state.form.archive_name || ' '}
                                    name="archive_name"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el nombre del archivo"
                                />
                                <div className="col-md-6 mt-3 p-1">
                                    <Select
                                        error={this.isValid(this.state.form.archive_type)}
                                        id="archive_type"
                                        className="w-100"
                                        label="Tipo de archivo"
                                        value={this.state.form.archive_type || ' '}
                                        name="archive_type"
                                        type="select"
                                        onChange={this.handleChangeForm}
                                    >
                                        <MenuItem value=" ">
                                            Tipo de archivo
                                        </MenuItem>
                                        <MenuItem value={'PDF'}>Archivo PDF</MenuItem>
                                        <MenuItem value={'DOC'}>Archivo DOC</MenuItem>
                                        <MenuItem value={'PICTURE'}>Archivo Imagen</MenuItem>
                                    </Select>
                                    <FormHelperText error={this.isValid(this.state.form.archive_type)}>Escribe el tipo de archivo</FormHelperText>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <div className={this.state.form.path ? 'img-action' : 'img-action -is-empty'}>
                                        {validateFile(this.state.form.path,this.state.form.archive_type)}
                                        <Button className="btn-action" variant="contained" component="label">
                                            Subir imagen
                                            <input onChange={this.handleChange} hidden accept="application/msword, text/plain, application/pdf" multiple type="file"
                                                   id="path" name="path"/>
                                        </Button>
                                    </div>
                                    <p className="description-img">Subir archivo</p>
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
export default FormVitaeComponent;
let name_component = document.querySelector("form-vitae-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    ReactDOM.render(<FormVitaeComponent {...props} />, name_component);
}
