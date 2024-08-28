import { getAuth } from 'firebase/auth'

export const getUserIdToken = async () => {
    const auth = getAuth()
    const user = auth.currentUser

    if (!user) {
        console.error('User is not authenticated')
        return
    }

    const idToken = await user.getIdToken()
    return idToken
}
