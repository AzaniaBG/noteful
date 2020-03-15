import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import PropTypes from 'prop-types';

class FoldersList extends React.Component {

    static contextType = AppContext;

    render() {
        const folderPath = this.props.match.params.id;
        const folders = this.context.folders.map((folder) => (
                
                <h3 key={folder.id} id={folder.id} style={folderPath === folder.id ? {backgroundColor: "lightblue"} : {}}>
                    <NavLink to={`/folder/${folder.id}`}>
                    {folder.name}
                    </NavLink>
                </h3>
        ))
        return (
            
            <div>
                {folders}
                <button id="addFolder" >
                    <NavLink to={"/addFolder"}>
                    Add Folder
                    </NavLink>
                </button>
            </div>
        )
    }
}
FoldersList.propTypes = {
    FoldersList: PropTypes.arrayOf(PropTypes.object)
}
export default withRouter(FoldersList)

