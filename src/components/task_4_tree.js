import React, {PureComponent} from 'react';
import Tree from 'rc-tree';
import { connect } from 'react-redux';
import iabGitTree from './../config/iabGitTree';

class Task4Tree extends PureComponent {
    render(){
        const { article_info } = this.props;

        const data = iabGitTree;

        function getTreeData() {
            return [data];
        }

        const motion = {
            motionName: 'node-motion',
            motionAppear: false,
            onAppearStart: () => ({ height: 0 }),
            onAppearActive: node => ({ height: node.scrollHeight }),
            onLeaveStart: node => ({ height: node.offsetHeight }),
            onLeaveActive: () => ({ height: 0 }),
        };

        const taxonomy_user_assignment = async (val) => {
            this.props.onTaxonomyAssignment(val); 
            document.getElementById('updating-indicator').style.display = 'flex';
            const postBody = {
                content_taxonomy: val
            };
            const response = await fetch('https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/article/content_taxonomy/' + article_info.article_id + '/user_assignment', {
                method: 'POST',
                body: JSON.stringify(postBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await response;
            document.getElementById('updating-indicator').style.display = 'none';
            document.getElementById('categoryRankings').style.display = 'block';
            document.getElementsByClassName('ArticleBody')[0].style.display = 'none';
        };

        function onSelect(selectedKeys, e) {
            if ('children' in e.node) {
                document.getElementById("categoryPickConfirm").innerHTML = '';
                var improperCategoryPicked = document.createElement('span');
                improperCategoryPicked.classList.add("text-emphasis");
                var improperCategoryPickedLabel1 = document.createTextNode("Select a sub-category (with the ");
                var improperCategoryPickedTagIcon = document.createElement('i');
                improperCategoryPickedTagIcon.classList.add("material-icons");
                improperCategoryPickedTagIcon.classList.add("tag-btn-icon");
                var improperCategoryPickedTagIconLabel = document.createTextNode("local_offer");
                improperCategoryPickedTagIcon.appendChild(improperCategoryPickedTagIconLabel);
                var improperCategoryPickedLabel2 = document.createTextNode(" tag)");
                improperCategoryPicked.appendChild(improperCategoryPickedLabel1);
                improperCategoryPicked.appendChild(improperCategoryPickedTagIcon);
                improperCategoryPicked.appendChild(improperCategoryPickedLabel2);
                document.getElementById("categoryPickConfirm").appendChild(improperCategoryPicked);
            } else {
                function userAssignTaxonomy(ee) {
                    ee.preventDefault();
                    taxonomy_user_assignment(e.node.full_name);
                }
                document.getElementById("categoryPickConfirm").innerHTML = '';
                var properCategoryPicked = document.createElement('span');
                properCategoryPicked.classList.add("text-emphasis");
                var properCategoryPickedLabel = document.createTextNode('Confirm category: "' + e.node.title + '" ');
                properCategoryPicked.appendChild(properCategoryPickedLabel);
                var properCategoryPickedBtn = document.createElement('a');
                properCategoryPickedBtn.classList.add("btn");
                properCategoryPickedBtn.classList.add("blue");
                properCategoryPickedBtn.classList.add("darken-2");
                properCategoryPickedBtn.classList.add("btn-small");
                var properCategoryPickedBtnLabel = document.createTextNode("Confirm");
                properCategoryPickedBtn.appendChild(properCategoryPickedBtnLabel);
                properCategoryPickedBtn.addEventListener ("click", userAssignTaxonomy, false);
                document.getElementById("categoryPickConfirm").appendChild(properCategoryPicked);
                document.getElementById("categoryPickConfirm").appendChild(properCategoryPickedBtn);
            }
        }
        return (
            <div id="categoryPickerComponent">
                <div id="categoryPickConfirm" className="BottomPanelComponent">
                    <span className="text-emphasis">How would you classify this article?</span>
                </div>
                <div id="categoryPickerTree" className="BottomPanelComponent">
                    <Tree
                        defaultExpandAll={false}
                        motion={motion}
                        treeData={getTreeData()}
                        defaultExpandedKeys={['iab_categories']}
                        onSelect={onSelect}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        article_info: state.article.article_info,
    }
}

export default connect(mapStateToProps, null)(Task4Tree);