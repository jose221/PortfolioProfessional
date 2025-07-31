import Model from "./Model";

export default class Portfolio extends Model{
    required = ['code','years_experience','knowledge_level','portfolio_categories_id', 'title_es', 'title_en'];
    attributeLabel = {
        code: "El código",
        title_es: "El título en español",
        title_en: "La título en inglés",
        description_es: "La descripción en español",
        description_en: "La descripción en inglés",
        knowledge_level: "Nivel de conocimiento",
        years_experience: "Años de experiencia",
    }
    constructor(attributes = {
        id : 0,
        code : "",
        title_es : "",
        title_en : "",
        description_es : "",
        description_en : "",
        knowledge_level : 0,
        years_experience : 0,
        portfolio_categories_id : 0,
    }) {
        super(attributes)
    }
}
