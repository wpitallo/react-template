import axios from 'axios';
import { backendConfig } from '@configuration/backendConfig';
import { getAuth } from 'firebase/auth';

export const createTournamentPool = async (tournamentData) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        console.error('User is not authenticated');
        return;
    }

    try {
        const idToken = await user.getIdToken();

        const response = await axios.post(`${backendConfig.protocol}://${backendConfig.host}:${backendConfig.port}/createTournamentPool`, {
            tournamentData,
            idToken,
        });

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};
