import { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './PlayerHeader.module.scss';
import DataContext from '@providers/DataProvider';
import { translator } from '@globalHelpers/translations';

const PlayerHeader = ({ imageSrc }) => {
    const { user, data } = useContext(DataContext);

    return (
        <div className={styles.playerHeader}>
            <div className={`${styles.column} ${styles.centerAlign}`}>
                <div
                    className={`${styles.imageContainer} ${!imageSrc ? styles.defaultImage : ''}`}
                    style={{ backgroundImage: imageSrc ? `url(${imageSrc})` : '' }}
                >
                </div>
            </div>
            <div className={`${styles.column} ${styles.leftAlign}`}>
                <div className={`${styles.row} ${styles.userName}`}>{user ? user.displayName : 'Guest'}</div>
                <div className={styles.row}>{translator('caps')}: {data ? JSON.stringify(data) : 'Loading...'}</div>
                <div className={styles.row}>{translator('strikeRate')}: {data ? JSON.stringify(data) : 'Loading...'}</div>
                <div className={styles.row}>{translator('tournaments')}: {data ? JSON.stringify(data) : 'Loading...'}</div>
            </div>
        </div>
    );
}

PlayerHeader.propTypes = {
    imageSrc: PropTypes.string,
};

export default PlayerHeader;
