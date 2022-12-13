import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
class PortfolioComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <list-portfolio-component data-id={this.props.id} data-user_id={this.props.user_id} />
                    <form-portfolio-component data-id={this.props.id} data-user_id={this.props.user_id} />
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
    ReactDOM.render(<PortfolioComponent {...props} />, name_component);
}
