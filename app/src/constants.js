export const Base_Path = 'http://localhost:3000/api/v1/';
export const getStatistics = 'statistics?groupBy=';

export const INCREASE_OFFSET = 'INCREASE_OFFSET';
export const REDUCE_OFFSET = 'REDUCE_OFFSET';
export const CHANGE_OFFSET = 'CHANGE_OFFSET';


export function ucFirst(str) {
    if (!str) return str;
  
    return str[0].toUpperCase() + str.slice(1);
}

export function findGroup(obj, group){
    for (var key in obj){
        if(key === group){
            return obj[key]
        }
        return null;
    }
}

export function makeArray(number){
    let pagesArr = [];
    for(let i = 0; i<Math.ceil(number/25); i++){
        pagesArr.push(i);
    }
    return pagesArr;
}

export function getDifference(date1, date2){
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    var diff = d2 - d1;
    var milliseconds = diff;
    var seconds = milliseconds / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    return days
}