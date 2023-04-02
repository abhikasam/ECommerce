
const padTime = time => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
};


export const format = time => {
    const minutes = Math.floor(time / 60);
    const seconds = parseInt(time % 60);
    return `${minutes}:${padTime(seconds)}`;
}

