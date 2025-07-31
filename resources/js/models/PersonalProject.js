
import Model from "./Model";

export default class PersonalProject extends Model{
    required = ['name_es','name_en','date_upload','link','user_id'];
    attributeLabel = {
        name_es: "El nombre en español",
        name_en: "La nombre en inglés",
        description_es: "La descripción en español",
        description_en: "La descripción en inglés",
        date_upload: "La fecha de subida",
        link: "El link",
    }
    constructor(attributes = {
        id : 0,
        name_es : "",
        name_en : "",
        date_upload : "",
        link : "",
        description_es : "",
        description_en : "",
        image_path: "",
        updated_at: "",
        user_id: 0,
    }) {
        super(attributes)
    }
}
