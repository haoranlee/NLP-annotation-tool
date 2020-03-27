import axios from 'axios';

export const fetchUserCompleteCount = (userArg) => {
    return (dispatch, getState) => {
        if (userArg.user) {
            axios.get(`https://us-central1-silent-wharf-209110.cloudfunctions.net/project_bertie/user/completed_articles/${userArg.user.email}/count`).then(completeArticlesCount => {
                dispatch({ type: 'FETCH_USER_COMPLETE_ARTICLES_COUNT_SUCCESS', completeArticlesCount });
            }).catch((err) => {
                dispatch({ type: 'FETCH_USER_COMPLETE_ARTICLES_COUNT_ERROR', err });
            })
        } else {
            dispatch({ type: 'FETCH_USER_COMPLETE_ARTICLES_COUNT_NO_USER' });
        }
    }
};

export const resetUserCompleteCount = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'RESET_USER_COMPLETE_ARTICLES_COUNT_SUCCESS' });
    }
};