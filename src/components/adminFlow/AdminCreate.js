import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { Card, CardSection, Input, Button, ToggleInput } from '../common';
import { adminUpdate, adminCreate } from '../../actions';

class AdminCreate extends Component {
    componentDidMount() {
        //reset form to empty
        // TODO: refactor into single action call
        this.props.adminUpdate({ prop: 'title', value: '' });
        this.props.adminUpdate({ prop: 'description', value: '' });
        this.props.adminUpdate({ prop: 'isEvent', value: false });
        this.props.adminUpdate({ prop: 'isActive', value: true });
        this.props.adminUpdate({ prop: 'imgSrc', value: null }); // empty object {} is not falsy, we have to set to null for form to be empty
        this.props.adminUpdate({ prop: 'dateTime', value: '' });
        this.props.adminUpdate({ prop: 'venue', value: '' });
        this.props.adminUpdate({ prop: 'isBuzz', value: false });
    }

    onButtonPress() {
        const { title, description, isEvent, isActive, imgSrc, dateTime, venue, isBuzz } = this.props;

        this.props.adminCreate({ title, description, isEvent, isActive, imgSrc, dateTime, venue, isBuzz });
    }

    onImageButtonPress() {
        const options = {
            title: 'Select Picture',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response: ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.props.adminUpdate({ prop: 'imgSrc', value: { uri: response.uri } });
            }
        });
    }

    renderImageSelection() {
        if (this.props.imgSrc) {
            console.log('URI: ', this.props.imgSrc);
            return (
                <TouchableOpacity 
                    style={styles.buttonStyle} 
                    onPress={this.onImageButtonPress.bind(this)}
                >
                    <Image source={this.props.imgSrc} style={styles.imageStyle} />
                </TouchableOpacity>
            );
        }
        return (
            <Button onPress={this.onImageButtonPress.bind(this)}>
                Select Image
            </Button>
        );
    }

    render() {
        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Input 
                            label='Title'
                            value={this.props.title}
                            onChangeText={text => this.props.adminUpdate({ prop: 'title', value: text })}
                        />
                    </CardSection>

                    <CardSection>
                        <Input 
                            label='Date/Time'
                            value={this.props.dateTime}
                            onChangeText={text => this.props.adminUpdate({ prop: 'dateTime', value: text })}
                        />
                    </CardSection>
                    
                    <CardSection>
                        <Input 
                            label='Venue'
                            value={this.props.venue}
                            onChangeText={text => this.props.adminUpdate({ prop: 'venue', value: text })}
                        />
                    </CardSection>

                    <CardSection>
                        <Input 
                            label='Description'
                            value={this.props.description}
                            onChangeText={text => this.props.adminUpdate({ prop: 'description', value: text })}
                        />
                    </CardSection>

                    <CardSection>
                        <ToggleInput
                            label='Allow Event Signups' 
                            value={this.props.isEvent}
                            onValueChange={() => {
                                this.props.adminUpdate({ prop: 'isEvent', value: !(this.props.isEvent) });
                            }}
                        />
                    </CardSection>

                    <CardSection>
                        <ToggleInput
                            label='Event is Visible' 
                            value={this.props.isActive}
                            onValueChange={() => {
                                this.props.adminUpdate({ prop: 'isActive', value: !(this.props.isActive) });
                            }}
                        />
                    </CardSection>
                    
                    <CardSection>
                        <ToggleInput
                            label='Buzz Article' 
                            value={this.props.isBuzz}
                            onValueChange={() => {
                                this.props.adminUpdate({ prop: 'isBuzz', value: !(this.props.isBuzz) });
                            }}
                        />
                    </CardSection>

                    <CardSection>
                        {this.renderImageSelection()}
                    </CardSection>

                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Create
                        </Button>
                    </CardSection>

                </Card>
            </ScrollView>
        );
    }
}

const styles = {
    imageStyle: {
        height: 400,
        flex: 1,
        width: null
    }, //setting image to fill up entire width of screen
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
};

export const mapStateToProps = (state) => {
    const { title, description, isEvent, isActive, imgSrc, dateTime, venue, isBuzz } = state.adminForm;

    return { title, description, isEvent, isActive, imgSrc, dateTime, venue, isBuzz };
};

export default connect(mapStateToProps, { adminUpdate, adminCreate })(AdminCreate);
