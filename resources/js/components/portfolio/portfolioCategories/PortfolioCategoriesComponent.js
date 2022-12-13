import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RComponent from "../../RComponent";
import {Provider} from "react-redux";
import store from "../../../redux/store/store";
class PortfolioCategoriesComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <list-portfolio-categories-component data-id={this.props.id} />
                    <form-portfolio-categories-component data-user_id={this.props.id} />
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
    ReactDOM.render(<PortfolioCategoriesComponent {...props} />, name_component);
}
