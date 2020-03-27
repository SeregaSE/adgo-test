import React from 'react'

import {Pagination, Icon} from 'react-materialize'

class elemPagination extends React.Component {

    render() {
        const {activePage, items, maxButtons} = this.props.paginate
        if(items < 2) {
            return null
        } else {
            return (
                <Pagination
                onSelect={this.props.onClick}
                activePage={activePage}
                items={items}
                leftBtn={<Icon>chevron_left</Icon>}
                maxButtons={maxButtons}
                rightBtn={<Icon>chevron_right</Icon>}
                  />
            )
        }
       
    }
}

export default elemPagination