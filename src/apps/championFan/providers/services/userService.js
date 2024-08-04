import { doc, setDoc } from 'firebase/firestore'
import { app } from '@configuration/firebaseConfig'
import { getFirestore } from 'firebase/firestore'

const db = getFirestore(app)

export const updateUserDocument = async (userId, displayName, avatar, setUserDoc) => {
    try {
        // Validate displayName and avatar
        if (!displayName || typeof displayName !== 'string' || displayName.trim() === '') {
            throw new Error('Invalid displayName: must be a non-empty string.')
        }
        if (!avatar || typeof avatar !== 'string' || avatar.trim() === '') {
            throw new Error('Invalid avatar: must be a non-empty string.')
        }

        const userDocRef = doc(db, 'users', userId)

        // Update the document with displayName, hasSignedUp, and avatar
        const updatedUserDoc = {
            displayName,
            hasSignedUp: true,
            avatar,
        }

        await setDoc(userDocRef, updatedUserDoc, { merge: true }) // Merge to update specific fields without overwriting the whole document

        // Update the context with the updated user document
        setUserDoc(updatedUserDoc)

    } catch (error) {
        console.error('Error updating user document:', error)
        throw error // Re-throw the error to be handled by the caller
    }
}
