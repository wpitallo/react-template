import { doc, getDoc, setDoc } from 'firebase/firestore'
import { app } from '@configuration/firebaseConfig'
import { getFirestore } from 'firebase/firestore'

const db = getFirestore(app)

export const updateUserDocument = async (userId, displayName, avatar) => {

    try {
        // Validate displayName and avatar
        if (!displayName || typeof displayName !== 'string' || displayName.trim() === '') {
            throw new Error('Invalid displayName: must be a non-empty string.')
        }
        if (!avatar || typeof avatar !== 'string' || avatar.trim() === '') {
            throw new Error('Invalid avatar: must be a non-empty string.')
        }

        const userDocRef = doc(db, 'users', userId)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
            // Update the document with displayName, hadSignedUp, and avatar
            await setDoc(userDocRef, {
                displayName,
                hasSignedUp: true,
                avatar,
            }, { merge: true }) // Merge to update specific fields without overwriting the whole document
        } else {
            // Create a new document if it doesn't exist
            await setDoc(userDocRef, {
                displayName,
                hasSignedUp: true,
                avatar,
            })
        }
    } catch (error) {
        console.error('Error updating user document:', error)
        throw error // Re-throw the error to be handled by the caller
    }
}
