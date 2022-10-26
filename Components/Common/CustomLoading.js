import React, { useState } from "react";
// import Image from "next/image";


// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";

import Loading from '../../public/icons/loading.svg';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    loading_spinner :{
        textAlign: 'center',
        position: 'fixed',
        zIndex: '1000000',
        width: '100%',
        top: '0',
        left: '0',
        height: '100vh',
        /* background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1), rgba(224, 224, 224, 0)); */
        // background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1), rgba(217, 217, 217, 0.45));
        backdropFilter: 'blur(2px)',
        paddingTop:'45%',
      }
});

export default function CustomeLoading({ display }) {
    const classes = useStyles();

    if (display === true) {
        return (
            <Grid Item className={classes.loading_spinner}>
                <img src={Loading.src} style={{width:'100px'}} />
            </Grid>
        )
    } else {
        return (
            <></>
        )
    }

}
