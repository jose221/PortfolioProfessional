import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
class KnowLedgesComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <list-knowledges-component data-id={this.props.id} />
                    <form-knowledges-component data-user_id={this.props.id} />
                </div>
            </Provider>
        )
    }

}

export default KnowLedgesComponent;
let name_component = document.querySelector("knowledges-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    ReactDOM.render(<KnowLedgesComponent {...props} />, name_component);
}
