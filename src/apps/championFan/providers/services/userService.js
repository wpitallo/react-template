import axios from 'axios';
import { getBackendUrl } from '@helpers/getBackendUrl';
import { getUserIdToken } from '@helpers/getUserIdToken';

export const postUser = async () => {
    try {
        const response = await axios.post(getBackendUrl('user'), { idToken: await getUserIdToken() });
        return response.data;
    } catch (error) {
        console.error('Error creating user document:', error);
        throw error;
    }
};

export const patchUser = async (displayName, avatar, setUserDoc) => {
    try {
        // Prepare the data to send to the backend
        const payload = {
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