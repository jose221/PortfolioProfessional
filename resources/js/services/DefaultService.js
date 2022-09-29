import axios from 'axios';
let header = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}
export class DefaultService{
    static async find(url, params = {}){
        let items = null;
        try {
            items = await axios.get(url, params);
            items = items.data;
        }
        catch (e){
            console.log(e);
        }
        return items;
    }
    static async update(url, params = {}, config = header){
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

        for ( var key in params ) {
            data.append(key, params[key]);
        }
        return data;
    }
}
