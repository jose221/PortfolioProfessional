import React, { useEffect } from 'react';
import renderComponent from '../../utils/renderComponent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Collapse from '@mui/material/Collapse';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import PersonIcon from '@mui/icons-material/Person';
import User from "../../models/User";
import SunEditor from 'suneditor-react';
import FormHelperText from "@mui/material/FormHelperText";
import { useRComponent } from "../../hooks/useRComponent";

let primary_url = window.url_api+"/admin/user";

const FormComponent = (props) => {
    const {
        state,
        setState,
        handleChange,
        handleChangeForm,
        loadImage,
        successHandleClose,
        getItem,
        onUpdate,
        isValid
    } = useRComponent({
        form: {}
    });

    useEffect(() => {
        const fetchData = async () => {
            let res = await getItem(`${primary_url}/${props.id}`);
            let data = new User(res);
            setState(prevState => ({ ...prevState, form: data }));
        };

        fetchData();
    }, [props.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(state.form?.HistoryCurriculumVitae) delete state.form?.HistoryCurriculumVitae;
        if(state.form.validData()){
            await onUpdate(`${primary_url}/${props.id}`, state.form);
        }
    };

    return (
        <div>
            <Snackbar open={state.isSuccess} autoHideDuration={6000} onClose={successHandleClose}>
                <Alert onClose={successHandleClose} severity="success" sx={{ width: '100%' }}>
                    {state.isSuccessMessage}
                </Alert>
            </Snackbar>
            <form className="mt-2" encType="multipart/form-data" noValidate="true" onSubmit={handleSubmit}>
                <Collapse in={(state.form.updated_at) ? true : false}>
                    <Alert className="mb-3" severity="info">Ultima actualización: {state.form.updated_at}</Alert>
                </Collapse>
                <Card className="container">
                    <CardContent>
                        <h5 className="subtitle-text pb-3 ico-r"> <PersonIcon /> Información personal </h5>
                        <div className="row">
                            <TextField
                                error={isValid(state.form.name)}
                                className="col-md-6 mt-3 p-1"
                                id="name"
                                label="Nombre completo"
                                value={state.form.name || ' '}
                                name="name"
                                onChange={handleChange}
                                helperText="Nombre completo del administrador"
                            />
                            <TextField
                                className="col-md-2 mt-3 p-1"
                                error={isValid(state.form.age)}
                                id="outlined-error"
                                label="Edad"
                                type="number"
                                name="age"
                                onChange={handleChange}
                                value={state.form.age || ' '}
                                helperText="Edad del administrador"
                            />
                            <TextField
                                className="col-md-4 mt-3 p-1"
                                id="date"
                                error={isValid(state.form.date_birthday)}
                                label="Fecha de cumpleaños"
                                type="date"
                                name="date_birthday"
                                onChange={handleChange}
                                value={state.form.date_birthday || ' '}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText="Fecha de cumpleaños del administrador"
                            />

                            <TextField
                                className="col-md-6 mt-3 p-1"
                                error={isValid(state.form.nationality_es)}
                                id="outlined-error"
                                label="Nacionalidad en español"
                                name="nationality_es"
                                onChange={handleChange}
                                value={state.form.nationality_es || ' '}
                                helperText="Nacionalidad del administrador en español"
                            />
                            <TextField
                                className="col-md-6 mt-3 p-1"
                                error={isValid(state.form.nationality_en)}
                                id="outlined-error"
                                label="Nacionalidad en inglés"
                                name="nationality_en"
                                onChange={handleChange}
                                value={state.form.nationality_en || ' '}
                                helperText="Nacionalidad del administrador en inglés"
                            />

                            <TextField
                                className="col-md-6 mt-3 p-1"
                                error={isValid(state.form.country_es)}
                                id="outlined-error"
                                label="Ciudad donde vives en español"
                                name="country_es"
                                onChange={handleChange}
                                value={state.form.country_es || ' '}
                                helperText="Ciudad donde vives actualmente en español"
                            />

                            <TextField
                                className="col-md-6 mt-3 p-1"
                                error={isValid(state.form.country_en)}
                                id="outlined-error"
                                label="Ciudad donde vives en inglés"
                                name="country_en"
                                onChange={handleChange}
                                value={state.form.country_en || ' '}
                                helperText="Ciudad donde vives actualmente en inglés"
                            />

                            <div className={(!isValid(state.form.description_es)) ? 'col-md-6 mt-3 p-1 textarea-editor':'col-md-6 mt-3 p-1 textarea-editor error'}>
                                <label>Descripción en español</label>
                                <SunEditor lang="es"
                                           id="outlined-error"
                                           placeholder="Descripción en español"
                                           name="description_es"
                                           height="100%"
                                           onChange={(e)=>handleChangeForm({target:{name: 'description_es', value:e}})}
                                           setContents={state.form.description_es || ''}
                                           helperText="Descripción de tu perfil en español"
                                />
                                <FormHelperText error={isValid(state.form.description_es)}>Descripción de tu perfil en español</FormHelperText>
                            </div>
                            <div className={(!isValid(state.form.description_en)) ? 'col-md-6 mt-3 p-1 textarea-editor':'col-md-6 mt-3 p-1 textarea-editor error'}>
                                <label>Descripción en inglés</label>
                                <SunEditor lang="es"
                                           id="outlined-error"
                                           placeholder="Descripción en inglés"
                                           name="description_en"
                                           height="100%"
                                           onChange={(e)=>handleChangeForm({target:{name: 'description_en', value:e}})}
                                           setContents={state.form.description_en || ''}
                                           helperText="Descripción de tu perfil en inglés"
                                />
                                <FormHelperText error={isValid(state.form.description_en)}>Descripción de tu perfil en inglés</FormHelperText>
                            </div>

                            <TextField
                                className="col-md-6 mt-3 p-1"
                                error={isValid(state.form.header_text_es)}
                                id="outlined-error"
                                label="Texto o descripción del header en Español"
                                name="header_text_es"
                                onChange={handleChange}
                                value={state.form.header_text_es || ' '}
                                helperText="Texto o descripción del header en Español"
                            />
                            <TextField
                                className="col-md-6 mt-3 p-1"
                                id="outlined-error"
                                label="Texto o descripción del header en Inglés"
                                name="header_text_en"
                                onChange={handleChange}
                                error={isValid(state.form.header_text_en)}
                                value={state.form.header_text_en || ' '}
                                helperText="Texto o descripción del header en Inglés"
                            />

                            <Fab type="submit" color="primary" sx={{
                                position: "fixed",
                                bottom: (theme) => theme.spacing(2),
                                right: (theme) => theme.spacing(2)
                            }} aria-label="add">
                                <SaveIcon/>
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
                                    <img id="image-logo" src={loadImage(state.form.logo, "#image-logo")} />
                                    <Button className="btn-action" variant="contained" component="label">
                                        Subir imagen
                                        <input onChange={handleChange} hidden accept="image/*" multiple type="file"
                                               id="logo" name="logo"/>
                                    </Button>
                                </div>
                                <p className="description-img">Imagen del logo</p>
                            </div>
                            <div className="col-md-3 ">
                                <div className={(!state.form.avatar) ? 'img-action -is-empty': 'img-action'}>
                                    <img id="image-avatar" src={loadImage(state.form.avatar, "#image-avatar")}  alt="Imagen del avatar" />
                                    <Button className="btn-action" variant="contained" component="label">
                                        Subir imagen
                                        <input hidden  onChange={handleChange} accept="image/*" multiple type="file"
                                               id="avatar" name="avatar"/>
                                    </Button>
                                </div>
                                <p className="description-img">Imagen del avatar</p>
                            </div>
                            <div className="col-md-3 ">
                                <div className="img-action">
                                    <img id="image-slogan_en" src={loadImage(state.form.slogan_en, "#image-slogan_en")}  alt="Imagen del logo con Eslogan en Inglés" />
                                    <Button className="btn-action" variant="contained" component="label">
                                        Subir imagen
                                        <input onChange={handleChange} hidden accept="image/*" multiple type="file"
                                               id="logo" name="slogan_en"/>
                                    </Button>
                                </div>
                                <p className="description-img">Imagen del logo con Eslogan en Inglés</p>
                            </div>
                            <div className="col-md-3 ">
                                <div className="img-action">
                                    <img id="image-slogan_es" src={loadImage(state.form.slogan_es, "#image-slogan_es")}  alt="Imagen del logo con Eslogan en Español" />
                                    <Button className="btn-action" variant="contained" component="label">
                                        Subir imagen
                                        <input onChange={handleChange} hidden accept="image/*" multiple type="file"
                                               id="logo" name="slogan_es"/>
                                    </Button>
                                </div>
                                <p className="description-img">Imagen del logo con Eslogan en Español</p>
                            </div>
                            <div className="col-md-3 ">
                                <div className="img-action">
                                    <img id="image-my_perfil" src={loadImage(state.form.my_perfil, "#image-my_perfil")}  alt="Foto de Perfil" />
                                    <Button className="btn-action" variant="contained" component="label">
                                        Subir imagen
                                        <input onChange={handleChange} hidden accept="image/*" multiple type="file"
                                               id="logo" name="my_perfil"/>
                                    </Button>
                                </div>
                                <p className="description-img">Foto de Perfil</p>
                            </div>
                            <div className="col-md-3 ">
                                <div className="img-action">
                                    <img id="image-header_image_path" src={loadImage(state.form.header_image_path, "#image-header_image_path")} alt="Foto de header" />
                                    <Button className="btn-action" variant="contained" component="label">
                                        Subir imagen
                                        <input onChange={handleChange} hidden accept="image/*" multiple type="file"
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
                open={state.isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default FormComponent;

// Mount component
const name_component = document.querySelector("form-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(FormComponent, name_component, props);
}
