import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from "materialize-css";
import task2removetaggif from './../assets/task2removetag-min.gif'
import task2addtaggif from './../assets/task2addtag-min.gif'

class Task2Intro extends Component {
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
            <div className="Task2Intro">
                { user ? 

                    <div ref={Carousel => {
                        this.Carousel = Carousel;
                    }}
                    className="Task2Intro carousel carousel-slider intro-carousel center">
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#one!">
                            <div className="center-align">
                                <h6>In Task 2, Bertie the bot is trying to spot and recognise when different phrases or terms in an article actually refer to the same entity &#8211; <span className="text-emphasis">Coreference resolution</span>.</h6>
                                <ul>
                                    <li>
                                        <div className="box-wrap">
                                            <span className="unselected corefhas-yes">
                                                <span className="token">Mr</span>
                                                <span className="coref-tag-cloud center-align">
                                                    <span className="coref-tag coref-tag-color-0">0</span>
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-yes">
                                                <span className="token">Masagos</span>
                                                <span className="coref-tag-cloud center-align">
                                                    <span className="coref-tag coref-tag-color-0">0</span>
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-no">
                                                <span className="token">said</span>
                                                <span className="coref-tag-cloud center-align">
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-yes">
                                                <span className="token">he</span>
                                                <span className="coref-tag-cloud center-align">
                                                    <span className="coref-tag coref-tag-color-0">0</span>
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-no">
                                                <span className="token">expects</span>
                                                <span className="coref-tag-cloud center-align">
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-no">
                                                <span className="token">more</span>
                                                <span className="coref-tag-cloud center-align">
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-no">
                                                <span className="token">cases</span>
                                                <span className="coref-tag-cloud center-align">
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#two!">
                            <div className="center-align">
                                <h6>Different tag groups refer to different entities.</h6>
                                <ul>
                                    <li>
                                        <div className="box-wrap">
                                            <span className="unselected corefhas-yes">
                                                <span className="token">Ng</span>
                                                <span className="coref-tag-cloud center-align">
                                                    <span className="coref-tag coref-tag-color-0">0</span>
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-no">
                                                <span className="token">and</span>
                                                <span className="coref-tag-cloud center-align">
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-yes">
                                                <span className="token">his</span>
                                                <span className="coref-tag-cloud center-align">
                                                    <span className="coref-tag coref-tag-color-0">0</span>
                                                    <span className="coref-tag coref-tag-color-1">1</span>
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-yes">
                                                <span className="token">wife</span>
                                                <span className="coref-tag-cloud center-align">
                                                    <span className="coref-tag coref-tag-color-1">1</span>
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-no">
                                                <span className="token">were</span>
                                                <span className="coref-tag-cloud center-align">
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-no">
                                                <span className="token">seen</span>
                                                <span className="coref-tag-cloud center-align">
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-no">
                                                <span className="token">in</span>
                                                <span className="coref-tag-cloud center-align">
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-no">
                                                <span className="token">a</span>
                                                <span className="coref-tag-cloud center-align">
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-yes">
                                                <span className="token">black</span>
                                                <span className="coref-tag-cloud center-align">
                                                    <span className="coref-tag coref-tag-color-2">2</span>
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-yes">
                                                <span className="token">BMW</span>
                                                <span className="coref-tag-cloud center-align">
                                                    <span className="coref-tag coref-tag-color-2">2</span>
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-no">
                                                <span className="token">registered</span>
                                                <span className="coref-tag-cloud center-align">
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-no">
                                                <span className="token">in</span>
                                                <span className="coref-tag-cloud center-align">
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-yes">
                                                <span className="token">her</span>
                                                <span className="coref-tag-cloud center-align">
                                                    <span className="coref-tag coref-tag-color-1">1</span>
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                            <span className="unselected corefhas-no">
                                                <span className="token">name</span>
                                                <span className="coref-tag-cloud center-align">
                                                </span>
                                                <span className="spacer"> </span>
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#three!">
                            <div className="center-align">
                                <h6>If any words that Bertie has tagged in a coreference group are actually tagged wrongly, teach Bertie the correct answer. Select the words and remove the incorrect tags.</h6>
                                <img src={ task2removetaggif } className="gifDemo" alt="coref-remove" />
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#four!">
                            <div className="center-align">
                                <h6>Or, if Bertie has missed some words that should be tagged together, tag them accordingly as well.</h6>
                                <h6>You can even tag a new coreference group by assigning a group number that has not been used yet.</h6>
                                <img src={ task2addtaggif } className="gifDemo" alt="coref-add" />
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#five!">
                            <div className="center-align">
                                <h6>Again, all changes you make will be autosaved.</h6>
                                <h6>If you have already completed Task 1 before and were in the middle of Task 2, Bertie will present you with Task 1 again the next time you come back. It's just very forgetful that way. Simply skip past Task 1 and carry on right where you left off.</h6>
                                <Link to='/task_2' className="btn blue darken-2 btn-large">Let's go!</Link>
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

export default connect(mapStateToProps, null)(Task2Intro);