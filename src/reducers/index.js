import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AdminReducer from './AdminReducer';
import AdminFormReducer from './AdminFormReducer';
import AnnouncementsReducer from './AnnouncementsReducer';
import ProfileReducer from './ProfileReducer';
import UserSignupsReducer from './UserSignupsReducer';
import AdminSignupsReducer from './AdminSignupsReducer';

export default combineReducers({
    auth: AuthReducer,
    adminAnnouncements: AdminReducer,
    adminForm: AdminFormReducer,
    mainAnnouncements: AnnouncementsReducer,
    profile: ProfileReducer,
    userSignups: UserSignupsReducer,
    adminSignups: AdminSignupsReducer
});
