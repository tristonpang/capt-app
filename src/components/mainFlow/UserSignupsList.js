import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { userSignupsListFetch } from '../../actions';
import MainListItem from './MainListItem';

class UserSignupsList extends Component {
    componentDidMount() {
        this.props.userSignupsListFetch();
    }

    renderItem(event) {
        return <MainListItem announcement={{ ...event, isFromUserSignups: true }} />;
    }

    render() {
        return (
            <FlatList 
                data={this.props.events}
                renderItem={this.renderItem}
                keyExtractor={event => event.title.toString()}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return { events: state.userSignups.events };
};

export default connect(mapStateToProps, { userSignupsListFetch })(UserSignupsList);
