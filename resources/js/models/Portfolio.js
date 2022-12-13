import Model from "./Model";

export default class Portfolio extends Model{
    required = ['code','icon_path','years_experience','knowledge_level','portfolio_categories_id', 'title_es', 'title_en', 'description_es', 'description_en'];
    constructor(attributes = {
        id : 0,
        code : "",
        title_es : "",
        icon_path : "",
        title_en : "",
        knowledge_level : 0,
        years_experience : 0,
        portfolio_categories_id : 0,
        description_es : "",
        description_en : "",
    }) {
        super(attributes)
    }
}
