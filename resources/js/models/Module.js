import Model from "./Model";

export default class Module extends Model{
    required = ['name_es', 'tag', 'path', 'name_en','description_es','description_en','key'];
    casts = {
        'hidden': 'boolean'
    }
    attributeLabel = {
        name_es: "El nombre en español",
        name_en: "El nombre en inglés",
        description_es: "La descripción en español",
        description_en: "La descripción en inglés",
        tag: "La etiqueta",
        path: "El path",
    }
    constructor(attributes = {
        id : 0,
        name_es : "",
        name_en : "",
        description_es : "",
        description_en : "",
        tag : "",
        hidden : false,
        path : ""
    }) {
        super(attributes)
    }
}
