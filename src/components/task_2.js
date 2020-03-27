import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Selection from "@simonwep/selection-js";

class Task2 extends Component {
    componentDidMount() {
        const { article_info } = this.props;
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
            var tokensCorefTagsIncluded = {};
            if (tokensSelectedArr.length === 0) {
                tokensSelectedPreview = 'Select text to modify';
            } else {
                for (var i = 0; i < tokensSelectedArr.length; i++) {
                    for (var j = 0; j < Array.from(tokensSelected[i].children[1].children).length; j++) {
                        tokensCorefTagsIncluded[tokensSelected[i].children[1].children[j].textContent] = 1;
                    }
                }
                if (tokensSelectedArr.length > 3) {
                    tokensSelectedPreview = tokensSelectedArr.slice(0, 3).map((tokenElement, tokenIdx) => (tokenElement.firstElementChild.textContent)).join(' ') + '...';
                } else {
                    tokensSelectedPreview = tokensSelectedArr.map((tokenElement, tokenIdx) => (tokenElement.firstElementChild.textContent)).join(' ');
                }
            };

            const tagging_pull = async (HTMLCol, tag, val) => {
                document.getElementById('updating-indicator').style.display = 'flex';
                const postBody = {
                    paraidx: parseInt(HTMLCol[0].getAttribute('data-para-index')),
                    tokenidxarr: Array.from(HTMLCol).map(selectedTokenEl => parseInt(selectedTokenEl.getAttribute('data-token-index'))),
                    tag: tag,
                    val: parseInt(val)
                };
                const response = await fetch('https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/article/tokens/' + article_info.article_id + '/tagging_pull', {
                    method: 'POST',
                    body: JSON.stringify(postBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                await response;
                for (var i = 0; i < HTMLCol.length; i++) {
                    for (var j = 0; j < HTMLCol[i].children[1].children.length; j++) {
                        if (HTMLCol[i].children[1].children[j].getAttribute('data-coref-tag') === val) {
                            HTMLCol[i].children[1].children[j].remove();
                            if (HTMLCol[i].children[1].children.length === 0) {
                                HTMLCol[i].classList.remove('corefhas-yes');
                                HTMLCol[i].classList.add('corefhas-no');
                            }
                            break;
                        }
                    }
                }
                document.getElementById("coref-remove-" + val).remove();
                if (document.getElementById('TagRemovalButtons').childElementCount === 0) {
                    document.getElementById("TagRemovalButtons").innerHTML = "(No coference groups in currently selected text)";
                }
                document.getElementById('updating-indicator').style.display = 'none';
            };
            function removeCorefTag(e) {
                e.preventDefault();
                var tagToRemove = e.target.getAttribute('data-coref-remove-tag');
                tagging_pull(tokensSelected, "coref_tag", tagToRemove);
            }
            
            document.getElementById("SelectedTokensPreview").textContent = tokensSelectedPreview;
            var tokensCorefTagsIncludedArr = Object.keys(tokensCorefTagsIncluded);
            if (tokensCorefTagsIncludedArr.length > 0) {
                document.getElementById("TagRemovalButtons").innerHTML = '';
                for (var k = 0; k < tokensCorefTagsIncludedArr.length; k++) {
                    // document.getElementById("TagRemovalButtons").innerHTML += ('<div class="tag-btn coref-tag-color-' + (tokensCorefTagsIncludedArr[k] % 12) + '" id="coref-remove-' + tokensCorefTagsIncludedArr[k] + '">' 
                    //     + tokensCorefTagsIncludedArr[k] 
                    //     + ' <i class="material-icons tag-btn-icon" id="coref-remove-btn-' + tokensCorefTagsIncludedArr[k] + '" data-coref-remove-tag="' + tokensCorefTagsIncludedArr[k] + '">cancel</i></div>');
                    var additionalTagRemovalChip = document.createElement('div');
                    additionalTagRemovalChip.classList.add("tag-btn");
                    additionalTagRemovalChip.classList.add("coref-tag-color-" + (tokensCorefTagsIncludedArr[k] % 12));
                    additionalTagRemovalChip.id = "coref-remove-" + tokensCorefTagsIncludedArr[k];
                    var additionalTagRemovalChipLabel = document.createTextNode(tokensCorefTagsIncludedArr[k]);
                    var additionalTagRemovalChipBtn = document.createElement('i');
                    additionalTagRemovalChipBtn.classList.add("material-icons");
                    additionalTagRemovalChipBtn.classList.add("tag-btn-icon");
                    additionalTagRemovalChipBtn.id = "coref-remove-btn-" + tokensCorefTagsIncludedArr[k];
                    additionalTagRemovalChipBtn.setAttribute("data-coref-remove-tag", tokensCorefTagsIncludedArr[k]);
                    var additionalTagRemovalChipBtnLabel = document.createTextNode("cancel");
                    additionalTagRemovalChipBtn.addEventListener ("click", removeCorefTag, false);
                    additionalTagRemovalChipBtn.appendChild(additionalTagRemovalChipBtnLabel);
                    additionalTagRemovalChip.appendChild(additionalTagRemovalChipLabel);
                    additionalTagRemovalChip.appendChild(additionalTagRemovalChipBtn);
                    document.getElementById("TagRemovalButtons").appendChild(additionalTagRemovalChip);
                }
                // for (var l = 0; l < tokensCorefTagsIncludedArr.length; l++) {
                //     document.getElementById("coref-remove-btn-" + tokensCorefTagsIncludedArr[l]).addEventListener ("click", removeCorefTag, false);
                // }
            } else if (document.getElementById("TagRemovalButtons")) {
                document.getElementById("TagRemovalButtons").innerHTML = "(No coference groups in currently selected text)";
            }
        });
    }
    render() {
        const { user, article_info, article_tokens } = this.props;
        let token_unroll;
        if (article_tokens) {
            token_unroll = article_tokens.map((para, para_idx) =>
                <div className="para box-wrap" key={para_idx}>
                    {para.map((token, token_idx) =>
                        <span className={"unselected corefhas-" + ((token.coref_tag && token.coref_tag.length > 0) ? "yes" : "no")} key={token_idx} data-para-index={para_idx} data-token-index={token_idx}>
                            <span className="token">{token.text}</span>
                            <span className="coref-tag-cloud center-align">
                                {(token.coref_tag && token.coref_tag.length > 0) ? token.coref_tag.slice(0).sort().map((coref_tag) => <span className={"coref-tag coref-tag-color-" + (coref_tag % 12)} key={coref_tag} data-coref-tag={coref_tag}>{coref_tag}</span>) : ""}
                            </span>
                            <span className="spacer"> </span>
                        </span>
                    )}
                </div>
            )
        } else {
            token_unroll = '';
        };

        function corefNumberUp(e) {
            e.preventDefault();
            var newCorefNumber = parseInt(document.getElementById("TagAddNumberIndicator").textContent) + 1;
            document.getElementById("TagAddNumberIndicator").textContent = newCorefNumber;
            if (document.getElementById("TagAddNumberDown").classList.contains('coref-number-adjust-disabled')) {
                document.getElementById("TagAddNumberDown").classList.remove('coref-number-adjust-disabled');
                document.getElementById("TagAddNumberDown").classList.add('coref-number-adjust-enabled');
            }
            for (var i = 0; i < 12; i++) {
                document.getElementById("TagAddNumberIndicator").classList.remove('coref-tag-color-' + i.toString());
            }
            document.getElementById("TagAddNumberIndicator").classList.add('coref-tag-color-' + (newCorefNumber % 12).toString());
        }

        function corefNumberDown(e) {
            e.preventDefault();
            if (parseInt(document.getElementById("TagAddNumberIndicator").textContent) > 0) {
                var newCorefNumber = parseInt(document.getElementById("TagAddNumberIndicator").textContent) - 1;
                document.getElementById("TagAddNumberIndicator").textContent = newCorefNumber;
                if (parseInt(document.getElementById("TagAddNumberIndicator").textContent) === 0) {
                    document.getElementById("TagAddNumberDown").classList.remove('coref-number-adjust-enabled');
                    document.getElementById("TagAddNumberDown").classList.add('coref-number-adjust-disabled');
                }
                for (var i = 0; i < 12; i++) {
                    document.getElementById("TagAddNumberIndicator").classList.remove('coref-tag-color-' + i.toString());
                }
                document.getElementById("TagAddNumberIndicator").classList.add('coref-tag-color-' + (newCorefNumber % 12).toString());
            }
        }

        const tagging_push = async (HTMLCol, tag, val) => {
            var tokenidxarrall = Array.from(HTMLCol).map(selectedTokenEl => parseInt(selectedTokenEl.getAttribute('data-token-index')));
            var tokenidxarrnot = [];
            for (var i = 0; i < HTMLCol.length; i++) {
                for (var j = 0; j < HTMLCol[i].children[1].children.length; j++) {
                    if (parseInt(HTMLCol[i].children[1].children[j].getAttribute('data-coref-tag')) === val) {
                        tokenidxarrnot.push(parseInt(HTMLCol[i].getAttribute('data-token-index')))
                        break;
                    };
                }
            }
            var tokenidxarr = tokenidxarrall.filter(x => !tokenidxarrnot.includes(x));
            document.getElementById('updating-indicator').style.display = 'flex';
            const postBody = {
                paraidx: parseInt(HTMLCol[0].getAttribute('data-para-index')),
                tokenidxarr: tokenidxarr,
                tag: tag,
                val: parseInt(val)
            };
            const response = await fetch('https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/article/tokens/' + article_info.article_id + '/tagging_push', {
                method: 'POST',
                body: JSON.stringify(postBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await response;

            for (var k = 0; k < HTMLCol.length; k++) {
                if (tokenidxarr.includes(parseInt(HTMLCol[k].getAttribute('data-token-index')))) {
                    if (HTMLCol[k].children[1].children.length === 0) {
                        HTMLCol[k].classList.remove('corefhas-no');
                        HTMLCol[k].classList.add('corefhas-yes');
                    }
                    var additionalCorefTag = document.createElement('span');
                    additionalCorefTag.classList.add("coref-tag");
                    additionalCorefTag.classList.add("coref-tag-color-" + (val % 12));
                    additionalCorefTag.setAttribute("data-coref-tag", val);
                    additionalCorefTag.textContent = val;
                    HTMLCol[k].children[1].appendChild(additionalCorefTag);
                }
            }

            const tagging_pull = async (HTMLCol, tag, val) => {
                document.getElementById('updating-indicator').style.display = 'flex';
                const postBody = {
                    paraidx: parseInt(HTMLCol[0].getAttribute('data-para-index')),
                    tokenidxarr: Array.from(HTMLCol).map(selectedTokenEl => parseInt(selectedTokenEl.getAttribute('data-token-index'))),
                    tag: tag,
                    val: parseInt(val)
                };
                const response = await fetch('https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/article/tokens/' + article_info.article_id + '/tagging_pull', {
                    method: 'POST',
                    body: JSON.stringify(postBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                await response;
                for (var i = 0; i < HTMLCol.length; i++) {
                    for (var j = 0; j < HTMLCol[i].children[1].children.length; j++) {
                        if (HTMLCol[i].children[1].children[j].getAttribute('data-coref-tag') === val) {
                            HTMLCol[i].children[1].children[j].remove();
                            if (HTMLCol[i].children[1].children.length === 0) {
                                HTMLCol[i].classList.remove('corefhas-yes');
                                HTMLCol[i].classList.add('corefhas-no');
                            }
                            break;
                        }
                    }
                }
                document.getElementById("coref-remove-" + val).remove();
                if (document.getElementById('TagRemovalButtons').childElementCount === 0) {
                    document.getElementById("TagRemovalButtons").innerHTML = "(No coference groups in currently selected text)";
                }
                document.getElementById('updating-indicator').style.display = 'none';
            };
            function removeCorefTag(e) {
                e.preventDefault();
                var tokensSelected = document.getElementsByClassName('selected');
                var tagToRemove = e.target.getAttribute('data-coref-remove-tag');
                tagging_pull(tokensSelected, "coref_tag", tagToRemove);
            }
            if (!(document.getElementById("coref-remove-" + val))) {
                if (document.getElementById('TagRemovalButtons').childElementCount === 0) {
                    document.getElementById("TagRemovalButtons").innerHTML = '';
                }
                var additionalTagRemovalChip = document.createElement('div');
                additionalTagRemovalChip.classList.add("tag-btn");
                additionalTagRemovalChip.classList.add("coref-tag-color-" + (val % 12));
                additionalTagRemovalChip.id = "coref-remove-" + val;
                var additionalTagRemovalChipLabel = document.createTextNode(val);
                var additionalTagRemovalChipBtn = document.createElement('i');
                additionalTagRemovalChipBtn.classList.add("material-icons");
                additionalTagRemovalChipBtn.classList.add("tag-btn-icon");
                additionalTagRemovalChipBtn.id = "coref-remove-btn-" + val;
                additionalTagRemovalChipBtn.setAttribute("data-coref-remove-tag", val);
                var additionalTagRemovalChipBtnLabel = document.createTextNode("cancel");
                additionalTagRemovalChipBtn.addEventListener ("click", removeCorefTag, false);
                additionalTagRemovalChipBtn.appendChild(additionalTagRemovalChipBtnLabel);
                additionalTagRemovalChip.appendChild(additionalTagRemovalChipLabel);
                additionalTagRemovalChip.appendChild(additionalTagRemovalChipBtn);
                document.getElementById("TagRemovalButtons").appendChild(additionalTagRemovalChip);
            }
            document.getElementById('updating-indicator').style.display = 'none';
        };

        function corefTagAdd(e) {
            e.preventDefault();
            var selectedHTMLCol = document.getElementsByClassName('selected');
            var corefNumber = parseInt(document.getElementById("TagAddNumberIndicator").textContent);
            if (selectedHTMLCol.length > 0) {
                tagging_push(selectedHTMLCol, "coref_tag", corefNumber);
            };
        }

        return (
            <div className="Task2">
                { (user && article_info && article_tokens) ? 

                    <div className="Task2Console">
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
                                    <Link to='/task_3_intro' className="btn blue darken-2 btn-large">I'm done!</Link>
                                </div>
                            </div>
                            <div className="ScrollArea col s1"></div>
                        </div>
                        <div className="BottomPanel">
                            <div id="SelectedTokensPreviewContainer" className="BottomPanelComponent">
                                <span id="SelectedTokensPreview" className="span-block text-emphasis">Select text to modify</span>
                            </div>
                            <div id="TagRemovalContainer" className="BottomPanelComponent">
                                <span className="span-block">Remove coference groups:</span>
                                <span id="TagRemovalButtons" className="span-block">(No coference groups in currently selected text)</span>
                            </div>
                            <div id="TagAddContainer" className="BottomPanelComponent">
                                <span className="span-block">Add a coference group:</span>
                                <div id="TagAddNumberDown" className="tag-btn coref-number-adjust-disabled" onClick={corefNumberDown}>-</div>
                                <div id="TagAddNumberIndicator" className="tag-btn coref-tag-color-0">0</div>
                                <div id="TagAddNumberUp" className="tag-btn coref-number-adjust-enabled" onClick={corefNumberUp}>+</div>
                                <div id="TagAddNumberSubmit" className="tag-btn" onClick={corefTagAdd}>Add</div>
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

export default connect(mapStateToProps, null)(Task2);