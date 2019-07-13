import {
    USER_SIGNUPS_LIST_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    events: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_SIGNUPS_LIST_FETCH_SUCCESS:
            //console.log(action.payload);
            return { ...state, events: action.payload };
        default:
            return state;
    }
};
