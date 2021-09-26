import {baseURL} from "../utils/API";

export class AjaxApi {

    static ajaxGet(paramUrl) {
        return new Promise(async (resolve, reject) => {
            let response = await fetch(baseURL + paramUrl);
            let result = await response.json(); // читаем ответ в формате JSON
            resolve(result);
            reject(new Error('Error'));
        })
    }
}