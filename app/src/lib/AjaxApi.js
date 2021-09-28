import {baseURL} from "../utils/API";

export class AjaxApi {

    static ajaxGet(paramUrl) {
        return new Promise(async (resolve, reject) => {
            let response = await fetch(baseURL + paramUrl);
            if(response.ok) {
                let result = await response.json(); // читаем ответ в формате JSON
                resolve(result);
            }
            reject("Data retrieval error. Try reload the page");
        })
    }
}