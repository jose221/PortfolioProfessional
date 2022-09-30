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
}
