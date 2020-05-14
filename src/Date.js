function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toDateString();
    return formattedDate;
}
module.exports = formatDate;


