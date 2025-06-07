import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
//redux
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import ListContactsComponent from "./ListContactComponent";
import CreateContactsComponent from "./CreateContactsComponent";
import ListContactComponent from "./ListContactComponent";

class ContactsComponent extends RComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListContactComponent data-id={this.props.id} />
                    <CreateContactsComponent data-user_id={this.props.id}></CreateContactsComponent>
                </div>
            </Provider>
        )
    }
}
export default ContactsComponent;
let name_component = document.querySelector("contacts-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(ContactsComponent, name_component, props);
}
