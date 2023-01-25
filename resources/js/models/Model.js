export default class Model {
    constructor(attr = {}) {
        for (const [key, value] of Object.entries(attr)) {
            this[key] = value;
        }
        this.item = attr;

    }
    getRequired(){
        return this.required;
    }
    validData(){
        let isValid = true;
        for (const [key, value] of Object.entries(this)) {
            if(this.required.find(element => element == key)){
                switch (typeof value){
                    case 'number':
                        if(value <= 0) isValid = false;
                    case 'string':
                        if(value == "" || value == null || value == " ") isValid = false;
                    case "boolean":
                        if(value == false) isValid = false;
                }
            }
        }
        return isValid;
    }
    isDate(date) {
        return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date))));
    }
    getItem(){
        return this.item;
    }
    formatCasts(){
        if(this.casts){
            for (const [key, value] of Object.entries(this.casts)) {
                switch (value) {
                    case 'array':
                         if(typeof (this[key]) == 'string'){
                             this[key] = JSON.parse(this[key]);

                             this[key] = this[key].map((item)=>{
                                 return JSON.parse(item);
                             });
                         }
                         else this[key];
                        console.log(this[key])
                        break;
                    case 'object':
                        this[key] = (typeof (this[key]) == 'string') ? JSON.parse(this[key]) : this[key];
                        break;
                }
            }
            window.item = this;
        }
    }
    convertStringCasts(){
        let data = this;
        if(this.casts){
            for (const [key, value] of Object.entries(this.casts)) {
                switch (value) {
                    case 'array':
                        data[key] = JSON.stringify(data[key].map((item)=>{
                            return JSON.stringify(item);
                        }));
                        console.log(data[key])
                        break;
                    case 'object':
                        data[key] = JSON.stringify(data[key]);
                        break;
                }
            }
        }
        return data;
    }
}
