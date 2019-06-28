import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    USERNAME_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

const EMAIL_ADD_ON = '@capt.app';
const ADMIN_PREFIX = 'admin';

export const usernameChanged = (text) => {
    return {
        type: USERNAME_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ username, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        const parsedUsername = username + EMAIL_ADD_ON;

        firebase.auth().signInWithEmailAndPassword(parsedUsername, password)
            .then(user => dispatchLoginUserSuccess(dispatch, user, username))
            .catch(() => dispatchLoginUserFailure(dispatch));
    };
};

const dispatchLoginUserSuccess = (dispatch, user, username) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    //navigate to EmployeeList scene
    navigateToFlow(username); //method was generated from scene key
};

const dispatchLoginUserFailure = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const navigateToFlow = (username) => {
    if (username.includes(ADMIN_PREFIX)) {
        Actions.admin();
    } else {
        Actions.main();
    }
};