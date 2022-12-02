import { makeStyles, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ConverterTabComponent from "../../components/converter-tab/index";
import HistoryTabComponent from "../../components/history-tab";
import TabPanel from "../../components/tabs-panel";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
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
        <Typography variant="h1subtitle1">h1. Heading</Typography>
        <Tab label="CURRENCY CONVERTER" />
        <Tab label="VIEW CONVERSION HISTORY" />
        <Typography variant="h1subtitle1">Logout</Typography>
      </Tabs>
      <TabPanel value={tabIndex} index={1}>
        <ConverterTabComponent
          initResult={initResult}
          setInitResult={setInitResult}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <HistoryTabComponent
          setInitResult={setInitResult}
          setTabIndex={setTabIndex}
        />
      </TabPanel>
    </Paper>
  );
};

export default DashboardPage;
