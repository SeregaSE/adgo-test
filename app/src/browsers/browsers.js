import { useState } from "react"
import PostService from "../Api/PostService"

const browsers = [
  'Chrome',
  'Firefox',
  'UCbrowser',
  'Opera',
  'Mobile',
  'ChromeWebview',
  'Androidbrowser',
  'UCbrowsermobile',
  'Opera Mini',
]

const Browsers = ({ setAllBrowsers, setBrowsers }) => {


  // const getPageArray = () => {
  // let result = []
  //   for(let i = 0; i < browsers; i++){
  //       result.push(i + 1)
  //   }
  // }

  return <div>
    <select onChange={(e)=> setBrowsers(e.target.value)} id="selectid">
      <option></option>
      {browsers.map((v, i) => <option value={++i}>{v}</option>)}
    </select>
  </div>
}

// key={atob(i + v)}
export default Browsers;