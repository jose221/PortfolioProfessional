import Model from "./Model";

export default class User extends Model{
    required = [
        "name",
        "email"
    ];
    constructor(attributes = {
                    id : 0,
                    name : "",
                    age : 0,
                    date_birthday : "",
                    nationality_es : "",
                    nationality_en : "",
                    description_es : "",
                    description_en : "",
                    country_es : "",
                    country_en : "",
                    header_image_path : "",
                    my_perfil : "",
                    logo : "",
                    slogan_es : "",
                    created_at : "",
                    updated_at : "",
                    cv : "",
                    slogan_en: "",
                    avatar : "",
                    header_text_es : "",
                    header_text_en : "",
                }) {
        console.log("los atributos son: ", attributes)
        super(attributes)
    }
}
