import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
import ListKnowLedgesComponent from "./ListKnowLedgesComponent";
import FormKnowLedgesComponent from "./FormKnowLedgesComponent";
class KnowLedgesComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListKnowLedgesComponent id={this.props.id} />
                    <FormKnowLedgesComponent user_id={this.props.id} />
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
    renderComponent(KnowLedgesComponent, name_component, props);
}
