import { collection, getDocs, query, where, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * Retrieves all tournament pools where the entrants document key matches the current user key.
 * @returns {Promise<Array>} - A promise that resolves to an array of tournament pool documents.
 */
export const getJoinedTournamentPools = async () => {
    try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            throw new Error('No authenticated user found.');
        }

        const userKey = currentUser.uid; // Assuming userKey is the UID of the authenticated user
        const db = getFirestore();

        // Query to find pools where the current user's key exists in the `entrants` subcollection
        const poolsQuery = query(
            collection(db, 'tournamentPools')
        );

        const poolsSnapshot = await getDocs(poolsQuery);
        const joinedPools = [];

        for (const poolDoc of poolsSnapshot.docs) {
            const entrantsCollectionRef = collection(db, `tournamentPools/${poolDoc.id}/entrants`);
            const entrantsQuery = query(
                entrantsCollectionRef,
                where('__name__', '==', userKey)
            );
            const entrantsSnapshot = await getDocs(entrantsQuery);

            if (!entrantsSnapshot.empty) {
                // If there are any entries in the `entrants` subcollection for this pool matching the current user
                joinedPools.push({
                    id: poolDoc.id,
                    ...poolDoc.data()
                });
            }
        }

        return joinedPools;
    } catch (error) {
        console.error('Error getting joined tournament pools: ', error);
        return [];
    }
};
