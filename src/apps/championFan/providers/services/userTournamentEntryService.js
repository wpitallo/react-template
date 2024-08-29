import axios from 'axios';
import { getBackendUrl } from '@helpers/getBackendUrl';
import { getUserIdToken } from '@helpers/getUserIdToken';

export const getUserTournamentEntry = async (tournamentKey) => {

    try {
        const response = await axios.get(getBackendUrl('userTournamentEntry'), {
            params: {
                tournamentKey,
                idToken: await getUserIdToken()
            }
        });

        return response.data.userTournamentEntry
    } catch (error) {
        console.error('Error:', error);
    }
};
