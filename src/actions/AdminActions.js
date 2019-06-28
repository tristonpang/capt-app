import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    ADMIN_LIST_FETCH_SUCCESS,
    ADMIN_UPDATE
} from './types';

export const adminListFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/adminAnnouncements/${currentUser.uid}`)
            .on('value', snapshot => {
                dispatch({ type: ADMIN_LIST_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const adminUpdate = ({ prop, value }) => {
    return {
        type: ADMIN_UPDATE,
        payload: { prop, value }
    };
};

export const adminCreate = ({ title, description }) => {
    const { currentUser } = firebase.auth();
    const parsedTitle = title.replace(/ /g, '-');
    console.log(parsedTitle);

    const updates = {
        [`adminAnnouncements/${currentUser.uid}/${parsedTitle}`]: true,
        [`announcements/${parsedTitle}`]: { title, description }
    };

    
    return () => {
        firebase.database().ref().update(updates)
            .then(() => Actions.pop());
    };
};
