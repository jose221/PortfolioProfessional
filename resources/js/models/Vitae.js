import Model from "./Model";

export default class Vitae extends Model{
    required = ['archive_name', 'path', 'archive_type'];
    constructor(attributes = {
        id : 0,
        archive_name : "",
        path : "",
        archive_type : "",
        user_id : 0,
    }) {
        super(attributes)
    }
}
