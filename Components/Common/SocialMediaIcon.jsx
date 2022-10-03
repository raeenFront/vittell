import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../theme";
import { Box } from "@material-ui/core";

const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const SocialMediaIcon = ({ Icon, backgroundColor, social }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      style={{
        backgroundColor: social !== true ? backgroundColor || primary : "",
      }}
      alignItems="center"
      justifyContent="center"
      className={classes.socialIconBox}
    >
      {Icon}
    </Box>
  );
};

const useStyles = makeStyles({
  socialIconBox: {
    borderRadius: "50%",
    width: "5rem",
    height: "5rem",
    margin: "0 .5rem",
    padding: ".2rem",
    "& svg": {
      color: '#fff',
      fontSize: "3.5rem"
    }
  }
});

export default SocialMediaIcon;
