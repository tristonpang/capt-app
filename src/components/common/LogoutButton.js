import React from "react";
import { Actions } from "react-native-router-flux";
import firebase from "firebase";
import { CardSection, Button } from "../common";

const LogoutButton = () => {
  return (
    <CardSection>
      <Button
        onPress={() => {
          firebase.auth().signOut();
          Actions.auth();
        }}
      >
        Logout
      </Button>
    </CardSection>
  );
};

export { LogoutButton };
