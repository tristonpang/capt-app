import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Input, Card, CardSection, Button } from '../common';
import { bookingFormUpdate, bookingFormReset } from '../../actions';
import {
    THEME_ROOMS,
    MPSH,
    FLYING_SEED,
    SEMINAR_ROOMS
} from '../../actions/types';
import BookingThemeRoomsFields from './BookingThemeRoomsFields';
import BookingMPSHFields from './BookingMPSHFields';
import BookingFlyingSeedFields from './BookingFlyingSeedFields';
import BookingSeminarRoomsFields from './BookingSeminarRoomsFields';

const START_DATETIME = 'start';
const END_DATETIME = 'end';

class BookingForm extends Component {
    state = {
        isStartDateTimePickerVisible: false,
        isEndDateTimePickerVisible: false
    };

    componentDidMount() {
        this.props.bookingFormReset();
    }

    renderDateTimeButton(dateTimeType) {
        if (this.props.startDateTime && dateTimeType === START_DATETIME) {
            return (
                <Button onPress={this.renderDateTimePicker(dateTimeType).bind(this)}>
                    {this.props.startDateTime}
                </Button>
            );
        }
        if (this.props.endDateTime && dateTimeType === END_DATETIME) {
            return <Button onPress={this.renderDateTimePicker(dateTimeType).bind(this)}>{this.props.endDateTime}</Button>;
        }
        return <Button onPress={this.renderDateTimePicker(dateTimeType).bind(this)}>{`Set ${dateTimeType} date/time`}</Button>;
    }

    renderDateTimePicker(dateTimeType) {
        return () => {
            if (dateTimeType === START_DATETIME) {
                this.setState({ isStartDateTimePickerVisible: true });
            } else if (dateTimeType === END_DATETIME) {
                this.setState({ isEndDateTimePickerVisible: true });
            }
        };
    }

    handleStartDateTimePicked(dateTime) {
        this.props.bookingFormUpdate({ prop: 'startDateTime', value: dateTime.toString() });
        this.setState({ isStartDateTimePickerVisible: false });
    }

    handleEndDateTimePicked(dateTime) {
        this.props.bookingFormUpdate({ prop: 'endDateTime', value: dateTime.toString() });
        this.setState({ isEndDateTimePickerVisible: false });
    }

    hideStartDateTimePicker() {
        this.setState({ isStartDateTimePickerVisible: false });
    }

    hideEndDateTimePicker() {
        this.setState({ isEndDateTimePickerVisible: false });
    }

    renderSpecificFields() {
        const { bookingType } = this.props;
        if (bookingType === THEME_ROOMS) {
            return <BookingThemeRoomsFields />;
        } else if (bookingType === MPSH) {
            return <BookingMPSHFields />;
        } else if (bookingType === FLYING_SEED) {
            return <BookingFlyingSeedFields />;
        } else if (bookingType === SEMINAR_ROOMS) {
            return <BookingSeminarRoomsFields />;
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='Name'
                        placeholder='John Doe'
                        onChangeText={text => 
                            this.props.bookingFormUpdate({ 
                                prop: 'name', 
                                value: text 
                            })}
                        value={this.props.name}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label='Phone Number'
                        placeholder='9876 1234'
                        onChangeText={text => 
                            this.props.bookingFormUpdate({ 
                                prop: 'phone', 
                                value: text 
                            })}
                        value={this.props.phone}
                    />
                </CardSection>
                <CardSection>
                    {this.renderDateTimeButton(START_DATETIME)}
                    <DateTimePicker 
                        isVisible={this.state.isStartDateTimePickerVisible}
                        onConfirm={this.handleStartDateTimePicked.bind(this)}
                        onCancel={this.hideStartDateTimePicker.bind(this)}
                        mode='datetime'
                    />
                </CardSection>
                <CardSection>
                    {this.renderDateTimeButton(END_DATETIME)}
                    <DateTimePicker 
                        isVisible={this.state.isEndDateTimePickerVisible}
                        onConfirm={this.handleEndDateTimePicked.bind(this)}
                        onCancel={this.hideEndDateTimePicker.bind(this)}
                        mode='datetime'
                    />
                </CardSection>
                
                {this.renderSpecificFields()}

                <CardSection>
                    <Input
                        label='Description of Activities'
                        placeholder='description'
                        onChangeText={text => 
                            this.props.bookingFormUpdate({ 
                                prop: 'description', 
                                value: text 
                            })}
                        value={this.props.description}
                    />
                </CardSection>

                <CardSection>
                    <Button>
                        Send Booking Request
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { 
        name, 
        phone, 
        description,
        startDateTime, 
        endDateTime 
    } = state.bookingForm;

    return { 
        name, 
        phone, 
        description,  
        startDateTime, 
        endDateTime 
    };
};

export default connect(mapStateToProps, { bookingFormUpdate, bookingFormReset })(BookingForm);
