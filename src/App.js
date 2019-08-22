import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import firebase from "firebase";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";
import Router from "./Router";

class App extends Component {
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyDRtkc1J8pDJ7dHaehAlrtYk_b6wHLigRI",
      authDomain: "capt-app-2019.firebaseapp.com",
      databaseURL: "https://capt-app-2019.firebaseio.com",
      projectId: "capt-app-2019",
      storageBucket: "capt-app-2019.appspot.com",
      messagingSenderId: "200110214269",
      appId: "1:200110214269:web:f1c04e7f51d28a58"
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
