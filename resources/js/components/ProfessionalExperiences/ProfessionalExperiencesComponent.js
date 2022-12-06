import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
class ProfessionalExperiencesComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <list-professional-experiences-component data-id={this.props.id} ></list-professional-experiences-component>
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
    ReactDOM.render(<ProfessionalExperiencesComponent {...props} />, name_component);
}
