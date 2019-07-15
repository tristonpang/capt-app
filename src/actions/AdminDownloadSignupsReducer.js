import { 
    ADMIN_SIGNUPS_DOWNLOAD_LINK_PREP_SUCCESS,
    ADMIN_RESET_SIGNUPS_DOWNLOAD_LINK,
    ADMIN_COPIED_SIGNUPS_DOWNLOAD_LINK
} from '../actions/types';

const INITIAL_STATE = {
    downloadLink: '',
    isCopied: false
};

export default (state = INITIAL_STATE, action) => {
    //console.log(action);

    switch (action.type) {
        case ADMIN_RESET_SIGNUPS_DOWNLOAD_LINK:
            return { downloadLink: '', isCopied: false };
        case ADMIN_SIGNUPS_DOWNLOAD_LINK_PREP_SUCCESS:
            return { ...state, downloadLink: action.payload };
        case ADMIN_COPIED_SIGNUPS_DOWNLOAD_LINK:
            return { ...state, isCopied: true };
        default:
            return state;
    }
};