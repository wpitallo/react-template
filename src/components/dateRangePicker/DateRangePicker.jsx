import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { addDays } from 'date-fns'
import PropTypes from 'prop-types'
import './DateRangePicker.scss'

const MyDatePicker = ({ dateRangeUpdated }) => {
  const defaultMonth = new Date(2020, 5, 15)

  const defaultSelected = {
    from: defaultMonth,
    to: addDays(defaultMonth, 4),
  }
  const [range, setRange] = useState(defaultSelected)

  const updateRange = (newRange) => {
    setRange(newRange)
    dateRangeUpdated(range)
  }

  return (
    <div>
      <DayPicker mode="range" defaultMonth={defaultMonth} selected={range} onSelect={updateRange} />
    </div>
  )
}

MyDatePicker.propTypes = {
  dateRangeUpdated: PropTypes.func.isRequired,
}

export default MyDatePicker
