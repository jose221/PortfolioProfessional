import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import RComponent from "../../RComponent";
import ReactDOM from "react-dom";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import PortfolioCategory from "../../../models/PortfolioCategory";
import SunEditor from "suneditor-react";
import FormHelperText from "@mui/material/FormHelperText";


let primary_url = window.url_api+"/admin/portfolio-categories";
class FormPortfolioCategoriesComponent extends RComponent {
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
            this.state.form = new PortfolioCategory();
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
                    <DialogTitle>{"Categoría del portafolio"}</DialogTitle>
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <div className="row">
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('title_es')}
                                    className="col-md-6 mt-3 p-1"
                                    id="title_es"
                                    label="Titulo en español"
                                    value={this.state.form.title_es || ' '}
                                    name="title_es"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.title_es}
                                />
                                <TextField
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('title_en')}
                                    className="col-md-6 mt-3 p-1"
                                    id="title_en"
                                    label="Titulo en inglés"
                                    value={this.state.form.title_en || ' '}
                                    name="title_en"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.title_en}
                                />
                                <div className={(this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description_es')) ? 'col-md-6 mt-3 p-1 textarea-editor error':'col-md-6 mt-3 p-1 textarea-editor'}>
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
                                <div className={(this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description_en')) ? 'col-md-6 mt-3 p-1 textarea-editor error':'col-md-6 mt-3 p-1 textarea-editor'}>
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
                                    error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('code')}
                                    className="col-md-6 mt-3 p-1"
                                    id="code"
                                    label="Código"
                                    value={this.state.form.code || ' '}
                                    name="code"
                                    onChange={this.handleChangeForm}
                                    helperText={this.state.form.errorMessages?.code}
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
export default FormPortfolioCategoriesComponent;
let name_component = document.querySelector("form-portfolio-categories-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormPortfolioCategoriesComponent, name_component, props);
}
