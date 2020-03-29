import './index.css';

const Pagination = ({ data, limit, offset, setOffset }) => {
    const [active, setActive] = useState(-1);
    const pageNum = Math.ceil(data.count/limit)
    const pages = []
    for (let i = 1; i <= pageNum; i++) {
        pages.push(i);
    }

    const handlePage = (num, e) =>{ 
        if (num >= 0 && pages.includes(num+1)) {
            setOffset(num)
            setActive(num+1)
        }
        
    }

    return(
        <div className='pagination'>
            <span className='page' onClick={(e) => handlePage((offset - 1), e)}> left </span>
                {pages.map((page)=><span className={`page ${active == page ? 'active' : ''}`} key={page} onClick={() => handlePage(page-1)}>{page}</span>)}
            <span className='page' onClick={() => handlePage(offset + 1)}> right </span>
        </div>
    )
}