import {
    ANNOUNCEMENTS_LIST_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ANNOUNCEMENTS_LIST_FETCH_SUCCESS:
            console.log(action.payload);
            return { announcements: action.payload };
        default:
            return state;
    }
};
