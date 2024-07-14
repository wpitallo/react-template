import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './PageTemplate.module.scss';

function PageTemplate({ isVisible, children }) {
    useEffect(() => {
        const scrollContainer = document.getElementById('scroll-container');
        let isDragging = false;
        let startY = 0;
        let initialScrollTop = 0;

        const handlePointerDown = (e) => {
            isDragging = true;
            startY = e.clientY;  // Use clientY for more consistent coordinates
            initialScrollTop = scrollContainer.scrollTop;
            document.body.style.cursor = 'grabbing';
            e.preventDefault(); // Prevent default behavior to avoid text selection
        };

        const handlePointerMove = (e) => {
            if (!isDragging) return;
            const deltaY = e.clientY - startY;
            scrollContainer.scrollTop = initialScrollTop - deltaY;
        };

        const handlePointerUp = () => {
            isDragging = false;
            document.body.style.cursor = 'default';
        };

        const handleTouchStart = (e) => {
            isDragging = true;
            startY = e.touches[0].clientY;  // Use clientY for touch
            initialScrollTop = scrollContainer.scrollTop;
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;
            const deltaY = e.touches[0].clientY - startY;
            scrollContainer.scrollTop = initialScrollTop - deltaY;
        };

        const handleTouchEnd = () => {
            isDragging = false;
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);

        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove, { passive: false }); // Prevent default scrolling behavior
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);

            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles['scroll-container']} id="scroll-container">
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
