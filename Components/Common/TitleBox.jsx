import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from '../theme';
import { Typography } from "@material-ui/core";

const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const TitleBox = ({title}) => {
  const classes = useStyles();


  return (
    <>
     <Typography variant='h5' className={classes.titleItem} >{title}</Typography>


    </>
  );
};

const useStyles = makeStyles({
  titleItem:{
    fontWeight: '800',
    color: primary,
  }



});

export default TitleBox;
