import { createContext, useState, useEffect, useCallback } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@configuration/firebaseConfig';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const auth = getAuth(app);
    const db = getFirestore(app);

    const fetchData = useCallback(async (uid) => {
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setData(docSnap.data());
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }, [db]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                fetchData(user.uid);
            } else {
                setData(null);
            }
        });

        return () => unsubscribe();
    }, [auth, fetchData]);

    return (
        <DataContext.Provider value={{ user, data }}>
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DataContext;
