export default class Model {
    required = []
    casts = {}
    rules = {}
    attributes = []
    mapAttribute={}
    errorMessages = {}
    errorMessagesArray = []
    showErrorMessageRequired = true
    attributeLabel = {}
    item = {}
    constructor(attr = {}) {
        for (const [key, value] of Object.entries(attr)) {
            this.attributes.push(key)
            this[key] = value;
        }
        this.item = attr;

    }
    updateItem(){
        for (const key of this.attributes) {
            if(this[key] === undefined){
                delete this.item[key];
            }else{
                if(this.mapAttribute[key] && typeof this.mapAttribute[key] === "function"){
                    this[key] = this.mapAttribute[key].call(this, this[key]);
                };
                this.item[key] = this[key];
            }
        }
    }

    /**
     * Valida un atributo requerido y retorna el resultado de la validación
     * @param {string} key - El nombre del atributo
     * @param {any} value - El valor del atributo
     * @param {boolean} isRequired - Si el atributo es requerido
     * @returns {boolean} - Si el atributo es válido
     */
    validateRequiredAttribute(key, isRequired=this.required && this.required.find(element => element == key)) {
        this.updateItem()
        let value = this[key];
        if (value != undefined && value != null) {
            switch (typeof value) {
                case 'number':
                    if (this.casts[key] !== 'boolean') {
                        if (!value || value <= 0) {
                            return false;
                        }
                    }
                    break;
                case 'string':
                    value = String(value);
                    if (!this.isValidAttribute(key, isRequired)) {
                        return false;
                    }
                    break;
            }
        } else {
            return false;
        }
        return true;
    }

    validData(){
        this.updateItem()
        let isValid = true;
        for (let [key, value] of Object.entries(this)) {
            let isValidAttribute = true;
            const isRequired = this.required && this.required.includes(key);
            if(isRequired){
                if (!this.validateRequiredAttribute(key, isRequired)) {
                    isValid = false;
                    isValidAttribute = false;
                }
            }
            if(isValidAttribute){
                isValidAttribute = this.validateAttributeRule(key, value).valid;
                if(!isValidAttribute){
                    isValid = false;
                }else{
                    this.setErrorMessages(key);
                }
            }else{
                console.error(`${key} es requerido`)
                if(this.showErrorMessageRequired) this.setErrorMessages(key, `${key} es requerido`);
            }
        }
        if(isValid){
            this.cleanEmptyAttributes();
        }
        return isValid;
    }

    cleanEmptyAttributes() {
        const keysToRemove = [];

        for (const [key, value] of Object.entries(this)) {
            // Verificar si el atributo es requerido
            const isRequired = this.required && this.required.find(element => element == key);

            // Si no es requerido, verificar si está vacío para eliminarlo
            //if (!isRequired) {
                const isInValid = !this.validateRequiredAttribute(key, isRequired);

                if (isInValid || !this.validateRequiredAttribute(key, true)) {
                    keysToRemove.push(key);
                }
            //}
        }

        // Eliminar atributos vacíos que no son requeridos
        keysToRemove.forEach(key => {
            delete this[key];
        });
        this.updateItem()
        return this;
    }

