import { getAuth } from 'firebase/auth';
import { debug } from '@helpers/debug';
import { collection, doc, getDocs, getDoc, query, orderBy, limit, getFirestore } from 'firebase/firestore';

/**
 * Retrieves up to 10 tournament pools from the user's activeTournaments collection and loads corresponding data from the tournamentPools collection.
 * @returns {Promise<Array>} - A promise that resolves to an array of tournament pool documents.
 */
export const getJoinedTournamentPools = async (setJoinedTournamentPoolData) => {
    const performanceLogs = [];
    const isLoggingEnabled = debug.performanceLoggingEnabled === true;

    try {
        const start = Date.now();

        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            throw new Error('No authenticated user found.');
        }

        if (isLoggingEnabled) {
            performanceLogs.push(`Auth check completed in ${Date.now() - start} ms`);
        }

        const userKey = currentUser.uid;
        const db = getFirestore();

        // Start query performance logging
        const queryStart = Date.now();


        //DO BATCH ACTIVE CHECK HERE MAX 500 BUT PROCESS ALL FOR HISTORY VS ACTIVE


        // Query the top 10 active tournaments from the user's activeTournaments collection
        const activeTournamentsQuery = query(
            collection(db, `users/${userKey}/activeTournaments`),
            orderBy('createdUtcTimeStamp', 'desc'),
            limit(10)
        );

        const activeTournamentsSnapshot = await getDocs(activeTournamentsQuery);

        if (isLoggingEnabled) {
            performanceLogs.push(`Active tournaments query completed in ${Date.now() - queryStart} ms`);
        }

        if (activeTournamentsSnapshot.empty) {
            return []; // No active tournaments found
        }

        const joinedPools = [];

        // Start tournament pool retrieval performance logging
        const tournamentFetchStart = Date.now();

        for (const tournamentDoc of activeTournamentsSnapshot.docs) {
            const tournamentPoolDocRef = doc(db, `tournamentPools/${tournamentDoc.id}`);
            const tournamentPoolDoc = await getDoc(tournamentPoolDocRef);

            if (tournamentPoolDoc.exists()) {
                joinedPools.push({
                    id: tournamentDoc.id,
                    ...tournamentPoolDoc.data(),
                });
            }
        }

        if (isLoggingEnabled) {
            performanceLogs.push(`Tournament pool data fetch completed in ${Date.now() - tournamentFetchStart} ms`);
            performanceLogs.push(`Total execution time: ${Date.now() - start} ms`);
            console.log('Performance Logs:', performanceLogs);
        }

        setJoinedTournamentPoolData(joinedPools);
    } catch (error) {
        console.error('Error getting joined tournament pools: ', error);
        if (isLoggingEnabled) {
            console.log('Performance Logs:', performanceLogs);
        }
        return [];
    }
};
