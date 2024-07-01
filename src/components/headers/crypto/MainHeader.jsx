import { Flag } from '@components/fiatCurrencyList/icons/flags/Flag';
import styles from './MainHeader.module.scss'; // Import the SCSS module for scoped styles

const MainHeader = () => {
  return (
    <div className={styles.headerBar}>
      <div className={styles.mainLayoutContainer}>
        <div className={styles.container}>

          <div className={styles.column}>
            <div className={styles.buttonWrapper}>
              <div className={styles.center}>
                <div className={styles.headerLogo} />
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.buttonWrapper}>
              <div className={styles.balanceBackground}>
                <div className={styles.amountWrapper}>
                  <div className={styles.amountColumn}>
                    <div className={styles.amount1}>
                      <span className={styles.text}>MATIC</span>&nbsp;
                      <span className={styles.text}>100</span>
                    </div>
                  </div>
                  <div className={styles.amountColumn}>
                    <div className={styles.amount2} />
                  </div>
                  <div className={styles.amountColumn}>
                    <div className={styles.amount3}>
                      <span className={`${styles.ZAR} ${styles.fiatIcon}`} />
                      &nbsp;<span className={styles.text}>2000</span>
                    </div>
                  </div>
                </div>
                <div className={styles.buttonBackground}>
                  <div className={styles.MATICLogo} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.container}>
              <div className={styles.column}>
                <div className={styles.buttonWrapper}>
                  <div className={styles.buttonBackground}>
                    <div className={styles.buttonIcon}>
                      <div className={`${styles.icon} ${styles.mainIcon}`}>
                        <Flag flagCode="ZAR" />
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
  );
}

export default MainHeader;
