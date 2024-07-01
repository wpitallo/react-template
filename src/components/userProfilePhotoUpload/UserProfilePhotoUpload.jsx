import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './UserProfilePhotoUpload.module.scss';

const UserProfilePhotoUpload = ({ onPhotoUpload }) => {
    const [photo, setPhoto] = useState(null);
    const inputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
                onPhotoUpload(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTakePhoto = async () => {
        const video = document.createElement('video');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();

        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;

        const capturePhoto = () => {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            setPhoto(dataUrl);
            onPhotoUpload(dataUrl);
            stream.getTracks().forEach((track) => track.stop());
            video.remove();
        };

        video.addEventListener('click', capturePhoto);
        document.body.appendChild(video);
    };

    return (
        <div className={styles.photoUpload}>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className={styles.inputFile}
            />
            <button onClick={() => inputRef.current.click()} className={styles.button}>
                Upload Photo
            </button>
            <button onClick={handleTakePhoto} className={styles.button}>
                Take Photo
            </button>
            {photo && <img src={photo} alt="Uploaded" className={styles.photo} />}
        </div>
    );
};

UserProfilePhotoUpload.propTypes = {
    onPhotoUpload: PropTypes.func.isRequired,
};

export default UserProfilePhotoUpload;
