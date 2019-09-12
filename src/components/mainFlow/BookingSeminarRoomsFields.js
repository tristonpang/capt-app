import React, { Component } from "react";
import { View, Picker, Text } from "react-native";
import { connect } from "react-redux";
import { CardSection, StackInput } from "../common";
import { bookingFormUpdate } from "../../actions";

class BookingSeminarRoomsFields extends Component {
  render() {
    return (
      <View>
        <CardSection style={{ flexDirection: "column" }}>
          <Text style={styles.pickerLabelStyle}>Seminar Room</Text>
          <Picker
            selectedValue={this.props.trNumber}
            onValueChange={court =>
              this.props.bookingFormUpdate({
                prop: "mpshCourtsNeeded",
                value: court
              })
            }
          >
            <Picker.Item label="Any" value="Any" />
            <Picker.Item label="SR1" value="SR1" />
            <Picker.Item label="SR2" value="SR2" />
            <Picker.Item label="SR3" value="SR3" />
            <Picker.Item label="SR4" value="SR4" />
            <Picker.Item label="SR5" value="SR5" />
            <Picker.Item label="SR6" value="SR6" />
          </Picker>
        </CardSection>
        <CardSection>
          <StackInput
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

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 10
  }
};

const mapStateToProps = state => {
  const { srNumber, numberOfParticipants } = state.bookingForm;

  return {
    srNumber,
    numberOfParticipants
  };
};

export default connect(
  mapStateToProps,
  { bookingFormUpdate }
)(BookingSeminarRoomsFields);
