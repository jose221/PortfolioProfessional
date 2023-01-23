import Model from "./Model";

export default class Auth extends Model{
    required = [
        "email",
        "description"
    ];
    constructor(attributes = {
        email:"",
        password: ""
    }) {
        super(attributes)
    }
}

