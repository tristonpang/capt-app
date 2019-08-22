import React, { Component } from "react";
import { Clipboard } from "react-native";
import { connect } from "react-redux";
import {
  adminPrepareSignupsDownload,
  adminCopySignupsDownloadLink
} from "../../actions";
import { Card, CardSection, Button, Spinner } from "../common";

class AdminDownloadSignups extends Component {
  componentDidMount() {
    this.props.adminPrepareSignupsDownload(this.props.titleKey);
  }

  renderDownloadLinkButton() {
    if (!this.props.downloadLink) {
      return <Spinner size="large" />;
    }
    if (this.props.isCopied) {
      return <Button disabled>Copied!</Button>;
    }
    return (
      <Button onPress={this.onDownloadLinkButtonPress.bind(this)}>
        Copy Download Link to Clipboard
      </Button>
    );
  }

  onDownloadLinkButtonPress() {
    Clipboard.setString(this.props.downloadLink);
    this.props.adminCopySignupsDownloadLink();
  }

  render() {
    return (
      <Card>
        <CardSection>{this.renderDownloadLinkButton()}</CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { downloadLink, isCopied } = state.adminDownloadSignups;

  return { downloadLink, isCopied };
};

export default connect(
  mapStateToProps,
  {
    adminPrepareSignupsDownload,
    adminCopySignupsDownloadLink
  }
)(AdminDownloadSignups);
