import axios from 'axios'

const url = 'http://localhost:3100'

export const getData = (urlState) => (dispatch) => {
    
    const {browsers, platform, os, from, to, groupby, limit, offset} = urlState
    
    let fromDefault = from.value ? from.value : new Date(new Date().setDate(new Date().getDate()-1))
    let toDefault = to.value ? to.value : new Date(new Date().setDate(new Date().getDate()))
    let formatDate = (date) => {
        return [
            date.getFullYear(),
            ('0' + (date.getMonth() + 1)).slice(-2),
            ('0' + date.getDate()).slice(-2)
          ].join('-')
    }
    
    const urlBrowsers = browsers.value ? browsers : {url: '', value: ''}
    const urlPlatform = platform.value ? platform : {url: '', value: ''}
    const urlOS= os.value ? os : {url: '', value: ''}

    axios.get(`${url}/api/v1/statistics?groupBy=${groupby.value}&${urlOS.url}${urlOS.value}&${urlPlatform.url}${urlPlatform.value}&${urlBrowsers.url}${urlBrowsers.value}&from=${formatDate(fromDefault)}&to=${formatDate(toDefault)}&offset=${offset}&limit=${limit}`).then(res => {
            
        const items = Math.ceil(Number(res.data.count) / 25) 

            dispatch({
                type: 'DEFAULT_DATA',
                payload: res.data.rows,
                items: items
            })
            
    }).catch(err => {
        console.log(err)
    })
    
}

export const changeUrl = (type, value) => (dispatch) => {
    
    dispatch({
        type: 'SET_URL',
        urltype: type,
        value: value,
        offset: 0,
        activePage: 1
    })
    
}

export const changePage = (offset, page) => (dispatch) => {
    dispatch({
        type: 'CHANGE_PAGE',
        offset: offset,
        page: page
    })
}

export const getOptionsGroup = () => (dispatch) => {
    axios.all([
        axios.get(`${url}/api/v1/platforms`),
        axios.get(`${url}/api/v1/browsers`),
        axios.get(`${url}/api/v1/operating-systems`),
        axios.get(`${url}/api/v1/groups`)])
        .then(axios.spread((p, b, os, g) => {
            dispatch({
                type: 'OPTIONS_GROUP',
                payload: {
                    groupby: g.data,
                    platform: p.data,
                    os: os.data,
                    browser: b.data
                }
            })
        })).catch(err => {
            console.log(err)
        })
    
}