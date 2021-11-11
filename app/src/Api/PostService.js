import axios from 'axios'
import config from '../config';

// http://localhost:3000/api/v1/statistics?groupBy=day&from=2019-01-01&to=2019-12-31&browsers[]=1&operatingSystems[]=1



// https://example.com/?name=Jonathan&age=18


// let params = new URLSearchParams('https://example.com/?name=Jonathan&age=18');

// let name = params.get("name"); // is the string "Jonathan"
// let age = parseInt(params.get("age")); // is the number 18
// console.log(name)
// console.log(age)



// сделать общую функцию
class PostService {
    constructor() {
        this.axios = axios.create({ baseURL: `${config.host}/api/v1/` })
    }
    // async getAll() {
    //     return this.axios.get('statistics?groupBy=day&from=2019-01-01&to=2019-12-31')
    // }
    async getBrowserChromeMobile(groupBy, selectedDateStart, selectedDateEnd, browsers, operatingSystems, platform) {
        return this.axios.get(`statistics?groupBy=${groupBy}&from=${selectedDateStart}&to=${selectedDateEnd}&browsers[]=${browsers}&operatingSystems[]=${operatingSystems}&platform=${platform}`)
    }

    // async getBrowserFirefox() {
    //     return this.axios.get('statistics?groupBy=day&from=2019-01-01&to=2019-12-31&browsers[]=2')
    // }
    // async getBrowserChrome() {
    //     return this.axios.get('statistics?groupBy=day&from=2019-01-01&to=2019-12-31&browsers[]=1')
    // }
    // async getWindows() {
    //     return this.axios.get('statistics?groupBy=day&from=2019-01-01&to=2019-12-31&browsers[]=1&operatingSystems[]=1')
    // }
    // async getPlatform(platforms) {
    //     return this.axios.get(`${platforms}`)
    // }
}

// statistics?groupBy=day&from=2019-01-01&to=2019-12-31&browsers[]=1&operatingSystems[]=1




// const paramsString = 'q=URLUtils.searchParams&topic=api';
// let searchParams = new URLSearchParams(paramsString);

// //Iterate the search parameters.
// for (let p of searchParams) {
//   console.log(p);
// }

// searchParams.has('topic') === true;      // true
// searchParams.get('topic') === "api";     // true
// searchParams.getAll('topic');            // ["api"]




// http://localhost:3000/api/v1/statistics?groupBy=day&from=2019-07-01&to=2019-08-12

export default new PostService()