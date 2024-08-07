import PropTypes from 'prop-types'
import templateStyles from './Events.module.scss'

const Events = ({ eventsData, selectedEvents, setSelectedEvents, selectedLeagueTeams }) => {
  const getTeamBadge = (teamName) => {
    const team = selectedLeagueTeams.find((team) => team.strTeam === teamName)
    return team ? team.strBadge : ''
  }

  const toggleEventSelection = (eventKey) => {
    setSelectedEvents((prevState) => ({
      ...prevState,
      [eventKey]: { isSelected: !prevState[eventKey].isSelected },
    }))
  }

  return (
    <>
      {eventsData.map((event, index) => (
        <div key={index} className={`${templateStyles.eventItem} ${!selectedEvents[event.eventKey]?.isSelected ? templateStyles.unSelected : ''}`} onClick={() => toggleEventSelection(event.eventKey)}>
          <div className={templateStyles.eventColumn}>
            <div className={`${templateStyles.checkbox} ${selectedEvents[event.eventKey]?.isSelected ? 'icon-checked' : 'icon-unchecked'}`}></div>
            <img src={getTeamBadge(event.strHomeTeam)} alt={`${event.strHomeTeam} leagueLogo`} />
            <div className={templateStyles.teamName}>{event.strHomeTeam}</div>
          </div>
          <div className={templateStyles.eventMiddleColumn}>
            <div>VS</div>
            <div className={templateStyles.eventDateMiddle}>&nbsp;</div>
            <div>{event.dateEvent}</div>
          </div>
          <div className={templateStyles.eventColumn}>
            <img src={getTeamBadge(event.strAwayTeam)} alt={`${event.strAwayTeam} leagueLogo`} />
            <div className={templateStyles.teamName}>{event.strAwayTeam}</div>
          </div>
        </div>
      ))}
    </>
  )
}

Events.propTypes = {
  eventsData: PropTypes.array.isRequired,
  selectedEvents: PropTypes.object.isRequired,
  setSelectedEvents: PropTypes.func.isRequired,
  selectedLeagueTeams: PropTypes.object.isRequired,
  translator: PropTypes.func.isRequired,
}

export default Events
