import { 
    ADMIN_LIST_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    //console.log(action);

    switch (action.type) {
        case ADMIN_LIST_FETCH_SUCCESS:
            console.log(action.payload);
            return { announcements: action.payload };
        default:
            return state;
    }
};
