import { useContext } from 'react'
import PropTypes from 'prop-types'
import styles from './TournamentPool.module.scss'
import { getImage } from '@globalHelpers/imageHelper'
import { DataContext } from '@providers/DataProvider'
import DefaultButton from '@components/buttons/defaultButton/DefaultButton'

function TournamentPool({ pool }) {
  const { leaguesData } = useContext(DataContext)

  const league = leaguesData.sports[pool.sport][pool.league]

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
          <div className={styles.infoItem}>Rank:</div>
          <div className={styles.infoItem}>Points:</div>
          <div className={styles.infoItem}>Strike-rate:</div>
          <div className={styles.infoItem}>Players</div>

          <div className={styles.viewButton}>
            <DefaultButton onClick={() => {}} buttonTextTranslationKey="makePicks" iconClass="icon-view" buttonClass="actionButton" />
          </div>
        </div>
        <div className={styles.leaderBoardColumn}>
          <div className={styles.leaderBoardContentWrapper}>
            <div className={styles.leaderBoardHeader}>Leader Board</div>
            <div className={styles.leaderBoardList}>
              <div className={styles.leaderBoardItem}>1. User Name</div>
              <div className={styles.leaderBoardItem}>2. User Name</div>
              <div className={styles.leaderBoardItem}>3. User Name</div>
              <div className={styles.leaderBoardItem}>4. User Name</div>
              <div className={styles.leaderBoardItem}>5. User Name</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

TournamentPool.propTypes = {
  pool: PropTypes.shape({
    id: PropTypes.string.isRequired,
    poolName: PropTypes.string.isRequired,
    league: PropTypes.string.isRequired,
    sport: PropTypes.string.isRequired,
  }).isRequired,
}

export default TournamentPool
