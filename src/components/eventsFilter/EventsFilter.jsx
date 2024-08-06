import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './EventsFilter.module.scss'
import Modal from '@components/modals/fullScreen/ModalFullScreen'
import DateRangePicker from '@components/dateRangePicker/DateRangePicker'
import { translator } from '@globalHelpers/translations'

const EventsFilter = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('allEvents')

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
  }

  const radioItems = {
    allEvents: translator('allEvents'),
    thisWeek: translator('thisWeek'),
    today: translator('today'),
    thisMonth: translator('thisMonth'),
  }

  return (
    <>
      <div className={styles.eventsFilter}>
        <div className={styles.eventsFilterHeader} onClick={toggleModal}>
          <div className={`${styles.checkbox} ${isOpen ? 'icon-checked' : 'icon-unchecked'}`}></div>
          <span>{title}</span>
        </div>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className={styles.filter}>
            <div className={styles.flexContainer}>
              <div className={styles.radioButtonWrapper}>
                <div className={styles.flexRow}>
                  <div className={`${styles.flexItem} ${styles.responsiveRadioButton}`} onClick={() => handleFilterChange('allEvents')}>
                    <div className={`${styles.radioButtonIcon} ${selectedFilter === 'allEvents' ? 'icon-checked' : 'icon-unchecked'}`}></div>
                    <span>{radioItems.allEvents}</span>
                  </div>
                  <div className={`${styles.flexItem} ${styles.responsiveRadioButton}`} onClick={() => handleFilterChange('thisWeek')}>
                    <div className={`${styles.radioButtonIcon} ${selectedFilter === 'thisWeek' ? 'icon-checked' : 'icon-unchecked'}`}></div>
                    <span>{radioItems.thisWeek}</span>
                  </div>
                </div>
                <div className={styles.flexRow}>
                  <div className={`${styles.flexItem} ${styles.responsiveRadioButton}`} onClick={() => handleFilterChange('today')}>
                    <div className={`${styles.radioButtonIcon} ${selectedFilter === 'today' ? 'icon-checked' : 'icon-unchecked'}`}></div>
                    <span>{radioItems.today}</span>
                  </div>
                  <div className={`${styles.flexItem} ${styles.responsiveRadioButton}`} onClick={() => handleFilterChange('thisMonth')}>
                    <div className={`${styles.radioButtonIcon} ${selectedFilter === 'thisMonth' ? 'icon-checked' : 'icon-unchecked'}`}></div>
                    <span>{radioItems.thisMonth}</span>
                  </div>
                </div>
              </div>
              <div className={styles.flexRow}>
                <div className={styles.dateRangePickerContainer}>
                  <DateRangePicker />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.eventsFilterContent}>{children}</div>
        </Modal>
      )}
    </>
  )
}

EventsFilter.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default EventsFilter
