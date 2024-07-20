import { createContext, useState, useEffect, useCallback } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '@configuration/firebaseConfig'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import PropTypes from 'prop-types'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [leaguesData, setLeaguesData] = useState({ sports: {} })
  const [dataFetched, setDataFetched] = useState(false) // New state to track if data has been fetched
  const auth = getAuth(app)
  const db = getFirestore(app)

  const fetchData = useCallback(async () => {
    const sports = ['soccer', 'rugby'] // Add more sports as needed
    const newLeaguesData = { sports: {} }

    try {
      const fetchSportData = async (sport) => {
        if (leaguesData.sports[sport]) {
          newLeaguesData.sports[sport] = leaguesData.sports[sport]
          return
        }

        const querySnapshot = await getDocs(collection(db, 'sports', sport, 'leagues'))
        const documents = querySnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = { id: doc.id, ...doc.data() }
          return acc
        }, {})
        newLeaguesData.sports[sport] = documents
      }

      await Promise.all(sports.map((sport) => fetchSportData(sport)))
      setLeaguesData(newLeaguesData)
      setDataFetched(true) // Set flag to true after fetching data
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }, [db, leaguesData.sports])

  const fetchEventsAndTeamsData = useCallback(
    async (league, strCurrentSeason, sport) => {
      try {
        // Check if events and teams already exist in leaguesData
        if (leaguesData.sports[sport] && leaguesData.sports[sport][league] && leaguesData.sports[sport][league].events && leaguesData.sports[sport][league].teams) {
          return {
            events: leaguesData.sports[sport][league].events,
            teams: leaguesData.sports[sport][league].teams,
          }
        }

        // Fetch events
        const eventsQuerySnapshot = await getDocs(collection(db, 'sports', sport, 'leagues', league, 'seasons', strCurrentSeason, 'events'))
        const events = eventsQuerySnapshot.docs.map((doc) => doc.data())

        // Fetch teams
        const teamsQuerySnapshot = await getDocs(collection(db, 'sports', sport, 'leagues', league, 'seasons', strCurrentSeason, 'teams'))
        const teams = teamsQuerySnapshot.docs.map((doc) => doc.data())

        // Update leaguesData
        setLeaguesData((prevLeaguesData) => {
          const newLeaguesData = { ...prevLeaguesData }
          if (!newLeaguesData.sports[sport]) {
            newLeaguesData.sports[sport] = {}
          }
          if (!newLeaguesData.sports[sport][league]) {
            newLeaguesData.sports[sport][league] = {}
          }

          newLeaguesData.sports[sport][league].events = events
          newLeaguesData.sports[sport][league].teams = teams
          return newLeaguesData
        })

        return { events, teams }
      } catch (error) {
        console.error('Error fetching events and teams data: ', error)
        return { events: [], teams: [] }
      }
    },
    [db, leaguesData.sports]
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
        if (!dataFetched) {
          fetchData()
        }
      } else {
        setLeaguesData({ sports: {} })
        setDataFetched(false) // Reset flag when user logs out
      }
    })

    return () => unsubscribe()
  }, [auth, fetchData, dataFetched])

  return <DataContext.Provider value={{ user, leaguesData, fetchEventsAndTeamsData }}>{children}</DataContext.Provider>
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DataContext
