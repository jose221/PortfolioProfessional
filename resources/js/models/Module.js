import Model from "./Model";

export default class Module extends Model{
    required = ['name_es', 'tag', 'path', 'name_en','description_es','description_en','key'];
    casts = {
        'hidden': 'boolean'
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
