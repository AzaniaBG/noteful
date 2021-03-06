import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import PropTypes from 'prop-types';

class Folder extends React.Component {

    static contextType = AppContext;
    render() {
        const routeId = this.props.match.params.noteid;
        const folderId = this.context.notes.filter((note) => note.id === routeId)
            .map((note) => note.folderId);

// console.log(`folderId:`, folderId);
        const folder = this.context.folders.filter((folder) =>folder.id === folderId[0]);
// console.log(`folder is`, folder)
        const folderName = folder[0].name;
// console.log(`folderName:`, folderName);


        // const folderId = this.context.notes.filter((note) => note.id === routeId).map((note) => note.folderId);
        // const folderName = this.context.folders.filter((folder) => folder.id === folderId).map((folder) => folder.name);
        // const folder = this.context.folders.filter((folder) => folder.id === folderId).map((folder) => (
        //     <div className="Folder" key={folder.id}>
        //         <h3 className="Folder" id={folder.id}>{folder.name}</h3>

        //     </div>
        // ))
        return (
            <div>
                <button onClick={this.props.onBackClick}>
                    Back
                </button>
                <h3>{folderName}</h3>
            </div>
            
        )
    }
}
Folder.propTypes = {
    folder: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.Important
    }))
}
export default withRouter(Folder)