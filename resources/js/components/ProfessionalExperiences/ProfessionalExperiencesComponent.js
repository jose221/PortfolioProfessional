import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
import ListProfessionalExperiencesComponent from "./ListProfessionalExperiencesComponent";
import FormProfessionalExperiencesComponent from "./FormProfessionalExperiencesComponent";
class ProfessionalExperiencesComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListProfessionalExperiencesComponent id={this.props.id} ></ListProfessionalExperiencesComponent>
                    <FormProfessionalExperiencesComponent  user_id={this.props.id} />
                </div>
            </Provider>
        )
    }

}

export default ProfessionalExperiencesComponent;
let name_component = document.querySelector("professional-experiences-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(ProfessionalExperiencesComponent, name_component, props);
}
