import formateDate from './formateDate'

export default function getDataFromApi() {
    const from = formateDate(this.state.from)
    const to = formateDate(this.state.to)
    let url = `http://127.0.0.1:3000/api/v1/statistics?groupBy=${this.state.groupBy}&from=${from}&to=${to}&limit=10`

    if (this.state.offset) {
        url += `&offset=${this.state.offset}`
    }

    if (this.state.platform) {
        url += `&platform=${this.state.platform}`
    }

    if (this.state.operatingSystems) {
        this.state.operatingSystems.forEach( value => {
            url += `&operatingSystems[]=${value}`
        })
    }

    if (this.state.browsers) {
        this.state.browsers.forEach( value => {
            url += `&browsers[]=${value}`
        })
    }

    fetch(url)
    .then((response) => response.json())
    .then((response) => {

        this.setState({
            data: response,
            needToUpdate: false,
        })
    })
}