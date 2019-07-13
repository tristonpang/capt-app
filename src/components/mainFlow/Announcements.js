import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { announcementsListFetch } from '../../actions';
import MainListItem from './MainListItem';

class Announcements extends Component {
    componentDidMount() {
        this.props.announcementsListFetch();
    }

    renderItem(announcement) {
        return (
            <MainListItem 
                announcement={announcement}
            />
        );
    }

    render() {
        return (
            <FlatList 
                data={this.props.announcements}
                renderItem={this.renderItem}
                keyExtractor={announcement => announcement.title.toString()}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { announcements } = state.mainAnnouncements;
    
    return { announcements };
};

export default connect(mapStateToProps, { 
    announcementsListFetch
})(Announcements);
