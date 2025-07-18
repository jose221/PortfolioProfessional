import Model from "./Model";

export default class KnowLedge extends Model{
    required = [
        "description_en",
        "description_es",
        "title_en",
        "title_es",
        "user_id"
    ];
    attributeLabel = {
        title_es: "El título en español",
        title_en: "La título en inglés",
        description_es: "La descripción en español",
        description_en: "La descripción en inglés"
    }
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
