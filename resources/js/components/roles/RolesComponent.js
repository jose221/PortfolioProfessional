import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
import ListRolesComponent from "./ListRolesComponent";
import FormRolesComponent from "./FormRolesComponent";
class RolesComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListRolesComponent user_id={this.props.id} />
                    <FormRolesComponent user_id={this.props.id} />
                </div>
            </Provider>
        )
    }

}

export default RolesComponent;
let name_component = document.querySelector("roles-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(RolesComponent, name_component, props);
}
