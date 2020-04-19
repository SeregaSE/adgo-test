import React from 'react';
import { TableBody, TableCell, TableRow } from '@material-ui/core';

const DataTableBody = ({ statistics }) => {
    return (
        <TableBody>
            {statistics.length
                ? statistics.map(
                      ({ clicks, impressions, money, ...rest }, i) => (
                          <TableRow key={i}>
                              <TableCell component="th" scope="row">
                                  {Object.values(rest)[0]}
                              </TableCell>
                              <TableCell align="right">{impressions}</TableCell>
                              <TableCell align="right">{clicks}</TableCell>
                              <TableCell align="right">
                                  {money.toFixed(4)}
                              </TableCell>
                          </TableRow>
                      )
                  )
                : null}
        </TableBody>
    );
};

export default DataTableBody;
