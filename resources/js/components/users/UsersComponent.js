import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RComponent from "../RComponent";
//redux
import { Provider } from "react-redux";
import store from "../../redux/store/store";

class UsersComponent extends RComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <list-users-component data-id={this.props.id} />
                </div>
            </Provider>
        )
    }
}
export default UsersComponent;
let name_component = document.querySelector("users-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    ReactDOM.render(<UsersComponent {...props} />, name_component);
}
