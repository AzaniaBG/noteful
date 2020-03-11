import React from 'react';

export default function Nav(props) {
    const noteTitle = props.notes.map((note) => (
        <div key={note["id"]}>
            <h2>
                {note["name"]}
            </h2>
        </div>
    ))
    return (
        
            <h2 className="Nav">{noteTitle}</h2>
        
    )
}