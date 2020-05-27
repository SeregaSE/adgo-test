import axios, { AxiosInstance } from 'axios'

const API_VERSION = 'v1'

export abstract class ApiService {
  private readonly _http: AxiosInstance
  private readonly _url: string

  protected constructor(version: string = API_VERSION) {
    this._http = axios.create({ baseURL: 'http://127.0.0.1:3000' })
    this._url = `api/${version}`
  }

  get http() {
    return this._http
  }

  get url() {
    return this._url
  }
}
