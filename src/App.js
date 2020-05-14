import React, { Component } from 'react';
import './App.css';
import { Route, NavLink } from 'react-router-dom';
import NotesList from '../src/Notes/NotesList';
import Note from '../src/Notes/Note';
import FoldersList from '../src/Folders/FoldersList';
import Folder from '../src/Folders/Folder';
import AppContext from './Context/AppContext';
import config from '../src/config';
import AddFolder from '../src/AddForms/AddFolder';
import AddNote from '../src/AddForms/AddNote';
import ErrorBoundary from '../src/ErrorBoundaries/ErrorBoundary';

class App extends Component { 
  static defaultProps = {
    notes: [],
    folders: [],
  }
  static getDerivedStateFromError = ErrorBoundary 
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      folders: []
    }
  }
  //implement fetch requests when the application mounts
  componentDidMount() {
    //ensure all async operations resolve before invoking success/failure calls 
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)

    ]).then(([foldersRes, notesRes]) => {
      if(!foldersRes.ok) {
        return foldersRes.json().then(e => Promise.reject(e));
      }
      if(!notesRes.ok) {
        return notesRes.json().then(e => Promise.reject(e));
      }
      return Promise.all([foldersRes.json(), notesRes.json()]);
      }).then(([notes, folders]) => {
        this.setState({notes, folders});
      }).catch(error => console.log({error}))
    }
    //create a method that updates folders state when a button in a nested component is clicked (updater function)
    updateAfterDelete = (noteId) => {
      this.setState({
        notes: this.state.notes.filter((note) => note.id !== noteId)
      });
    }
    handleDeleteButton = (noteId) => {
      const note = noteId;
      fetch(`${config.API_ENDPOINT}/notes/${note}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        },
        }).then(res => {
          if(!res.ok) {
            return res.json().then(e => Promise.reject(e));
          }
          return res.json();
        }).then(() => this.updateAfterDelete(note)).catch(error => console.log(error));
    }
    updateFolders = (newFolder) => {
      let folders = this.state.folders;
      this.setState({
        folders: [...folders, newFolder]
      });
      
    }
    //create a method that updates notes state when a button in a nested component is clicked
    updateNotes = (newNote) => {
      let notes = this.state.notes;
      this.setState({
        notes: [...notes, newNote]
      })
    }

  render() {
    
       return (
        <div className="App">
            <NavLink to="/">
              <h1 className="App-header">
              Noteful
              </h1>
            </NavLink>
            <AppContext.Provider
              value={{
                folders: this.state.folders,
                notes: this.state.notes,
                handleDeleteButton: this.handleDeleteButton,
                updateAfterDelete: this.updateAfterDelete,
                updateFolders: this.updateFolders,
                handleAddNoteClick: this.handleAddNoteClick,
                updateNotes: this.updateNotes,
                }}>
  {/* list folders in sidebar */}
              <section className="Sidebar">
                <ErrorBoundary>
      {/* show Folders List on main page (when patch exactly matches "/") */}
                  <Route exact path="/"
                    component={FoldersList}>
                  </Route>

                  <Route exact path="/folder/:id"
                    component={FoldersList} />
      {/* when specific folder selected, show folder highlighted in sidebar and only show notes from that folder */}          
                  <Route exact path="/note/:noteid"
                    render={({history}) => (
                      <Folder 
                        onBackClick={() => history.goBack() }
                        /> 
                        )}/>
          
      {/* show the Add Folder Component when the path exactly matches "/addFolder" */}
                  <Route exact path="/addFolder" 
                    component={AddFolder} />
                </ErrorBoundary>
              </section>
              
              <section className="Main">
                <Route exact path="/" 
                  component={NotesList} />
                <Route exact path="/addNote"
                  component={AddNote} />
                <Route exact path="/folder/:id"
                  component={NotesList} />
                <Route exact path="/note/:id" 
                  component={Note} />
                <Route exact path="/addNote/:folderId"
                  render={({history}) => (
                    <AddNote 
                      handleAddNoteClick={() => history.push('/addNote/:folderId')} />
                  )} />
                {/* <Route exact path="/addNote"
                  component={AddNote} /> */}
              </section>
            </AppContext.Provider>
        </div>
      
    );
  }
}

export default App;
