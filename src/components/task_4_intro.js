import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from "materialize-css";
import task4gif from './../assets/task4-min.gif'

class Task4Intro extends Component {
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
            <div className="Task4Intro">
                { user ? 

                    <div ref={Carousel => {
                        this.Carousel = Carousel;
                    }}
                    className="Task4Intro carousel carousel-slider intro-carousel center">
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#one!">
                            <div className="center-align">
                                <h6>In Task 4, Bertie the bot has tried to assign each article to a category as defined by the <a href="https://www.iab.com/guidelines/taxonomy/" target="_blank" rel="noopener noreferrer">Interactive Advertising Bureau (IAB) Tech Lab Content Taxonomy</a>.</h6>
                                <h6>Help Bertie by assigning the article to one of the categories.</h6>
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#two!">
                            <div className="center-align">
                                <h6>In the bottom panel, choose the category that you think this article best fits into.</h6>
                                <h6>Scroll down the category list, expand category trees to see sub-categories by using the <i className="material-icons tag-btn-icon color-invert">add_box</i> button, and select a category with the <i className="material-icons tag-btn-icon">local_offer</i> tag.</h6>
                                <img src={ task4gif } className="gifDemo" alt="weird-text" />
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#three!">
                            <div className="center-align">
                                <h6>See if Bertie has your choice within its top ten guesses.</h6>
                                <Link to='/task_4' className="btn blue darken-2 btn-large">Let's go!</Link>
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

export default connect(mapStateToProps, null)(Task4Intro);