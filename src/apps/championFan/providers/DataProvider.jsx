import { createContext, useState, useEffect, useCallback } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '@configuration/firebaseConfig'
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore'
import PropTypes from 'prop-types'
import { fetchData } from './services/fetchData'
import { fetchEventsAndTeamsData } from './services/fetchEventsAndTeamsData'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userDoc, setUserDoc] = useState(null)
  const [checkedAuthenticated, setCheckedAuthenticated] = useState(false)
  const [leaguesData, setLeaguesData] = useState({ sports: {} })
  const [dataFetched, setDataFetched] = useState(false)
  const db = getFirestore(app)

  const fetchDataCallback = useCallback(() => {
    fetchData(db, leaguesData, setLeaguesData, setDataFetched)
  }, [db, leaguesData])

  const fetchEventsAndTeamsDataCallback = useCallback(
    (league, strCurrentSeason, sport) => {
      return fetchEventsAndTeamsData(db, leaguesData, setLeaguesData, league, strCurrentSeason, sport)
    },
    [db, leaguesData],
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

          // Ensure tournaments collection exists within the user document
          const tournamentsCollectionRef = collection(userDocRef, 'tournaments')
          const tournamentsQuery = await getDocs(tournamentsCollectionRef)

          if (tournamentsQuery.empty) {
            // Create a default document or leave it empty
            await setDoc(doc(tournamentsCollectionRef, 'defaultTournament'), { name: 'Default Tournament' })
          }
        } else {
          // Handle case where user document does not exist
          await setDoc(userDocRef, {})
          setUserDoc({})

          // Ensure tournaments collection exists within the user document
          const tournamentsCollectionRef = collection(userDocRef, 'tournaments')
          await setDoc(doc(tournamentsCollectionRef, 'defaultTournament'), { name: 'Default Tournament' })
        }

        if (!dataFetched) {
          if (document.getElementById('firebaseui-auth-container')) {
            document.getElementById('firebaseui-auth-container').style.opacity = 0
          }
          fetchDataCallback()
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
  }, [db, dataFetched, fetchDataCallback])

  return (
    <DataContext.Provider
      value={{
        user,
        userDoc,
        leaguesData,
        fetchEventsAndTeamsData: fetchEventsAndTeamsDataCallback,
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
