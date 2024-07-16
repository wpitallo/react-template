import { useState } from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './PageTemplate';
import styles from './Page1.module.scss';
import templateStyles from './PageTemplate.module.scss';
import { translator } from '@globalHelpers/translations';
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'; // Corrected import path

function Page({ pageId, isVisible }) {
  const [selectedButton, setSelectedButton] = useState('public');

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} header={PlayerHeader} >
      <div className={styles.container}>
        <div
          className={`${templateStyles.button} ${selectedButton === 'public' ? templateStyles.selected : templateStyles.notSelected}`}
        >
          <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('poolName')}</div>
        </div>
      </div>

      <div className={styles.container}>
        <div
          className={`${templateStyles.button} ${selectedButton === 'public' ? templateStyles.selected : templateStyles.notSelected}`}
          onClick={() => handleButtonClick('public')}
        >
          <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('public')}</div>
        </div>
        <div
          className={`${templateStyles.button} ${selectedButton === 'inviteOnly' ? templateStyles.selected : templateStyles.notSelected}`}
          onClick={() => handleButtonClick('inviteOnly')}
        >
          <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('inviteOnly')}</div>
        </div>
      </div>

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('sports')}</div>
      <div className={templateStyles.contentHeader2}>{translator('createPoolSportsSubHeading')}</div>

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
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
        </div>
        <div className={styles.square}>
          <div className={styles.squareContent}></div>
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
