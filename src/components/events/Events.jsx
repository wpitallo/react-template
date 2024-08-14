import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import templateStyles from './Events.module.scss'
import eventStyles from '../event/Event.module.scss'
import { getImage } from '@globalHelpers/imageHelper'

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

  // Use useMemo to optimize filtering of events
  const visibleEvents = useMemo(() => eventsData.filter((event) => selectedEvents?.[event.eventKey]?.isVisible), [eventsData, selectedEvents])

  return (
    <>
      {visibleEvents.map((event, index) => (
        <div key={index} className={eventStyles.eventItemWrapper}>
          <div className={`${templateStyles.eventItem} ${!selectedEvents?.[event.eventKey]?.isSelected ? templateStyles.unSelected : ''}`} onClick={() => toggleEventSelection(event.eventKey)}>
            <div className={templateStyles.eventColumn}>
              <div className={`${templateStyles.checkbox} ${selectedEvents?.[event.eventKey]?.isSelected ? 'icon-checked' : 'icon-unchecked'}`}></div>
              <img src={getImage(getTeamBadge(event.strHomeTeam))} alt={`${event.strHomeTeam} leagueLogo`} />
              <div className={templateStyles.teamName}>{event.strHomeTeam}</div>
            </div>
            <div className={templateStyles.eventMiddleColumn}>
              <div>VS</div>
              <div className={templateStyles.eventDateMiddle}>&nbsp;</div>
              <div>{event.dateEvent}</div>
            </div>
            <div className={templateStyles.eventColumn}>
              <img src={getImage(getTeamBadge(event.strAwayTeam))} alt={`${event.strAwayTeam} leagueLogo`} />
              <div className={templateStyles.teamName}>{event.strAwayTeam}</div>
            </div>
          </div>
        </div>
      ))}
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
