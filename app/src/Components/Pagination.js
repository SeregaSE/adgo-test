import React from 'react';

const Pagination = ({count, limit, setOffset, offset}) => {

    let pages = Math.ceil(count / limit);
    let pageList = []
    for (let i = 0; i < pages; i++){
        pageList.push(i);
    }
    const prevPage = () => {
        if(offset !== 1){
            setOffset(offset - 1)
        }
    }
    const nextPage = () => {
        if(offset !== pages-1){
            setOffset(offset + 1)
        }
    }
    const changePage = (e) => {
        setOffset(e.target.value)
    }
    return (
        <div className="pagination">
            <ul>
                <li onClick={prevPage}>Prev</li>
                {pageList.map(item => {
                    return <li key={item} value={item} onClick={changePage}>{item+1}</li>
                })}
                <li onClick={nextPage}>Next</li>
            </ul>
        </div>
    );
};

export default Pagination;