import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
class KnowledgeAbilityComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <list-knowledge-ability-component data-id={this.props.id} />
                    <form-knowledges-ability-component data-id={this.props.id} />
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
    ReactDOM.render(<KnowledgeAbilityComponent {...props} />, name_component);
}
