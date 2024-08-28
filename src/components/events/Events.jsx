import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import styles from './Events.module.scss'
import eventStyles from '../event/Event.module.scss'
import { getImage } from '@helpers/imageHelper'

const Events = ({ eventsData, selectedEvents, setSelectedEvents, selectedLeagueTeams }) => {
  const getTeamBadge = useCallback(
    (teamName) => {
      const team = selectedLeagueTeams.find((team) => team.strTeam === teamName)
      return team ? team.strBadge : ''
    },
    [selectedLeagueTeams],
  )

  const toggleEventSelection = useCallback(
    (eventKey) => {
      setSelectedEvents((prevState) => ({
        ...prevState,
        [eventKey]: { ...prevState[eventKey], isSelected: !prevState[eventKey]?.isSelected },
      }))
    },
    [setSelectedEvents],
  )

  // Use useMemo to optimize filtering and sorting of events
  const visibleEvents = useMemo(() => {
    return eventsData
      .filter((event) => selectedEvents?.[event.eventKey]?.isVisible)
      .sort((a, b) => {
        const dateA = new Date(`${a.dateEvent}T${a.strTime}`)
        const dateB = new Date(`${b.dateEvent}T${b.strTime}`)
        return dateA - dateB // Sort by most recent first
      })
  }, [eventsData, selectedEvents])

  return (
    <>
      {visibleEvents.map((event, index) => (
        <div key={index} className={eventStyles.eventItemWrapper}>
          <div className={`${styles.eventItem} ${!selectedEvents?.[event.eventKey]?.isSelected ? styles.unSelected : ''}`} onClick={() => toggleEventSelection(event.eventKey)}>
            <div className={styles.eventColumn}>
              <div className={`${styles.checkbox} ${selectedEvents?.[event.eventKey]?.isSelected ? 'icon-checked' : 'icon-unchecked'}`}></div>
              <img src={getImage(getTeamBadge(event.strHomeTeam))} alt={`${event.strHomeTeam} leagueLogo`} />
              <div className={styles.teamName}>{event.strHomeTeam}</div>
            </div>
            <div className={styles.eventMiddleColumn}>
              <div>VS</div>
              <div className={styles.eventDateMiddle}>&nbsp;</div>
              <div>
                {event.eventDateLocal} : {event.eventTimeLocal}
              </div>
            </div>
            <div className={styles.eventColumn}>
              <img src={getImage(getTeamBadge(event.strAwayTeam))} alt={`${event.strAwayTeam} leagueLogo`} />
              <div className={styles.teamName}>{event.strAwayTeam}</div>
            </div>
          </div>
        </div>
      ))}

      <div className={eventStyles.eventItemWrapper}>
        <div className={styles.eventContentLastRow}></div>
      </div>
    </>
  )
}

Events.propTypes = {
  eventsData: PropTypes.array.isRequired,
  selectedEvents: PropTypes.object,
  setSelectedEvents: PropTypes.func.isRequired,
  selectedLeagueTeams: PropTypes.array.isRequired,
  translator: PropTypes.func.isRequired,
}

export default Events
