import {
    CHANGE_PASSWORD_FORM_UPDATE,
    RESET_PASSWORD_FORM_ERROR,
    CHANGE_PASSWORD_START_LOADING,
    CHANGE_PASSWORD_END_LOADING
} from '../actions/types';

const INITIAL_STATE = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_FORM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case RESET_PASSWORD_FORM_ERROR:
            return { ...state, error: '' };
        case CHANGE_PASSWORD_START_LOADING:
            return { ...state, loading: true };
        case CHANGE_PASSWORD_END_LOADING:
            return { ...state, loading: false };
        default:
            return state;
    }
};
