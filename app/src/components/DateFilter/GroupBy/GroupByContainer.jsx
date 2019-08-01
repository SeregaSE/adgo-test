import React from 'react';
import GroupBy from "./GroupBy";
import {connect} from "react-redux";
import {getGroups, setCurrentGroup} from "../../../redux/groupsReducer";

class GroupByContainer extends React.Component {
    componentDidMount() {
        this.props.getGroups();
    }

    render() {
        return <GroupBy {...this.props} />
    }
}

let mapStateToProps = state => {
    return {
        groups: state.groups.groups,
        currentGroup: state.groups.currentGroup
    }
};

export default connect(mapStateToProps, {getGroups, setCurrentGroup})(GroupByContainer);