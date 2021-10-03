import {ADDPLATFORMS, ADDBROUSER, OPERATINGSYSTEMS, GROUPS, ADDSPISOK} from './actionType'

export const addplatforms = (payload)=>{
  return {
    type: ADDPLATFORMS,
    payload
  }
}

export const addbrouser = (payload)=>{
  return {
    type: ADDBROUSER,
    payload
  }
}

export const oparatingSystem = (payload)=>{
  return {
    type: OPERATINGSYSTEMS,
    payload
  }
}
export const groups = (payload)=>{
  return {
    type: GROUPS,
    payload
  }
}

export const addSpisok = (payload)=>{
  return {
    type: ADDSPISOK,
    payload
  }
}
