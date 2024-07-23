import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { addDays } from 'date-fns'

import styles from './DateRangePicker.module.scss'

function MyDatePicker() {
  const defaultMonth = new Date(2020, 5, 15)

  const defaultSelected = {
    from: defaultMonth,
    to: addDays(defaultMonth, 4),
  }
  const [range, setRange] = useState(defaultSelected)

  return (
    <div className={styles.container}>
      <DayPicker mode="range" defaultMonth={defaultMonth} selected={range} onSelect={setRange} classNames={styles} />
    </div>
  )
}

export default MyDatePicker
