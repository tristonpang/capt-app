import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { buzzListFetch } from '../../actions';
import MainListItem from './MainListItem';

class Buzz extends Component {
    componentDidMount() {
        this.props.buzzListFetch();
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
    const { announcements } = state.buzz;
    
    return { announcements };
};

export default connect(mapStateToProps, { 
    buzzListFetch
})(Buzz);
