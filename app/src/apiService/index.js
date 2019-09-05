class ApiService {
  fetchData = async urlEntity =>  {
    this._apiUrl = '/api/v1/'
    const res = await fetch(`${this._apiUrl}${urlEntity}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${urlEntity}, status - ${res.status}`)
    }
    return await res.json();
  }

  getData = async type => {
    return await this.fetchData(type);
  }

  getStatistics = async filters => {
    const query = filters.reduce((str, filter, i) => str + `${filter.name}=${filter.value}${i < filters.length - 1 ? '&' : ''}`, 'statistics?');
    return await this.fetchData(query );
  }
}

export default ApiService;