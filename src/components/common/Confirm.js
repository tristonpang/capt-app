import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, onAccept, onDecline, visible }) => {
    const { containerStyle, textStyle, cardSectionStyle } = styles;
    
    return (
        <Modal
            visible={visible}
            animationType='slide'
            onRequestClose={() => {}} //android requires this prop to be filled even if no action is needed
            transparent
        >
            <View style={containerStyle}>
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>{children}</Text>
                </CardSection>

                <CardSection>
                    <Button onPress={onAccept}>Yes</Button>
                    <Button onPress={onDecline}>No</Button>
                </CardSection>
            </View>
        </Modal>
    );
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center',
        height: 150
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
        color: '#000'
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        postition: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
}

export { Confirm };
