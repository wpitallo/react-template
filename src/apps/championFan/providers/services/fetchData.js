import { getDocs, collection } from 'firebase/firestore';

const imageRequestCache = new Map();

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

        const fetchImage = async (url) => {
            if (imageRequestCache.has(url)) {
                // Image already fetched, no need to refetch
                return;
            }

            try {
                await fetch(url, { mode: 'cors' });
                imageRequestCache.set(url, true); // Cache the image URL after successful fetch
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        // Fetch images for league badges and logos
        for (const leagues of Object.values(newLeaguesData.sports)) {
            for (const league of Object.values(leagues)) {
                await Promise.all([
                    fetchImage(league.strBadge),
                    fetchImage(league.strLogo),
                ]);
            }
        }

        setLeaguesData(newLeaguesData);
        setDataFetched(true);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};
