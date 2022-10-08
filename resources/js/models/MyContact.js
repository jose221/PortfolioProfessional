import Model from "./Model";

export default class MyContact extends Model{
    required = [
        "name_es",
        "name_en",
        "url_path",
        "icon_path",
        "user_id"
    ];
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
