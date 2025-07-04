import React, { Component, useState } from 'react';
import RComponent from "../../RComponent";
import CardContent from "@mui/material/CardContent";
import PersonIcon from "@mui/icons-material/Person";
import Card from "@mui/material/Card";
import ReactDOM from "react-dom";
import Typography from '@mui/material/Typography';

let primary_url = window.url_api+"/admin/portfolio-categories";

class InfoPortfolioCategoriesComponent extends RComponent {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        console.log("hola mundo")
        this.subscribeStore();
        await this.onInit();
    }

    onInit = async () => {
        let res = await this.getItems(`${primary_url}/${this.props.id}`)
        this.state.information = res;
        console.log(res)
        this.dispatchStore(this.state)
    }

    render() {
        return (
            <div className="h-100">
                <Card className="h-100">
                    <CardContent className="pb-1">
                        <div className="justify-card-column">
                            <div>
                                <button type="button" className="btn btn-light btn-sm float-right" >
                                    Ver en Inglés
                                </button>
                                <div className="mt-1">
                                    <p className="info-title">{this.state.information.title_es}</p>

                                    <p className="info-description">
                                        {this.state.information.description_es}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
export default InfoPortfolioCategoriesComponent;
let name_component = document.querySelector("info-portfolio-categories-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(InfoPortfolioCategoriesComponent, name_component, props);
}
