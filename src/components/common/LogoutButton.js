import React from "react";
import { Actions } from "react-native-router-flux";
import firebase from "firebase";
import { CardSection, Button } from "../common";

const LogoutButton = () => {
  return (
    <CardSection>
      <Button
        onPress={() => {
          firebase
            .auth()
            .signOut()
            .then(() => Actions.popTo("login"));
        }}
      >
        Logout
      </Button>
    </CardSection>
  );
};

export { LogoutButton };
