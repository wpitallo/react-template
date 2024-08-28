import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './TournamentPool.module.scss'
import { getImage } from '@helpers/imageHelper'
import { DataContext } from '@providers/DataProvider'
import DefaultButton from '@components/buttons/defaultButton/DefaultButton'
import { translator } from '@helpers/translations'

function TournamentPool({ pool }) {
  const { leaguesData } = useContext(DataContext)
  const [isFutureEvent, setIsFutureEvent] = useState(false)

  const league = leaguesData.sports[pool.sport][pool.league]

  useEffect(() => {
    const now = new Date().getTime()
    const eventTime = new Date(`${pool.firstEventDate}T${pool.firstEventDateTime}`).getTime()

    if (eventTime > now) {
      setIsFutureEvent(true)

      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24

      const x = setInterval(() => {
        const now = new Date().getTime()
        const distance = eventTime - now

        document.getElementById('days').innerText = Math.floor(distance / day)
        document.getElementById('hours').innerText = Math.floor((distance % day) / hour)
        document.getElementById('minutes').innerText = Math.floor((distance % hour) / minute)
        document.getElementById('seconds').innerText = Math.floor((distance % minute) / second)

        // Clear the interval if the event time is reached
        if (distance < 0) {
          clearInterval(x)
        }
      }, second)

      return () => clearInterval(x)
    } else {
      setIsFutureEvent(false)
    }
  }, [pool.firstEventDate, pool.firstEventDateTime])

  return (
    <div className={styles.square}>
      <div className={styles.headerContainer}>
        <div className={styles.imageColumn}>
          <img src={getImage(league.strLogo)} alt={pool.league} className={styles.leagueLogo} />
        </div>
        <div className={`${styles.headingColumn} ${styles.contentHeader1}`}>
          <div>{pool.poolName}</div>
        </div>
        <div className={`${styles.imageColumn} ${styles.sportImage} ${styles.squareSoccer}`}></div>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.infoColumn}>
          {!isFutureEvent && (
            <>
              <div className={styles.infoItem}>Rank:</div>
              <div className={styles.infoItem}>Points:</div>
              <div className={styles.infoItem}>Strike-rate:</div>
              <div className={styles.infoItem}>Players:</div>
            </>
          )}

          <div className={styles.viewButton}>
            <DefaultButton onClick={() => {}} buttonTextTranslationKey="makePicks" iconClass="icon-view" buttonClass="actionButton" />
          </div>
        </div>
        <div className={`${styles.leftColumn} ${isFutureEvent ? styles.countdownColumn : styles.leaderBoardColumn}`}>
          <div className={styles.leaderBoardContentWrapper}>
            <div className={styles.countDownHeader}>{translator('tournamentStartsIn')}:</div>
            {isFutureEvent ? (
              <div id="countDown" className={styles.countDown}>
                <ul className={styles.counterUl}>
                  <li className={styles.counterLi}>
                    <span id="days" className={styles.counterSpan}></span>
                    {translator('days')}
                  </li>
                  <li className={styles.counterLi}>
                    <span id="hours" className={styles.counterSpan}></span>
                    {translator('hours')}
                  </li>
                  <li className={styles.counterLi}>
                    <span id="minutes" className={styles.counterSpan}></span>
                    {translator('minutes')}
                  </li>
                  <li className={styles.counterLi}>
                    <span id="seconds" className={styles.counterSpan}></span>
                    {translator('seconds')}
                  </li>
                </ul>
              </div>
            ) : (
              <div id="leaderBoard">
                <div className={styles.leaderBoardHeader}>Leader Board</div>
                <div className={styles.leaderBoardList}></div>

                <div className={styles.leaderBoardItem}>1. User Name</div>
                <div className={styles.leaderBoardItem}>2. User Name</div>
                <div className={styles.leaderBoardItem}>3. User Name</div>
                <div className={styles.leaderBoardItem}>4. User Name</div>
                <div className={styles.leaderBoardItem}>5. User Name</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

TournamentPool.propTypes = {
  pool: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstEventDate: PropTypes.string.isRequired,
    firstEventDateTime: PropTypes.string.isRequired,
    poolName: PropTypes.string.isRequired,
    league: PropTypes.string.isRequired,
    sport: PropTypes.string.isRequired,
    createdUtcTimeStamp: PropTypes.object.isRequired,
  }).isRequired,
}

export default TournamentPool
