import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Task4Tree from './task_4_tree';
import Task4Rankings from './task_4_rankings';

class Task4 extends Component {

    state = { user_assigned_taxonomy: '' }
    handleTaxonomyAssignment = (taxonomyVal) => {
        this.setState({user_assigned_taxonomy: taxonomyVal});
    }

    componentDidMount() {   
        window.onscroll = function() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            var pageProgressBarElem = document.getElementById("pageProgressBar");
            if (pageProgressBarElem) {
                document.getElementById("pageProgressBar").style.width = scrolled + "%";
            }            
        };
    }

    render() {
        const { user, article_info, article_tokens, article_category_rankings } = this.props;
        let token_unroll;
        if (article_tokens) {
            token_unroll = article_tokens.map((para, para_idx) =>
                <div className="para box-wrap" key={para_idx}>
                    {para.map((token, token_idx) =>
                        <span key={token_idx} data-para-index={para_idx} data-token-index={token_idx}>
                            <span className="token">{token.text}</span>
                            <span className="spacer"> </span>
                        </span>
                    )}
                </div>
            )
        } else {
            token_unroll = '';
        };

        return (
            <div className="Task4">
                { (user && article_info && article_tokens && article_category_rankings) ? 

                    <div className="Task4Console">
                        <div className="page-progress-container">
                            <div className="page-progress-bar" id="pageProgressBar"></div>
                        </div>
                        <div className="WorkingArea row">
                            <div className="ArticleBody col s11">
                                <div className="Headline">
                                    <h4>{article_info.headline}</h4>
                                </div>
                                <div className="Tokens">{token_unroll}</div>
                                <div className="TokenFooter center-align">
                                </div>
                            </div>
                            <div className="ScrollArea col s1"></div>
                        </div>
                        <div className="BottomPanel">
                            <Task4Tree onTaxonomyAssignment={this.handleTaxonomyAssignment} />
                            <div id="SelectedTokensPreview" className="ghost"></div>
                        </div>
                        <div className="loading-indicator valign-wrapper center-align" id="updating-indicator">
                            <div className="preloader-wrapper big active row">
                                <div className="spinner-layer spinner-yellow-only">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { this.state.user_assigned_taxonomy ?
                            <Task4Rankings userAssignedTaxonomy={this.state.user_assigned_taxonomy} />
                            :
                            <div></div>
                        }
                    </div>

                    :
                    
                    <div className="NotLoggedIn center-align">
                        <h2>Bertie Reads The Straits Times</h2>
                        { user ?
                            <div>
                                <h4>Oh no!</h4>
                                <h6>You are not currently assigned any active article to work on right now.</h6>
                                <h6>Please return to the start page to begin working on an article.</h6>
                                <h6>(You may have come here by using the back button in your browser; please try to avoid that as it confuses Bertie the bot)</h6>
                            </div>
                            :
                            <h4>Oh no! User not logged in.</h4>
                        }
                        <Link to='/' className="btn blue darken-2 btn-large">Return to Start</Link>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        article_info: state.article.article_info,
        article_tokens: state.article.article_tokens,
        article_category_rankings: state.article.article_category_rankings,
    }
}

export default connect(mapStateToProps, null)(Task4);