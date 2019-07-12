import {
    ANNOUNCEMENTS_LIST_FETCH_SUCCESS,
    USER_SIGNUPS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    announcements: null,
    userSignups: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ANNOUNCEMENTS_LIST_FETCH_SUCCESS:
            //console.log(action.payload);
            return { ...state, announcements: action.payload };
        case USER_SIGNUPS_FETCH_SUCCESS:
            console.log(action.payload);
            return { ...state, userSignups: action.payload };
        default:
            return state;
    }
};
