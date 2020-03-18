import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import config from '../config';
import ValidationMessage from './ValidationMessage';

class AddNote extends React.Component {
    static contextType = AppContext; 
   
    constructor(props) {
        super(props);     
        this.state = {
            "name": " ",
            "content": " ",
            "folderId": " ",
            "value": " ",
            "touched": false,
        }
    }
    
    //method gets user input for note name
    addNote = (name) => {
        this.setState({
            "touched": true,
            "name": name,
        })
    }
    //method gets user input for folder name
    addFolder = (folderInput) => {  
    console.log(`folder from AddFolder is`, folderInput);
        const folderOption = folderInput
        //return the folder that matches the folder user selected
        const folder = this.context.folders.filter((folder) => folder.name === folderOption);
        const folderId = folder[0].id
    console.log(`folderId is:`, folderId)
        this.setState({ "folderId": folderId})
    }
    //method gets user input for note content
    addContent = (content) => {
        // console.log(`addContent ran`)
        this.setState({
            "touched": true,
            "content": content,
        })
    }
    //method handles "save" button--constructs object from state
    handleSubmit = (e) => {
        //prevent default submission triggered by onSubmit handler
        e.preventDefault();
        //destruct state and save in a variable to be passed in the REQUEST body
        const { name, folderId, content } = this.state;
        const newNote = { name, folderId, content };
        //send POST REQUEST to notes server endpoint to add new note from user
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                "content-type": "application/json",
            }
        }).then(res => {
            //if res not successful, return error; otherwise, return body of response as JSON object
            if(!res.ok) {
                throw new Error("sump done gone wrong");
            }
            return res.json();
        }).then(resData => {
            //reset state/form data/inputs
            this.setState({
                "name": " ",
                "content": " ",
                "folderId": " ",
                "value": " ",
                "touched": false,
            });
            //update notes data in state (in App Component) with the new note from response data
            this.context.updateNotes(resData);
            //programmatically navigate back to home page after new note successfully saved
            this.props.history.push('/');
        }).catch((err) => console.log(err))        
    }
    //create method to provide validation message if applicable:
    validateNameInput = () => {
        //get value of input and save in variable
        const name = this.state.name.trim();
        if(name === "" || name === " ") {
            return "Note name is required";
        }
        if(name.length <= 1 || name.length > 20) {
            return "Note name must be more than one character and no more than 20!";
        }
        
    }
    render() {
        const nameError = this.validateNameInput();
        // const folderNames = this.context.folders.map((folder) => <option name={folder.name} key={folder.id} id={folder.id} value={folder.name}>{folder.name}</option>)
        const folders = this.context.folders; 
        const folderOptions = folders.map((folder) => <option name={folder.name} value={folder.name} key={folder.id} id={folder.id}>{folder.name}</option>);
        
        
        // console.log(`folderName from AddNote is`, folderNames)
        return (
                <form className="AddNote" onSubmit={(e) => this.handleSubmit(e)}>
                    <fieldset>
                    <h2>Add Note</h2>
                    <label htmlFor="folder">Folder</label>
                    <select
                        id="folder"
                        type="select" 
                        onChange={(e) => this.addFolder(e.target.value)}>
                        
                        {folderOptions}
                    </select>
                    <label htmlFor="newNote">New Note Note</label>
                    <input 
                        id="newNote"
                        type="text"
                        name="newNote"
                        aria-required="true"
                        onChange={(e) => this.addNote(e.target.value)} />
                    <div className="validationMessage"  >
                        {this.state.touched && (
                            <ValidationMessage message={nameError} />
                        )}
                       
                    </div>
                    <label htmlFor="noteContent">New Note Content</label>
                    <textarea 
                        id="noteContent"
                        type="text"
                        onChange={(e) => this.addContent(e.target.value)} />
                    <button className="addNoteButton" 
                        type="submit"
                        disabled={
                            this.validateNameInput()
                        }
                        // onClick={(e) => this.context.updateNote(e.target.value)}
                        >
                        Save Note
                    </button>
                    </fieldset>
                </form>
        )
    }
}

export default withRouter(AddNote)