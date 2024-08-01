
import { getDocs, collection } from 'firebase/firestore';

export const fetchData = async (db, leaguesData, setLeaguesData, setDataFetched) => {
    const sports = ['soccer', 'rugby']; // Add more sports as needed
    const newLeaguesData = { sports: {} };

    try {
        const fetchSportData = async (sport) => {
            if (leaguesData.sports[sport]) {
                newLeaguesData.sports[sport] = leaguesData.sports[sport];
                return;
            }

            const querySnapshot = await getDocs(collection(db, 'sports', sport, 'leagues'));
            const documents = querySnapshot.docs.reduce((acc, doc) => {
                acc[doc.id] = { id: doc.id, ...doc.data() };
                return acc;
            }, {});
            newLeaguesData.sports[sport] = documents;
        };

        await Promise.all(sports.map((sport) => fetchSportData(sport)));
        setLeaguesData(newLeaguesData);
        setDataFetched(true);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};
