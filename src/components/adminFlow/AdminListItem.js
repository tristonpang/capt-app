import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';


class AdminListItem extends Component {

    render() {
        console.log(this.props.announcementName);
        return (
            <View>
                <CardSection>
                    <Text style={styles.titleStyle}>
                        {this.props.announcementName.item}
                    </Text>
                </CardSection>
            </View>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

export default AdminListItem;