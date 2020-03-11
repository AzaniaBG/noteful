import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';

function Note(props) {
    return (
        <AppContext.Consumer>
            {(value) => {
                const notePath = props.match.params.id;
                const selectedNote = value.notes.filter((note) => note.id === notePath);
                const note = selectedNote.map((note) => (
                    <div key={note.folderId}>
                        <h2 id={note.folderId}>{note.name}</h2>
                        <p className="date">Date Modified:{note.modified}</p>
                        <button className="deletebutton">Delete Note</button>
                        <p className="NotesContent">{note.content}</p>
                    </div>
                ))
                return (
                    <div>
                        {note}
                    </div>
                )
            }}
        </AppContext.Consumer>

    )
}
export default withRouter(Note)