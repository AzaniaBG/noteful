import React from 'react';
import DummyStore from '../DummyStore';

const ContextFolders = React.createContext({
    folders: DummyStore.folders,

});

export default ContextFolders;