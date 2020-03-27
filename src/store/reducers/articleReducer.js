const initState = {
    article_welcome: null,
    article_id: null,
    article_info: null,
    article_tokens: null,
    article_category_rankings: null,
}
  
const articleReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_EXISTING_ARTICLE_SUCCESS':
            return {
                ...state,
                article_welcome: 'You have been checking out:',
            };
        case 'FETCH_NEW_ARTICLE_SUCCESS':
            return {
                ...state,
                article_welcome: 'Your next article:',
            };
        case 'FETCH_ARTICLE_ID_SUCCESS':
            return {
                ...state,
                article_id: action.articleId.data
            };
        case 'FETCH_ARTICLE_INFO_SUCCESS':
            return {
                ...state,
                article_info: action.articleInfo
            };
        case 'FETCH_ARTICLE_TOKENS_SUCCESS':
            return {
                ...state,
                article_tokens: action.articleTokens
            };
        case 'FETCH_ARTICLE_CATEGORY_RANKINGS_SUCCESS':
            return {
                ...state,
                article_category_rankings: action.articleCategoryRankings
            };
        case 'RESET_ARTICLE_SUCCESS':
            return {
                ...state,
                article_welcome: null,
                article_id: null,
                article_info: null,
                article_tokens: null,
                article_category_rankings: null
            };
        case 'EXISTING_ARTICLE_COUNT_ERROR':
            // console.log('erroneous existing article count:', action.userCurrentArticleCount.data);
            return state;
        case 'FETCH_ARTICLE_ERROR':
            // console.log('article fetch error:', action.err);
            return state;
        case 'NO_USER_ERROR':
            return state;
        default:
            return state;
    }    
};
  
export default articleReducer;