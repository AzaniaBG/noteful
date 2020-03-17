import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import PropTypes from 'prop-types';

class NotesList extends React.Component {

    static contextType = AppContext;
    render() {     
        let noteName;
        const folderId = this.props.match.params.id;
    //console.log(`folderId from NotesList is ${folderId}`);
        if(folderId === undefined || folderId === null) {
            noteName = this.context.notes.map((note) => (
                <div key={note.id}>
                    <h3 key={note.id}>{note.name}</h3>
                    <p>Modified: {note.modified}</p>
                </div>
            ))
        } else {
            const filteredNotes = this.context.notes.filter((note) => {
                    return note.folderId === folderId;
                });
            noteName = filteredNotes.map((note) => (
                <div key={note.id}>
                    <h3 key={note.id}>
                        <NavLink to={`/note/${note.id}`}>{note.name}</NavLink>
                    </h3>
                    <p>Modified: {note.modified}</p>
                    <button id="addButton" >
                        <NavLink to={`/addNote/${folderId}`}>
                        Add Note
                        </NavLink>
                    </button>
                </div>
                ))
            }
        return (
            <div className="Main">
                <button id="addButton2">
                    <NavLink to={"/addNote"}>
                    Add Note
                    </NavLink>
                </button>
                
                {noteName} 
            </div>
        )
    }
}
NotesList.propTypes = {
    NotesList: PropTypes.arrayOf(PropTypes.object)
}
export default withRouter(NotesList)

//Q&A SESSION:
// class NotesList extends React.Component {
    
//     render() {
//         console.log(this.props)
//         const folderId = this.props.match.params.id
//         const notes = this.props.notes.filter((note) => note.folderId === folderId)
//         return (
//             <div>
//                 <h3>Notes</h3>
//                 {notes.map((note) => (
//                     <div key={note.id}>
//                         {note.name}
                        
//                     </div>
//                 ))}
//             </div>
//         )
//     }
// }
// export default withRouter(NotesList)