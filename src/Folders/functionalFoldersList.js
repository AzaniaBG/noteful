import React from 'react';
//import { NavLink, withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';

function FunctionalFoldersList() {

    return (
        <AppContext.Consumer>
            {(value) => {
                return (
                    <div>
                        <h1>{value.folder}</h1>
                    </div>
                )
            }}
        </AppContext.Consumer>
    )}

export default FunctionalFoldersList;