import React from 'react';
import AppContext from '../Context/AppContext';
import config from '../config';

export default class AddFolder extends React.Component {
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
    console.log(`event from handleAddClick ran`, folderName);
        this.setState({
            "id": " ",
            "name": folderName,
        })
    }
    //add method to process form values when submit button is clicked
    handleSubmit = (event) => {
        event.preventDefault();
        //const name = this.nameInput.current.value;
        const { name, id } = this.state;
        const newFolder = { id, name };
    console.log(`newFolder from handleSubmit is:`, newFolder)
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            body: JSON.stringify(newFolder),
            headers: {
                "content-type": "application/json",
            }
        }).then((res) => res.json())
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
                        // defaultValue="new folder"
                        className="AddFolder_control"  />
                    <button className="addFolderButton">Add Folder</button>
                </div>
            </form>
        )

    }

}