import Model from "./Model";

export default class TokenPublicAPIUser extends Model{
    required = ['mode','domain','user_id'];
    constructor(attributes = {
        id : 0,
        mode : "",
        domain : "",
        user_id : 0,
    }) {
        super(attributes)
    }
}
