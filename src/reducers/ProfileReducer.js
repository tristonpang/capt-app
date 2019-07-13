import {
    PREPARE_PROFILE_DATA
} from '../actions/types';

const INITIAL_STATE = {
    roomId: '',
    qrCode: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PREPARE_PROFILE_DATA:
            const { roomId, qrCode } = action.payload;
            return { ...state, roomId, qrCode };
        default:
            return state;
    }
};
