import Model from "./Model";

export default class Permission extends Model{
    required = ['can_create','can_read','can_update','can_delete','role_id', 'role_id'];
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
