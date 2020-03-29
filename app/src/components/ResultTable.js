import React, {useEffect, useState, Fragment} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import './index.css';

const Pagination = ({ data, limit, offset, setOffset, isReceived, setLimit }) => {
    const [active, setActive] = useState(1);

    const pageNum = Math.ceil(data.count/limit)
    const pages = []
    for (let i = 1; i <= pageNum; i++) {
        pages.push(i);
    }

    const handlePage = (num, e) =>{ 
        if (num >= 0 && pages.includes(num+1) && isReceived) {
            setOffset(num)
            setActive(num+1)

        }   
    }
    const handleCount = (e) =>{
        setActive(1)
        setOffset(0);
        setLimit(e.target.value)
    }

    return(
        <div className={`pagination ${!isReceived ? 'hide' : ''}`}>
            <span className='page' onClick={(e) => handlePage((offset - 1), e)}> left </span>
                {pages.map((page)=><span className={`page ${active == page ? 'active' : ''}`} key={page} onClick={() => handlePage(page-1)}>{page}</span>)}
            <span className='page' onClick={() => handlePage(offset + 1)}> right </span>

            <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Page</FormLabel>
                {console.log(limit)}
                <RadioGroup aria-label="page_num" name="page_num" value={limit} defaultValue="25" onChange={(e) => handleCount(e)}>
                    <FormControlLabel value='10' control={<Radio />} label="10" />
                    <FormControlLabel  value="25" control={<Radio />} label="25" />
                </RadioGroup>
            </FormControl>
            </div> 
        </div>
    )
}

function ResultTable({data, group, limit, setLimit, offset, setOffset, isReceived}) {
    const headers = isReceived ? Object.keys(data.rows[0]) : 0;
    return(
        <Fragment>
            <TableContainer component={Paper}>
                <Table  size="small" aria-label="a dense table">
                    <TableHead>
                        {
                        isReceived ? 
                        (<TableRow>
                            {headers.map((item, index) =>
                            index == 0 ? 
                                <TableCell key={index} align="left">{item}</TableCell> 
                            :
                                <TableCell key={index} align="right">{item}</TableCell>
                            )}
                        </TableRow>)    
                        :
                        (<TableRow>
                            <TableCell align="left">day</TableCell>
                            <TableCell align="right">impressions</TableCell>
                            <TableCell align="right">clicks</TableCell>
                            <TableCell align="right">money</TableCell> 
                        </TableRow>)    
                        }
                        
                    </TableHead>

                    <TableBody>
                        {
                        isReceived ? 
                        (<Fragment>
                        {
                        data.rows.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {item[group]}
                                </TableCell>
                                <TableCell align="right">{item.impressions}</TableCell>
                                <TableCell align="right">{item.clicks}</TableCell>
                                <TableCell align="right">{item.money}</TableCell>
                            </TableRow>
                        ))
                        }
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <b>Total</b>
                            </TableCell>
                            <TableCell align="right"><b>{data.total.impressions}</b></TableCell>
                            <TableCell align="right"><b>{data.total.clicks}</b></TableCell>
                            <TableCell align="right"><b>{data.total.money}</b></TableCell>
                        </TableRow>
                        </Fragment>)
                        :
                            <TableRow>
                                <TableCell component="th" scope="row">01.01.2020</TableCell>
                                <TableCell align="right">XX</TableCell>
                                <TableCell align="right">XX</TableCell>
                                <TableCell align="right">$$</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {!isReceived && ( <span className="error">Записей не обнаружено!</span>)}     
            <Pagination data={data} limit={limit} setLimit={setLimit} offset={offset} setOffset={setOffset} isReceived={isReceived}/>
        </Fragment>
    )
}

export default ResultTable;