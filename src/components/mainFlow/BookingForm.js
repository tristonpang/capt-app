import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { email } from "react-native-communications";
import { Input, Card, CardSection, Button, StackInput } from "../common";
import { bookingFormUpdate, bookingFormReset } from "../../actions";
import {
  THEME_ROOMS,
  MPSH,
  FLYING_SEED,
  SEMINAR_ROOMS
} from "../../actions/types";
import BookingThemeRoomsFields from "./BookingThemeRoomsFields";
import BookingMPSHFields from "./BookingMPSHFields";
import BookingFlyingSeedFields from "./BookingFlyingSeedFields";
import BookingSeminarRoomsFields from "./BookingSeminarRoomsFields";
import { Actions } from "react-native-router-flux";

const START_DATETIME = "start";
const END_DATETIME = "end";

class BookingForm extends Component {
  state = {
    isStartDateTimePickerVisible: false,
    isEndDateTimePickerVisible: false
  };

  componentDidMount() {
    this.props.bookingFormReset();
    const { bookingType, bookingFormUpdate } = this.props;
    if (bookingType === THEME_ROOMS) {
      bookingFormUpdate({ prop: "trNumber", value: "TR1" });
    } else if (bookingType === MPSH) {
      bookingFormUpdate({ prop: "mpshCourtsNeeded", value: "A" });
    } else if (bookingType === SEMINAR_ROOMS) {
      bookingFormUpdate({ prop: "srNumber", value: "Any" });
    }
  }

  onSendRequestPress() {
    const { fullForm } = this.props;
    let message = "";
    for (var key in fullForm) {
      if (fullForm[key]) {
        message += `${key}: ${fullForm[key]}\n`;
      }
    }
    Actions.pop();
    email(
      ["test@capt.com"],
      null,
      null,
      `${this.props.bookingType} Booking Request`,
      message
    );
  }

  renderDateTimeButton(dateTimeType) {
    if (this.props.startDateTime && dateTimeType === START_DATETIME) {
      return (
        <Button onPress={this.renderDateTimePicker(dateTimeType).bind(this)}>
          {this.props.startDateTime}
        </Button>
      );
    }
    if (this.props.endDateTime && dateTimeType === END_DATETIME) {
      return (
        <Button onPress={this.renderDateTimePicker(dateTimeType).bind(this)}>
          {this.props.endDateTime}
        </Button>
      );
    }
    return (
      <Button
        onPress={this.renderDateTimePicker(dateTimeType).bind(this)}
      >{`Set ${dateTimeType} date/time`}</Button>
    );
  }

  renderDateTimePicker(dateTimeType) {
    return () => {
      if (dateTimeType === START_DATETIME) {
        this.setState({ isStartDateTimePickerVisible: true });
      } else if (dateTimeType === END_DATETIME) {
        this.setState({ isEndDateTimePickerVisible: true });
      }
    };
  }

  handleStartDateTimePicked(dateTime) {
    this.props.bookingFormUpdate({
      prop: "startDateTime",
      value: dateTime.toString()
    });
    this.setState({ isStartDateTimePickerVisible: false });
  }

  handleEndDateTimePicked(dateTime) {
    this.props.bookingFormUpdate({
      prop: "endDateTime",
      value: dateTime.toString()
    });
    this.setState({ isEndDateTimePickerVisible: false });
  }

  hideStartDateTimePicker() {
    this.setState({ isStartDateTimePickerVisible: false });
  }

  hideEndDateTimePicker() {
    this.setState({ isEndDateTimePickerVisible: false });
  }

  renderSpecificFields() {
    const { bookingType } = this.props;
    if (bookingType === THEME_ROOMS) {
      return <BookingThemeRoomsFields />;
    } else if (bookingType === MPSH) {
      return <BookingMPSHFields />;
    } else if (bookingType === FLYING_SEED) {
      return <BookingFlyingSeedFields />;
    } else if (bookingType === SEMINAR_ROOMS) {
      return <BookingSeminarRoomsFields />;
    }
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <StackInput
              label="Name"
              placeholder="John Doe"
              onChangeText={text =>
                this.props.bookingFormUpdate({
                  prop: "name",
                  value: text
                })
              }
              value={this.props.name}
            />
          </CardSection>
          <CardSection>
            <StackInput
              label="Mobile No."
              placeholder="9876 1234"
              onChangeText={text =>
                this.props.bookingFormUpdate({
                  prop: "phone",
                  value: text
                })
              }
              value={this.props.phone}
            />
          </CardSection>
          <CardSection>
            {this.renderDateTimeButton(START_DATETIME)}
            <DateTimePicker
              isVisible={this.state.isStartDateTimePickerVisible}
              onConfirm={this.handleStartDateTimePicked.bind(this)}
              onCancel={this.hideStartDateTimePicker.bind(this)}
              mode="datetime"
            />
          </CardSection>
          <CardSection>
            {this.renderDateTimeButton(END_DATETIME)}
            <DateTimePicker
              isVisible={this.state.isEndDateTimePickerVisible}
              onConfirm={this.handleEndDateTimePicked.bind(this)}
              onCancel={this.hideEndDateTimePicker.bind(this)}
              mode="datetime"
            />
          </CardSection>

          {this.renderSpecificFields()}

          <CardSection>
            <StackInput
              label="Description of Activity"
              placeholder="Description"
              multiline={true}
              containerStyle={{    height: 150,
                                   flex: 1,
                                   paddingLeft: 5,
                                   paddingRight: 5,}}
              onChangeText={text =>
                this.props.bookingFormUpdate({
                  prop: "description",
                  value: text
                })
              }
              value={this.props.description}
            />
          </CardSection>

          <CardSection>
            <Button onPress={this.onSendRequestPress.bind(this)}>
              Send Booking Request
            </Button>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const {
    name,
    phone,
    description,
    startDateTime,
    endDateTime
  } = state.bookingForm;

  const fullForm = state.bookingForm;

  return {
    name,
    phone,
    description,
    startDateTime,
    endDateTime,
    fullForm
  };
};

export default connect(
  mapStateToProps,
  { bookingFormUpdate, bookingFormReset }
)(BookingForm);
