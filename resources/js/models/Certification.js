import Model from "./Model";

export default class Certification extends Model{
    required = [
        "user_id",
        "name",
        "issuing_organization",
        "issue_date"
    ];

    attributeLabel = {
        name: "El nombre de la certificación",
        category: "La categoría de la certificación",
        credential_id: "El ID de la credencial",
        credential_url: "La URL de la credencial",
        description: "La descripción de la certificación",
        expiration_date: "La fecha de expiración",
        image_path: "La imagen de la certificación",
        issue_date: "La fecha de emisión",
        issuing_organization: "La organización emisora",
        renewal_required: "Si se requiere renovación",
        status: "El estado de la certificación",
        user_id: "El ID del usuario"
    }
    constructor(attributes = {
        id : 0,
        name : "",
        category : "",
        credential_id : "",
        credential_url : "",
        description : "",
        expiration_date : "",
        image_path : "",
        issue_date : "",
        issuing_organization : "",
        renewal_required : false,
        status : "active",
        user_id : 0,
    }) {
        super(attributes)
    }
}
