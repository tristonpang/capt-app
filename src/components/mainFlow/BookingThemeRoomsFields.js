import React, { Component } from "react";
import { View, Picker, Text } from "react-native";
import { connect } from "react-redux";
import { CardSection, Input } from "../common";
import { bookingFormUpdate } from "../../actions";

class BookingThemeRoomFields extends Component {
  render() {
    return (
      <View>
        <CardSection style={{ flexDirection: "column" }}>
          <Text style={styles.pickerLabelStyle}>Theme Room</Text>
          <Picker
            selectedValue={this.props.trNumber}
            onValueChange={number =>
              this.props.bookingFormUpdate({ prop: "trNumber", value: number })
            }
          >
            <Picker.Item label="TR1" value="TR1" />
            <Picker.Item label="TR2" value="TR2" />
            <Picker.Item label="TR3" value="TR3" />
          </Picker>
        </CardSection>
        <CardSection>
          <Input
            label="TR2-trained CAPTain"
            placeholder="Name & House, otherwise NA"
            onChangeText={text =>
              this.props.bookingFormUpdate({
                prop: "tr2Captain",
                value: text
              })
            }
            value={this.props.tr2Captain}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { trNumber, tr2Captain } = state.bookingForm;

  return { trNumber, tr2Captain };
};

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

export default connect(
  mapStateToProps,
  { bookingFormUpdate }
)(BookingThemeRoomFields);
