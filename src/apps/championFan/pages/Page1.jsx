import PropTypes from 'prop-types';
import PageTemplate from './PageTemplate';
import styles from './Page1.module.scss';
import templateStyles from './PageTemplate.module.scss';

function Page({ isVisible }) {
  return (
    <PageTemplate isVisible={isVisible}>
      <h1 className={templateStyles.header1}>Page 1</h1>
      <div className={styles.container}>
        <div className={styles.square}>
          <div className={styles['square-content']}></div>
        </div>
        <div className={styles.square}>
          <div className={styles['square-content']}></div>
        </div>
        <div className={styles.square}>
          <div className={styles['square-content']}></div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.square}>
          <div className={styles['square-content']}></div>
        </div>
        <div className={styles.square}>
          <div className={styles['square-content']}></div>
        </div>
        <div className={styles.square}>
          <div className={styles['square-content']}></div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.square}>
          <div className={styles['square-content']}></div>
        </div>
        <div className={styles.square}>
          <div className={styles['square-content']}></div>
        </div>
        <div className={styles.square}>
          <div className={styles['square-content']}></div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.square}>
          <div className={styles['square-content']}></div>
        </div>
        <div className={styles.square}>
          <div className={styles['square-content']}></div>
        </div>
        <div className={styles.square}>
          <div className={styles['square-content']}></div>
        </div>
      </div>
    </PageTemplate>
  );
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default Page;
