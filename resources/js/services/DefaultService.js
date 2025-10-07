import axios from 'axios';
import qs from 'qs';
let header = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'auth-token': window.token
    }
}
export class DefaultService{
    static async find(url, params = {}, config = {}){
        let items = null;
        try {
            if(config?.headers){
                header.headers = Object.assign(header?.headers ?? {},config?.headers ?? {})
                delete config?.headers
            }
            params = Object.assign({}, params, header, config)
            params.paramsSerializer = {
                serialize: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
            }
            items = await axios.get(url, params);
            items = items.data.data;
        }
        catch (e){
            console.log(e);
        }
        return items;
    }
    static async all(url, params = {}, config = {}){
        let items = null;
        try {
            header.headers = Object.assign(header?.headers ?? {},config?.headers ?? {})
            delete config?.headers
            params = Object.assign({}, params, header, config)
            params.paramsSerializer = {
                serialize: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
            }
            console.log(params)
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
            if(params.casts) delete params.casts;
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
            if(params.casts) delete params.casts;
            const data = await this.formData(params)
            items = await axios.post(url, data, config);
            items = items.data;
        }
        catch (e){
            console.log(e);
        }
        return items;
    }

    static async post(url, params = {}, config = header){
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

    static async edit(url, params = {}, config = header){
        let items = null;
        if(params.id) delete params.id;
        if(params.item) delete params.item;
        if(params.required) delete params.required;
        if(params.casts) delete params.casts;
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
            const data = await this.formData(params, true)
            items = await axios.post(url, data, config);
            items = items.data;
        }
        catch (e){
            console.log(e);
        }
        return items;
    }

    static formData(params, simple_form = false){
        const data = new FormData();
        for ( var key in this.parseParams(params) ) {
            if(Array.isArray(params[key]) && !simple_form){
                data.append(key, JSON.stringify(params[key].map((item)=>{
                    return JSON.stringify(item);
                })));
            }
            else data.append(key, params[key]);
        }
        return data;
    }

    static parseParams(params){
        const result = {};
        Object.keys(params).forEach(key => {
            if (params[key] === true || params[key] === "true") {
                result[key] = 1;
            } else if (params[key] === false || params[key] === "false") {
                result[key] = 0;
            } else {
                result[key] = params[key];
            }
        });
        return result;
    }
}
