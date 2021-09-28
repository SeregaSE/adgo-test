import {connect} from "react-redux";
import {ajaxGetNewData} from "../actions/ajax";


const Pagination = (props) => {
    let pageList = []
    let countPage = Math.ceil(props.pagination.count / props.pagination.limit);

    if(countPage <= 3) {
        for(let i=0; i < countPage; i++) {
            if(i === props.pagination.page) {
                pageList.push({id: i, active: true})
            } else {
                pageList.push({id: i, active: false})
            }
        }
    } else if(countPage > 3) {
        if(props.pagination.page === 0) {
            pageList = [
                {id: props.pagination.page, active: true},
                {id: props.pagination.page + 1, active: false},
                {id: props.pagination.page + 2, active: false}
            ]
        } else if(props.pagination.page + 1 === countPage) {
            pageList = [
                {id: props.pagination.page - 2, active: false},
                {id: props.pagination.page - 1, active: false},
                {id: props.pagination.page, active: true}
            ]
        } else {
            pageList = [
                {id: props.pagination.page - 1, active: false},
                {id: props.pagination.page, active: true},
                {id: props.pagination.page + 1, active: false}
            ]
        }

    }


    const turnPage = (e) => {
        if(e.currentTarget.id !== props.pagination.page) {
            props.onAjaxGetNewData(e.currentTarget.id)
        }
    }

    return (
        <nav>
            <ul className="pagination float-right mt-10 mb-40">
                <li className="page-item black" id="0" onClick={turnPage}>
                    <div className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </div>
                </li>
                {pageList.map(item => {
                    return  <li
                        key={item.id}
                        id={item.id}
                        className={`page-item ${item.active? "active": ""}`}
                        onClick={turnPage}
                    >
                        <div className="page-link">{item.id + 1}</div></li>
                })}
                <li className="page-item" id={countPage-1} onClick={turnPage}>
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
        onAjaxGetNewData: (data) => {
            dispatch(ajaxGetNewData(data));
        },
    })
)(Pagination);


