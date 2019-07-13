import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CardSection } from '../common';


class AdminSignupsListItem extends Component {
    render() {
        //console.log(this.props.announcement);
        return (
            <View>
                <CardSection>
                    <Text style={styles.userIdStyle}>
                        {this.props.user.item}
                    </Text>
                </CardSection>
            </View>
        );
    }
}

const styles = {
    userIdStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

export default AdminSignupsListItem;
