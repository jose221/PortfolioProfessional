import React, { Component, useState } from 'react';
import {DefaultService} from "../services/DefaultService";
import store from "../redux/store/store";
import addTodo from "../redux/actions/add-todo";
export default class RComponent extends Component{
    state = {
        ids:[],
        data:{},
        items:[],
        isLoading: false,
        isSuccess: false,
        openEdit:false,
        isSuccessMessage:"Exitoso!",
        openModal: false,
        form:{},
        information:{},
        expandedAccordion:"",
        dataAutocomplete:{}
    }
    constructor() {
        super();
        window.url_api = window.url_api || "http://localhost:8080/api";
        window.url_image = window.url_image || "http://localhost:8080";
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
        console.log(event)
        let key = event.target.getAttribute('name');
        //this.state.form[name] = event.target.value;
        switch (event.target.getAttribute('type')) {
            case 'file':
                if(event.target.files.length){
                    this.state.form[key] = event.target.files[0];
                }
                break;
            case 'array':
                console.log(event)
                break;
            default:
                this.state.form[key] = event.target.value;
                break;

        }
        this.setState(this.state.form);
        this.dispatchStore(this.state)
    }
    handleChangeAutocomplete = (event, newValue, key, type)=>{
        this.state.form[key] = newValue;
        this.setState(this.state.form);
        this.dispatchStore(this.state)
    }
    handleChangeForm = (event) => {
        if(event.target){
            let key = event.target.name;
            //this.state.form[name] = event.target.value;
            switch (event.target.type) {
                case 'file':
                    if(event.target.files.length){
                        this.state.form[key] = event.target.files[0];
                    }
                    break;
                default:
                    this.state.form[key] = event.target.value;
                    break;

            }
        }
        this.setState(this.state.form);
        this.dispatchStore(this.state)
    }
    loadImage(image, id){
        let url = window.url_image || "http://localhost:8080";
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
            return url + image   || "https://amazonia.mapbiomas.org/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
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
        this.state.isLoading = false;
        this.dispatchStore(this.state);
        return data;
    }
    async getItems(url, params = {}, showLoading=true, config={}) {
        if(showLoading) this.setState({isLoading: true});
        let data = await DefaultService.all(url, params, config);

        if(data.updated_at) {
            data.updated_at = this.formatDateString(data.updated_at);
        }

        if(showLoading) {
            this.state.isLoading = false;
            this.dispatchStore(this.state);
        }

        return data;
    }


    onUpdate = async (url, params) =>{
        //console.log(this.validData(this.state.data,))
        this.setState({isLoading: true})
        let response = await DefaultService.update(url, params)
        this.state.isLoading = false;
        this.state.isSuccess = true;
        this.state.isSuccessMessage = response.message;
        this.dispatchStore(this.state)
        return response;
    }
    onCreate = async (url, params) =>{
        //console.log(this.validData(this.state.data,))
        let response = await DefaultService.create(url, params)
        this.state.isLoading = false;
        this.state.isSuccess = true;
        this.state.isSuccessMessage = response.message;
        this.dispatchStore(this.state)
        return response;
    }
    onDelete = async (url, params, showMessage=true) =>{
        const mParams = this.mapParamsToNumericArray(params);

        let response = await DefaultService.delete(url, {
            ids: mParams
        })
        if(showMessage){
            this.state.isSuccess = true;
            this.state.isSuccessMessage = response.message;
            this.dispatchStore(this.state)
        }
        return response;
    }
    isValid(data, required=true){
        let  isInvalid = false;
        if(required){
            if (data != undefined) {
                data = data.toString();
                if (required && (!data || data.trim() == "" || data == null || data == '<p><br></p>')) isInvalid = true;
            } else {
                isInvalid = true;
            }
        }
        return isInvalid
    }
    dispatchStore(state){
        if(state?.user_id) state.user_id = parseInt(state.user_id);
        if(state?.id) state.id = parseInt(state.id);
        store.dispatch(addTodo(state));
    }
    subscribeStore(callback = function (res){}, noSate=false){
        store.subscribe(() => {
            let res = store.getState();
            if(!noSate){
                this.setState(res.data);
            }
            callback(res.data)
        });
    }
    goToHref = async(url)=>{
        window.location.href=url;
    }
    /**
     * Mapea y valida distintos tipos de input para obtener un array simple de números.
     * @param {Array|Object|any} params - Array, objeto o arreglo de objetos.
     * @param {String} [key] - Clave a buscar dentro de objetos para extraer el array de ids.
     * @returns {Number[]} Un array simple de números.
     */
    mapParamsToNumericArray(params, key = 'ids') {
        if (!params || typeof params !== 'object') return [];

        // Normalizar la colección si el valor es Set o Array
        function getNormalized(val) {
            if (Array.isArray(val)) return val;
            if (val instanceof Set) return Array.from(val);
            return [];
        }

        // Si es directamente un objeto con la clave
        if (!Array.isArray(params) && params[key]) {
            const values = getNormalized(params[key]);
            if (values.every(item => typeof item === 'number')) return values;
            if (values.every(item => typeof item === 'string')) {
                const parsed = values.map(Number).filter(num => !isNaN(num));
                return parsed.length === values.length ? parsed : [];
            }
            return [];
        }

        // Si params es un array
        if (Array.isArray(params)) {
            // Array de números puros
            if (params.every(item => typeof item === 'number')) return params;

            // Array de strings numéricas
            if (params.every(item => typeof item === 'string')) {
                const numArray = params.map(Number).filter(num => !isNaN(num));
                return numArray.length === params.length ? numArray : [];
            }

            // Array de objetos con la key, aceptando Array o Set
            if (params.every(item =>
                typeof item === 'object' &&
                !Array.isArray(item) &&
                item !== null &&
                item[key] &&
                (Array.isArray(item[key]) || item[key] instanceof Set)
            )) {
                for (const obj of params) {
                    const values = getNormalized(obj[key]);
                    if (values.every(id => typeof id === 'number')) return values;
                    if (values.every(id => typeof id === 'string')) {
                        const parsed = values.map(Number).filter(num => !isNaN(num));
                        return parsed.length === values.length ? parsed : [];
                    }
                }
            }
        }

        // No cumple con nada
        return [];
    }




}
