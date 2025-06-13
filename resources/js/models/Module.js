import Model from "./Model";

export default class Module extends Model{
    required = ['name_es','name_en','description_es','description_en','key'];
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
