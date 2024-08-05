import PropTypes from 'prop-types'
import styles from './ImageButton.module.scss'
import templateStyles from '../Button.module.scss'

function ImageButton({ leagueId, leagueData, selectedLeague, onClick }) {
  return (
    <div key={leagueId} className={`${styles.square} ${styles.imageButton} ${selectedLeague === leagueId ? templateStyles.selected : ''}`} onClick={() => onClick(leagueData)}>
      <img src={leagueData.strLogo} alt={leagueData.strLeague} className={styles.leagueLogo} />
    </div>
  )
}

ImageButton.propTypes = {
  leagueId: PropTypes.string.isRequired,
  leagueData: PropTypes.object.isRequired,
  selectedLeague: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default ImageButton
