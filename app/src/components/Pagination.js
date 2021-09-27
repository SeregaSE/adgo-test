import {connect} from "react-redux";



const Pagination = (props) => {
    let pageList = []
    let countPage = Math.ceil(props.pagination.count / props.pagination.limit);

    if(countPage <= 2) {
        for(let i=0; i < countPage; i++) {
            if(i === props.pagination.page) {
                pageList.push({id: i, active: true})
            } else {
                pageList.push({id: i, active: false})
            }
        }
    } else if(countPage > 2) {
        pageList = [
            {id: props.pagination.page - 1, active: false},
            {id: props.pagination.page, active: true},
            {id: props.pagination.page + 1, active: false}
        ]
    }


    return (
        <nav>
            <ul className="pagination float-right mt-10 mb-40">
                <li className="page-item black">
                    <div className="page-link" aria-label="Previous" id="0">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </div>
                </li>
                {pageList.map(item => {
                    return  <li id={item.id} className={`page-item ${item.active? "active": ""}`}><div className="page-link">{item.id + 1}</div></li>
                })}
                {/*<li className="page-item"><div className="page-link">1</div></li>*/}
                {/*<li className="page-item active"><div className="page-link">2</div></li>*/}
                {/*<li className="page-item"><div className="page-link">3</div></li>*/}
                <li className="page-item" id={countPage-1}>
                    <div className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default connect(
    state => ({
        pagination: state.pagination,
    }),
    dispatch => ({
        // onChangeFilterFrom: (data) => {
        //     dispatch(changeFilterFrom(data));
        // },
    })
)(Pagination);


