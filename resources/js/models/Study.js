import Model from "./Model";

export default class Study extends Model{
    required = ['caerrer_es','caerrer_en','school_es','school_en','user_id'];
    attributeLabel = {
        caerrer_es: "El carrera en español",
        caerrer_en: "La carrera en inglés",
        school_es: "La institución educativa en español",
        school_en: "La institución educativa en inglés",
    }
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
