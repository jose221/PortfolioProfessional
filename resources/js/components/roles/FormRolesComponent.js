import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import RComponent from "../RComponent";
import User from "../../models/User";

let primary_url = window.url_api + "/admin/users";

class FormComponent extends RComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,   // hereda el estado base de RComponent
            form: {},
        }
    }

    async componentDidMount() {
        this.subscribeStore();
        await this.onInit();
    }

    onInit = async () => {
        let res = await this.getItem(`${primary_url}/${this.props.id}`);
        let data = new User(res);
        this.state.form = data;
        this.dispatchStore(this.state);
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        if(this.state.form?.HistoryCurriculumVitae) delete this.state.form?.HistoryCurriculumVitae;
        if(this.state.form.validData()){
            await this.onUpdate(`${primary_url}/${this.props.id}`, this.state.form);
            this.state.isSuccess = true;
            this.dispatchStore(this.state);
        }
    };

    successHandleClose = () => {
        this.state.isSuccess = false;
        this.dispatchStore(this.state);
    }

    render() {
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
                    <DialogTitle>{"Mis nuevo rol"}</DialogTitle>
                    <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <div className="row">
                                <TextField
                                    error={this.isValid(this.state.form.key)}
                                    className="col-md-6 mt-3 p-1"
                                    id="key"
                                    label="Key"
                                    value={this.state.form.key || ' '}
                                    name="key"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el identificador del rol"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.name_es)}
                                    className="col-md-6 mt-3 p-1"
                                    id="name_es"
                                    label="Nombre del rol en español"
                                    value={this.state.form.name_es || ' '}
                                    name="name_es"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el nombre del rol en español"
                                />
                                <TextField
                                    error={this.isValid(this.state.form.name_en)}
                                    className="col-md-6 mt-3 p-1"
                                    id="name_en"
                                    label="Nombre del rol en inglés"
                                    value={this.state.form.name_en || ' '}
                                    name="name_en"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe el nombre del rol en inglés"
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
                                    error={this.isValid(this.state.form.description_es)}
                                    className="col-md-6 mt-3 p-1"
                                    id="description_es"
                                    label="Descripción en español"
                                    value={this.state.form.description_es || ' '}
                                    name="description_es"
                                    onChange={this.handleChangeForm}
                                    helperText="Escribe la descripción en español"
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

export default FormComponent;

// Renderizado desde un elemento personalizado, igual que tus otros formularios
let name_component = document.querySelector("form-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormComponent, name_component, props);
}
