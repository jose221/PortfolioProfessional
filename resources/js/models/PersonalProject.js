
import Model from "./Model";

export default class PersonalProject extends Model{
    required = ['name_es','name_en','date_upload','link','description_es','description_en','image_path','user_id'];
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
