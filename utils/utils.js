export function createDateTime(customTimeFormat) {
    if (!validateStartTime(customTimeFormat)) return false;

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();

    const separator = customTimeFormat.charAt(2);
    const timeArr = customTimeFormat.split(separator);
    if (timeArr.length !== 2) return false;

    return new Date(year, month, day, timeArr[0], timeArr[1]);
}

export function validateStartTime(customTimeFormat) {
    if (!customTimeFormat.length === 5) return false;
//    if (customTimeFormat.charAt(2) !== '.' || customTimeFormat.charAt(2) !== ' ' || customTimeFormat.charAt(2) !== ',') return false;
    return true;
}

export function trimCoordinates(coordinates) {
    const lat = Number(coordinates[0].toString().slice(0, -8));
    const lon = Number(coordinates[1].toString().slice(0, -8));
    return [lat, lon];
}