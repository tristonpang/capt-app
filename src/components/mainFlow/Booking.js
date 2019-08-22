import React, { Component } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { Card, CardSection } from "../common";
import {
  THEME_ROOMS,
  MPSH,
  FLYING_SEED,
  SEMINAR_ROOMS
} from "../../actions/types";

class Booking extends Component {
  render() {
    const { titleStyle, titleContainerStyle } = styles;
    return (
      <ScrollView>
        <TouchableOpacity
          onPress={() => Actions.bookingForm({ bookingType: "theme_rooms" })}
        >
          <Card>
            <CardSection style={titleContainerStyle}>
              <Text style={titleStyle}>Theme Rooms</Text>
            </CardSection>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Actions.bookingForm({ bookingType: MPSH })}
        >
          <Card>
            <CardSection style={titleContainerStyle}>
              <Text style={titleStyle}>Multi-Purpose Sports Hall</Text>
            </CardSection>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Actions.bookingForm({ bookingType: FLYING_SEED })}
        >
          <Card>
            <CardSection style={titleContainerStyle}>
              <Text style={titleStyle}>Flying Seed</Text>
            </CardSection>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Actions.bookingForm({ bookingType: SEMINAR_ROOMS })}
        >
          <Card>
            <CardSection style={titleContainerStyle}>
              <Text style={titleStyle}>Seminar Rooms</Text>
            </CardSection>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 32,
    fontWeight: "bold"
  },
  titleContainerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative"
  }
};

export default Booking;
