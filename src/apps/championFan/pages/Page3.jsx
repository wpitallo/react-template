import PropTypes from 'prop-types';
import PageTemplate from './PageTemplate';
import styles from './Page1.module.scss';
import templateStyles from './PageTemplate.module.scss';
import { translator } from '@globalHelpers/translations';

function Page({ pageId, isVisible }) {
  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} >

      <div className={styles.container}>
        <div className={templateStyles.button}>
          <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('join')}</div>
        </div>
        <div className={templateStyles.button}>
          <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('create')}</div>
        </div>
      </div>

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('featuredPools')}</div>
      <div className={`${templateStyles.contentHeader2}`}>{translator('featuredPoolsSubHeading')}</div>

      <div className={styles.container}>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
      </div>

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('sports')}</div>
      <div className={templateStyles.contentHeader2}>{translator('sportsSubHeading')}</div>

      <div className={styles.container}>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
      </div>
    </PageTemplate >
  );
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default Page;
