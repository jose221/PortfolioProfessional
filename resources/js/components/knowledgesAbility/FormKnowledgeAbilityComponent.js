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
class FormKnowledgeAbilityComponent extends RComponent {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore()
    }
    handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(this.state.form.validData())
        if(this.state.form.validData()){
            if(this.state.form?.id) await this.onUpdate(`/api/admin/knowledges/abilities/edit/${this.state.form?.id}`, this.state.form);
            else await this.onCreate("/api/admin/knowledges/abilities/create", this.state.form)
            this.state.openModal = false;
            this.state.data = await this.getItems(`/api/admin/knowledges/abilities/${this.props.id}`)
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
                                    error={this.isValid(this.state.form.title_es)}
                                    className="col-md-6 mt-3 p-1"
                                    id="title_es"
                                    label="Titulo en español"
                                    value={this.state.form.title_es || ' '}
                                    name="title_es"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el titulo en español"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.title_en)}
                                    className="col-md-6 mt-3 p-1"
                                    id="title_en"
                                    label="Titulo en inglés"
                                    value={this.state.form.title_en || ' '}
                                    name="title_en"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el titulo en inglés"
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
    ReactDOM.render(<FormKnowledgeAbilityComponent {...props} />, name_component);
}
