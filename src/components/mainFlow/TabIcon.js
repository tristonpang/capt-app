import React from "react";
import { Image } from "react-native";
import {
  ANNOUNCEMENTS_TITLE,
  PROFILE_TITLE,
  BOOKING_TITLE,
  BUZZ_TITLE
} from "../../actions/types";

const TabIcon = props => {
  if (props.title === ANNOUNCEMENTS_TITLE) {
    return (
      <Image
        source={require("../../resources/announcements.png")}
        style={styles.iconStyle}
      />
    );
  }
  if (props.title === PROFILE_TITLE) {
    return (
      <Image
        source={require("../../resources/profile.png")}
        style={styles.iconStyle}
      />
    );
  }
  if (props.title === BOOKING_TITLE) {
    return (
      <Image
        source={require("../../resources/booking.png")}
        style={styles.iconStyle}
      />
    );
  }
  if (props.title === BUZZ_TITLE) {
    return (
      <Image
        source={require("../../resources/buzz.png")}
        style={styles.iconStyle}
      />
    );
  }
};

const styles = {
  iconStyle: {
    marginTop: 5
  }
};

export default TabIcon;
