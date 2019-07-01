import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import {
    ADMIN_LIST_FETCH_SUCCESS,
    ADMIN_UPDATE
} from './types';

export const adminListFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/adminAnnouncements/${currentUser.uid}`)
            .on('value', snapshot => {
                const announcementKeys = snapshot.val();
                firebase.database().ref('/announcements')
                    .on('value', annSnapshot => {
                        const currentAdminAnnouncements = _.map(announcementKeys, 
                            (val, key) => {
                                const announcementObject = annSnapshot.val()[key];
                                if (announcementObject) {
                                    console.log(announcementObject);
                                    return announcementObject;
                                }
                            }
                        );
                        //console.log(currentAdminAnnouncements);
                        dispatch({ type: ADMIN_LIST_FETCH_SUCCESS, payload: currentAdminAnnouncements });
                    });
            });
    };
    /*
    return (dispatch) => {
        firebase.database().ref(`/adminAnnouncements/${currentUser.uid}`)
            .on('value', snapshot => {
                dispatch({ type: ADMIN_LIST_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
    */
};

export const adminUpdate = ({ prop, value }) => {
    return {
        type: ADMIN_UPDATE,
        payload: { prop, value }
    };
};

export const adminCreate = ({ title, description, isEvent, isActive }) => {
    const { currentUser } = firebase.auth();
    const parsedTitle = title.replace(/ /g, '-');
    console.log(parsedTitle);

    const updates = {
        [`adminAnnouncements/${currentUser.uid}/${parsedTitle}`]: true,
        [`announcements/${parsedTitle}`]: { title, description, isEvent, isActive }
    };

    
    return () => {
        firebase.database().ref().update(updates)
            .then(() => Actions.pop());
    };
};
