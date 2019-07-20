import React, { Component } from 'react';
import { View, Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input } from '../common';
import { bookingFormUpdate } from '../../actions';

class BookingMPSHFields extends Component {
    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label='Matric Number'
                        placeholder='A1234567X'
                        onChangeText={text => 
                            this.props.bookingFormUpdate({ 
                                prop: 'matric',
                                value: text 
                            })}
                        value={this.props.matric}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label='Number of CAPTains'
                        placeholder='0'
                        onChangeText={text => 
                            this.props.bookingFormUpdate({ 
                                prop: 'mpshNumberOfCaptains',
                                value: text 
                            })}
                        value={this.props.mpshNumberOfCaptains}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label='Number of non-CAPTains'
                        placeholder='0'
                        onChangeText={text => 
                            this.props.bookingFormUpdate({ 
                                prop: 'mpshNumberOfNonCaptains',
                                value: text 
                            })}
                        value={this.props.mpshNumberOfNonCaptains}
                    />
                </CardSection>
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={styles.pickerLabelStyle}>Courts Needed</Text>
                    <Picker
                        selectedValue={this.props.trNumber}
                        onValueChange={court => 
                            this.props.bookingFormUpdate({ prop: 'mpshCourtsNeeded', value: court })}
                    >
                        <Picker.Item label='A' value='A' />
                        <Picker.Item label='B' value='B' />
                        <Picker.Item label='Both' value='Both' />
                    </Picker>
                </CardSection>
                <CardSection>
                    <Input
                        label='Sports Equipment Required'
                        placeholder='NA if none'
                        onChangeText={text => 
                            this.props.bookingFormUpdate({ 
                                prop: 'mpshEquipmentRequired',
                                value: text 
                            })}
                        value={this.props.mpshEquipmentRequired}
                    />
                </CardSection>
            </View>
        );
    }
}

const styles = {
    pickerLabelStyle: {
        fontSize: 18,
        paddingLeft: 20
    }
};

const mapStateToProps = (state) => {
    const { 
        matric, 
        mpshNumberOfCaptains, 
        mpshNumberOfNonCaptains, 
        mpshCourtsNeeded,
        mpshEquipmentRequired 
    } = state.bookingForm;

    return { 
        matric, 
        mpshNumberOfCaptains, 
        mpshNumberOfNonCaptains,
        mpshCourtsNeeded,
        mpshEquipmentRequired
    };
};

export default connect(mapStateToProps, { bookingFormUpdate })(BookingMPSHFields);
