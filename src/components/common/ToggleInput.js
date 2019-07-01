import React from 'react';
import { View, Text, Switch } from 'react-native';

const ToggleInput = ({ label, value, onValueChange }) => {
    const { containerStyle, labelStyle } = styles;
    
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <Switch
                value={value}
                onValueChange={onValueChange}
            />
        </View>
    );
};

const styles = {
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    }
};

export { ToggleInput };