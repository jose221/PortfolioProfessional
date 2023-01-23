import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RComponent from "../RComponent";
//redux
import TextField from "@mui/material/TextField";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import MyContact from "../../models/MyContact";
import Auth from "../../models/Auth";

let primary_url = "http://localhost:8080/api/admin/my-contacts";

class LoginComponent extends RComponent {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.state.form = Auth;
        this.dispatchStore(this.state)
        this.subscribeStore();
    }
    handleSubmit = async (e) =>{
        e.preventDefault();
        if(this.state.form.validData()){
            await this.onCreate(`${primary_url}`, this.state.form)
            this.state.openModal = false;
            this.dispatchStore(this.state);
        }
    }

    render() {
        return (
            <div>
                <div className="login d-flex align-items-center py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9 col-lg-8 mx-auto">
                                <h3 className="login-heading mb-4">Inicio de sesión</h3>
                                <form encType="multipart/form-data" noValidate={true} onSubmit={this.handleSubmit}>
                                    <div className="form-label-group">
                                        <input id="email" type="email" className="form-control is-invalid"
                                               name="email" value=" " required autoComplete="email" autoFocus />
                                        <TextField
                                            error={this.isValid(this.state.form.name_es)}
                                            className="col-md-12 mt-3 p-1"
                                            id="email"
                                            autoComplete="email"
                                            label="Correo electronico"
                                            value={this.state.form.name_es || ' '}
                                            name="email"
                                            onChange={this.handleChangeForm}
                                            helperText="Nombre del contacto en español"
                                        />
                                        <label htmlFor="inputEmail">Correo electronico</label>
                                        <span className="invalid-feedback" role="alert">
                                <strong>Escribe el correo electronico correctamente</strong>
                            </span>
                                    </div>

                                    <div className="form-label-group">
                                        <input id="password" type="password"
                                               className="form-control is-invalid" name="password" required
                                               autoComplete="current-password" />
                                        <label htmlFor="inputPassword">Password</label>
                                        <span className="invalid-feedback" role="alert">
                                <strong>Por favor escribe el password</strong>
                            </span>
                                    </div>

                                    <div className="custom-control custom-checkbox mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="remember" id="remember" />

                                            <label className="form-check-label" htmlFor="remember">
                                                Recordar contraseña
                                            </label>
                                        </div>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                            type="submit">Iniciar sesión</button>
                                    <div className="text-center">
                                        <a className="btn btn-link small" href="/forgotten">
                                            ¿Olvidaste tu password?
                                        </a>
                                        <a className="btn btn-link small" href="/admin/register">
                                            Register
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default LoginComponent;
let name_component = document.querySelector("login-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    ReactDOM.render(<LoginComponent {...props} />, name_component);
}
