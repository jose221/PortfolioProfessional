import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
import ListVitaeComponent from "./ListVitaeComponent";
import FormVitaeComponent from "./FormVitaeComponent";
class VitaeComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListVitaeComponent user_id={this.props.id} />
                    <FormVitaeComponent user_id={this.props.id} />
                </div>
            </Provider>
        )
    }

}

export default VitaeComponent;
let name_component = document.querySelector("vitae-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(VitaeComponent, name_component, props);
}
