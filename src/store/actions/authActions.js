
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './../../config/firebaseConfig';

const provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(firebaseConfig);

export const signIn = () => {
    return (dispatch, getState) => {
      
      firebase.auth().signInWithPopup(
        provider
      ).then(res => {
        const user = res.user;
        dispatch({ type: 'LOGIN_SUCCESS', user });
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  
    }
  }

  export const signOut = () => {
    return (dispatch, getState) => {
      
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'LOGOUT_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'LOGOUT_ERROR', err });
      });
  
    }
  }