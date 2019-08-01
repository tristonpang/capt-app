import { 
    ADMIN_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    title: '',
    description: '',
    isEvent: false,
    isActive: true,
    imgSrc: {}, //this is used for displaying preview pictures before uploading
    url: '', //this is used for fetching pictures from the server
    dateTime: '',
    venue: '',
    isBuzz: false
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
