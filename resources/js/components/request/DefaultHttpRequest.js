// resources/js/components/HttpRequest.js

import {DefaultService} from "../../services/DefaultService";

export default class DefaultHttpRequest{


    /**
     * Obtiene un único item del servidor
     * @param {string} url - URL del endpoint
     * @param {Object} params - Parámetros de la petición
     * @returns {Promise<Object>} - Datos del servidor
     */
    async find(url, params = {}) {
        let data = await DefaultService.find(url, params);
        return data;
    }

    /**
     * Obtiene múltiples items del servidor
     * @param {string} url - URL del endpoint
     * @param {Object} params - Parámetros de la petición
     * @param {Object} config - Configuración adicional
     * @returns {Promise<Array>} - Datos del servidor
     */
    async all(url, params = {}, config = {}) {
        let data = await DefaultService.all(url, params, config);
        return data;
    }

    /**
     * Actualiza un item en el servidor
     * @param {string} url - URL del endpoint
     * @param {Object} params - Datos a actualizar
     * @returns {Promise<Object>} - Respuesta del servidor
     */
    async update(url, params) {
        let response = await DefaultService.update(url, params);
        return response;
    }

    /**
     * Crea un nuevo item en el servidor
     * @param {string} url - URL del endpoint
     * @param {Object} params - Datos del nuevo item
     * @returns {Promise<Object>} - Respuesta del servidor
     */
    async create(url, params) {
        let response = await DefaultService.create(url, params);
        return response;
    }


    /**
     * Sends a POST request to the specified URL with the provided parameters.
     *
     * @param {string} url - The URL endpoint where the POST request is sent.
     * @param {Object} params - The parameters to include in the POST request body.
     * @return {Promise<any>} A promise that resolves to the response of the POST request.
     */
    async post(url, params) {
        return await DefaultService.post(url, params);
    }

    /**
     * Elimina items del servidor
     * @param {string} url - URL del endpoint
     * @param {Array|Object} params - IDs a eliminar o objeto con ids
     * @returns {Promise<Object>} - Respuesta del servidor
     */
    async delete(url, params) {
        let response = await DefaultService.delete(url, params);
        return response;
    }

    /**
     * Edita un item en el servidor (usado en handleEdit)
     * @param {string} url - URL del endpoint
     * @param {Object} params - Datos a editar
     * @returns {Promise<Object>} - Respuesta del servidor
     */
    async edit(url, params) {
        let response = await DefaultService.edit(url, params);
        return response;
    }
}
