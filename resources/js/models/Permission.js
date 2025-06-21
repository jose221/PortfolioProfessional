import Model from "./Model";

export default class Permission extends Model{
    required = ['can_create','can_read','can_update','can_delete','role_id', 'module_id'];
    casts = {
        can_create:"boolean",
        can_read:"boolean",
        can_update:"boolean",
        can_delete:"boolean"
    };
    constructor(attributes = {
        id : 0,
        can_create : false,
        can_read : false,
        can_update : false,
        can_delete : false,
        role_id : 0,
        module_id: 0
    }) {
        super(attributes)
    }
}
