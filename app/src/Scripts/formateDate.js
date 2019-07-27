export default function formateDate(date) {
    date = new Date(date);
    let month = date.getMonth() + 1;
    month = (1 + date.getMonth()).toString().padStart(2, '0');
    const dateString = `${date.getFullYear()}-${month}-${date.getDate()}`;
    return dateString;
}