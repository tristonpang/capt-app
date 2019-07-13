import React, { Component } from 'react';
import { ScrollView, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from '../common';
import { signupForEvent, withdrawFromEvent } from '../../actions';

class MainDetail extends Component {
    onSignupButtonPress() {
        this.props.signupForEvent(this.props.announcement.key);
    }

    onWithdrawButtonPress() {
        this.props.withdrawFromEvent(this.props.announcement.key);
    }
    
    renderSignupButton() {
        const { isEvent, isUserSignedUp } = this.props.announcement;
        const { isFromUserSignups } = this.props;

        if (!isEvent) {
            return;
        }

        if (isUserSignedUp || isFromUserSignups) {
            return (
                <CardSection>
                    <Button onPress={this.onWithdrawButtonPress.bind(this)}>Withdraw</Button>
                </CardSection>
            );
        }

        return (
            <CardSection>
                <Button onPress={this.onSignupButtonPress.bind(this)}>Sign Up</Button>
            </CardSection>
        );
    }

    render() {
        console.log(this.props.announcement)
        const { url, title, dateTime, venue, description } = this.props.announcement;
        const { 
            titleDetailsStyle,
            imageStyle,
            titleStyle,
            descriptionStyle
        } = styles;
        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Image source={{ uri: url }} style={imageStyle} />
                    </CardSection>

                    <CardSection style={titleDetailsStyle}>
                        <Text style={titleStyle}>{title}</Text>
                        <Text>{dateTime}</Text>
                        <Text>{venue}</Text>
                    </CardSection>

                    {this.renderSignupButton()}

                    <CardSection>
                        <Text style={descriptionStyle}>{description}</Text>
                    </CardSection>
                </Card>
            </ScrollView>
        );
    }
}

const styles = {
    imageStyle: {
        height: 500,
        flex: 1,
        width: null
    },
    titleDetailsStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundCOlor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        borderColor: '#ddd',
        position: 'relative'
    },
    titleStyle: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    descriptionStyle: {
        fontSize: 18
    }
};

export default connect(null, { signupForEvent, withdrawFromEvent })(MainDetail);