
import Model from "./Model";

export default class ProfessionalExperience extends Model{
    required = ['company','job_es','job_en',
        'date_start','date_end',
        'description_es','description_en',
        'country_es','country_en',
        'image_path', 'user_id'];
    constructor(attributes = {
        id : 0,
        company : "",
        job_es : "",
        job_en : "",
        date_start : "",
        date_end : "",
        description_es : "",
        description_en : "",
        country_es : "",
        country_en : "",
        image_path: "",
        portfolio: "",
        updated_at: "",
        user_id: 0,
    }) {
        super(attributes)
    }
}
