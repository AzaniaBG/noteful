import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class FoldersList extends React.Component {


    render() {
        const folderPath = this.props.match.params.id;
    console.log(`folderPath from FoldersList is ${folderPath}`);
        const folders = this.props.folders
        console.log(`folders from FoldersList is`, folders);
       
        // const folders = this.props.folders.map((folder) => 
                
        //         (
        //         <div key={folder.id} className={folderPath === folder.id ? "highlighted" : "" } >
        //             <NavLink to={`/folder/${folder.id}`} key={folder.id} >
        //                 {folder.name}
        //             </NavLink>
        //         </div>
        //         ))
            

        return (
            
            <div>
            </div>
        )
    }
}
export default withRouter(FoldersList)

