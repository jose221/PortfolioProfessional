import React, { Component, useState } from 'react';
import RComponent from "../RComponent";
import CardContent from "@mui/material/CardContent";
import PersonIcon from "@mui/icons-material/Person";
import Card from "@mui/material/Card";
import ReactDOM from "react-dom";
import Typography from '@mui/material/Typography';
import {sleep} from "../../utils/tools";
import DOMPurify from 'dompurify';
let primary_url = window.url_api+"/admin/knowledges";

class InfoKnowLedgesComponent extends RComponent {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.subscribeStore();
        await this.onInit();
    }
    changeLang(){
        console.log(this.state.currentLang)
        if(this.state.currentLang === "es") this.state.currentLang = "en"
        else this.state.currentLang = "es"
        this.dispatchStore(this.state)
    }

    onInit = async () => {
        await sleep(100)
        let res = await this.getItems(`${primary_url}/${this.props.id}`)
        this.state.information = res;
        this.dispatchStore(this.state)
    }

    render() {
        return (
            <div className="h-100">
                <Card className="h-100">
                    <img className="info-header" src={ this.loadImage(this.state.information.icon_path)}/>
                    <CardContent className="pb-1">
                        <div className="justify-card-column">
                            <div>
                                <button type="button" className="btn btn-light btn-sm float-right"  onClick={()=>this.changeLang()}>
                                    Ver en {this.state.currentLang === 'es' ? 'Inglés' : 'Español'}
                                </button>
                                <div className="mt-1">
                                    <p className="info-title">{this.state.information['title_'+this.state.currentLang]}</p>

                                    <p className="info-description"
                                       dangerouslySetInnerHTML={{
                                           __html: DOMPurify.sanitize(this.state.information['description_'+this.state.currentLang])
                                       }}>
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
export default InfoKnowLedgesComponent;
let name_component = document.querySelector("info-knowledge-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(InfoKnowLedgesComponent, name_component, props);
}
