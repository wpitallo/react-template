import axios from 'axios';
import { getBackendUrl } from '@globalHelpers/getBackendUrl';
import { getUserIdToken } from '@globalHelpers/getUserIdToken';

export const postUser = async (userId) => {
    try {
        const response = await axios.post(getBackendUrl('user'), { userId });
        return response.data;
    } catch (error) {
        console.error('Error creating user document:', error);
        throw error;
    }
};

export const patchUser = async (userId, displayName, avatar, setUserDoc) => {
    try {
        // Prepare the data to send to the backend
        const payload = {
            userId,
            displayName,
            avatar,
            idToken: await getUserIdToken(),
        };

        // Send the POST request to the backend API
        const response = await axios.patch(getBackendUrl('user'), payload);

        console.log('Backend response:', response.data);

        if (response.status === 200) {
            console.log('User profile updated successfully');

            // Use the returned user object to update local state
            setUserDoc(response.data.user);
        } else {
            console.error('Failed to update user profile:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating user profile:', error.message);
    }
}