import { getDocs, collection } from 'firebase/firestore';
import { convertToLocalTime } from '@helpers/convertToLocalTime'
import { getTeamsData } from './getTeamsData'

export const getEventsAndTeamsData = async (db, leaguesData, setLeaguesData, teamsData, setTeamsData, league, strCurrentSeason, sport) => {
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
        const today = new Date();

        const events = eventsQuerySnapshot.docs
            .map((doc) => {
                const data = doc.data();
                const { eventDateLocal, eventTimeLocal } = convertToLocalTime(data.dateEvent, data.strTime);
                return { ...data, eventDateLocal, eventTimeLocal };
            })
            .filter((event) => new Date(event.dateEvent) >= today) // Filter for events with dateEvent >= today
            .sort((a, b) => new Date(b.dateEvent + 'T' + b.strTime) - new Date(a.dateEvent + 'T' + a.strTime));

        // Fetch teams using the new function
        const teams = await getTeamsData(db, sport, league, strCurrentSeason, teamsData, setTeamsData);

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
