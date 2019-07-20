import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import {
    ANNOUNCEMENTS_LIST_FETCH_SUCCESS,
    PREPARE_PROFILE_DATA,
    USER_SIGNUPS_LIST_FETCH_SUCCESS,
    CHANGE_PASSWORD_FORM_UPDATE,
    RESET_PASSWORD_FORM_ERROR,
    CHANGE_PASSWORD_START_LOADING,
    CHANGE_PASSWORD_END_LOADING,
    BOOKING_FORM_UPDATE,
    BOOKING_FORM_RESET
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
                        const filteredAnnouncements = _.filter(currentAnnouncements, 
                            (item) => item);
                        //console.log(currentAnnouncements);
                        dispatch({ 
                            type: ANNOUNCEMENTS_LIST_FETCH_SUCCESS,
                            payload: filteredAnnouncements
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

export const prepareProfileData = () => {
    const { currentUser } = firebase.auth();
    const roomId = retrieveRoomIdFromEmail(currentUser.email);

    return {
        type: PREPARE_PROFILE_DATA,
        payload: { roomId, qrCode: roomId }
    };
};

export const userSignupsListFetch = () => {
    const { currentUser } = firebase.auth();
    const roomId = retrieveRoomIdFromEmail(currentUser.email);

    return (dispatch) => {
        firebase.database().ref(`userSignups/${roomId}`)
            .on('value', signupSnapshot => {
                firebase.database().ref(`announcements/`)
                    .on('value', annSnapshot => {
                        const announcements = annSnapshot.val();
                        //console.log('ann ', announcements);
                        const signedUpEvents = _.map(signupSnapshot.val(), 
                            (val, key) => {
                                return { ...announcements[key], key };
                            });
                        dispatch({ 
                            type: USER_SIGNUPS_LIST_FETCH_SUCCESS,
                            payload: signedUpEvents
                        });
                    });
            });
    };
};

export const changePasswordFormUpdate = ({ prop, value }) => {
    return { type: CHANGE_PASSWORD_FORM_UPDATE, payload: { prop, value } };
}

export const attemptChangePassword = ({ oldPassword, newPassword, confirmNewPassword }) => {
    return (dispatch) => {
        dispatch({ type: RESET_PASSWORD_FORM_ERROR });
        dispatch({ type: CHANGE_PASSWORD_START_LOADING });
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            dispatch({ type: CHANGE_PASSWORD_FORM_UPDATE, payload: { prop: 'error', value: 'Please fill in all fields' } });
            dispatch({ type: CHANGE_PASSWORD_END_LOADING });
        } else if (newPassword !== confirmNewPassword) {
            dispatch({ type: CHANGE_PASSWORD_FORM_UPDATE, payload: { prop: 'error', value: 'New passwords do not match' } });
            dispatch({ type: CHANGE_PASSWORD_END_LOADING });
        } else {
            changePassword(oldPassword, newPassword, dispatch);
        }
    };
}

const changePassword = (oldPassword, newPassword, dispatch) => {
    const { currentUser } = firebase.auth();
    const credential = firebase.auth.EmailAuthProvider
        .credential(currentUser.email, oldPassword);

    currentUser.reauthenticateWithCredential(credential)
        .then(() => firebase.auth().currentUser
            .updatePassword(newPassword)
            .then(() => Actions.pop()))
        .catch(error => {
            dispatch({ 
                type: CHANGE_PASSWORD_FORM_UPDATE, 
                payload: { prop: 'error', value: error.message } 
            });
            dispatch({ type: CHANGE_PASSWORD_END_LOADING });
        });
        
};

export const bookingFormUpdate = ({ prop, value }) => {
    return { type: BOOKING_FORM_UPDATE, payload: { prop, value } };
}

export const bookingFormReset = () => {
    return { type: BOOKING_FORM_RESET };
};
