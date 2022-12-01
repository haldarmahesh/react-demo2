import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
const HistoricalTable = ({ data, to }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Exchange Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            Object.keys(data).map((date) => (
              <TableRow key={date[date]}>
                <TableCell component="th" scope="row">
                  {date}
                </TableCell>
                <TableCell align="right">{data[date][to]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoricalTable;
