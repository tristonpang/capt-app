import {
    BOOKING_FORM_UPDATE,
    BOOKING_FORM_RESET
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone: '',
    description: '',
    matric: '',
    startDateTime: '',
    endDateTime: '',
    trNumber: 'TR1',
    tr2Captain: '',
    mpshNumberOfCaptains: '',
    mpshNumberOfNonCaptains: '',
    mpshCourtsNeeded: 'A',
    mpshEquipmentRequired: '',
    numberOfParticipants: '',
    srNumber: 'Any'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BOOKING_FORM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case BOOKING_FORM_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
