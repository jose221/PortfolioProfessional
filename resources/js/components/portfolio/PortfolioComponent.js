import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
import ListPortfolioComponent from "./ListPortfolioComponent";
import FormPortfolioComponent from "./FormPortfolioComponent";
class PortfolioComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListPortfolioComponent data-id={this.props.id} data-user_id={this.props.user_id} />
                    <FormPortfolioComponent data-id={this.props.id} data-user_id={this.props.user_id} />
                </div>
            </Provider>
        )
    }

}

export default PortfolioComponent;
let name_component = document.querySelector("portfolio-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(PortfolioComponent, name_component, props);
}
