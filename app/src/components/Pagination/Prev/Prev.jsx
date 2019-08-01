import React from 'react';

const Prev = props => {
    return (
        <button disabled={props.currentPage === 1} onClick={() => {
            let value = props.currentPage - 1;
            props.onPageChanged(value);
        }}>Prev</button>
    )
};

export default Prev;