import React, { Component, useState } from 'react';
import { Provider } from 'react-redux';
import renderComponent from '../../utils/renderComponent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RComponent from "../RComponent";
import store from '../../redux/store/store';

import SimpleEditorLoader from "./editor/components/SimpleEditorLoader";

let primary_url = window.url_api+"/admin/all-information";
let title = "Creador de CV";
let url_storage = window.url_image || "http://localhost:8080";

class CreateCVComponent extends RComponent{
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore();
        await this.onInit();
    }
    onInit = async ()=>{
        let res = await this.getItem(`${primary_url}`)
        this.state.information = res;
        this.dispatchStore(this.state)
    }

    render(){

        return (
            <Provider store={store}>
                <SimpleEditorLoader data={this.state.information} lang={'es'}/>
            </Provider>
        )
    }
}

export default CreateCVComponent;
let name_component = document.querySelector("create-cv-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(CreateCVComponent, name_component, props);
}
