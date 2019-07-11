import React, { Component } from 'react';
import { ScrollView, Image, Text } from 'react-native';
import { Card, CardSection } from '../common';

class MainDetail extends Component {
    render() {
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

export default MainDetail;