import translations from '@translations/translations.json5'

import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Import the locale you need

const locale = 'en'
dayjs.locale(locale)

export const getLocalShortDateString = (date) => {
    return dayjs(date).format('D MMM YYYY')
}

export const translator = (key) => {
    return translations['en'][key]
}