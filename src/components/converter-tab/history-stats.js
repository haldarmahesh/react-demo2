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
function getStats(history, to) {
  let [lowest, highest, average] = [Math.min(), Math.max(), 0];
  // for (const rate of history) {
  history &&
    Object.keys(history).forEach((date, index) => {
      if (history[date][to] > highest) {
        console.log("R", history[date][to], highest);
        highest = history[date][to];
      }
      if (history[date][to] < lowest) {
        lowest = history[date][to];
      }
      average = average + history[date][to];
    });
  average = average / Object.keys(history).length;
  // }
  return [lowest, highest, average];
}
const HistoryStats = ({ history, to }) => {
  if (!history) {
    return null;
  }
  const [lowest, highest, average] = getStats(history, to);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Statistics</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Lowest
            </TableCell>
            <TableCell align="right">{lowest}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Highest
            </TableCell>
            <TableCell align="right">{highest}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Average
            </TableCell>
            <TableCell align="right">{average}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryStats;
