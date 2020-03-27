import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from "materialize-css";
import task3gif from './../assets/task3-min.gif'

class Task3Intro extends Component {
    componentDidMount() {
        const options = {
            indicators: true,
            noWrap: true
        };
        M.Carousel.init(this.Carousel, options);
    }
    render() {
        const { user } = this.props;

        return (
            <div className="Task3Intro">
                { user ? 

                    <div ref={Carousel => {
                        this.Carousel = Carousel;
                    }}
                    className="Task3Intro carousel carousel-slider intro-carousel center">
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#one!">
                            <div className="center-align">
                                <h6>In Task 3, Bertie the bot has tried to clean up the article text from how it originally looked like in the system.</h6>
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#two!">
                            <div className="center-align">
                                <h6>In most cases, the article looks completely fine and you can just go on to the next task.</h6>
                                <h6>But sometimes, there will still be weird tags and other artifacts left over that Bertie has not processed correctly (see example below).</h6>
                                <img src={ task3gif } className="gifDemo" alt="weird-text" />
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#three!">
                            <div className="center-align">
                                <h6>If any text looks funny, just let Bertie know.</h6>
                                <Link to='/task_3' className="btn blue darken-2 btn-large">Let's go!</Link>
                            </div>
                        </div>
                    </div>

                    :
                    
                    <div className="NotLoggedIn center-align">
                        <h2>Bertie Reads The Straits Times</h2>
                        <h4>Oh no! User not logged in.</h4>
                        <Link to='/' className="btn blue darken-2 btn-large">Return to Start</Link>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, null)(Task3Intro);