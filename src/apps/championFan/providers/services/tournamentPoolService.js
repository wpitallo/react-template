import axios from 'axios';

import { getBackendUrl } from '@globalHelpers/getBackendUrl';
import { getUserIdToken } from '@globalHelpers/getUserIdToken';

export const postTournamentPool = async (tournamentData) => {

    try {
        const response = await axios.post(getBackendUrl('tournamentPool'), {
            tournamentData,
            idToken: await getUserIdToken()
        });

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};
