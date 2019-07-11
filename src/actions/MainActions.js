import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import {
    ANNOUNCEMENTS_LIST_FETCH_SUCCESS
} from '../actions/types';

const retrieveRoomIdFromEmail = (email) => {
    const splitEmail = email.split('@');
    return splitEmail[0];
};

export const announcementsListFetch = () => {
    return (dispatch) => {
        firebase.database().ref('/announcements')
            .on('value', snapshot => {
                const currentAnnouncements = _.map(snapshot.val(), 
                    (val, key) => {
                        return { ...val, key };
                    });
                //console.log(currentAnnouncements);
                dispatch({ 
                    type: ANNOUNCEMENTS_LIST_FETCH_SUCCESS,
                    payload: currentAnnouncements
                });
            });
    };
};

export const signupForEvent = (keyTitle) => {
    const { currentUser } = firebase.auth();
    const roomId = retrieveRoomIdFromEmail(currentUser.email);

    const updates = {
        [`userSignups/${roomId}/${keyTitle}`]: true,
        [`eventSignups/${keyTitle}/${roomId}`]: true
    };

    return () => {
        firebase.database().ref().update(updates)
            .then(Actions.pop())
            .catch((error) => {
                console.log(error);
            });
    };
};
