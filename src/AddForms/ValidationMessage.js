import React from 'react';

export default function ValidationMessage(props) {
    if(props.message) {
    return <div className="errorMessage">{props.message}</div>
    }
    return <> </>
}