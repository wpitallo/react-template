
import { getDocs, collection } from 'firebase/firestore';

export const fetchEventsAndTeamsData = async (db, leaguesData, setLeaguesData, league, strCurrentSeason, sport) => {
    try {
        // Check if events and teams already exist in leaguesData
        if (leaguesData.sports[sport] && leaguesData.sports[sport][league] && leaguesData.sports[sport][league].events && leaguesData.sports[sport][league].teams) {
            return {
                events: leaguesData.sports[sport][league].events,
                teams: leaguesData.sports[sport][league].teams,
            };
        }

        // Fetch events
        const eventsQuerySnapshot = await getDocs(collection(db, 'sports', sport, 'leagues', league, 'seasons', strCurrentSeason, 'events'));
        const events = eventsQuerySnapshot.docs.map((doc) => doc.data());

        // Fetch teams
        const teamsQuerySnapshot = await getDocs(collection(db, 'sports', sport, 'leagues', league, 'seasons', strCurrentSeason, 'teams'));
        const teams = teamsQuerySnapshot.docs.map((doc) => doc.data());

        // Update leaguesData
        setLeaguesData((prevLeaguesData) => {
            const newLeaguesData = { ...prevLeaguesData };
            if (!newLeaguesData.sports[sport]) {
                newLeaguesData.sports[sport] = {};
            }
            if (!newLeaguesData.sports[sport][league]) {
                newLeaguesData.sports[sport][league] = {};
            }

            newLeaguesData.sports[sport][league].events = events;
            newLeaguesData.sports[sport][league].teams = teams;
            return newLeaguesData;
        });

        return { events, teams };
    } catch (error) {
        console.error('Error fetching events and teams data: ', error);
        return { events: [], teams: [] };
    }
};
