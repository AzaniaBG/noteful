import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import formatDate from '../Date';


class NotesList extends React.Component {

    static contextType = AppContext;
    render() {     
        console.log(Date);
        let noteName;
        const folderId = this.props.match.params.id;
    //console.log(`folderId from NotesList is ${folderId}`);
        if(folderId === undefined || folderId === null) {
            noteName = this.context.notes.map((note) => (
                <li key={note.id} className="Notes">
                <NavLink to={`/note/${note.id}`}>
                    <h3 key={note.id}>{note.name}</h3>
                </NavLink>
                    <p>Modified: {formatDate(note.modified)}</p>
                    <button id="deleteNoteButton" onClick={() => this.context.handleDeleteButton(note.id)}>
                        Delete Note
                    </button> 
                </li>
            ))
        } else {
            const filteredNotes = this.context.notes.filter((note) => {
                    const date = note.modified;
                    console.log(`date is ${date}`)
                    const formatted = new Date(date);
                    const formattedDate = formatted.toDateString();
                    console.log(`formattedDate is`, formattedDate)
                    return note.folderId === folderId;
                });
            noteName = filteredNotes.map((note) => (
                    <li key={note.id} className="Notes">
                        <NavLink to={`/note/${note.id}`}>
                            {note.name}
                        </NavLink>
                        <p>Date Modified: {formatDate(note.modified)}</p>
                        <button id="deleteNoteButton" onClick={() => this.context.handleDeleteButton(note.id)}>
                        Delete Note
                        </button> 
                    </li>
                    
                ))
            }
            console.log(`noteName from NotesList is`, noteName)
        return (
           
            <ul>
                {noteName}
                <button className="addNoteButton" type="submit">
                    <NavLink to={"/addNote"} >
                        Add Note
                    </NavLink>
                </button>
            </ul>
        )
    }
}
NotesList.propTypes = {
    NotesList: PropTypes.arrayOf(PropTypes.object)
}
export default withRouter(NotesList)
