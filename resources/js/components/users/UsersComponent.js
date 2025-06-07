import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
//redux
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import ListUsersComponent from "./ListUsersComponent";
import FormUsersComponent from "./FormUsersComponent";
class UsersComponent extends RComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListUsersComponent data-id={this.props.id} />
                    <FormUsersComponent data-user_id={this.props.id} />
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
    renderComponent(UsersComponent, name_component, props);
}
