import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import config from '../config';

class AddNote extends React.Component {
    static contextType = AppContext; 
   
    constructor(props) {
        super(props);     
    console.log(`route params from AddNote:`, this.props.match.params.id)
        this.state = {
            "name": " ",
            "content": " ",
            "folder": " ",
            "value": " ",
            "touched": false,
        }
    }
    //method gets user input for note name
    addNote = (name) => {
        console.log(`handleAddNoteClick ran`)
        this.setState({
            "touched": true,
            "name": name,
        })
    }
    //method gets user input for note content
    addContent = (content) => {
        console.log(`addContent ran`)
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
        const { name, content } = this.state;
        const newNote = { name, content };
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
                "folder": " ",
                "value": " ",
                "touched": false,
            });
            //update notes data in state (in App Component) with the new note from response data
            this.context.updateNotes(resData);
            //programmatically navigate back to home page after new note successfully saved
            this.props.history.push('/');
        }).catch((err) => console.log(err))

    }
    
    render() {
        
        return (
                <form className="AddNote" onSubmit={(e) => this.handleSubmit(e)}>
                    <fieldset>
                    <h2>Add Note</h2>
                    <label htmlFor="newNote">New Note Note</label>
                    <input 
                        id="newNote"
                        type="text"
                        name="newNote"
                        onChange={(e) => this.addNote(e.target.value)} />
                    <label htmlFor="noteContent">New Note Content</label>
                    <textarea 
                        id="noteContent"
                        type="text"
                        onChange={(e) => this.addContent(e.target.value)} />

                    <button className="addFolderButton" 
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