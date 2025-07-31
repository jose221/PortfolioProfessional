import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
import ListModulesComponent from "./ListModulesComponent";
import FormModulesComponent from "./FormModulesComponent";
class ModulesComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListModulesComponent user_id={this.props.id} />
                    <FormModulesComponent user_id={this.props.id} />
                </div>
            </Provider>
        )
    }

}

export default ModulesComponent;
let name_component = document.querySelector("modules-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(ModulesComponent, name_component, props);
}
