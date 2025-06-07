import React, { Component, useState } from 'react';
import renderComponent from '../../../utils/renderComponent';
import RComponent from "../../RComponent";
import {Provider} from "react-redux";
import store from "../../../redux/store/store";
import ListPortfolioCategoriesComponent from "./ListPortfolioCategoriesComponent";
import FormPortfolioCategoriesComponent from "./FormPortfolioCategoriesComponent";
class PortfolioCategoriesComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListPortfolioCategoriesComponent data-id={this.props.id} />
                    <FormPortfolioCategoriesComponent data-user_id={this.props.id} />
                </div>
            </Provider>
        )
    }

}

export default PortfolioCategoriesComponent;
let name_component = document.querySelector("portfolio-categories-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(PortfolioCategoriesComponent, name_component, props);
}
