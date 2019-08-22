import React from "react";
import { Actions } from "react-native-router-flux";
import { CardSection, Button } from "../common";

const CancelButton = () => {
  return (
    <CardSection>
      <Button onPress={() => Actions.pop()}>Cancel</Button>
    </CardSection>
  );
};

export { CancelButton };
