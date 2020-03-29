class APIService {

  _apiBase = 'http://localhost:3001/api/v1';

  getResource = async (url) => {
    const response = await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error (`Could not fetch ${url}, recieved ${response.status}`)
    }

    return await response.json();
  }

  getPlatforms = async () => {
    const res = await this.getResource('/platforms/');
    return res;
  }

  getBrowsers = async () => {
    const res = await this.getResource('/browsers/');
    return res;
  }

  getOperatingSystems = async () => {
    const res = await this.getResource('/operating-systems/');
    return res;
  }

  getGroups = async () => {
    const res = await this.getResource('/groups/');
    return res;
  }
  
  getStatistics = async (groupBy, from, to, limit = 25, offset = 0) => {
    const searchParams = `groupBy=${groupBy}&from=${from}&to=${to}&offset=${offset}&limit=${limit}`
    const res = await this.getResource(`/statistics?${searchParams}/`);
    return res;
  }
}

export default APIService;