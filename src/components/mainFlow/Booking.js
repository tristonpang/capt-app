import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from '../common';

class Booking extends Component {
    render() {
        const { titleStyle, titleContainerStyle } = styles;
        return (
            <ScrollView>
                <TouchableOpacity onPress={() => Actions.bookingForm()}>
                    <Card>
                        <CardSection style={titleContainerStyle}>
                            <Text style={titleStyle}>Theme Rooms</Text>
                        </CardSection>
                    </Card>
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <Card>
                        <CardSection style={titleContainerStyle}>
                            <Text style={titleStyle}>Multi-Purpose Sports Hall</Text>
                        </CardSection>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Card>
                        <CardSection style={titleContainerStyle}>
                            <Text style={titleStyle}>Flying Seed</Text>
                        </CardSection>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Card>
                        <CardSection style={titleContainerStyle}>
                            <Text style={titleStyle}>Seminar Rooms</Text>
                        </CardSection>
                    </Card>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    titleContainerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export default Booking;