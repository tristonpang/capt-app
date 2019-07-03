import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { Card, CardSection, Input, Button, ToggleInput } from '../common';
import { adminUpdate, adminPictureFetch } from '../../actions';

class AdminEdit extends Component {
    componentDidMount() {
        const { title, description, isEvent, isActive, url } = this.props.announcement;
        this.props.adminUpdate({ prop: 'title', value: title });
        this.props.adminUpdate({ prop: 'description', value: description });
        this.props.adminUpdate({ prop: 'isEvent', value: isEvent });
        this.props.adminUpdate({ prop: 'isActive', value: isActive });
        this.props.adminUpdate({ prop: 'url', value: url });
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
                const data = 'data:image/jpeg;base64,' + response.data;
                this.props.adminUpdate({ prop: 'imgSrc', value: { uri: data } });
            }
        });
    }

    renderImageSelection() {
        if (this.props.url) {
            console.log('Existing Pic URL: ', this.props.url);
            return (
                <TouchableOpacity 
                    style={styles.buttonStyle} 
                    onPress={this.onImageButtonPress.bind(this)}
                >
                    <Image source={{ uri: this.props.url }} style={styles.imageStyle} />
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
                        {this.renderImageSelection()}
                    </CardSection>

                    <CardSection style={styles.titleContainerStyle}>
                        <Text style={styles.titleStyle}>
                            {this.props.title}
                        </Text>
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
    }
};

const mapStateToProps = (state) => {
    const { title, description, isEvent, isActive, url } = state.adminForm;

    return { title, description, isEvent, isActive, url };
};

export default connect(mapStateToProps, { adminUpdate, adminPictureFetch })(AdminEdit);