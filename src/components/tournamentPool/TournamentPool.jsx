import PropTypes from 'prop-types'
import styles from './TournamentPool.module.scss'

function TournamentPool({ pool }) {
  return (
    <div className={styles.square}>
      <div>{pool.tournamentTemplate.poolName}</div>
    </div>
  )
}

TournamentPool.propTypes = {
  pool: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tournamentTemplate: PropTypes.shape({
      poolName: PropTypes.string.isRequired,
    }).isRequired,
  }),
}

export default TournamentPool
