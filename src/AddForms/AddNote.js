import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';

class AddNote extends React.Component {
    static contextType = AppContext; 

    constructor(props) {
        super(props);
    //     const folderPath = this.props.match.params.id;
    // console.log(`folderPath from AddNote is`, folderPath)
        this.state = {
            "name": " ",
            "content": " ",
            "folder": folderPath,
        }
    }

    render() {
        return (
                <form className="AddNote">
                    <h2>Add Note</h2>
                    <input name="defaultName" />


                </form>
        )
    }
}

export default withRouter(AddNote)