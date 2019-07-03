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