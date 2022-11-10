import Model from "./Model";

export default class KnowLedge extends Model{
    required = [
        "description_en",
        "description_es",
        "icon_path",
        "title_en",
        "title_es",
        "user_id"
    ];
    constructor(attributes = {
        id : 0,
        description_en : "",
        description_es : "",
        title_es : "",
        title_en : "",
        icon_path : "",
        user_id : 0,
        important: 0,
    }) {
        super(attributes)
    }
}
