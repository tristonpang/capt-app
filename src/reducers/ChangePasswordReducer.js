import {
    CHANGE_PASSWORD_FORM_UPDATE,
    RESET_PASSWORD_FORM_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_FORM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case RESET_PASSWORD_FORM_ERROR:
            return { ...state, error: '' }
        default:
            return state;
    }
};
