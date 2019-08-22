import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, View } from "react-native";
import _ from "lodash";
import { adminListFetch } from "../../actions";
import AdminListItem from "./AdminListItem";
import Button from "../common/Button";
import CardSection from "../common/CardSection";

class AdminHome extends Component {
  componentDidMount() {
    this.props.adminListFetch();
  }

  renderItem(announcement) {
    return <AdminListItem announcement={announcement} />;
  }

  onLogOutButtonPress() {}

  render() {
    return (
      <View>
        <FlatList
          data={this.props.announcements}
          renderItem={this.renderItem}
          keyExtractor={announcement => {
            if (!announcement.title) {
              return "deleted";
            }
            return announcement.title.toString();
          }}
        />
        <CardSection>
          <Button onButtonPress={() => this.onLogOutButtonPress.bind(this)}>
            Log Out
          </Button>
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { announcements } = state.adminAnnouncements;

  return { announcements };
};

export default connect(
  mapStateToProps,
  { adminListFetch }
)(AdminHome);
