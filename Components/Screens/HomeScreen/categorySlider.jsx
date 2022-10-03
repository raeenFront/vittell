import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";



const textColor = '#888';



const CatHome = ({title}) => {
    const classes = useStyles();
  
  
    return (
      <>
       <Button  className={classes.styleItem} >عنوان 1 </Button >
       <Button  className={classes.styleItem} >عنوان 2</Button >
       <Button  className={classes.styleItem} >عنوان 3</Button >
       <Button  className={classes.styleItem} >عنوان 4</Button >

  
      </>
    );
  };
  
  const useStyles = makeStyles({
    styleItem:{
      color: textColor,
      backgroundColor: '#fff',
      borderRadius: '10px',
      marginTop:'2rem',
      marginLeft: '1rem'
    }
  
  
  
  });

export default CatHome;
