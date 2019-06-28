import { 
    ADMIN_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    title: '',
    description: ''
};

export default (state = INITIAL_STATE, action) => {
    //console.log(action);

    switch (action.type) {
        case ADMIN_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};
