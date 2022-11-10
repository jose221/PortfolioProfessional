import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RComponent from "../RComponent";
//redux
import { Provider } from "react-redux";
import store from "../../redux/store/store";

class ContactsComponent extends RComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <list-contacts-component data-id={this.props.id} />
                    <create-contacts-component data-user_id={this.props.id}></create-contacts-component>
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
    ReactDOM.render(<ContactsComponent {...props} />, name_component);
}
