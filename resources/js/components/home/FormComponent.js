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
import renderComponent from "../../utils/renderComponent";
import SunEditor from "suneditor-react";
import FormHelperText from "@mui/material/FormHelperText";
import Fab from "@mui/material/Fab";
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import SaveIcon from '@mui/icons-material/Save';


let primary_url = window.url_api+"/admin/user";

class FormHomeComponent extends RComponent {
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
            await this.onUpdate(`${primary_url}/${this.props.id}`, this.state.form.item);
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
                <Snackbar open={this.state.isSuccess} autoHideDuration={6000} onClose={this.successHandleClose}>
                    <Alert onClose={this.successHandleClose} severity="success" sx={{ width: '100%' }}>
                        {this.state.isSuccessMessage}
                    </Alert>
                </Snackbar>
                <form className="mt-2" encType="multipart/form-data" noValidate="true" onSubmit={this.handleSubmit}>
                    <Collapse in={(this.state.form.updated_at) ? true : false}>
                        <Alert className="mb-3" severity="info">Ultima actualización: {this.state.form.updated_at}</Alert>
                    </Collapse>
                    <Card className="container">
                        <CardContent>
                            <h5 className="subtitle-text pb-3 ico-r"> <PersonIcon /> Información personal </h5>
                            <div className="row">
                                <TextField
                                    error={this.isValid(this.state.form.name, true)}
                                    className="col-md-6 mt-3 p-1"
                                    id="name"
                                    label="Nombre completo"
                                    value={this.state.form.name || ' '}
                                    name="name"
                                    onChange={this.handleChangeForm}
                                    helperText="Nombre completo del administrador"
                                />
                                <TextField
                                    className="col-md-2 mt-3 p-1"
                                    error={this.isValid(this.state.form.age, false)}
                                    id="outlined-error"
                                    label="Edad"
                                    type="number"
                                    name="age"
                                    onChange={this.handleChangeForm}
                                    value={this.state.form.age || ' '}
                                    helperText="Edad del administrador"
                                />
                                <TextField
                                    className="col-md-4 mt-3 p-1"
                                    id="date"
                                    error={this.isValid(this.state.form.date_birthday, false)}
                                    label="Fecha de cumpleaños"
                                    type="date"
                                    name="date_birthday"
                                    onChange={this.handleChangeForm}
                                    value={this.state.form.date_birthday || ' '}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText="Fecha de cumpleaños del administrador"
                                />

                                <TextField
                                    className="col-md-6 mt-3 p-1"
                                    error={this.isValid(this.state.form.nationality_es, false)}
                                    id="outlined-error"
                                    label="Nacionalidad en español"
                                    name="nationality_es"
                                    onChange={this.handleChangeForm}
                                    value={this.state.form.nationality_es || ' '}
                                    helperText="Nacionalidad del administrador en español"
                                />
                                <TextField
                                    className="col-md-6 mt-3 p-1"
                                    error={this.isValid(this.state.form.nationality_en, false)}
                                    id="outlined-error"
                                    label="Nacionalidad en inglés"
                                    name="nationality_en"
                                    onChange={this.handleChangeForm}
                                    value={this.state.form.nationality_en || ' '}
                                    helperText="Nacionalidad del administrador en inglés"
                                />

                                <TextField
                                    className="col-md-6 mt-3 p-1"
                                    error={this.isValid(this.state.form.country_es, false)}
                                    id="outlined-error"
                                    label="Ciudad donde vives en español"
                                    name="country_es"
                                    onChange={this.handleChangeForm}
                                    value={this.state.form.country_es || ' '}
                                    helperText="Ciudad donde vives actualmente en español"
                                />

                                <TextField
                                    className="col-md-6 mt-3 p-1"
                                    error={this.isValid(this.state.form.country_en, false)}
                                    id="outlined-error"
                                    label="Ciudad donde vives en inglés"
                                    name="country_en"
                                    onChange={this.handleChangeForm}
                                    value={this.state.form.country_en || ' '}
                                    helperText="Ciudad donde vives actualmente en inglés"
                                />

                                <div className={(!this.isValid(this.state.form.description_es, false)) ? 'col-md-6 mt-3 p-1 textarea-editor':'col-md-6 mt-3 p-1 textarea-editor error'}>
                                    <label>Descripción en español</label>
                                    <SunEditor lang="es"
                                               id="outlined-error"
                                               placeholder="Descripción en español"
                                               name="description_es"
                                               height="100%"
                                               onChange={(e)=>this.handleChangeForm({target:{name: 'description_es', value:e}})}
                                               setContents={this.state.form.description_es || ' '}
                                               helperText="Descripción de tu perfil en español"
                                    />
                                    <FormHelperText error={this.isValid(this.state.form.description_es, false)}>Descripción de tu perfil en español</FormHelperText>
                                </div>
                                <div className={(!this.isValid(this.state.form.description_en, false)) ? 'col-md-6 mt-3 p-1 textarea-editor':'col-md-6 mt-3 p-1 textarea-editor error'}>
                                    <label>Descripción en inglés</label>
                                    <SunEditor lang="es"
                                               id="outlined-error"
                                               placeholder="Descripción en inglés"
                                               name="description_en"
                                               height="100%"
                                               onChange={(e)=>this.handleChangeForm({target:{name: 'description_en', value:e}})}
                                               setContents={this.state.form.description_en || ' '}
                                               helperText="Descripción de tu perfil en inglés"
                                    />
                                    <FormHelperText error={this.isValid(this.state.form.description_en, false)}>Descripción de tu perfil en inglés</FormHelperText>
                                </div>

