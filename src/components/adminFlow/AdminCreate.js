import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, ToggleInput } from '../common';
import { adminUpdate, adminCreate } from '../../actions';

class AdminCreate extends Component {
    componentDidMount() {
        this.props.adminUpdate({ prop: 'title', value: '' });
        this.props.adminUpdate({ prop: 'description', value: '' });
        this.props.adminUpdate({ prop: 'isEvent', value: false });
        this.props.adminUpdate({ prop: 'isActive', value: true });
    }

    onButtonPress() {
        const { title, description, isEvent, isActive } = this.props;

        this.props.adminCreate({ title, description, isEvent, isActive });
    }

    render() {
        return (
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
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>

            </Card>
        );
    }
}

export const mapStateToProps = (state) => {
    const { title, description, isEvent, isActive } = state.adminForm;

    return { title, description, isEvent, isActive };
};

export default connect(mapStateToProps, { adminUpdate, adminCreate })(AdminCreate);
