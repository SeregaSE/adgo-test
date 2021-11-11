import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { compareAsc, format } from 'date-fns'


const Date = ({
    selectedDateStart,
    setSelectedDateStart,
    selectedDateEnd,
    setSelectedDateEnd
}) => {


    // let dar = new window.Date() 
    // console.log(format(dar, 'yyyy-MM-dd'))

    return <div>
        <div className='fromto'>
            <p>From</p>
            <p className='to'>To</p>
        </div>
        <div className='to1'>
            <DatePicker
                value={selectedDateStart}
                // selected={console.log(selectedDateStart)}
                onChange={date => setSelectedDateStart(format(date, 'yyyy-MM-dd'))}
                dateFormat='yyyy-MM-dd' />

            <div className='picker'>
            <DatePicker
                value={selectedDateEnd}
                selected={console.log(selectedDateEnd)}
                onChange={date => console.log(setSelectedDateEnd(format(date, 'yyyy-MM-dd')))}
                dateFormat='yyyy-mm-dd' />
            </div>
        </div>
    </div>
}

export default Date