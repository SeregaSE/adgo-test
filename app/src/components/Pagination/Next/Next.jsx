import React from 'react';

const Next = props => {

    return (
        <button disabled={props.currentPage === props.lastEl} onClick={() => {
            let value = props.currentPage + 1;
            props.onPageChanged(value);
        }}>Next</button>
    )
};

export default Next;