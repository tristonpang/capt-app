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

//TODO: refactor
export const announcementsListFetch = () => {
    const { currentUser } = firebase.auth();
    const roomId = retrieveRoomIdFromEmail(currentUser.email);

    return (dispatch) => {
        firebase.database().ref('/announcements')
            .on('value', annSnapshot => {
                firebase.database().ref(`userSignups/${roomId}/`)
                    .on('value', signupSnapshot => {
                        const userSignups = signupSnapshot.val() ? signupSnapshot.val() : {};
                        const currentAnnouncements = _.map(annSnapshot.val(), 
                            (val, key) => {
                                return { 
                                    ...val, 
                                    isUserSignedUp: userSignups[key], 
                                    key 
                                };
                            });
                        //console.log(currentAnnouncements);
                        dispatch({ 
                            type: ANNOUNCEMENTS_LIST_FETCH_SUCCESS,
                            payload: currentAnnouncements
                        });
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

export const withdrawFromEvent = (keyTitle) => {
    const { currentUser } = firebase.auth();
    const roomId = retrieveRoomIdFromEmail(currentUser.email);

    const updates = {
        [`userSignups/${roomId}/${keyTitle}`]: null,
        [`eventSignups/${keyTitle}/${roomId}`]: null
    };

    return () => {
        firebase.database().ref().update(updates)
            .then(Actions.pop())
            .catch((error) => {
                console.log(error);
            });
    };
};
