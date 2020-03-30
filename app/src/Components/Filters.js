import React, { Component } from 'react';

class Filters extends Component {
    constructor(props){
        super(props);
        this.state={
            isOSOpen:false,
            isBrowserOpen:false
        }
    }
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
                                <option defaultValue value=''>Select Platform</option>
                                <option value='1'>Desktop</option>
                                <option value='2'>Mobile</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label>Operating System</label> 
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='1' onChange={this.changeOS}/>Windows</div>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='2' onChange={this.changeOS}/>Mac OS</div>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='3' onChange={this.changeOS}/>Linux</div>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='4' onChange={this.changeOS}/>Android</div>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='5' onChange={this.changeOS}/>IOS</div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label>Browser</label>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='1' onChange={this.changeBrowser}/>Chrome</div>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='2' onChange={this.changeBrowser}/>Firefox</div>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='3' onChange={this.changeBrowser}/>UC browse</div>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='4' onChange={this.changeBrowser}/>Opera</div>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='5' onChange={this.changeBrowser}/>Chrome Mobile</div>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='6' onChange={this.changeBrowser}/>Chrome Webview</div>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='7' onChange={this.changeBrowser}/>Android browse</div>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='8' onChange={this.changeBrowser}/>UC browser mobil</div>
                                <div className="form-check"><input type="checkbox" className="form-check-input" value='9' onChange={this.changeBrowser}/>Opera Mini</div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Filters;