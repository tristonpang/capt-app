import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { usernameChanged, passwordChanged, loginUser } from "../actions";

class LoginForm extends Component {
  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { username, password } = this.props;

    this.props.loginUser({ username, password });
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

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
  }

  render() {
    return (
      <View>
        <Image
          source={require("../resources/logo.png")}
          style={styles.logoStyle}
        />
        <Card>
          <CardSection>
            <Input
              label="Room ID"
              placeholder="18-71A"
              onChangeText={this.onUsernameChange.bind(this)}
              value={this.props.username}
              autoCapitalize="none"
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>

          {this.renderError()}

          <CardSection>{this.renderButton()}</CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  logoStyle: {
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20
  }
};

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(
  mapStateToProps,
  { usernameChanged, passwordChanged, loginUser }
)(LoginForm);
