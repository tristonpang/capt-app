import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button } from '../common';
import { adminUpdate, adminCreate } from '../../actions';

class AdminCreate extends Component {
    componentDidMount() {
        this.props.adminUpdate({ prop: 'title', value: '' });
        this.props.adminUpdate({ prop: 'description', value: '' });
    }

    onButtonPress() {
        const { title, description } = this.props;

        this.props.adminCreate({ title, description });
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
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>

            </Card>
        );
    }
}

export const mapStateToProps = (state) => {
    const { title, description } = state.adminForm;

    return { title, description };
};

export default connect(mapStateToProps, { adminUpdate, adminCreate })(AdminCreate);
