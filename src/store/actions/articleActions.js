import axios from 'axios';

export const fetchArticle = (userArg) => {
    return (dispatch, getState) => {
        if (userArg.user) {
            axios.get(`https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/user/current_article/${userArg.user.email}/count`).then(userCurrentArticleCount => {

                const fetchArticleCategoryRankings = async (articleId) => {
                    const response = await fetch('https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/article/content_taxonomy/' + articleId.data + '/predictions', {
                        method: 'GET',
                    });
                    let articleCategoryRankings = await response.json();
                    dispatch({ type: 'FETCH_ARTICLE_CATEGORY_RANKINGS_SUCCESS', articleCategoryRankings });
                }

                const fetchArticleTokens = async (articleId) => {
                    const response = await fetch('https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/article/tokens/' + articleId.data, {
                        method: 'GET',
                    });
                    let articleTokens = await response.json();
                    dispatch({ type: 'FETCH_ARTICLE_TOKENS_SUCCESS', articleTokens });
                    fetchArticleCategoryRankings(articleId);
                }

                const fetchArticleInfo = async (articleId) => {
                    const response = await fetch('https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/article/info/' + articleId.data, {
                        method: 'GET',
                    });
                    let articleInfo = await response.json();
                    dispatch({ type: 'FETCH_ARTICLE_INFO_SUCCESS', articleInfo });
                    fetchArticleTokens(articleId);
                }

                const fetchArticleId = async (articleId) => {
                    dispatch({ type: 'FETCH_ARTICLE_ID_SUCCESS', articleId });
                    fetchArticleInfo(articleId);
                }

                switch (userCurrentArticleCount.data) {
                    case 1:
                        axios.get(`https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/user/current_article/${userArg.user.email}`).then(articleId => {
                            fetchArticleId(articleId);
                            dispatch({ type: 'FETCH_EXISTING_ARTICLE_SUCCESS', articleId });
                        });
                        break;
                    case 0:
                        axios.get(`https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/user/assign_article/${userArg.user.email}`).then(articleId => {
                            axios.post(`https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/user/begin_article/${userArg.user.email}`, {'article_id': articleId.data}).then(res => {
                                fetchArticleId(articleId);
                                dispatch({ type: 'FETCH_NEW_ARTICLE_SUCCESS', articleId });
                            });
                        });
                        break;
                    default:
                        dispatch({ type: 'EXISTING_ARTICLE_COUNT_ERROR', userCurrentArticleCount });
                        break;
                }
            }).catch((err) => {
                dispatch({ type: 'FETCH_ARTICLE_ERROR', err });
            })
        } else {
            dispatch({ type: 'NO_USER_ERROR' });
        }
    }
};

export const resetArticle = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'RESET_ARTICLE_SUCCESS' });
    }
};