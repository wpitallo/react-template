export const convertToLocalTime = (utcDate, utcTime) => {
    // Get the user's locale and time zone
    let locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    locale = 'en-ZA';

    // Create a Date object from the UTC date and time
    const utcDateTime = new Date(`${utcDate}T${utcTime}Z`);

    // Create formatters for date and time
    const dateFormatter = new Intl.DateTimeFormat(locale, {
        timeZone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const timeFormatter = new Intl.DateTimeFormat(locale, {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
    });

    // Format the date and time
    const formattedDate = dateFormatter.format(utcDateTime);
    const formattedTime = timeFormatter.format(utcDateTime);

    return { eventDateLocal: formattedDate, eventTimeLocal: formattedTime };
};