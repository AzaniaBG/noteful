import React from 'react';


const AppContext = React.createContext({
    notes: [],
    folders: [],
    onBackClick: () => {},
    updateAfterDelete: () => {},
    handleDeleteButton: () => {},
    handleAddFolderClick: () => {},
    updateFolders: () => {}, 
    handleAddNoteClick: () => {},
    updateNotes: () => {},
    handleAddNote: () => {},
});

export default AppContext;