                                <TextField
                                    className="col-md-6 mt-3 p-1"
                                    error={this.isValid(this.state.form.header_text_es, false)}
                                    id="outlined-error"
                                    label="Texto o descripción del header en Español"
                                    name="header_text_es"
                                    onChange={this.handleChangeForm}
                                    value={this.state.form.header_text_es || ' '}
                                    helperText="Texto o descripción del header en Español"
                                />
                                <TextField
                                    className="col-md-6 mt-3 p-1"
                                    id="outlined-error"
                                    label="Texto o descripción del header en Inglés"
                                    name="header_text_en"
                                    onChange={this.handleChangeForm}
                                    error={this.isValid(this.state.form.header_text_en, false)}
                                    value={this.state.form.header_text_en || ' '}
                                    helperText="Texto o descripción del header en Inglés"
                                />

                                <Fab type="submit" color="primary" sx={{
                                    position: "fixed",
                                    bottom: (theme) => theme.spacing(2),
                                    right: (theme) => theme.spacing(2)
                                }} aria-label="add">
                                    <SaveIcon />

                                </Fab>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-3 p-2">
                        <CardContent>
                            <h5 className="subtitle-text pb-3 ico-r"> <SwitchAccountIcon /> Multimedia informativa </h5>
                            <div className="row">
                                <div className="col-md-3 ">
                                    <div className="img-action">
                                        <img id="image-logo" src={this.loadImage(this.state.form.logo, "#image-logo")} />
                                        <Button className="btn-action" variant="contained" component="label">
                                            Subir imagen
                                            <input onChange={this.handleChangeForm} hidden accept="image/*" multiple type="file"
                                                   id="logo" name="logo"/>
                                        </Button>
                                    </div>
                                    <p className="description-img">Imagen del logo</p>
                                </div>
                                <div className="col-md-3 ">
                                    <div className={(!this.state.form.avatar) ? 'img-action -is-empty': 'img-action'}>
                                        <img id="image-avatar" src={this.loadImage(this.state.form.avatar, "#image-avatar")}  alt="Imagen del avatar" />
                                        <Button className="btn-action" variant="contained" component="label">
                                            Subir imagen
                                            <input hidden  onChange={this.handleChangeForm} accept="image/*" multiple type="file"
                                                   id="avatar" name="avatar"/>
                                        </Button>
                                    </div>
                                    <p className="description-img">Imagen del avatar</p>
                                </div>
                                <div className="col-md-3 ">
                                    <div className="img-action">
                                        <img id="image-slogan_en" src={this.loadImage(this.state.form.slogan_en, "#image-slogan_en")}  alt="Imagen del logo con Eslogan en Inglés" />
                                        <Button className="btn-action" variant="contained" component="label">
                                            Subir imagen
                                            <input onChange={this.handleChangeForm} hidden accept="image/*" multiple type="file"
                                                   id="logo" name="slogan_en"/>
                                        </Button>
                                    </div>
                                    <p className="description-img">Imagen del logo con Eslogan en Inglés</p>
                                </div>
                                <div className="col-md-3 ">
                                    <div className="img-action">
                                        <img id="image-slogan_es" src={this.loadImage(this.state.form.slogan_es, "#image-slogan_es")}  alt="Imagen del logo con Eslogan en Español" />
                                        <Button className="btn-action" variant="contained" component="label">
                                            Subir imagen
                                            <input onChange={this.handleChangeForm} hidden accept="image/*" multiple type="file"
                                                   id="logo" name="slogan_es"/>
                                        </Button>
                                    </div>
                                    <p className="description-img">Imagen del logo con Eslogan en Español</p>
                                </div>
                                <div className="col-md-3 ">
                                    <div className="img-action">
                                        <img id="image-my_perfil" src={this.loadImage(this.state.form.my_perfil, "#image-my_perfil")}  alt="Foto de Perfil" />
                                        <Button className="btn-action" variant="contained" component="label">
                                            Subir imagen
                                            <input onChange={this.handleChangeForm} hidden accept="image/*" multiple type="file"
                                                   id="logo" name="my_perfil"/>
                                        </Button>
                                    </div>
                                    <p className="description-img">Foto de Perfil</p>
                                </div>
                                <div className="col-md-3 ">
                                    <div className="img-action">
                                        <img id="image-header_image_path" src={this.loadImage(this.state.form.header_image_path, "#image-header_image_path")} alt="Foto de header" />
                                        <Button className="btn-action" variant="contained" component="label">
                                            Subir imagen
                                            <input onChange={this.handleChangeForm} hidden accept="image/*" multiple type="file"
                                                   id="logo" name="header_image_path"/>
                                        </Button>
                                    </div>
                                    <p className="description-img">Imagen se
                                        mostrará en el header</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        );
    }
}

export default FormHomeComponent;

// Renderizado desde un elemento personalizado, igual que tus otros formularios
let name_component = document.querySelector("form-home-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormHomeComponent, name_component, props);
}
