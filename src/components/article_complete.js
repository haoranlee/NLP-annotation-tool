import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserCompleteCount } from './../store/actions/userCompleteCountActions';
import M from "materialize-css";

class ArticleComplete extends Component {
    componentDidMount() {
        const { user } = this.props;
        const options = {
            indicators: true,
            noWrap: true
        };
        M.Carousel.init(this.Carousel, options);
        this.props.fetchUserCompleteCount({ user });
    }
    render() {
        const { user, complete_articles_counts } = this.props;

        return (
            <div className="ArticleComplete">
                { user ? 

                    <div ref={Carousel => {
                        this.Carousel = Carousel;
                    }}
                    className="ArticleComplete carousel carousel-slider intro-carousel center">
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#one!">
                            <div className="center-align">
                                <h6>Well done!</h6>
                                <h6>Number of articles you have completed:</h6>
                                <h6 className="text-emphasis">{complete_articles_counts ? complete_articles_counts : 'Loading article count...'}</h6>
                                <h6>Thanks a lot for helping Bertie out!</h6>
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#two!">
                            <div className="center-align">
                                <h6>Here are some other tasks that natural language processing (NLP) bots like Bertie can do today at a competent level:</h6>
                                <ul className="left-align">
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> Summarize articles</li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> Translate between languages</li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> Pick out keywords from documents</li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> Chatbots / conversational agents</li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> Answer questions based on a passage</li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> Detect fake news / hate speech / spam</li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> Tag parts of speech, syntax, and grammatical structures of sentences</li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> Assign sentiments / different emotions at the document / sentence / entity level</li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> Generate new passages that can follow the style of a certain author or writing genre</li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> Compare two sentences and decide if they are similar / they agree / they contradict each other logically</li>
                                </ul>
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#three!">
                            <div className="center-align">
                                <h6>References for this project:</h6>
                                <ul className="left-align">
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> <a href="https://arxiv.org/abs/1908.10084v1" target="_blank" rel="noopener noreferrer">Sentence embeddings</a></li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> <a href="https://www.aclweb.org/anthology/C18-1139/" target="_blank" rel="noopener noreferrer">Named entity recognition</a></li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> <a href="https://arxiv.org/abs/1902.09314v2" target="_blank" rel="noopener noreferrer">Targeted sentiment classification</a></li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> <a href="https://arxiv.org/abs/1907.10529v3" target="_blank" rel="noopener noreferrer">Coreference resolution</a></li>
                                    <li><i className="material-icons tiny">keyboard_arrow_right</i> <a href="https://www.uclassify.com/browse/uclassify/iab-taxonomy-v2" target="_blank" rel="noopener noreferrer">IAB Taxonomy V2 classifier</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="carousel-item grey lighten-4 card valign-wrapper" href="#four!">
                            <div className="center-align">
                                <h6>Was that interesting? Would you like to keep helping Bertie get better?</h6>
                                <Link to='/article_info' className="btn blue darken-2 btn-large">Next article please!</Link>
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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserCompleteCount: (user) => dispatch(fetchUserCompleteCount(user)),
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        complete_articles_counts: state.userCompleteCount.complete_articles_counts,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComplete);