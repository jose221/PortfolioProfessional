import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RComponent from "../RComponent";

import {
    Typography,
    CardHeader,
    Box,
    Divider,
    Grid,
    Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {DemoItem} from "@mui/x-date-pickers/internals/demo";
import VitaeEditorContainer from "./editor/VitaeEditorContainer";

// Styled components for better visual appeal
const StyledCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    },
}));

let primary_url = window.url_api+"/admin/history-curriculum-vitae";
let primary_url_user = window.url_api+"/admin/user";
let title = "Información de mi Historial de CV";
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

        this.dispatchStore(this.state)
    }

    render(){

        return (
            <VitaeEditorContainer/>
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
