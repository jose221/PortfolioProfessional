import Model from "./Model";

export default class Study extends Model{
    required = ['caerrer_es','caerrer_en','school_es','school_en','folio','user_id'];
    constructor(attributes = {
        id : 0,
        caerrer_es : "",
        caerrer_en : "",
        school_es : "",
        school_en : "",
        folio : "",
        user_id : 0,
    }) {
        super(attributes)
    }
}
