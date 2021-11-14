import React, { Component } from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import '../.././index.css'
export default class FilterMenu extends Component {
  constructor() {
    super()
    this.state = {
      isOpenBrowser: false,
      isOpenOs: false,
      isOpenPlatform: false,
      isOpenGroup: false,
      browsers: [],
      platform: [],
      os: [],
      groups: [],
      statistics: [],
    }
  }
  toggleBrowser = () => {
    this.setState({ isOpenBrowser: !this.state.isOpenBrowser })
  }
  toggleOs = () => {
    this.setState({ isOpenOs: !this.state.isOpenOs })
  }
  togglePlatform = () => {
    this.setState({ isOpenPlatform: !this.state.isOpenPlatform })
  }
  toggleGroup = () => {
    this.setState({ isOpenGroup: !this.state.isOpenGroup })
  }
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/browsers')
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          browsers: result,
        })
      })
    fetch('http://localhost:3000/api/v1/platforms')
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          platform: result,
        })
      })
    fetch('http://localhost:3000/api/v1/operating-systems')
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          os: result,
        })
      })
    fetch('http://localhost:3000/api/v1/groups')
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          groups: result,
        })
      })
  }
  render() {
    const { isOpenBrowser, isOpenOs, isOpenPlatform, isOpenGroup } = this.state
    const { browsers, platform, os, groups } = this.state

    return (
      <div className="filter__block">
        <div className="d-flex justify-content-center p-5">
          <Dropdown isOpen={isOpenBrowser} toggle={this.toggleBrowser}>
            <DropdownToggle caret>browsers</DropdownToggle>
            <DropdownMenu dark flip={true}>
              {browsers.map((i) => (
                <DropdownItem onClick={() => console.log(i.label)} caret>
                  {i.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center p-5">
          <Dropdown isOpen={isOpenOs} toggle={this.toggleOs}>
            <DropdownToggle caret>operating system</DropdownToggle>
            <DropdownMenu dark flip={false}>
              {os.map((i) => (
                <DropdownItem onClick={() => console.log(i.label)} caret>
                  {i.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center p-5">
          <Dropdown isOpen={isOpenPlatform} toggle={this.togglePlatform}>
            <DropdownToggle caret>Platform</DropdownToggle>
            <DropdownMenu dark flip={false}>
              {platform.map((i) => (
                <DropdownItem onClick={() => console.log(i.label)} caret>
                  {i.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center p-5">
          <Dropdown isOpen={isOpenGroup} toggle={this.toggleGroup}>
            <DropdownToggle caret>Group</DropdownToggle>
            <DropdownMenu dark flip={false}>
              {groups.map((i) => (
                <DropdownItem onClick={() => console.log(i.label)} caret>
                  {i.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    )
  }
}
