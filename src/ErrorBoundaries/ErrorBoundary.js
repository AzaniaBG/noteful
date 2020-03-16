import React from 'react';

//use class for stateful Components
export default class ErrorBoundary extends React.Component {
    //initialize state with an error set to FALSE
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }

    }
    //create error boundary that displays UI re error to user (may help user understand error)
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
    //conditionally render error message if state's hasError is TRUE
        if(this.state.hasError) {
            return (
                <h2>Heck! We haz err.</h2>
            )
        }
        return <div>{this.props.children}</div>
    }
}