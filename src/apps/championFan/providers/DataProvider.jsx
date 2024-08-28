import { createContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '@configuration/firebaseConfig'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

import { getSportsLeaguesData } from './services/getSportsLeaguesData'
import { getEventsAndTeamsData } from './services/getEventsAndTeamsData'
import { getJoinedTournamentPools } from './services/getJoinedTournamentPools'

import { postTournamentPool } from './services/tournamentPoolService'
import { postUser } from './services/userService'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userDoc, setUserDoc] = useState(null)
  const [checkedAuthenticated, setCheckedAuthenticated] = useState(false)
  const [leaguesData, setLeaguesData] = useState({ sports: {} })
  const [dataFetched, setDataFetched] = useState(false)
  const [joinedTournamentPoolData, setJoinedTournamentPoolData] = useState([])

  const db = getFirestore(app)

  const getSportsLeaguesDataCallback = useCallback(() => {
    getSportsLeaguesData(db, leaguesData, setLeaguesData, setDataFetched)
  }, [db, leaguesData])

  const getEventsAndTeamsDataCallback = useCallback(
    (league, strCurrentSeason, sport) => {
      return getEventsAndTeamsData(db, leaguesData, setLeaguesData, league, strCurrentSeason, sport)
    },
    [db, leaguesData],
  )

  const getJoinedTournamentPoolsCallback = useCallback(async () => {
    if (user && Object.keys(leaguesData.sports).length > 0) {
      await getJoinedTournamentPools(setJoinedTournamentPoolData)
    } else {
      if (!user) console.error('No user is authenticated.')
      return []
    }
  }, [user, leaguesData])

  const postTournamentPoolCallback = useCallback(
    async (tournamentData) => {
      if (user) {
        await postTournamentPool(tournamentData)
        getJoinedTournamentPoolsCallback()
      } else {
        console.error('No user is authenticated.')
      }
    },
    [user, getJoinedTournamentPoolsCallback],
  )

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, async (newUser) => {
      if (newUser) {
        setUser(newUser)

        const userDocRef = doc(db, 'users', newUser.uid)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data()
          setUserDoc(userData)
        } else {
          // Handle case where user document does not exist
          try {
            await postUser(newUser.uid)
            setUserDoc({})
          } catch (error) {
            throw new Error(error)
          }
        }

        if (!dataFetched) {
          if (document.getElementById('firebaseui-auth-container')) {
            document.getElementById('firebaseui-auth-container').style.opacity = 0
          }
          getSportsLeaguesDataCallback()
          setDataFetched(true) // Mark data as fetched to prevent repeated fetching
        }
      } else {
        setUser(null)
        setUserDoc(null)
        setLeaguesData({ sports: {} })
        setDataFetched(false)
      }

      setCheckedAuthenticated(true)
    })

    return () => unsubscribe()
  }, [db, dataFetched, getSportsLeaguesDataCallback])

  useEffect(() => {
    if (user) {
      getJoinedTournamentPoolsCallback()
    }
  }, [user, getJoinedTournamentPoolsCallback])

  return (
    <DataContext.Provider
      value={{
        user,
        userDoc,
        setUserDoc,
        leaguesData,
        getEventsAndTeamsData: getEventsAndTeamsDataCallback,
        postTournamentPool: postTournamentPoolCallback,
        getJoinedTournamentPools: getJoinedTournamentPoolsCallback,
        joinedTournamentPoolData,
        dataFetched,
        checkedAuthenticated,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { DataContext }
