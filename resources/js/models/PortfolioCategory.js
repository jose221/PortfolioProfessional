import Model from "./Model";

export default class PortfolioCategory extends Model{
    required = ['code', 'title_es', 'title_en', 'description_es', 'description_en', 'user_id'];
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
