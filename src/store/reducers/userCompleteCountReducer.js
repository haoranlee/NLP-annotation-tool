const initState = {
    complete_articles_counts: null
}
  
const userCompleteCountReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_USER_COMPLETE_ARTICLES_COUNT_SUCCESS':
            return {
                ...state,
                complete_articles_counts: action.completeArticlesCount.data
            };
        case 'RESET_USER_COMPLETE_ARTICLES_COUNT_SUCCESS':
            return {
                ...state,
                complete_articles_counts: null
            };
        case 'FETCH_USER_COMPLETE_ARTICLES_COUNT_NO_USER':
            return {
                ...state,
                complete_articles_counts: null
            };
        case 'FETCH_USER_COMPLETE_ARTICLES_COUNT_ERROR':
            return state;
        default:
            return state;
    }    
};
  
export default userCompleteCountReducer;