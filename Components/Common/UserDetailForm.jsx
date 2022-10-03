import React, { useState, useEffect } from "react";

// mrx : material ui
import { Box, Avatar, Container, Grid, Button } from "@material-ui/core";
import useStyles from "../Screens/CreatBusinessAccount/CreatBusinessAccount.style";

const UserDetailForm = ({ placeholder, setState }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container justify="center">
        <input
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
          className={classes.SearchInput}
          type="text"
        />
      </Grid>
    </>
  );
};

export default UserDetailForm;
