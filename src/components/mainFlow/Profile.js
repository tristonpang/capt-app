import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import QRCode from 'react-native-qrcode';
import { Card, CardSection, Button } from '../common';
import { prepareProfileData } from '../../actions';

class Profile extends Component {
    componentDidMount() {
        this.props.prepareProfileData();
    }

    onSignupsButtonPress() {
        Actions.userSignupsList();
    }

    render() {
        const { 
            containerStyle, 
            labelTextStyle, 
            idTextStyle 
        } = styles;

        return (
            <Card>
                <CardSection style={containerStyle}>
                    <QRCode
                        value={this.props.qrCode}
                        size={200}
                        bgColor='purple'
                        fgColor='white'
                    />
                </CardSection>
                
                <CardSection style={containerStyle}>
                    <Text style={labelTextStyle}>Room ID</Text>
                    <Text style={idTextStyle}>{this.props.roomId}</Text>
                </CardSection>
                
                <CardSection>
                    <Button onPress={this.onSignupsButtonPress.bind(this)}>Manage my Signed Up Events</Button>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderColor: '#ddd',
        position: 'relative'
    },
    labelTextStyle: {
        fontSize: 16
    },
    idTextStyle: {
        fontSize: 28,
        fontWeight: 'bold'
    }
};

const mapStateToProps = (state) => {
    const { roomId, qrCode } = state.profile;

    return { roomId, qrCode };
};

export default connect(mapStateToProps, { prepareProfileData })(Profile);
