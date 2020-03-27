import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userWhitelist from './../config/userWhitelist';
import { signIn, signOut } from './../store/actions/authActions';

class Home extends Component {

    handleSignIn = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }
    handleSignOut = (e) => {
        e.preventDefault();
        this.props.signOut(this.state)
    }
    render() {
        const { authError, user } = this.props;
    
        let welcome;
        if (user) {
            if (userWhitelist.includes(user.email)) {
                welcome = <div className="Welcome">
                    <h4>Hello, {user.displayName}.</h4>
                    <div className="col s12">
                        <Link to='/intro' className="btn blue darken-2 btn-large">Begin</Link>
                    </div>
                    <h6>Not you?</h6>
                    <div className="col s12">             
                        <button className="btn orange darken-2 btn-small" onClick={this.handleSignOut}>Sign out</button>
                    </div>
                </div>;
            } else {
                welcome = <div className="Welcome">
                    <h5>Hello, {user.displayName}.</h5>
                    <h6>You have not been authorized to use this app.</h6>
                    <h6>Contact haoranl@sph.com.sg to obtain access.</h6>
                    <div className="col s12">
                        <button className="btn orange darken-2 btn-small" onClick={this.handleSignOut}>Sign out</button>
                    </div>
                </div>;
            }
        } else {
            welcome = <div className="Welcome">
                <h4>Please sign in with your SPH G Suite account.</h4>
                    <div className="col s12">
                        <button className="btn blue darken-2 btn-large" onClick={this.handleSignIn}>Sign in</button>
                    </div>
            </div>;
        }
        
        return (
            <div className="Home center-align">
                <h2>Bertie Reads The Straits Times</h2>
                {welcome}
                <div className="center red-text">
                    { authError ? <p>{authError.message}</p> : null }
                </div>
                <h6>Optimized for mobile browsers</h6>
            </div>             
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: () => dispatch(signIn()),
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);