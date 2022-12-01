import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";

const DaysDropDown = ({ duration, setDuration }) => {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Duration</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={duration}
        onChange={(event) => {
          setDuration(event.target.value);
        }}
      >
        <MenuItem value={7}>7 days</MenuItem>
        <MenuItem value={14}>14 days</MenuItem>
        <MenuItem value={30}>30 days</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DaysDropDown;
