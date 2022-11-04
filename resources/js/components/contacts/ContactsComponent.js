import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

import RComponent from "../RComponent";
import PersonIcon from "@mui/icons-material/Person";
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//redux
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import addTodo from "../../redux/actions/add-todo";

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
