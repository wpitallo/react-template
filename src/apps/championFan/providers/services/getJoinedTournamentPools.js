
import { getAuth } from 'firebase/auth';
import { debug } from '@helpers/debug'
import { collection, getDocs, query, where, orderBy, limit, getFirestore } from 'firebase/firestore';

/**
 * Retrieves up to 10 tournament pools where the entrants document key matches the current user key.
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

        // Query tournament pools directly
        const tournamentPoolsQuery = query(
            collection(db, 'tournamentPools'),
            where('isActive', '==', true),
            orderBy('createdUtcTimeStamp', 'desc'),
            limit(10)
        );

        const tournamentPoolsSnapshot = await getDocs(tournamentPoolsQuery);

        if (isLoggingEnabled) {
            performanceLogs.push(`Tournament pools query completed in ${Date.now() - queryStart} ms`);
        }

        if (tournamentPoolsSnapshot.empty) {
            return []; // No matching tournament pools
        }

        // Start filtering performance logging
        const filterStart = Date.now();

        const joinedPools = [];

        for (const poolDoc of tournamentPoolsSnapshot.docs) {
            const entrantsSnapshot = await getDocs(
                query(
                    collection(db, `tournamentPools/${poolDoc.id}/entrants`),
                    where('__name__', '==', userKey)
                )
            );

            if (!entrantsSnapshot.empty) {
                joinedPools.push({
                    id: poolDoc.id,
                    ...poolDoc.data(),
                });
            }
        }

        if (isLoggingEnabled) {
            performanceLogs.push(`Filtering results completed in ${Date.now() - filterStart} ms`);
            performanceLogs.push(`Total execution time: ${Date.now() - start} ms`);
            console.log('Performance Logs:', performanceLogs);
        }


        setJoinedTournamentPoolData(joinedPools)
    } catch (error) {
        console.error('Error getting joined tournament pools: ', error);
        if (isLoggingEnabled) {
            console.log('Performance Logs:', performanceLogs);
        }
        return [];
    }
};

