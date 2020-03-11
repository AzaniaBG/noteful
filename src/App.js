import React, { Component } from 'react';
import './App.css';
import { Route, NavLink } from 'react-router-dom';
import NotesList from '../src/Notes/NotesList';
import Note from '../src/Notes/Note';
import FoldersList from '../src/Folders/FoldersList';
import Folder from '../src/Folders/Folder';
import DummyStore from './DummyStore.js';
import AppContext from './Context/AppContext';

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      folders: DummyStore.folders,
      notes: DummyStore.notes
    }
  }
  //implement fetch requests when the application mounts
  
  
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
              notes: this.state.notes
              }}>
{/* list folders in sidebar */}
            <section className="Sidebar">
              <Route exact path="/"
                component={FoldersList}>
              </Route>
              <Route exact path="/folder/:id"
                component={FoldersList} />
              {/* <Route exact path="/folder/:id"
                render={(routeProps) => 
                <FoldersList folders={this.state.folders} /> } 
                /> */}
              
  {/* when specific folder selected, show folder highlighted in sidebar and only show notes from that folder */}          
              {/* <Route exact path="/folder/:id"
                render={(routeProps) => <FoldersList folders={this.state.folders.find(folder => folder.id === routeProps.match.params.id)} />} /> */}
                {/* <FoldersList folders={this.state.folders} /> 
              </Route> */}
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
