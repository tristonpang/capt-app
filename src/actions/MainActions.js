import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import {
    ANNOUNCEMENTS_LIST_FETCH_SUCCESS
} from '../actions/types';

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
