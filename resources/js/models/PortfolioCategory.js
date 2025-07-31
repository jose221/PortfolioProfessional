import Model from "./Model";

export default class PortfolioCategory extends Model{
    required = ['code', 'title_es', 'title_en', 'user_id'];
    attributeLabel = {
        code: "El código",
        title_es: "El título en español",
        title_en: "La título en inglés",
        description_es: "La descripción en español",
        description_en: "La descripción en inglés"
    }
    constructor(attributes = {
        id : 0,
        code : "",
        title_es : "",
        title_en : "",
        description_es : "",
        description_en : "",
        user_id : 0,
    }) {
        super(attributes)
    }
}
