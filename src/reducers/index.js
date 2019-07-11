import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AdminReducer from './AdminReducer';
import AdminFormReducer from './AdminFormReducer';
import AnnouncementsReducer from './AnnouncementsReducer';

export default combineReducers({
    auth: AuthReducer,
    adminAnnouncements: AdminReducer,
    adminForm: AdminFormReducer,
    mainAnnouncements: AnnouncementsReducer
});
