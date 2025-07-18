
import Model from "./Model";

export default class ProfessionalExperience extends Model{
    casts = {
        portfolio:"array",
        still_working: "boolean"
    };
    required = ['company','job_es','job_en', 'date_start', 'country_es','country_en', 'user_id'];
    mapAttribute = {
        date_end: function (value){
            return this.still_working ? "" : value;
        }
    }
    showErrorMessageRequired = true;
    attributeLabel = {
        job_es: "La posición en Español",
        job_en: "La posición en Inglés",
        company: "El Nombre de la empresa",
        country_es: "El país en Español",
        country_en: "El país en Inglés",
        date_start: "La fecha de inicio",
        date_end: "La fecha de fin",
    }
    rules = {
        date_start: {
            isBeforeNow: function(value) {
                // Solo validar si hay valor
                if ((!value || !value.trim())) {
                    return true; // Si no hay valor, esta regla no aplica
                }

                const endDate = new Date(value);
                const today = new Date();

                // Establecer la hora a 00:00:00 para comparar solo fechas
                today.setHours(0, 0, 0, 0);
                endDate.setHours(0, 0, 0, 0);

                // La fecha de fin debe ser anterior o igual a hoy
                return endDate <= today;
            },
            isBeforeToDateEnd: function(value) {
                if (this.still_working && (!this.date_end || !this.date_end.trim())) {
                    return true; // Si no hay valor, esta regla no aplica
                }

                const endDate = new Date(value);
                const date_end = new Date(this.date_end);

                // Establecer la hora a 00:00:00 para comparar solo fechas
                date_end.setHours(0, 0, 0, 0);
                endDate.setHours(0, 0, 0, 0);

                // La fecha de fin debe ser anterior o igual a la fecha de fin
                return endDate <= date_end;
            },
            messages: {
                isBeforeNow: "La fecha de fin no puede ser una fecha futura",
                isBeforeToDateEnd: "La fecha inicio no puede ser anterior a la fecha de fin"
            }
        },
        date_end: {
            valid: function(value) {
                // Si está trabajando actualmente y no hay fecha de fin, es válido
                if (this.still_working && (!value || !value.trim())) {
                    return true;
                }

                // Si no está trabajando actualmente, debe tener fecha de fin
                if (!this.still_working && (!value || !value.trim())) {
                    return false;
                }

                return true;
            },
            isBeforeNow: function(value) {
                // Solo validar si hay valor
                if ((!value || !value.trim()) || this.still_working) {
                    return true; // Si no hay valor, esta regla no aplica
                }

                const endDate = new Date(value);
                const today = new Date();

                // Establecer la hora a 00:00:00 para comparar solo fechas
                today.setHours(0, 0, 0, 0);
                endDate.setHours(0, 0, 0, 0);

                // La fecha de fin debe ser anterior o igual a hoy
                return endDate <= today;
            },
            messages: {
                valid: "La fecha de fin es requerida cuando no se está trabajando actualmente",
                isBeforeNow: "La fecha de fin no puede ser una fecha futura"
            }
        }
    };


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
        user_id: 0,
        portfolio:[],
        still_working: false
    }) {
        super(attributes)
        this.formatCasts();
    }
}
