export const epochToReadable = (ts) => {
    let date = new Date(+ts);
    let day =  +date.getDate();
    let month = +date.getMonth() + 1;
    let year = +date.getFullYear();

    month = month.toString().padStart(2, '0');
    day = day.toString().padStart(2, '0');

    let result = `${day}/${month}/${year}`;

    return result;
}

export const getLastOnline = (lastSeen) => {
    const timeNow = (new Date()).getTime();

    let lastOn = Math.floor((timeNow - (+lastSeen))/(60*1000));

    /* More than 3 days ago */
    if (lastOn >= 4320) {
        return '>3d';
    }
    /* More than 1 day ago */
    else if (lastOn >= 1440) {
        return `${Math.floor(lastOn/(60*24))}d`;
    }
    /* More than one hour */
    else if (lastOn >= 60) {
        return `${Math.floor(lastOn/60)}h`;
    }
    else if (lastOn <= 1) {
        return '1m';
    }
    else {
        return `${lastOn}m`;
    }
}