import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { CardSection, Input } from "../common";
import { bookingFormUpdate } from "../../actions";

class BookingFlyingSeedFields extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Number of Participants"
            placeholder="0"
            onChangeText={text =>
              this.props.bookingFormUpdate({
                prop: "numberOfParticipants",
                value: text
              })
            }
            value={this.props.numberOfParticipants}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { numberOfParticipants } = state.bookingForm;

  return {
    numberOfParticipants
  };
};

export default connect(
  mapStateToProps,
  { bookingFormUpdate }
)(BookingFlyingSeedFields);
