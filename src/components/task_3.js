import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Selection from "@simonwep/selection-js";

class Task3 extends Component {
    componentDidMount() {
        /*const selection = */Selection.create({
            class: 'selection', // Class for the selection-area box when dragging
            selectables: ['.box-wrap > span'],  // All elements in this container can be selected
            boundaries: ['.box-wrap']   // The container is also the boundary in this case
        }).on('start', ({inst, selected, oe}) => {
            // if (!oe.ctrlKey && !oe.metaKey) {    // Remove class if the user isn't pressing the control key or ⌘ key
                for (const el of selected) {    // Unselect all elements
                    el.classList.remove('selected');
                    el.classList.add('unselected');
                    inst.removeFromSelection(el);
                }
                inst.clearSelection();  // Clear previous selection
        }).on('move', ({changed: {removed, added}}) => {
            for (const el of added) {   // Add a custom class to the elements that where selected.
                el.classList.remove('unselected');
                el.classList.add('selected');
            }
            for (const el of removed) { // Remove the class from elements that where removed since the last selection
                el.classList.remove('selected');
                el.classList.add('unselected');
            }
        }).on('stop', ({inst}) => {
            inst.keepSelection();   // Remember selection in case the user wants to add something in the next one
            var tokensSelected = document.getElementsByClassName('selected');
            var tokensSelectedArr = Array.from(tokensSelected);
            var tokensSelectedPreview = '';
            if (tokensSelectedArr.length === 0) {
                tokensSelectedPreview = 'Select text to modify';
            } else if (tokensSelectedArr.length > 3) {
                tokensSelectedPreview = tokensSelectedArr.slice(0, 3).map((tokenElement, tokenIdx) => (tokenElement.firstElementChild.textContent)).join(' ') + '...';
            } else {
                tokensSelectedPreview = tokensSelectedArr.map((tokenElement, tokenIdx) => (tokenElement.firstElementChild.textContent)).join(' ');
            };
            document.getElementById("SelectedTokensPreview").textContent = tokensSelectedPreview;
        });
        
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
        const { user, article_info, article_tokens } = this.props;
        let token_unroll;
        if (article_tokens) {
            token_unroll = article_tokens.map((para, para_idx) =>
                <div className="para box-wrap" key={para_idx}>
                    {para.map((token, token_idx) =>
                        <span className={"formatting-issue-" + token.formatting_issue.toString()} key={token_idx} data-para-index={para_idx} data-token-index={token_idx}>
                            <span className="token">{token.text}</span>
                            <span className="spacer"> </span>
                        </span>
                    )}
                </div>
            )
        } else {
            token_unroll = '';
        };
        
        const formattingIssueClasses = ['formatting-issue-0', 'formatting-issue-1']

        const tagging_set = async (HTMLCol, tag, val, tagArr, curClass) => {
            document.getElementById('updating-indicator').style.display = 'flex';
            const postBody = {
                paraidx: parseInt(HTMLCol[0].getAttribute('data-para-index')),
                tokenidxarr: Array.from(HTMLCol).map(selectedTokenEl => parseInt(selectedTokenEl.getAttribute('data-token-index'))),
                tag: tag,
                val: val
            };
            const response = await fetch('https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/article/tokens/' + article_info.article_id + '/tagging_set', {
                method: 'POST',
                body: JSON.stringify(postBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await response;
            for (var i = 0; i < HTMLCol.length; i++) {
                for (var j = 0; j < tagArr.length; j++) {
                    if (tagArr[j] === curClass) {
                        if (!(HTMLCol[i].classList.contains(curClass))) {
                            HTMLCol[i].classList.add(curClass)
                        }
                    } else {
                        HTMLCol[i].classList.remove(tagArr[j]);
                    }
                }
            }
            document.getElementById('updating-indicator').style.display = 'none';
        };

        function formattingIsGood(e) {
            e.preventDefault();
            var selectedHTMLCol = document.getElementsByClassName('selected');
            if (selectedHTMLCol.length > 0) {
                tagging_set(selectedHTMLCol, "formatting_issue", 0, formattingIssueClasses, 'formatting-issue-0');
            };
        }

        function formattingIsBad(e) {
            e.preventDefault();
            var selectedHTMLCol = document.getElementsByClassName('selected');
            if (selectedHTMLCol.length > 0) {
                tagging_set(selectedHTMLCol, "formatting_issue", 1, formattingIssueClasses, 'formatting-issue-1');
            };
        }

        return (
            <div className="Task3">
                { (user && article_info && article_tokens) ? 

                    <div className="Task3Console">
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
                                    <Link to='/task_4_intro' className="btn blue darken-2 btn-large">I'm done!</Link>
                                </div>
                            </div>
                            <div className="ScrollArea col s1"></div>
                        </div>
                        <div className="BottomPanel">
                            <div id="SelectedTokensPreviewContainer" className="BottomPanelComponent">
                                <span id="SelectedTokensPreview" className="span-block text-emphasis">Select text to modify</span>
                            </div>
                            <div id="FormattingIssueButtonContainer" className="BottomPanelComponent">
                                <span className="span-block">Does this text look funny to you?</span>
                                <div className="tag-btn formatting-issue-1" onClick={formattingIsBad}><i className="material-icons tag-btn-icon">cancel</i> Yeah, this text sure looks funny</div>
                                <div className="tag-btn default-tag-btn" onClick={formattingIsGood}><i className="material-icons tag-btn-icon">check_circle</i> Nah, this text actually looks fine</div>
                            </div>
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
    }
}

export default connect(mapStateToProps, null)(Task3);