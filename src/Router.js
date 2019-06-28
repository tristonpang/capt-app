import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import AdminHome from './components/adminFlow/AdminHome';
import Announcements from './components/mainFlow/Announcements';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key='root' hideNavBar>
                
                <Scene key='auth'>
                    <Scene key='login' component={LoginForm} title='CAPT App' initial />
                </Scene>

                <Scene key='main'>
                    <Scene 
                        key='announcements'
                        component={Announcements}
                        title='Announcements'
                        initial
                    />
                </Scene>

                <Scene key='admin'>
                    <Scene 
                        key='adminHome' 
                        component={AdminHome} 
                        title='Admin Functions' 
                        initial 
                    />
                </Scene>

            </Scene>
        </Router>
    );
};

export default RouterComponent;