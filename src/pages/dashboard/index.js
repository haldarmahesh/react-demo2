import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import ConverterTabComponent from "../../components/converter-tab/index";
import HistoryTabComponent from "../../components/history-tab";
import TabPanel from "../../components/tabs-panel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  containerRoot: {
    backgroundColor: "#e5e5e5",
    minHeight: window.innerHeight,
  },
}));

const DashboardPage = (props) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(1);
  const [initResult, setInitResult] = useState({});
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  return (
    <Paper className={classes.root}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="primary"
        textcolor="primary"
        centered
      >
        <Box style={{ margin: 12 }}>
          <Typography variant="h1subtitle1" display="inline">
            Currency
          </Typography>
          <Typography variant="h1subtitle1" display="inline" color="secondary">
            Exchange
          </Typography>
        </Box>
        <Tab label="CURRENCY CONVERTER" />
        <Tab label="VIEW CONVERSION HISTORY" />
        <Box style={{ margin: 12 }}>
          <Typography variant="h1subtitle1">Logout</Typography>
        </Box>
      </Tabs>
      <TabPanel value={tabIndex} index={1}>
        <Grid container className={classes.containerRoot}>
          <ConverterTabComponent
            initResult={initResult}
            setInitResult={setInitResult}
          />
        </Grid>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <Grid container className={classes.containerRoot}>
          <HistoryTabComponent
            setInitResult={setInitResult}
            setTabIndex={setTabIndex}
          />
        </Grid>
      </TabPanel>
    </Paper>
  );
};

export default DashboardPage;
