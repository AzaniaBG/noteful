import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import config from '../config';
import PropTypes from 'prop-types';

class Note extends React.Component {
    static contextType = AppContext;

    //add method that will delete note and trigger updater function
    handleDeleteButton = (e) => {
        e.preventDefault();
        const noteId = this.props.match.params.id;
    console.log(`handleDeleteButton from Note.js ran; noteId is:`, noteId);
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            },
        }).then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json();
        }).then(() => this.context.updateAfterDelete(noteId))
        .then(this.props.history.push('/'))
        .catch(error => console.log(error));
    }

    render() {
        const notePath = this.props.match.params.id;
        const selectedNote = this.context.notes.filter((note) => note.id === notePath);
        const note = selectedNote.map((note) => (
            <div key={note.folderId}>
                <h2 id={note.folderId}>{note.name}</h2>
                <p className="date">Date Modified: {note.modified}</p>
                <button id="deleteButton" onClick={(note) => this.handleDeleteButton(note)}>Delete Note</button>
                <p className="Notes_content">{note.content}</p>
            </div>
        ))
        return (
            <div>
                {note}
            </div>
        )
    }
}
Note.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.isRequired,
    content: PropTypes.string
}
export default withRouter(Note)