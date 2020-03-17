import React from 'react';
import AppContext from '../Context/AppContext';
import config from '../config';
import { withRouter } from 'react-router-dom';
import ValidationMessage from './ValidationMessage';

class AddFolder extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props)
        this.state = {
           "id": " ",
           "name": " ",
           touched: false,
        }
        //this.nameInput = React.createRef();
    }
    
    //add method to get value when add button is clicked and update state with new value
    handleAddClick = (folderName) => {
    // console.log(`event from handleAddClick ran`, folderName);
        this.setState({
            "name": folderName,
            "touched": true
        })
    }
    validateFolder = () => {
        console.log(`validateFolder from AddFolder ran`)
        let input = this.state.name;
        console.log(`input from AddFolder is`, input);
        if(input === " " || input === "") {
            return "Please enter a folder name";
        }

    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        //const name = this.nameInput.current.value;
        const { name } = this.state;
        const newFolder = { name };
    console.log(`newFolder from handleSubmit is:`, newFolder)
    
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
        console.log(`resJson is`, resJson)
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
                    {/* conditionally render validation error message below input */}
                    {this.state.touched && (
                        <ValidationMessage message={this.validateFolder()} />
                    )}
                    <button className="addFolderButton" 
                        type="submit"
                        disabled={this.validateFolder()}
                        onClick={(e) => this.context.updateFolders(e.target.value)}>
                        Save Folder
                    </button>
                </div>
            </form>
        )

    }

}
export default withRouter(AddFolder)