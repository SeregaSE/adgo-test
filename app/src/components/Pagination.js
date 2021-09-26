
const Pagination = () => {
    return (
        <nav>
            <ul className="pagination float-right mt-10 mb-40">
                <li className="page-item black">
                    <div className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </div>
                </li>
                <li className="page-item"><div className="page-link">1</div></li>
                <li className="page-item active"><div className="page-link">2</div></li>
                <li className="page-item"><div className="page-link">3</div></li>
                <li className="page-item">
                    <div className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;