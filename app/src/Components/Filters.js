import React, { Component } from 'react';


class Filters extends Component {
    changeDateFrom = ({target: {value}}) => {
        this.props.changeFrom(value);
    }
    changeDateTo = ({target: {value}}) => {
        this.props.changeTo(value);
    }
    changeGroupBy = ({target: {value}}) => {
        this.props.changeGroupBy(value);
    }
    changePlatform = ({target: {value}}) => {
        this.props.changePlatform(value);
    }
    changeOS = ({target: {value}}) => {
        this.props.changeOS(value);
    }
    changeBrowser = ({target: {value}}) => {
        this.props.changeBrowser(value);
    }
    render() {
        return (
            <div>
                <form className="needs-validation">
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label>From</label>
                            <input type="date" className="form-control" defaultValue="2019-08-09" onChange={this.changeDateFrom}/>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label>To</label>
                            <input type="date" className="form-control" defaultValue="2019-08-10" onChange={this.changeDateTo}/>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label>Group by</label>
                            <select className="custom-select" onChange={this.changeGroupBy}>
                                <option defaultValue value='day'>Day</option>
                                <option value='platform'>Platform</option>
                                <option value='operatingSystem'>Operating system</option>
                                <option value='browser'>Browser</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label>Platform</label>
                            <select className="custom-select" onChange={this.changePlatform}>
                                <option defaultValue value=''>Slect Platform</option>
                                <option value='1'>Desktop</option>
                                <option value='2'>Mobile</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label>Operating System</label>
                            <select className="custom-select" onChange={this.changeOS}>
                                <option defaultValue value=''>Slect Operating System</option>
                                <option value='1'>Windows</option>
                                <option value='2'>Mac OS</option>
                                <option value='3'>Linux</option>
                                <option value='4'>Android</option>
                                <option value='5'>IOS</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label>Browser</label>
                            <select className="custom-select" onChange={this.changeBrowser}>
                                <option defaultValue value=''>Slect Browser</option>
                                <option value='1'>Chrome</option>
                                <option value='2'>Firefox</option>
                                <option value='3'>UC browser</option>
                                <option value='4'>Opera</option>
                                <option value='5'>Chrome Mobile</option>
                                <option value='6'>Chrome Webview</option>
                                <option value='7'>Android browse</option>
                                <option value='8'>UC browser mobile</option>
                                <option value='9'>Opera Mini</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Filters;