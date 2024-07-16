import PropTypes from 'prop-types';
import PageTemplate from './PageTemplate';
import styles from './Page1.module.scss';
import templateStyles from './PageTemplate.module.scss';
import { translator } from '@globalHelpers/translations';

function Page({ pageId, isVisible }) {
  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} >

      <div className={`${templateStyles.contentHeader1} ${templateStyles.centeredText} ${templateStyles.headerMarginBottom} `}>{translator('activePools')}</div>

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
  pageId: PropTypes.string.isRequired,
};

export default Page;
