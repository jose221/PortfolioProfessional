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
import KnowLedgeAbility from "../../models/KnowLedgeAbility";
import SunEditor from "suneditor-react";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import AIEditButton from "../vitae/editor/components/common/AIEditButton";
let primary_url = window.url_api+"/admin/knowledges-abilities";
class FormKnowledgeAbilityComponent extends RComponent {
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
        }
        else{
            this.dispatchStore(this.state)
        }
    }
    handleAIResponse = (response, key) => {
        if (this.state.form[key]) {
            const newDescription = response.data?.current ?? data[key] ?? '';
            this.handleChangeForm({target:{name: key, value:newDescription}})
        }
    };
    render() {

        const handleClose = () => {
            this.state.openModal = false;
            this.dispatchStore(this.state)
        };
        const handleOpen = () => {
            this.state.form = new KnowLedgeAbility();
            this.state.form.knowledges_id = this.props.id;
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
                    onClose={this.handleSubmit}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Mi conocimiento"}</DialogTitle>
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
                                               height="200px"
                                               onChange={(e)=>this.handleChangeForm({target:{name: 'description_es', value:e}})}
                                               setContents={this.state.form.description_es || ''}
                                               setOptions={{
                                                   buttonList: [
                                                       ['undo', 'redo'],
                                                       ['font', 'fontSize', 'formatBlock'],
                                                       ['bold', 'underline', 'italic', 'strike'],
                                                       ['fontColor', 'hiliteColor'],
                                                       ['removeFormat'],
                                                       ['outdent', 'indent'],
                                                       ['align', 'horizontalRule', 'list'],
                                                       ['table', 'link'],
                                                       ['fullScreen', 'showBlocks', 'codeView']
                                                   ]
                                               }}
                                    />
                                    <FormHelperText error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description_es') && this.state.form.errorMessages?.description_es}>{this.state.form.errorMessages?.description_es}</FormHelperText>
                                    {(
                                            this.state.form.validateRequiredAttribute && this.state.form?.validateRequiredAttribute('description_es')) &&
                                        this.state.form?.validateRequiredAttribute('title_es') &&
                                        (<Box sx={{ position: 'absolute', bottom: 35, right: 8, zIndex: 10 }}>
                                            <AIEditButton
                                                lang={'es'}
                                                attribute={`description_es`}
                                                content={this.state.form.description_es || ''}
                                                title={this.state.form.header_text_es || ''}
                                                onAIResponse={(response) => this.handleAIResponse(response, 'description_es')}
                                            />
                                        </Box>)}
                                </div>
                                <div className={(this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description_en')) ? 'col-md-6 mt-3 p-1 textarea-editor error':'col-md-6 mt-3 p-1 textarea-editor position-relative'}>
                                    <label>Descripción en inglés</label>
                                    <SunEditor lang="es"
                                               id="outlined-error"
                                               placeholder="Descripción en inglés"
                                               name="description_en"
                                               height="200px"
                                               onChange={(e)=>this.handleChangeForm({target:{name: 'description_en', value:e}})}
                                               setContents={this.state.form.description_en || ''}
                                               setOptions={{
                                                   buttonList: [
                                                       ['undo', 'redo'],
                                                       ['font', 'fontSize', 'formatBlock'],
                                                       ['bold', 'underline', 'italic', 'strike'],
                                                       ['fontColor', 'hiliteColor'],
                                                       ['removeFormat'],
                                                       ['outdent', 'indent'],
                                                       ['align', 'horizontalRule', 'list'],
                                                       ['table', 'link'],
                                                       ['fullScreen', 'showBlocks', 'codeView']
                                                   ]
                                               }}
                                    />
                                    {(
                                            this.state.form.validateRequiredAttribute &&
                                            this.state.form?.validateRequiredAttribute('description_en')) &&
                                        this.state.form?.validateRequiredAttribute('title_en') &&
                                        (<Box sx={{ position: 'absolute', bottom: 35, right: 8, zIndex: 10 }}>
                                            <AIEditButton
                                                lang={'en'}
                                                attribute={`description_en`}
                                                content={this.state.form.description_en || ''}
                                                title={this.state.form.title_en || ''}
                                                onAIResponse={(response) => this.handleAIResponse(response, 'description_en')}
                                            />
                                        </Box>)}
                                    <FormHelperText error={this.state.form.validateRequiredAttribute && !this.state.form?.validateRequiredAttribute('description_en') && this.state.form.errorMessages?.description_en}>{this.state.form.errorMessages?.description_en}</FormHelperText>
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
export default FormKnowledgeAbilityComponent;
let name_component = document.querySelector("form-knowledges-ability-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormKnowledgeAbilityComponent, name_component, props);
}
