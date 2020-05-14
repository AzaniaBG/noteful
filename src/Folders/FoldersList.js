import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

class FoldersList extends React.Component {

    static contextType = AppContext;

    render() {
        const folderPath = this.props.match.params.id;
        const folders = this.context.folders.map((folder) => (
                
                <h3 key={folder.id} id={folder.id} style={folderPath === folder.id ? {backgroundColor: "lightblue"} : {}} className="Folder">
                    <NavLink to={`/folder/${folder.id}`} >
                    {folder.name}
                    </NavLink>
                </h3>
        ))
        return (
            
            <React.Fragment>
                {folders}
                <button id="addFolder" type="button">
                    <NavLink to={"/addFolder"}>
                    Add Folder
                    </NavLink>
                </button>
            </React.Fragment>
        )
    }
}
FoldersList.propTypes = {
    FoldersList: PropTypes.arrayOf(PropTypes.object)
}
export default withRouter(FoldersList)

