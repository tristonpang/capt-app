import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from '../common';

class MainListItem extends Component {
    render() {
        const { title, url, dateTime, venue } = this.props.announcement.item;
        const { 
            imageStyle, 
            titleStyle, 
            titleContainerStyle, 
            detailsContainerStyle, 
            detailsTextStyle 
        } = styles;

        return (
            <Card>
                <CardSection>
                    <Image source={{ uri: url }} style={imageStyle} />
                </CardSection>

                <CardSection>
                    <View style={titleContainerStyle}>
                        <Text style={titleStyle}>{title}</Text>
                    </View>
                    <View style={detailsContainerStyle}>
                        <Text style={detailsTextStyle}>{dateTime}</Text>
                        <Text style={detailsTextStyle}>{venue}</Text>
                    </View>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    titleContainerStyle: {
        justifyContent: 'center'
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    imageStyle: {
        height: 250,
        flex: 1,
        width: null
    },
    detailsContainerStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingRight: 10,
        paddingBottom: 5
    },
    detailsTextStyle: {
        textAlign: 'right'
    }
};

export default MainListItem;
