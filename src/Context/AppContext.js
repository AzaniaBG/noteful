import React from 'react';


const AppContext = React.createContext({
    notes: [],
    folders: [],
    onBackClick: () => {},
    handleDeleteClick: () => {},
    handleAddFolderClick: () => {},
    updateFolders: () => {}, 
    handleAddClick: () => {},
});

export default AppContext;