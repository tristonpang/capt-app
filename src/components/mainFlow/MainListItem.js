import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from '../common';

class MainListItem extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <Text>Event Image Here</Text>
                </CardSection>

                <CardSection>
                    <Text style={styles.titleStyle}>
                        {this.props.announcement.item.title}
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

export default MainListItem;
