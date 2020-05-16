const FetchService = {
    getAllNotes() {
        fetch(`${config.API_ENDPOINT}/notes`)
            .then(notes => notes.json())
    }
}
module.exports = FetchService;