    isDate(date) {
        return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date))));
    }
    getItem(){
        this.updateItem()
        this.formatCasts()
        return this.item;
    }
    formatCasts() {
        if (this.casts) {
            for (const [key, value] of Object.entries(this.casts)) {
                switch (value) {
                    case 'array':
                        if (typeof this[key] === 'string') {
                            this[key] = JSON.parse(this[key]);
                            this[key] = this[key].map(item => JSON.parse(item));
                        }
                        break;
                    case 'object':
                        this[key] = (typeof this[key] === 'string') ? JSON.parse(this[key]) : this[key];
                        break;
                    case 'boolean':
                        this[key] = this[key] ? ((this[key]) === 'true' || this[key] === '1' || this[key] === true) ? 1 : 0 : 0;
                        break;

                    case 'number':
                        this[key] = (typeof this[key] === 'number')
                            ? this[key]
                            : Number(this[key]);
                        break;
                    case 'string':
                        this[key] = (typeof this[key] === 'string')
                            ? this[key]
                            : String(this[key]);
                        break;
                    // agrega más tipos si lo necesitas
                }
            }
            window.item = this;
        }
    }
    isValidAttribute(key, required=this.required && this.required.find(element => element == key)){
        this.updateItem()
        let value = this[key];
        let  isValid = true;
        if(required){
            if(value != undefined){
                value = value.toString();
                if(required && (!value || value.trim() == "" || value.trim() == '' || value == null || value == '<p><br></p>')){
                    isValid = false;
                }
            }else{
                console.log(`${key} es undefined`)
                if(this.showErrorMessageRequired) this.setErrorMessages(key, `${key} es requerido`);
                isValid = false;
            }
        }
        if(isValid){
            this.setErrorMessages(key);
            isValid = this.validateAttributeRule(key, value).valid;
        }
        return isValid
    }


    /**
     * Validates a given attribute based on its specified validation rules.
     *
     * @param {string} attributeName - The name of the attribute to be validated.
     * @param {any} value - The value of the attribute to validate.
     * @param {string|null} [ruleKey=null] - A specific rule to validate. If null, all rules for the attribute will be validated.
     * @return {{message, valid}} Returns an object with the validation result. The `valid` property is a boolean indicating whether the value passed validation,
     * and the `message` property contains an error message when validation fails or null if validation passes.
     */
    validateAttributeRule(attributeName, value, ruleKey = null) {
        if (!this.rules || !this.rules[attributeName]) {
            return { valid: true, message: null }; // No hay reglas para este atributo, válido por defecto
        }

        const rule = this.rules[attributeName];

        // Si se especifica una regla específica, solo ejecutar esa
        if (ruleKey !== null) {
            if (rule[ruleKey] && typeof rule[ruleKey] === 'function') {
                try {
                    const result = rule[ruleKey].call(this, value);
                    if (result === false) {
                        const message = rule.messages && rule.messages[ruleKey]
                            ? rule.messages[ruleKey]
                            : `Regla '${ruleKey}' falló para ${attributeName}`;
                        console.error(message)
                        this.setErrorMessages(attributeName, message);
                        return { valid: false, message: message };
                    }
                    return { valid: true, message: null };
                } catch (error) {
                    console.error(`Error ejecutando regla '${ruleKey}' para ${attributeName}:`, error);
                    this.setErrorMessages(attributeName, `Error en regla '${ruleKey}': ` + error.message);
                    return { valid: false, message: `Error en regla '${ruleKey}'` };
                }
            }
            this.setErrorMessages(attributeName);
            return { valid: true, message: null }; // Si no existe la regla específica, consideramos válido
        }

        // Si ruleKey es null, ejecutar todas las reglas del atributo
        for (const [key, ruleFunction] of Object.entries(rule)) {
            if (typeof ruleFunction === 'function') {
                try {
                    const result = ruleFunction.call(this, value);
                    if (result === false) {
                        const message = rule.messages && rule.messages[key]
                            ? rule.messages[key]
                            : `Regla '${key}' falló para ${attributeName}`;
                        console.error(message)
                        this.setErrorMessages(attributeName, message);
                        return { valid: false, message: message }; // Si alguna regla falla, retornar false inmediatamente
                    }
                } catch (error) {
                    console.error(`Error ejecutando regla '${key}' para ${attributeName}:`, error);
                    this.setErrorMessages(attributeName, `Error en regla '${key}': ` + error.message);
                    return { valid: false, message: `Error en regla '${key}'` };
                }
            }
        }
        this.setErrorMessages(attributeName);
        return { valid: true, message: null }; // Si todas las reglas pasaron, retornar true
    }

    setErrorMessages(attributeName, message = null){
        if(message) this.errorMessages[attributeName] =  this.#replaceAttributeWithLabel(attributeName, message)
        else delete this.errorMessages[attributeName]
        this.setErrorMessagesArray()
    }
    setErrorMessagesArray(){
        this.errorMessagesArray = [];
        for (const [key, value] of Object.entries(this.errorMessages)) {
            this.errorMessagesArray.push(value);
        }
        return this.errorMessagesArray;
    }

    #replaceAttributeWithLabel(key, text) {
        // Verificar si existe la etiqueta para el atributo
        if (this.attributeLabel && this.attributeLabel[key]) {
            // Crear regex para buscar el atributo (con límites de palabra para evitar coincidencias parciales)
            const regex = new RegExp(`\\b${key}\\b`, 'g');

            // Reemplazar el atributo por su etiqueta
            return text.replace(regex, this.attributeLabel[key]);
        }

        // Si no existe la etiqueta, devolver el texto original
        return text;
    }


}
