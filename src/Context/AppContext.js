import React from 'react';


const AppContext = React.createContext({
    notes: [],
    folders: [],
    onBackClick: () => {},
    handleDeleteClick: () => {},
    handleAddClick: () => {},
});

export default AppContext;