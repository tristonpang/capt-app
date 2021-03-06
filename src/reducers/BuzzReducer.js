import {
    BUZZ_LIST_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    announcements: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BUZZ_LIST_FETCH_SUCCESS:
            //console.log(action.payload);
            return { ...state, announcements: action.payload };
        default:
            return state;
    }
};
