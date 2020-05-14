import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';
// import config from '../config';
import PropTypes from 'prop-types';
import formatDate from '../Date';


class Note extends React.Component {
    static contextType = AppContext;
    

    render() {
        const notePath = this.props.match.params.id;
        const selectedNote = this.context.notes.filter((note) => note.id === notePath);
        const note = selectedNote.map((note) => (
            <div key={note.folderId} className="Notes">
                <h2 id={note.folderId}>{note.name}</h2>
                <p className="date">Date Modified: {formatDate(note.modified)}</p>
                <button id="deleteNoteButton" 
                    onClick={() => this.context.handleDeleteButton(notePath)}>
                        Delete Note
                </button>
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