import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticle } from './../store/actions/articleActions';
import { resetUserCompleteCount } from './../store/actions/userCompleteCountActions';
import ArticleInfoScatter from './article_info_scatter';

class ArticleInfo extends Component {
    componentDidMount() {
        const { user } = this.props;
        this.props.fetchArticle({ user });
        this.props.resetUserCompleteCount();
    }
    
    render() {
        const { user, article_welcome, article_info } = this.props;
        return (  
            <div className="ArticleInfo">
                { user ? 

                    <div className="article-info">
                        { article_info ?
                            
                            <div className="center-align">
                                <div className="article-welcome">
                                    <h5>{article_welcome}</h5>
                                </div>
                                <h4>{article_info.headline}</h4>
                                <h6><span className="text-emphasis">Premium/Free: </span>{article_info.premium_or_free} article</h6>
                                <h6><span className="text-emphasis">Published: </span>{article_info.pub_dte}</h6>
                                <h6><span className="text-emphasis">Author(s): </span>{article_info.author}</h6>
                                <h6><span className="text-emphasis">Category: </span>{article_info.chapter_1}</h6>
                                <h6><span className="text-emphasis">Sub-category: </span>{article_info.chapter_2}</h6>
                                <h6><span className="text-emphasis">Topics: </span>{article_info.tags}</h6>
                                <span className="span-block left-align"><span className="text-emphasis">Similar articles (Optional): </span>If you're interested, you can explore this chart to see how Bertie the bot has clustered articles together, and see where this article (the initial highlighted dot) is in relation to other articles. Articles that Bertie thinks are similar would be closer to each other. Double tap or pinch any white space in the chart to zoom in, and tap on the dots to see more information.</span>
                                <ArticleInfoScatter />
                                <Link to='/task_1_intro' className="btn blue darken-2 btn-large">Next</Link>
                            </div>

                            :

                            <div className="loading-indicator valign-wrapper center-align">
                                <div className="preloader-wrapper big active row">
                                    <div className="spinner-layer spinner-blue-only">
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
                        }
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
        fetchArticle: (user) => dispatch(fetchArticle(user)),
        resetUserCompleteCount: () => dispatch(resetUserCompleteCount()),
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        article_id: state.article.article_id,
        article_welcome: state.article.article_welcome,
        article_info: state.article.article_info,
        article_tokens: state.article.article_tokens,
        article_category_rankings: state.article.article_category_rankings,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleInfo);