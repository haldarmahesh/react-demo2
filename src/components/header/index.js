import { makeStyles, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import React from "react";
import ConverterTabComponent from "../converter-tab/index";
import HistoryTabComponent from "../history-tab";
import TabPanel from "../tabs-panel";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
const HeaderComponent = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
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
      <TabPanel value={value} index={1}>
        <ConverterTabComponent />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <HistoryTabComponent />
      </TabPanel>
    </Paper>
  );
};

export default HeaderComponent;
