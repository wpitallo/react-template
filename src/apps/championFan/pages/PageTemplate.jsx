import PropTypes from 'prop-types';
import styles from './PageTemplate.module.scss';

function PageTemplate({ isVisible, children }) {
    return (
        <div className={styles.page}>
            <div className={styles['scroll-container']}>
                <div className={styles['background-image']}></div>
                <div className={`${styles['content-container']} ${isVisible ? styles.visible : ''}`}>
                    <div className={styles['content-box']}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

PageTemplate.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default PageTemplate;
