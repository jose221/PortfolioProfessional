import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
import ListStudiesComponent from "./ListStudiesComponent";
import FormStudiesComponent from "./FormStudiesComponent";
class StudiesComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListStudiesComponent data-user_id={this.props.id} />
                    <FormStudiesComponent data-user_id={this.props.id} />
                </div>
            </Provider>
        )
    }

}

export default StudiesComponent;
let name_component = document.querySelector("studies-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(StudiesComponent, name_component, props);
}
