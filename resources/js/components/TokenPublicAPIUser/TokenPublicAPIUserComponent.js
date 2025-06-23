import React, { Component, useState } from 'react';
import renderComponent from '../../utils/renderComponent';
import RComponent from "../RComponent";
import {Provider} from "react-redux";
import store from "../../redux/store/store";
import ListTokenPublicAPIUserComponent from "./ListTokenPublicAPIUserComponent";
import FormTokenPublicAPIUserComponent from "./FormTokenPublicAPIUserComponent";
class TokenPublicAPIUserComponent extends RComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <ListTokenPublicAPIUserComponent user_id={this.props.id} />
                    <FormTokenPublicAPIUserComponent user_id={this.props.id} />
                </div>
            </Provider>
        )
    }

}

export default TokenPublicAPIUserComponent;
let name_component = document.querySelector("token-public-api-user-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(TokenPublicAPIUserComponent, name_component, props);
}
