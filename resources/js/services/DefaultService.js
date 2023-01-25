import axios from 'axios';
let header = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'auth-token': window.token
    }
}
export class DefaultService{
    static async find(url, params = {}, config = header){
        let items = null;
        try {
            params = {
                ... header
            }
            items = await axios.get(url, params);
            items = items.data.data;
        }
        catch (e){
            console.log(e);
        }
        return items;
    }
    static async all(url, params = {}, config = header){
        let items = null;
        try {
            params = {
                ... header
            }
            items = await axios.get(url, params);
            items = items.data.data;
        }
        catch (e){
            console.log(e);
        }
        return items || [];
    }
    static async update(url, params = {}, config = header){
        let items = null;
        try {
            if(params.id) delete params.id;
            if(params.item) delete params.item;
            if(params.required) delete params.required;
            if(params.user_id) delete params.user_id;
            if(params.created_at) delete params.created_at;
            if(params.updated_at) delete params.updated_at;
            const data = await this.formData(params)
            items = await axios.put(url, data, config);
            items = items.data;
        }
        catch (e){
            console.log(e);
        }
        return items;
    }
    static async create(url, params = {}, config = header){
        let items = null;
        try {

            if(params.id == 0) delete params.id;
            if(params.item) delete params.item;
            if(params.required) delete params.required;
            if(params.created_at) delete params.created_at;
            if(params.updated_at) delete params.updated_at;
            const data = await this.formData(params)
            items = await axios.post(url, data, config);
            items = items.data;
        }
        catch (e){
            console.log(e);
        }
        return items;
    }
    static async edit(url, params = {}, config = header){
        let items = null;
        if(params.id) delete params.id;
        if(params.item) delete params.item;
        if(params.required) delete params.required;
        try {
            const data = await this.formData(params)
            items = await axios.put(url, data, config);
            items = items.data;
        }
        catch (e){
            console.log(e);
        }
        return items;
    }
    static async delete(url, params = {}, config = header){
        let items = null;
        try {
            const data = await this.formData(params)
            items = await axios.post(url, data, config);
            items = items.data;
        }
        catch (e){
            console.log(e);
        }
        return items;
    }

    static formData(params){
        const data = new FormData();
        params = params.convertStringCasts();
        if(params.casts) delete params.casts;
        for ( var key in params ) {
            data.append(key, params[key]);
        }
        return data;
    }
}
