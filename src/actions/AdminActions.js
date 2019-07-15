import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import _ from 'lodash';
import {
    ADMIN_LIST_FETCH_SUCCESS,
    ADMIN_UPDATE,
    ADMIN_SIGNUPS_LIST_FETCH_SUCCESS,
    ADMIN_SIGNUPS_DOWNLOAD_LINK_PREP_SUCCESS,
    ADMIN_RESET_SIGNUPS_DOWNLOAD_LINK,
    ADMIN_COPIED_SIGNUPS_DOWNLOAD_LINK
} from './types';

const parseTitle = (title) => {
    return title.replace(/ /g, '-');
};

//TODO: refactor this action, too much nesting
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
                                    //console.log(announcementObject);
                                    return { ...announcementObject, key };
                                }
                            }
                        );
                        //console.log(currentAdminAnnouncements);
                        dispatch({ type: ADMIN_LIST_FETCH_SUCCESS, payload: currentAdminAnnouncements });
                    });
            });
    };
};

export const adminUpdate = ({ prop, value }) => {
    return {
        type: ADMIN_UPDATE,
        payload: { prop, value }
    };
};

export const adminCreate = ({ title, description, isEvent, isActive, imgSrc, dateTime, venue }) => {
    const { currentUser } = firebase.auth();
    const parsedTitle = parseTitle(title);

    if (!imgSrc) {
        const updates = {
            [`adminAnnouncements/${currentUser.uid}/${parsedTitle}`]: true,
            [`announcements/${parsedTitle}`]: { title, description, isEvent, isActive, dateTime, venue }
        };
        return () => {
            firebase.database().ref().update(updates)
                .then(() => Actions.pop())
                .catch((error) => {
                    console.log(error);
                });
        };
    }
 
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;


    return () => {
        const imageUri = imgSrc.uri;

        let uploadBlob = null;
        const imageRef = firebase.storage().ref().child(`/images/${parsedTitle + '.jpg'}`);
        const mime = 'image/jpg';
        fs.readFile(imageUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, { contentType: mime });
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                // URL of the image uploaded on Firebase storage
                console.log(url);
                const updates = {
                    [`adminAnnouncements/${currentUser.uid}/${parsedTitle}`]: true,
                    [`announcements/${parsedTitle}`]: { title, description, isEvent, isActive, url, dateTime, venue }
                };
                //store url into database
                firebase.database().ref().update(updates);
            })
            .then(() => Actions.pop())
            .catch((error) => {
                console.log(error);
            });
    };
};

export const adminSaveEdits = ({ title, description, isActive, imgSrc, dateTime, venue }) => {
    const parsedTitle = parseTitle(title);

    if (!imgSrc) {
        console.log('adminSaveEdits: No imgSrc detected');
        const updates = { description, isActive, dateTime, venue };
        return () => {
            firebase.database().ref(`announcements/${parsedTitle}`).update(updates)
                .then(() => Actions.pop())
                .catch((error) => {
                    console.log(error);
                });
        };
    }
 
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;


    return () => {
        const imageUri = imgSrc.uri;

        let uploadBlob = null;
        const imageRef = firebase.storage().ref().child(`/images/${parsedTitle + '.jpg'}`);
        const mime = 'image/jpg';
        
        fs.readFile(imageUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, { contentType: mime });
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                // URL of the image uploaded on Firebase storage
                console.log(url);
                const updates = { description, isActive, url, dateTime, venue };
                //store url into database
                firebase.database().ref(`announcements/${parsedTitle}`).update(updates);
            })
            .then(() => Actions.pop())
            .catch((error) => {
                console.log(error);
            });
            
    };
};

export const adminDelete = ({ title, url }) => {
    const { currentUser } = firebase.auth();
    const parsedTitle = parseTitle(title);

    const updates = {
        [`adminAnnouncements/${currentUser.uid}/${parsedTitle}`]: null,
        [`announcements/${parsedTitle}`]: null
    };

    return () => {
        firebase.database().ref().update(updates)
            .then(() => {
                if (url) {
                    firebase.storage().ref()
                        .child(`/images/${parsedTitle + '.jpg'}`)
                        .delete();
                }
            })
            .then(() => Actions.pop())
            .catch((error) => {
                console.log(error);
            });
    };
};

export const adminSignupsListFetch = (titleKey) => {
    return (dispatch) => {
        firebase.database().ref(`eventSignups/${titleKey}`)
            .on('value', snapshot => {
                const signups = _.map(snapshot.val(), 
                    (val, key) => {
                        return key;
                    });
                dispatch({
                    type: ADMIN_SIGNUPS_LIST_FETCH_SUCCESS,
                    payload: signups
                });
            });
    };
};

export const adminPrepareSignupsDownload = (titleKey) => {
    return (dispatch) => {
        dispatch({ type: ADMIN_RESET_SIGNUPS_DOWNLOAD_LINK });
        firebase.database().ref(`eventSignups/${titleKey}`)
            .on('value', snapshot => {
                const signups = _.map(snapshot.val(), 
                    (val, key) => {
                        return key;
                    });
                const storageRef = firebase.storage().ref(`signupsData/${titleKey}.txt`);
                console.log(signups.toString());
                storageRef.putString(signups.toString())
                    .then(() => storageRef.getDownloadURL())
                    .then((url) => dispatch({ 
                        type: ADMIN_SIGNUPS_DOWNLOAD_LINK_PREP_SUCCESS,
                        payload: url
                    }));
            });
    };
};

export const adminCopySignupsDownloadLink = () => {
    return { type: ADMIN_COPIED_SIGNUPS_DOWNLOAD_LINK };
};
