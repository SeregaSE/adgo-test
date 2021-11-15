import React, { Component } from 'react'
import config from '../config'
class Server extends Component {
  constructor() {
    super()
    this.__apiBase = `${config}/api/v1`
  }
  async getResource(url) {
    const res = await fetch(`${this.__apiBase}${url}`)
    if (!res.ok) {
      throw new Error(`${url} : ${res.status}`)
    }

    return await res.json()
  }
  getBrowser() {
    return this.getResource('/browsers')
  }
  getPlatform() {
    return this.getResource('/platforms')
  }
  getOS() {
    return this.getResource('/operating-systems')
  }
}
export default Server
