import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
class PersonalProjectsComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <list-personal-projects-component data-id={this.props.id} />
                    <form-personal-projects-component  data-user_id={this.props.id} />
                </div>
            </Provider>
        )
    }

}

export default PersonalProjectsComponent;
let name_component = document.querySelector("personal-projects-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    ReactDOM.render(<PersonalProjectsComponent {...props} />, name_component);
}
