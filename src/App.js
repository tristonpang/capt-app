import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentDidMount() {
        var firebaseConfig = {
            apiKey: "AIzaSyAxOCAK9kJu-ilLhG6ZSTIyderOAs6QtiI",
            authDomain: "capt-app-efb3b.firebaseapp.com",
            databaseURL: "https://capt-app-efb3b.firebaseio.com",
            projectId: "capt-app-efb3b",
            storageBucket: "gs://capt-app-efb3b.appspot.com/",
            messagingSenderId: "87525430213",
            appId: "1:87525430213:web:2ebf64d952033de3"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }

}

export default App;