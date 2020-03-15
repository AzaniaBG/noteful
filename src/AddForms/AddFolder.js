import React from 'react';
import AppContext from '../Context/AppContext';
import config from '../config';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class AddFolder extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props)
        this.state = {
           "id": " ",
           "name": " ",
        }
        //this.nameInput = React.createRef();
    }
    
    //add method to get value when add button is clicked and update state with new value
    handleAddClick = (folderName) => {
    // console.log(`event from handleAddClick ran`, folderName);
        this.setState({
            "name": folderName,
            "id": " ",
        })
    }
    //add method to that adds user's new folder to folders already in state
    // updateFolders = (newFolder) => {
    //     let folders = this.context.folders;
    // console.log(`upDateFolders context value`, folders)
    //     //to avoid mutating state, use the spread operator to copy the folders array into a new array and add the new folder to the end of that array
    //     this.setState({
    //         folders: [...folders, newFolder]
    //     })

    // }
    //add method to process form values when submit button is clicked
    handleSubmit = (event) => {
        event.preventDefault();
        //const name = this.nameInput.current.value;
        const { name } = this.state;
        const newFolder = { name };
        
        newFolder.propTypes = {
            newFolder: PropTypes.object
        }
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            body: JSON.stringify(newFolder),
            headers: {
                "content-type": "application/json",
            }
        }).then(res => {
            if(!res.ok) {
                throw new Error("sump wrong");
            }
            return res.json();
        }).then( resJson => {
        //console.log(`resJson is`, resJson)
            this.setState({
                "id": " ",
                "name": " ",
            });
            this.context.updateFolders(resJson);
            this.props.history.push("/");
        }).catch((err) => console.log(err));
    }
    render() {
        return (
            <form className="AddFolder" onSubmit={(e) => this.handleSubmit(e)}>
                <h2>Add Folder</h2>
                <div className="form-group">
                    <label htmlFor="newFolder">New Folder Name</label>
                    <input 
                        id="newFolder" 
                        type="text" 
                        name="newFolder" 
                        onChange={(e) => this.handleAddClick(e.target.value)}
                        //ref={this.nameInput}
                        //defaultValue="new folder"
                        className="AddFolder_control"  />
                    <button className="addFolderButton" 
                        onClick={(e) => this.context.updateFolders(e.target.value)}>
                        Save Folder
                    </button>
                </div>
            </form>
        )

    }

}
export default withRouter(AddFolder)