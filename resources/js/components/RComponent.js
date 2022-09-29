import React, { Component, useState } from 'react';
import {DefaultService} from "../services/DefaultService";
export default class RComponent extends Component{
    state = {
        data:{},
        isLoading: false,
        isSuccess: false,
        isSuccessMessage:"Exitoso!"
    }
    handleChange = (event) => {
        let key = event.target.getAttribute('name');
        //this.state.form[name] = event.target.value;
        if(event.target.getAttribute('type')  == 'file'){
            if(event.target.files.length){
                this.state.data[key] = event.target.files[0];
            }
        }else{
            this.state.data[key] = event.target.value;
        }
        console.log(this.state.data)
        this.setState(this.state.data);
    }
    loadImage(image, id){
        let vm = this;
        if(typeof image == 'object'){
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = function() {
                image = reader.result;
                document.querySelector(id).src = image;
            }
        }else{
            return image;
        }
    }
    successHandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({isSuccess: false});
    };
    formatDateString = (item)=>{
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(item).toLocaleDateString('es-mx', options);
    }

    async getItem(url, params = {}){
        this.setState({isLoading: true})
        let data = await DefaultService.find(url, params);
        data.updated_at = this.formatDateString(data.updated_at)
        await this.setState({data: data});
        this.setState({isLoading: false})
        return data;
    }

    onUpdate = async (url, params) =>{
        this.setState({isLoading: true})
        let response = await DefaultService.update(url, params)
        console.log(response)
        this.setState({isLoading: false})
        this.setState({isSuccess: true});
        this.setState({isSuccessMessage: response.message});
        return response;
    }
}
