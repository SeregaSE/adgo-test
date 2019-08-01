import React from 'react';
import Pagination from "./Pagination";
import {connect} from "react-redux";
import {setCurrentPage, setOffset} from "../../redux/dataReducer";

class PaginationContainer extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.from !== this.props.from
        || prevProps.to !== this.props.to
        || prevProps.platform !== this.props.platform
        || prevProps.OS !== this.props.OS
        || prevProps.browser !== this.props.browser
        || prevProps.group !== this.props.group) {
            this.props.setCurrentPage(1);
            this.props.setOffset(0);
        }
    }

    onPageChanged = page => {
        this.props.setCurrentPage(page);
        this.props.setOffset(--page);
    };

    render() {
        return <Pagination {...this.props} onPageChanged={this.onPageChanged} />
    }
}

const mapStateToProps = state => {
    return {
        total: state.data.count,
        pageSize: state.data.pageSize,
        offset: state.data.offset,
        currentPage: state.data.currentPage,
        from: state.date.from,
        to: state.date.to,
        group: state.groups.currentGroup,
        platform: state.platforms.currentPlatform,
        OS: state.operatingSystems.currentSystem,
        browser: state.browsers.currentBrowser
    }
};

export default connect(mapStateToProps, {setCurrentPage, setOffset})(PaginationContainer);