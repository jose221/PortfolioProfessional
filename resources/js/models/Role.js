import Model from "./Model";

export default class Role extends Model{
    required = ['name_es','name_en','description_es','description_en','key'];
    attributeLabel = {
        name_es: "El nombre en español",
        name_en: "La nombre en inglés",
        description_es: "La descripción en español",
        description_en: "La descripción en inglés",
        key: "La clave"
    }
    constructor(attributes = {
        id : 0,
        name_es : "",
        name_en : "",
        description_es : "",
        description_en : "",
        key : ""
    }) {
        super(attributes)
    }
}
