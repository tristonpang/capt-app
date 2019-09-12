import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Input, Card, CardSection, Button, Spinner } from "../common";
import { changePasswordFormUpdate, attemptChangePassword } from "../../actions";

class ChangePasswordForm extends Component {
  componentDidMount() {
    //TODO: need to refactor this, call single reset action
    this.props.changePasswordFormUpdate({ prop: "oldPassword", value: "" });
    this.props.changePasswordFormUpdate({ prop: "newPassword", value: "" });
    this.props.changePasswordFormUpdate({
      prop: "confirmNewPassword",
      value: ""
    });
    this.props.changePasswordFormUpdate({ prop: "error", value: "" });
    this.props.changePasswordFormUpdate({ prop: "loading", value: false });
  }

  onChangePasswordButtonPress() {
    const { oldPassword, newPassword, confirmNewPassword } = this.props;
    this.props.attemptChangePassword({
      oldPassword,
      newPassword,
      confirmNewPassword
    });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: "white" }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  renderChangePasswordButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onChangePasswordButtonPress.bind(this)}>
        Change Password
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Old Password"
            placeholder="old password"
            onChangeText={text =>
              this.props.changePasswordFormUpdate({
                prop: "oldPassword",
                value: text
              })
            }
            value={this.props.oldPassword}
          />
        </CardSection>
        <CardSection>
          <Input
            label="New Password"
            placeholder="new password"
            onChangeText={text =>
              this.props.changePasswordFormUpdate({
                prop: "newPassword",
                value: text
              })
            }
            value={this.props.newPassword}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Retype New Password"
            placeholder="retype new password"
            onChangeText={text =>
              this.props.changePasswordFormUpdate({
                prop: "confirmNewPassword",
                value: text
              })
            }
            value={this.props.confirmNewPassword}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>{this.renderChangePasswordButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

const mapStateToProps = state => {
  const {
    oldPassword,
    newPassword,
    confirmNewPassword,
    error,
    loading
  } = state.changePasswordForm;

  return { oldPassword, newPassword, confirmNewPassword, error, loading };
};

export default connect(
  mapStateToProps,
  {
    changePasswordFormUpdate,
    attemptChangePassword
  }
)(ChangePasswordForm);
