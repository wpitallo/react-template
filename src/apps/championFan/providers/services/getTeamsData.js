import { getDocs, collection } from 'firebase/firestore';
import { fetchAndCacheImage } from '@helpers/imageHelper';

// Function to fetch teams data
export const getTeamsData = async (db, sport, league, strCurrentSeason, teamsData, setTeamsData) => {
    try {
        // Check if teams data already exists in teamsData
        if (teamsData.sports[sport] && teamsData.sports[sport][league] && teamsData.sports[sport][league].teams) {
            return {
                teams: teamsData.sports[sport][league].teams,
            };
        }

        // Fetch teams
        const teamsQuerySnapshot = await getDocs(collection(db, 'sports', sport, 'leagues', league, 'seasons', strCurrentSeason, 'teams'));
        const teams = teamsQuerySnapshot.docs.map((doc) => doc.data());

        // Fetch images for team badges and logos using the imageHelper functions
        await Promise.all(
            teams.flatMap((team) => [
                fetchAndCacheImage(team.strBadge),
                fetchAndCacheImage(team.strLogo),
            ])
        );

        // Update teams data state
        if (setTeamsData) {
            setTeamsData((prevTeamsData) => {
                const newTeamsData = { ...prevTeamsData };
                if (!newTeamsData.sports[sport]) {
                    newTeamsData.sports[sport] = {};
                }
                if (!newTeamsData.sports[sport][league]) {
                    newTeamsData.sports[sport][league] = {};
                }
                newTeamsData.sports[sport][league].teams = teams;
                return newTeamsData;
            });
        }

        return teams

    } catch (error) {
        console.error('Error fetching teams data: ', error);
        return {
            teams: [],
        };
    }
};
