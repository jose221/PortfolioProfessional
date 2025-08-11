import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
import ListPersonalProjectsComponent from "./ListPersonalProjectsComponent";
import FormPersonalProjectsComponent from "./FormPersonalProjectsComponent";
class PersonalProjectsComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListPersonalProjectsComponent id={this.props.id} />
                    <FormPersonalProjectsComponent  user_id={this.props.id} />
                </div>
            </Provider>
        )
    }

}

export default PersonalProjectsComponent;
let name_component = document.querySelector("personal-projects-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(PersonalProjectsComponent, name_component, props);
}
