import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends Component {
    render() {
        return (
            <div className="NotFoundPage center-align">
                <h2>Bertie Reads The Straits Times</h2>
                <h4>Oh no! Page not found.</h4>
                <Link to='/' className="btn blue darken-2 btn-large">Return to Start</Link>
            </div>             
        )
    }
}

export default NotFoundPage;