import Model from "./Model";

export default class MyContact extends Model{
    required = [
        "name_es",
        "name_en",
        "url_path",
        "user_id"
    ];
    attributeLabel = {
        name_es: "El nombre en español",
        name_en: "La nombre en inglés",
        url_path: "La url"
    }
    constructor(attributes = {
        id : 0,
        name_es : "",
        name_en : "",
        url_path : "",
        icon_path : "",
        user_id : 0,
    }) {
        super(attributes)
    }
}
