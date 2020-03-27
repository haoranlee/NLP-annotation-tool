const initState = {
    user: null,
    authError: null
}
  
const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: action.err
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null,
                user: action.user
            }
        case 'LOGOUT_ERROR':
            return {
                ...state,
                authError: action.err
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                authError: null,
                user: null
            }
        default:
            return state
    }
};
  
export default authReducer;