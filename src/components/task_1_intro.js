import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from "materialize-css";
import task1persontapgif from './../assets/task1persontap-min.gif'
import task1locationdraggif from './../assets/task1locationdrag-min.gif'
import task1newentitygif from './../assets/task1newentity-min.gif'
import task1notentitygif from './../assets/task1notentity-min.gif'
import task1negativegif from './../assets/task1negative-min.gif'

class Task1Intro extends Component {
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
            <div className="Task1Intro">
                { user ? 

                    <div ref={Carousel => {
                        this.Carousel = Carousel;
                    }}
                    className="Task1Intro carousel carousel-slider intro-carousel center">
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#one!">
                            <div className="center-align">
                                <h6>In Task 1, Bertie the bot is trying to spot and recognise people's names, names of organizations, location names, and other such terms &#8211; <span className="text-emphasis">Named Entities</span> (entities that have a <span className="text-emphasis">proper name</span>).</h6>
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#two!">
                            <div className="center-align">
                                <h6>Basically, whenever you see a term that has <span className="text-emphasis">W</span>ords <span className="text-emphasis">A</span>ll <span className="text-emphasis">S</span>tarting <span className="text-emphasis">W</span>ith <span className="text-emphasis">C</span>apital <span className="text-emphasis">L</span>etters <span className="text-emphasis">L</span>ike <span className="text-emphasis">T</span>his, there's a good chance that it is a proper name and therefore counts as a named entity in most cases.</h6>
                                <ul>
                                    <li>
                                        <div className="tag-btn default-tag-btn"><i className="material-icons tag-btn-icon">person</i> Person:</div>
                                        <span className="para box-wrap">
                                            <span className="unselected ner-PER senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">Heng</span>
                                            </span>
                                            <span className="unselected ner-PER senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">Swee</span>
                                            </span>
                                            <span className="unselected ner-PER senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">Keat</span>
                                            </span>
                                        </span>
                                    </li>
                                    <li>
                                        <div className="tag-btn default-tag-btn"><i className="material-icons tag-btn-icon">business</i> Organization:</div>
                                        <span className="para box-wrap">
                                            <span className="unselected ner-ORG senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">Ministry</span>
                                            </span>
                                            <span className="unselected ner-ORG senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">of</span>
                                            </span>
                                            <span className="unselected ner-ORG senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">Health</span>
                                            </span>
                                        </span>
                                    </li>
                                    <li>
                                        <div className="tag-btn default-tag-btn"><i className="material-icons tag-btn-icon">place</i> Location:</div>
                                        <span className="para box-wrap">
                                            <span className="unselected ner-LOC senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">Yishun</span>
                                            </span>
                                        </span>
                                    </li>
                                    <li>
                                        <div className="tag-btn default-tag-btn"><i className="material-icons tag-btn-icon">more</i> Miscellaneous:</div>
                                        <span className="para box-wrap">
                                            <span className="unselected ner-MISC senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">The</span>
                                            </span>
                                            <span className="unselected ner-MISC senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">Straits</span>
                                            </span>
                                            <span className="unselected ner-MISC senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">Times</span>
                                            </span>
                                            <span className="unselected ner-MISC senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">Run</span>
                                            </span>
                                            <span className="unselected ner-MISC senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">2019</span>
                                            </span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#three!">
                            <div className="center-align">
                                <h6>Bertie has made some guesses of which words are named entities and which are not.</h6>
                                <h6>If any words that Bertie has selected as named entities are actually of the wrong type, teach Bertie the correct answer. Select the words and change their tags accordingly.</h6>
                                <img src={ task1persontapgif } className="gifDemo" alt="ner-tap" />
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#four!">
                            <div className="center-align">
                                <h6>Bertie may also tag some words that are not actually named entities at all. Select them and let Bertie know that these should not be tagged as named entities.</h6>
                                <img src={ task1notentitygif } className="gifDemo" alt="ner-not" />
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#five!">
                            <div className="center-align">
                                <h6>Or, if Bertie has missed some words that should be named entities, tag them accordingly as well.</h6>
                                <img src={ task1newentitygif } className="gifDemo" alt="ner-new" />
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#six!">
                            <div className="center-align">
                                <h6>Bertie has also tagged the named entities with whether it thinks those organizations/people/etc. have been viewed positively, negatively, or neutrally in the context of their paragraphs (just considering the paragraph alone, not the entire article).</h6>
                                <ul>
                                    <li>
                                        <div className="tag-btn senti-1"><span role="img" aria-label="SentiPos">&#x1F642;</span> Positive sentiment:</div>
                                        <span className="para box-wrap">
                                            <span className="unselected ner-O senti-1">
                                                <span className="spacer"> </span>
                                                <span className="token">Changi</span>
                                            </span>
                                            <span className="unselected ner-O senti-1">
                                                <span className="spacer"> </span>
                                                <span className="token">Airport</span>
                                            </span>
                                            <span className="unselected ner-O senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">bags</span>
                                            </span>
                                            <span className="unselected ner-O senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">best</span>
                                            </span>
                                            <span className="unselected ner-O senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">airport</span>
                                            </span>
                                            <span className="unselected ner-O senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">title</span>
                                            </span>
                                        </span>
                                    </li>
                                    <li>
                                        <div className="tag-btn senti-0"><span role="img" aria-label="SentiNeut">&#x1F610;</span> Neutral sentiment:</div>
                                        <span className="para box-wrap">
                                            <span className="unselected ner-O senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">Mixed</span>
                                            </span>
                                            <span className="unselected ner-O senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">reactions</span>
                                            </span>
                                            <span className="unselected ner-O senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">to</span>
                                            </span>
                                            <span className="unselected ner-O senti-0">
                                                <span className="spacer"> </span>
                                                <span className="token">URA</span>
                                            </span>
                                            <span className="unselected ner-O senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">proposal</span>
                                            </span>
                                        </span>
                                    </li>
                                    <li>
                                        <div className="tag-btn senti--1"><span role="img" aria-label="SentiNeg">&#x1F641;</span> Negative sentiment:</div>
                                        <span className="para box-wrap">
                                            <span className="unselected ner-O senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">Singer</span>
                                            </span>
                                            <span className="unselected ner-O senti--1">
                                                <span className="spacer"> </span>
                                                <span className="token">Chris</span>
                                            </span>
                                            <span className="unselected ner-O senti--1">
                                                <span className="spacer"> </span>
                                                <span className="token">Brown</span>
                                            </span>
                                            <span className="unselected ner-O senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">arrested</span>
                                            </span>
                                            <span className="unselected ner-O senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">for</span>
                                            </span>
                                            <span className="unselected ner-O senti-null">
                                                <span className="spacer"> </span>
                                                <span className="token">assault</span>
                                            </span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#seven!">
                            <div className="center-align">
                                <h6>Similarly, if Bertie has assigned the wrong sentiment tags, teach it by correcting the tags to the right sentiments.</h6>
                                <img src={ task1negativegif } className="gifDemo" alt="ner-negative" />
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#eight!">
                            <div className="center-align">
                                <h6>Edit tags by tapping to select single words or swiping across multiple words to select them, then choose the correct tags in the panel at the bottom.</h6>
                                <h6>To edit multiple words that span across two or more lines, you may have to edit them separately.</h6>
                                <h6>And to scroll down the page, simply scroll on the empty space on the right.</h6>
                                <img src={ task1locationdraggif } className="gifDemo" alt="ner-demo" />
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#nine!">
                            <div className="center-align">
                                <h6>All changes you make will be autosaved as long as you maintain an internet connection. You can close this webapp and come back next time to see your edits all intact.</h6>
                                <h6>Also, please <span className="text-emphasis">try not to use the back button</span> in your browser. This may cause an older version of the page to render that is missing the changes that you have made. To fix this, close and reopen this webapp, and when you return to the page where you left off, you will see your changes all restored.</h6>
                                <Link to='/task_1' className="btn blue darken-2 btn-large">Let's go!</Link>
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

export default connect(mapStateToProps, null)(Task1Intro);