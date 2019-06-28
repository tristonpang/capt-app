import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import _ from 'lodash';
import { adminListFetch } from '../../actions';
import AdminListItem from './AdminListItem';

class AdminHome extends Component {
    componentDidMount() {
        this.props.adminListFetch();
    }

    renderItem(announcementName) {
        return <AdminListItem announcementName={announcementName} />
    }

    render() {
        return (
            <FlatList 
                data={this.props.announcements}
                renderItem={this.renderItem}
                keyExtractor={announcementName => announcementName.toString()}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const announcements = _.map(state.adminAnnouncements, 
        (val, announcementKey) => announcementKey);
    return { announcements };
};

export default connect(mapStateToProps, { adminListFetch })(AdminHome);
