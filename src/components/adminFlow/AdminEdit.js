import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { Card, CardSection, Input, Button, ToggleInput, Confirm } from '../common';
import { adminUpdate, adminSaveEdits, adminDelete } from '../../actions';

class AdminEdit extends Component {
    state = { localImgSrc: null, isPopUpVisible: false };

    componentDidMount() {
        const { title, description, isEvent, isActive, url, dateTime, venue } = this.props.announcement;
        this.props.adminUpdate({ prop: 'title', value: title });
        this.props.adminUpdate({ prop: 'description', value: description });
        this.props.adminUpdate({ prop: 'isEvent', value: isEvent });
        this.props.adminUpdate({ prop: 'isActive', value: isActive });
        this.props.adminUpdate({ prop: 'imgSrc', value: null });
        this.props.adminUpdate({ prop: 'url', value: url });
        this.props.adminUpdate({ prop: 'dateTime', value: dateTime });
        this.props.adminUpdate({ prop: 'venue', value: venue });

        if (url) {
            this.setState({ localImgSrc: { uri: url } });
        }
    }

    onSaveButtonPress() {
        const { title, description, isActive, imgSrc, dateTime, venue } = this.props;

        this.props.adminSaveEdits({ title, description, isActive, imgSrc, dateTime, venue });
    }

    onDeleteButtonPress() {
        this.showPopUp();
        
    }

    showPopUp() {
        this.setState({ ...this.state, isPopUpVisible: true });
    }

    onPopUpAccept() {
        this.deleteAnnouncement();
    }

    onPopUpDecline() {
        this.setState({ ...this.state, isPopUpVisible: false });
    }

    deleteAnnouncement() {
        const { title, url } = this.props;
        this.props.adminDelete({ title, url });
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
                const imgSrc = { uri: response.uri };
                this.props.adminUpdate({ prop: 'imgSrc', value: imgSrc });
                this.setState({ localImgSrc: imgSrc });
            }
        });
    }

    onSignupsButtonPress() {
        const { key } = this.props.announcement;
        console.log(key);
        Actions.adminSignupsList({ titleKey: key });
    }

    renderImageSelection() {
        if (this.state.localImgSrc) {
            return (
                <TouchableOpacity 
                    style={styles.buttonStyle} 
                    onPress={this.onImageButtonPress.bind(this)}
                >
                    <Image source={this.state.localImgSrc} style={styles.imageStyle} />
                </TouchableOpacity>
            );
        }
        return (
            <Button onPress={this.onImageButtonPress.bind(this)}>
                Select Image
            </Button>
        );
    }

    renderSignupsButton() {
        if (this.props.isEvent) {
            return (
                <Button onPress={this.onSignupsButtonPress.bind(this)}>
                    Manage Signups
                </Button>
            );
        }
    }
    
    render() {
        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        {this.renderImageSelection()}
                    </CardSection>

                    <CardSection style={styles.titleContainerStyle}>
                        <Text style={styles.titleStyle}>
                            {this.props.title}
                        </Text>
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
                            label='Event is Visible' 
                            value={this.props.isActive}
                            onValueChange={() => {
                                this.props.adminUpdate({ prop: 'isActive', value: !(this.props.isActive) });
                            }}
                        />
                    </CardSection>

                    {this.renderSignupsButton()}

                    <CardSection>
                        <Button onPress={this.onSaveButtonPress.bind(this)}>
                            Save Changes
                        </Button>
                    </CardSection>

                    <CardSection>
                        <Button 
                            buttonStyle={styles.deleteButtonStyle} 
                            textStyle={styles.deleteTextStyle}
                            onPress={this.onDeleteButtonPress.bind(this)}    
                        >
                            Delete
                        </Button>
                    </CardSection>

                    <Confirm
                        visible={this.state.isPopUpVisible}
                        onAccept={this.onPopUpAccept.bind(this)}
                        onDecline={this.onPopUpDecline.bind(this)}
                    >
                        Are you sure you want to delete?
                    </Confirm>


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
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    },
    titleContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    titleStyle: {
        fontSize: 20
    },
    deleteButtonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#d40000',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        marginLeft: 5,
        marginRight: 5
    },
    deleteTextStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
};

const mapStateToProps = (state) => {
    const { title, description, isEvent, isActive, imgSrc, url, dateTime, venue } = state.adminForm;

    return { title, description, isEvent, isActive, imgSrc, url, dateTime, venue };
};

export default connect(mapStateToProps, { adminUpdate, adminSaveEdits, adminDelete })(AdminEdit);