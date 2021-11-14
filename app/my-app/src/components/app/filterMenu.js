import React, { Component } from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import '../.././index.css'
export default class FilterMenu extends Component {
  render() {
    return (
      <div className="filter__block">
        <div className="d-flex justify-content-center p-5">
          <Dropdown isOpen toggle={function noRefCheck() {}}>
            <DropdownToggle caret>Browsers</DropdownToggle>
            <DropdownMenu dark flip={false}>
              <DropdownItem>chrome</DropdownItem>
              <DropdownItem>firefox</DropdownItem>
              {/* <DropdownItem>uc browser</DropdownItem>
              <DropdownItem>opera</DropdownItem>
              <DropdownItem>chrome mobile</DropdownItem>
              <DropdownItem>chrome webdew</DropdownItem>
              <DropdownItem>android browser</DropdownItem>
              <DropdownItem>uc brouser mobile</DropdownItem>
              <DropdownItem>opera mini</DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center p-5">
          <Dropdown isOpen toggle={function noRefCheck() {}}>
            <DropdownToggle caret>operating system</DropdownToggle>
            <DropdownMenu dark flip={false}>
              <DropdownItem>ios</DropdownItem>
              <DropdownItem>android</DropdownItem>
              <DropdownItem>mac</DropdownItem>
              <DropdownItem>window</DropdownItem>
              <DropdownItem>linux</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center p-5">
          <Dropdown isOpen toggle={function noRefCheck() {}}>
            <DropdownToggle caret>Platform</DropdownToggle>
            <DropdownMenu dark flip={false}>
              <DropdownItem>desktop</DropdownItem>
              <DropdownItem>mobile</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center p-5">
          <Dropdown isOpen toggle={function noRefCheck() {}}>
            <DropdownToggle caret>Group</DropdownToggle>
            <DropdownMenu dark flip={false}>
              <DropdownItem>day</DropdownItem>
              <DropdownItem>Platform</DropdownItem>
              <DropdownItem>os</DropdownItem>
              <DropdownItem>Browser</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    )
  }
}
