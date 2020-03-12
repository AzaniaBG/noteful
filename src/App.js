import React, { Component } from 'react';
import './App.css';
import { Route, NavLink } from 'react-router-dom';
import NotesList from '../src/Notes/NotesList';
import Note from '../src/Notes/Note';
import FoldersList from '../src/Folders/FoldersList';
import Folder from '../src/Folders/Folder';
// import DummyStore from './DummyStore.js';
import AppContext from './Context/AppContext';
import config from '../src/config';

class App extends Component { 
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
    //create a method that updates state when a button in a nested component is clicked (updater function)
    handleDeleteClick = (noteId) => {
      this.setState({
        notes: this.state.notes.filter((note) => note.id !== noteId)
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
              handleDeleteClick: this.handleDeleteClick,
              }}>
{/* list folders in sidebar */}
            <section className="Sidebar">
              <Route exact path="/"
                component={FoldersList}>
              </Route>
              <Route exact path="/folder/:id"
                component={FoldersList} />
              
  {/* when specific folder selected, show folder highlighted in sidebar and only show notes from that folder */}          
              
              <Route exact path="/note/:id"
                render={({history}) => (
                  <Folder 
                    onBackClick={() => history.goBack() }
                    /> 
                    )}
              />
            </section>
            
            <section className="Main">
              <Route exact path="/" 
                component={NotesList} />
              <Route exact path="/folder/:id"
                component={NotesList} />
              <Route exact path="/note/:id" 
                component={Note} />
            </section>
          </AppContext.Provider>
        </div>
      
    );
  }
}

export default App;
