import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
class VitaeComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <list-vitae-component data-user_id={this.props.id} />
                    <form-vitae-component data-user_id={this.props.id} />
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
    ReactDOM.render(<VitaeComponent {...props} />, name_component);
}
