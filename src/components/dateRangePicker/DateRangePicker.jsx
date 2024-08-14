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
      newRange.from = today // Ensure 'from' date is today or later
    }

    if (newRange?.to && isBefore(newRange.to, today)) {
      newRange.to = today // Ensure 'to' date is today or later
    }

    // If 'to' date is before 'from' date after adjustment, set 'to' date to 'from' date
    if (newRange?.from && newRange?.to && isBefore(newRange.to, newRange.from)) {
      newRange.to = newRange.from
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
        disabled={{ before: today }} // Disable all dates before today
      />
    </div>
  )
}

MyDatePicker.propTypes = {
  dateRangeUpdated: PropTypes.func.isRequired,
}

export default MyDatePicker
