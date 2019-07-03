import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';


class AdminListItem extends Component {
    onItemPress() {
        Actions.adminEdit({ announcement: this.props.announcement.item });
    }

    render() {
        //console.log(this.props.announcement);
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.onItemPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.titleStyle}>
                            {this.props.announcement.item.title}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
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
