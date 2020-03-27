import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from "materialize-css";

class Intro extends Component {
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
            <div className="Intro">
                { user ? 

                    <div ref={Carousel => {
                        this.Carousel = Carousel;
                    }}
                    className="Intro carousel carousel-slider intro-carousel center">
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#one!">
                            <div className="center-align">
                                <h6>Bertie the bot has been reading some ST articles, trying to understand them in some way. But it's just a bot! It's not very good at understanding human languages yet.</h6>
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#two!">
                            <div className="center-align">
                                <h6>Help Bertie learn to understand ST articles better by correcting any mistakes it has made in trying to analyze some Singapore articles from October 2019.</h6>
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#three!">
                            <div className="center-align">
                                <h6>There are 4 tasks that you can help Bertie with for each article.</h6>
                                <h6>The first 2 tasks may take a few minutes depending on the length of the article. The last 2 tasks take just seconds.</h6>
                                <Link to='/article_info' className="btn blue darken-2 btn-large">Let's go!</Link>
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

export default connect(mapStateToProps, null)(Intro);