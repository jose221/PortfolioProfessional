import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import RComponent from "../RComponent";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import TokenPublicAPIUser from "../../models/TokenPublicAPIUser";

let primary_url = window.url_api+"/admin/token-public-api-user";
class FormTokenPublicAPIUserComponent extends RComponent {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore()
    }
    handleSubmit = async (e) =>{
        e.preventDefault();
        this.state.form.user_id = this.props.user_id;
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
            console.log( this.props)
            this.state.form = new TokenPublicAPIUser();
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
                                    error={this.isValid(this.state.form.mode)}
                                    className="col-md-6 mt-3 p-1"
                                    id="mode"
                                    label="Modo de desarrollo"
                                    value={this.state.form.mode || ' '}
                                    name="mode"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el modo de ambiente (development, production, etc)"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.domain)}
                                    className="col-md-6 mt-3 p-1"
                                    id="domain"
                                    label="Dominio"
                                    value={this.state.form.domain || ' '}
                                    name="domain"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el dominio al que pertenece el proyecto"
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
export default FormTokenPublicAPIUserComponent;
let name_component = document.querySelector("form-token-public-api-user-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormTokenPublicAPIUserComponent, name_component, props);
}
