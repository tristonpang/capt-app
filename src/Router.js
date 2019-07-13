import React from 'react';
import { Scene, Router, Actions, Tabs } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import AdminHome from './components/adminFlow/AdminHome';
import Announcements from './components/mainFlow/Announcements';
import AdminCreate from './components/adminFlow/AdminCreate';
import AdminEdit from './components/adminFlow/AdminEdit';
import Profile from './components/mainFlow/Profile';
import Buzz from './components/mainFlow/Buzz';
import MainDetail from './components/mainFlow/MainDetail';
import UserSignupsList from './components/mainFlow/UserSignupsList';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key='root' hideNavBar>
                
                <Scene key='auth'>
                    <Scene key='login' component={LoginForm} title='CAPT App' initial />
                </Scene>

                <Scene key='main' hideNavBar>
                    <Tabs>
                        <Scene 
                            key='profile'
                            component={Profile}
                            title='My Profile'
                        />
                        <Scene 
                            key='announcements'
                            component={Announcements}
                            title='Announcements'
                            initial
                        />
                        <Scene 
                            key='buzz'
                            component={Buzz}
                            title='Buzz'
                        />
                    </Tabs>
                    <Scene 
                        key='mainDetail'
                        component={MainDetail}
                        title='Announcement Details'
                    />
                    <Scene 
                        key='userSignupsList'
                        component={UserSignupsList}
                        title='My Signups'
                    />
                </Scene>

                <Scene key='admin'>
                    <Scene 
                        key='adminHome' 
                        component={AdminHome} 
                        title='Admin Functions' 
                        rightTitle='Add'
                        onRight={() => Actions.adminCreate()}
                        initial 
                    />
                    <Scene 
                        key='adminCreate' 
                        component={AdminCreate}
                        title='Create Announcment'    
                    />
                    <Scene 
                        key='adminEdit'
                        component={AdminEdit}
                        title='Edit Announcement'
                    />
                </Scene>

            </Scene>
        </Router>
    );
};

export default RouterComponent;