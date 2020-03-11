import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';

class Note extends React.Component {
    static contextType = AppContext;
    render() {
        const notePath = this.props.match.params.id;
        const selectedNote = this.context.notes.filter((note) => note.id === notePath);
        const note = selectedNote.map((note) => (
            <div key={note.folderId}>
                <h2 id={note.folderId}>{note.name}</h2>
                <p className="date">Date Modified: {note.modified}</p>
                <button id="deleteButton">Delete Note</button>
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

export default withRouter(Note)