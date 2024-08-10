import { getLocalStorageSize } from './helpers/getLocalStorageSize'

window.app.getInfo = () => {
    return {
        localStorageSize: getLocalStorageSize()
    }
}