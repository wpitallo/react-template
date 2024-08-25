import { collection, doc, getDoc, getDocs, query, where, getFirestore } from 'firebase/firestore';
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

        // Fetch active tournaments for the current user
        const activeTournamentsSnapshot = await getDocs(collection(db, `users/${userKey}/activeTournaments`));
        const activeTournamentKeys = activeTournamentsSnapshot.docs.map(doc => doc.id);

        if (activeTournamentKeys.length === 0) {
            return []; // No active tournaments
        }

        // Array to store joined tournament pools
        const joinedPools = [];

        for (const tournamentKey of activeTournamentKeys) {
            // Reference to the specific tournament pool document
            const tournamentPoolDocRef = doc(db, 'tournamentPools', tournamentKey);
            const tournamentPoolDocSnap = await getDoc(tournamentPoolDocRef); // Use getDoc for single document

            if (tournamentPoolDocSnap.exists()) {
                // Reference to the entrants subcollection
                const entrantsCollectionRef = collection(db, `tournamentPools/${tournamentKey}/entrants`);
                const entrantsQuery = query(
                    entrantsCollectionRef,
                    where('__name__', '==', userKey)
                );
                const entrantsSnapshot = await getDocs(entrantsQuery);

                if (!entrantsSnapshot.empty) {
                    // If there are entries in the `entrants` subcollection for this pool matching the current user
                    joinedPools.push({
                        id: tournamentKey,
                        ...tournamentPoolDocSnap.data()
                    });
                }
            }
        }

        return joinedPools;
    } catch (error) {
        console.error('Error getting joined tournament pools: ', error);
        return [];
    }
};
