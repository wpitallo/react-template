import { convertToLocalTime } from '@helpers/convertToLocalTime'

export const getLocalDateTimeString = (date, time) => {
    const { eventDateLocal, eventTimeLocal } = convertToLocalTime(date, time);
    return `${eventDateLocal} : ${eventTimeLocal}`
}

