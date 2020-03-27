import React from 'react'
import {DatePicker} from 'react-materialize'

class elemDate extends React.Component {

    constructor() {
        super()
        this.selectDate = this.selectDate.bind(this)
        this.setUrl = this.setUrl.bind(this)
    }

    selectDate(date) {
        this.state = date
    }

    setUrl (type, value) {
        this.props.changeUrl(type, value)
        const urlState = this.props.urlState
        this.props.getData(urlState)
    }

    render() {
        const defaultDate = new Date(this.props.defaultDate) 
        const type = this.props.optionType
        const id = Math.random().toString(3).substring(2)

        return (
            <DatePicker
            onChange={this.selectDate}
            
            id={id}
            data-type={type}
            options={{
              autoClose: true,
              container: null,
              defaultDate: defaultDate,
              disableDayFn: null,
              disableWeekends: false,
              events: [],
              firstDay: 1,
              format: 'yyyy-mm-dd',
              i18n: {
                cancel: null,
                clear: 'Clear',
                done: null,
                months: [
                  'Январь',
                  'Февраль',
                  'Март',
                  'Апрель',
                  'Май',
                  'Июнь',
                  'Июль',
                  'Август',
                  'Сентябрь',
                  'Октябрь',
                  'Ноябрь',
                  'Декабрь'
                ],
                monthsShort: [
                  'Янв',
                  'Фев',
                  'Мар',
                  'Апр',
                  'Май',
                  'Июн',
                  'Июл',
                  'Авг',
                  'Сен',
                  'Окт',
                  'Ноя',
                  'Дек'
                ],
                nextMonth: '›',
                previousMonth: '‹',
                weekdays: [
                  'Воскресенье',
                  'Понедельник',
                  'Вторник',
                  'Среда',
                  'Четверг',
                  'Пятница',
                  'Суббота'
                  
                ],
                weekdaysAbbrev: [
                  'Вс',
                  'П',
                  'В',
                  'С',
                  'Ч',
                  'П',
                  'Сб',
                  
                ],
                weekdaysShort: [
                  'Вос',
                  'Пон',
                  'Вто',
                  'Сре',
                  'Чет',
                  'Пят',
                  'Суб',
                  
                ]
              },
              isRTL: false,
              maxDate: null,
              minDate: null,
              onClose: ()=> {
                let date = this.state
                let type = this.props.optionType
                this.setUrl(type, date)
                 
             },
              onDraw: null,
              onOpen: null,
              onSelect: null,
              parse: null,
              setDefaultDate: true,
              showClearBtn: false,
              showDaysInNextAndPreviousMonths: false,
              showMonthAfterYear: false,
              yearRange: 10
            }}
           />
        )
        
    }
}

export default elemDate