import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
class StudiesComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <list-studies-component data-user_id={this.props.id} />
                    <form-studies-component data-user_id={this.props.id} />
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
    ReactDOM.render(<StudiesComponent {...props} />, name_component);
}
