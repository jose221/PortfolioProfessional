import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
import ListKnowledgeAbilityComponent from "./ListKnowledgeAbilityComponent";
import FormKnowledgeAbilityComponent from "./FormKnowledgeAbilityComponent";
class KnowledgeAbilityComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListKnowledgeAbilityComponent data-id={this.props.id} />
                    <FormKnowledgeAbilityComponent data-id={this.props.id} />
                </div>
            </Provider>
        )
    }

}

export default KnowledgeAbilityComponent;
let name_component = document.querySelector("knowledge-ability-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(KnowledgeAbilityComponent, name_component, props);
}
