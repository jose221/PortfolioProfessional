import axios from 'axios';
let header = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikpvc8OpIMOBbmdlbCBBbHZhcmFkbyBHb256YWxleiIsImVtYWlsIjoiam9zZS5hbHZhcmFkbzIyMEBob3RtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEdkL2NISUpPL280LmVWc0ZLdUpoSE8ubjlmRmRwNlpFR1VjWVA4ZGtrRzVKbHdVYzdEV01TIiwiZXhwaXJlZF90b2tlbiI6MTY3MTIyNjc3ODcyOCwiaWF0IjoxNjcxMTQwMzc4fQ.K6A3pXkm2LOM3itZzZC7nREA5gkwG4kMiBV5oTJjGcs'
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

        for ( var key in params ) {
            data.append(key, params[key]);
        }
        return data;
    }
}
