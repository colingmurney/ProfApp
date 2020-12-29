export default function formatDate(dateString : string) : string {
    const dateObj = new Date(dateString);

    let minutesFormatted: string | number = dateObj.getMinutes();
    if (minutesFormatted < 10) minutesFormatted = `0${minutesFormatted}`

    return dateObj.getFullYear() + '-' + (dateObj.getMonth()+1) + '-' + dateObj.getDate()
                + ' ' + dateObj.getHours() + ':' + minutesFormatted;
}