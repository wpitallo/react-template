import styles from './Loader1.module.scss'
import logo from '@assets/login-logo.png' // Adjust the path to your image
import PropTypes from 'prop-types'

const Loader = ({ fadeOut }) => (
  <div className={`${styles.loadingContainer} ${fadeOut ? styles.fadeOut : ''}`}>
    <div className={styles.background}></div>
    <div className={styles.content}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle fill="#F9C900" stroke="#F9C900" strokeWidth="20" r="15" cx="40" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
        </circle>
        <circle fill="#F9C900" stroke="#F9C900" strokeWidth="20" r="15" cx="100" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
        </circle>
        <circle fill="#F9C900" stroke="#F9C900" strokeWidth="20" r="15" cx="160" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
        </circle>
      </svg>
    </div>
  </div>
)

Loader.propTypes = {
  fadeOut: PropTypes.bool.isRequired,
}

export default Loader
