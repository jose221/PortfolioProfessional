import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
import ListCertificationsComponent from "./ListCertificationsComponent";
import FormCertificationsComponent from "./FormCertificationsComponent";
class CertificationsComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListCertificationsComponent id={this.props.id} />
                    <FormCertificationsComponent user_id={this.props.id} />
                </div>
            </Provider>
        )
    }

}

export default CertificationsComponent;
let name_component = document.querySelector("certifications-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(CertificationsComponent, name_component, props);
}
