export function createDateTime(customTimeFormat) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();

    const separator = customTimeFormat.charAt(2);
    const timeArr = customTimeFormat.split(separator);
    if (timeArr.length !== 2) return false;

    return new Date(year, month, day, timeArr[0], timeArr[1]);
}

export function createRoundTime(roundTime) {
    const firstRound = new Date(Date.now() + roundTime * 60000);
    const secoundRound = new Date(Date.now() + (roundTime * 2) * 60000);
    const thirdRound = new Date(Date.now() + (roundTime * 3) * 60000);

    return [firstRound, secoundRound, thirdRound];
}

export function validateStartTime(customTimeFormat) {
    if (!customTimeFormat.length === 5) return false;
    const hh = customTimeFormat.slice(0, 2);
    const mm = customTimeFormat.slice(-2);

    if (Number(hh) < 0 || Number(hh) >= 24) return false;
    if (Number(mm) < 0 || Number(mm) > 59) return false;

    if (createDateTime(customTimeFormat) < Date.now()) return false;

    return true;
}

export function trimCoordinates(coordinates) {
    const lat = Number(coordinates[0].toString().slice(0, -8));
    const lon = Number(coordinates[1].toString().slice(0, -8));
    return [lat, lon];
}