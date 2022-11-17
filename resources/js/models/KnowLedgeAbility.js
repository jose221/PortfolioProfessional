import Model from "./Model";

export default class KnowLedgeAbility extends Model{
    required = [
        "description_en",
        "description_es",
        "title_en",
        "title_es",
        "knowledges_id"
    ];
    constructor(attributes = {
        id : 0,
        description_en : "",
        description_es : "",
        title_es : "",
        title_en : "",
        knowledges_id : 0,
    }) {
        super(attributes)
    }
}
