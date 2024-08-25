import PropTypes from 'prop-types'
import styles from './TournamentPool.module.scss'

function TournamentPool({ pool }) {
  return (
    <div className={styles.square}>
      <div>{pool.poolName}</div>
    </div>
  )
}

TournamentPool.propTypes = {
  pool: PropTypes.shape({
    id: PropTypes.string.isRequired,
    poolName: PropTypes.string.isRequired,
  }),
}

export default TournamentPool
