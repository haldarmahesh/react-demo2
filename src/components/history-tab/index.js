import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { storageService } from "../../services/storage.service";

const HistoryTabComponent = () => {
  const [allHistory, setAllHistory] = useState([]);
  const [hoveringOver, setHoveringOver] = useState("");
  const handleRowHover = (event, propsData) =>
    setHoveringOver((date) => propsData);
  const handleRowHoverLeave = (event, propsData) => setHoveringOver("");
  useEffect(() => {
    setAllHistory(storageService.getAll());
  }, []);
  function deleteHandler(rowId) {
    storageService.removeItem(rowId);
    setAllHistory((currentList) =>
      currentList.filter(([key]) => key !== rowId)
    );
  }
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allHistory &&
                  allHistory.map(([dateTime, resString]) => {
                    const result = JSON.parse(resString);
                    return (
                      <TableRow
                        onMouseEnter={(event) =>
                          handleRowHover(event, dateTime)
                        }
                        onMouseLeave={(event) => handleRowHoverLeave(event)}
                        key={dateTime}
                      >
                        <TableCell component="th" scope="row">
                          {dateTime.split(", ").join(" @ ")}
                        </TableCell>
                        <TableCell>
                          Converted an amount of {result.amount} from{" "}
                          {result.from} to {result.to}
                        </TableCell>
                        <TableCell>
                          <div
                            style={{
                              visibility:
                                hoveringOver && hoveringOver === dateTime
                                  ? "visible"
                                  : "hidden",
                            }}
                          >
                            <Grid container direction="row">
                              <Grid item xs>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  startIcon={<VisibilityIcon />}
                                >
                                  View
                                </Button>
                              </Grid>
                              <Grid item xs>
                                <Button
                                  variant="contained"
                                  onClick={() => deleteHandler(dateTime)}
                                  color="secondary"
                                  startIcon={<DeleteIcon />}
                                >
                                  Delete from history
                                </Button>
                              </Grid>
                            </Grid>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HistoryTabComponent;
