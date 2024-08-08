import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { isBefore } from 'date-fns'
import PropTypes from 'prop-types'
import './DateRangePicker.scss'

const MyDatePicker = ({ dateRangeUpdated }) => {
  const today = new Date()
  const [range, setRange] = useState(undefined) // No dates selected by default

  const updateRange = (newRange) => {
    if (newRange?.from && isBefore(newRange.from, today)) {
      // Ensure the 'from' date is not before today
      newRange = { from: today, to: newRange.to }
    }
    if (newRange?.to && isBefore(newRange.to, today)) {
      // Ensure the 'to' date is not before today
      newRange = { from: today, to: today }
    }
    setRange(newRange)
    dateRangeUpdated(newRange)
  }

  return (
    <div>
      <DayPicker
        mode="range"
        defaultMonth={today} // Focus on the current month
        selected={range}
        onSelect={updateRange}
      />
    </div>
  )
}

MyDatePicker.propTypes = {
  dateRangeUpdated: PropTypes.func.isRequired,
}

export default MyDatePicker
