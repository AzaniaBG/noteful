import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';

class Folder extends React.Component {

    static contextType = AppContext;
    render() {
        // const routeId = this.props.match.params.id
        // const noteId = this.props.notes.filter((note) => note.id === routeId);
        // const folderId = noteId[0].folderId;
        // const folder = this.props.folders.filter((folder) => folder.id === folderId);
        // const folderName = folder[0].name
        const routeId = this.props.match.params.id;
        const folderId = this.context.notes.filter((note) => note.id === routeId).map((note) => note.folderId);
        const folderName = this.context.folders.filter((folder) => folder.id === folderId).map((folder) => folder.name);
        const folder = this.context.folders.filter((folder) => folder.id === folderId).map((folder) => (
            <div className="Folder" key={folder.id}>
                <h3 className="Folder" id={folder.id}>{folder.name}</h3>

            </div>
        ))
        return (
            <div>
                <button onClick={this.props.onBackClick}>
                    Back
                </button>
                <h3>{folderName}</h3>
                <p>{folder}</p>
            </div>
            
        )
    }
}

export default withRouter(Folder)