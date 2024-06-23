import { Flag } from '../components/fiatCurrencyList/icons/flags/Flag'
import styles from './MainHeader.module.scss' // Import the SCSS module for scoped styles

const MainHeader = () => {
  const headerBarHeight = '64px' // You can adjust this value as needed

  return (
    <div className={styles['header-bar']}>
      <div className={styles['main-layout-container']}>
        <div className={styles.container}>
          <div className={styles.column}>
            <div className={styles['button-wrapper']}>
              <div className={styles.center}>
                <div className={styles['header-logo']} />
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles['button-wrapper']}>
              <div className={styles['balance-background']}>
                <div className={styles['amount-wrapper']}>
                  <div className={styles['amount-column']}>
                    <div className={styles.amount1}>
                      <span className={styles.text}>MATIC</span>&nbsp;
                      <span className={styles.text}>100</span>
                    </div>
                  </div>
                  <div className={styles['amount-column']}>
                    <div className={styles.amount2} />
                  </div>
                  <div className={styles['amount-column']}>
                    <div className={styles.amount3}>
                      <span
                        className={`${styles.ZAR} ${styles['fiat-icon']}`}
                      />
                      &nbsp;<span className={styles.text}>2000</span>
                    </div>
                  </div>
                </div>
                <div className={styles['button-background']}>
                  <div className={styles['MATIC-logo']} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.container}>
              <div className={styles.column}>
                <div className={styles['button-wrapper']}>
                  <div className={styles['button-background']}>
                    <div className={styles['button-icon']}>
                      <div className={`${styles.icon} ${styles['main-icon']}`}>
                        <Flag flag-code="ZAR" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainHeader
