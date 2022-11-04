import React, { Component, useState } from 'react';
import {DefaultService} from "../services/DefaultService";
import store from "../redux/store/store";
import addTodo from "../redux/actions/add-todo";
export default class RComponent extends Component{
    state = {
        ids:[],
        data:{},
        isLoading: false,
        isSuccess: false,
        openEdit:false,
        isSuccessMessage:"Exitoso!",
        openModal: false,
        form:{}
    }
    handleChangeInputGrid = (event) =>{
        let key = event.target.getAttribute('name');
        if(event.target.files.length){
            this.state.form[key] = event.target.files[0];
        }
    }
    onCellClick = (params, e)=>{
        let target =  e.target;
        //console.log(params.colDef.type,params)
        /**let input = e.target.getAttribute("data-open");
        if(input){
            let file_input = document.querySelector(`#${input}`)
            if(file_input){
                file_input.click()
            }
        }**/
        //this.setState({openModal : true});
    }
    handleEdit = async (url, item) =>{
        let param = {}
        param[item.field] = item.value
        let response = await DefaultService.edit(url, param)
        this.setState({isSuccess: true});
        this.setState({isSuccessMessage: response.message});
        this.dispatchStore(this.state)
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
        this.setState(this.state.data);
        this.dispatchStore(this.state)
    }
    handleChangeForm = (event) => {
        let key = event.target.getAttribute('name');
        //this.state.form[name] = event.target.value;
        if(event.target.getAttribute('type')  == 'file'){
            if(event.target.files.length){
                this.state.form[key] = event.target.files[0];
            }
        }else{
            this.state.form[key] = event.target.value;
        }
        this.setState(this.state.form);
        this.dispatchStore(this.state)
    }
    loadImage(image, id){
        let vm = this;
        if(typeof image == 'object'){
            try{
                var reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onloadend = function() {
                    image = reader.result;
                    document.querySelector(id).src = image;
                }
            }catch (e){
                image = "";
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
        this.dispatchStore(this.state)
    };
    formatDateString = (item)=>{
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(item).toLocaleDateString('es-mx', options);
    }

    async getItem(url, params = {}){
        this.setState({isLoading: true})
        let data = await DefaultService.find(url, params);
        data.updated_at = this.formatDateString(data.updated_at)
        this.setState({isLoading: false})
        this.dispatchStore(this.state)
        return data;
    }
    async getItems(url, params = {}){
        this.setState({isLoading: true})
        let data = await DefaultService.all(url, params);
        data.updated_at = this.formatDateString(data.updated_at)
        this.setState({isLoading: false})
        this.dispatchStore(this.state)
        return data;
    }

    onUpdate = async (url, params) =>{
        //console.log(this.validData(this.state.data,))
        this.setState({isLoading: true})
        let response = await DefaultService.update(url, params)
        console.log(response)
        this.setState({isLoading: false})
        this.setState({isSuccess: true});
        this.setState({isSuccessMessage: response.message});
        this.dispatchStore(this.state)
        return response;
    }
    onCreate = async (url, params) =>{
        //console.log(this.validData(this.state.data,))
        this.setState({isLoading: true})
        let response = await DefaultService.create(url, params)
        this.setState({isLoading: false})
        this.setState({isSuccess: true});
        this.setState({isSuccessMessage: response.message});
        this.dispatchStore(this.state)
        return response;
    }
    onDelete = async (url, params) =>{
        let response = await DefaultService.delete(url, {
            ids: JSON.stringify(params)
        })
        this.setState({isSuccess: true});
        this.setState({isSuccessMessage: response.message});
        this.dispatchStore(this.state)
        return response;
    }
    isValid(data, required=true){
        let  isInvalid = false;
        if(data != undefined){
            data = data.toString();
            if(required && (!data || data.trim() == "" || data == null)) isInvalid = true;
        }else{
            isInvalid = true;
        }
        return isInvalid
    }
    dispatchStore(state){
        store.dispatch(addTodo(state));
    }
    subscribeStore(callback = function (res){}){
        store.subscribe(() => {
            let res = store.getState();
            this.setState(res.data);
            callback(res.data)
        });
    }


}
