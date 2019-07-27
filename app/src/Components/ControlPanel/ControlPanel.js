import React from 'react';
import './ControlPanel.css'

const ControlPanel = ({children}) => {
    const [from, to, ...rest] = children
    return (
      <div className="control-panel" >
        <div className='date-block'>
          {from}
        </div>
        <div className='date-block'>
          {to}
        </div>
        <div className='options-block'>
          {rest.map(child => {
            return child;})}
        </div>
      </div>
    );
  }
  
  export default ControlPanel;