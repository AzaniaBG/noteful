import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Notes from '../Notes/Note';
import Nav from '../Nav/Nav'
import Sidebar from '../Sidebar/Sidebar';
import Folders from '../Folders/FoldersList';

export default function NotefulApp(props) {
    const folders = props.folders.map((folder) => 
         (
             <Folders 
                key={folder["id"]}
                name={folder["name"]}
             />
        ))
    const notes = props.notes.map((note) => (
        <Notes
            key={note["id"]}
            name={note["name"]}
            content={note["content"]} />
        ))

    return (
        <BrowserRouter>
           
            <div className="NotefulApp">
                <h1>Noteful App</h1>
                {notes}          
                <Sidebar folders={folders} />
            </div>
        </BrowserRouter>
    )
}