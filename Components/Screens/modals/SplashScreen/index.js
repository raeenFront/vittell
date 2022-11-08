import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loadings from '../../..//Common/Loading';
import Router, { useRouter, withRouter } from 'next/router';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { v4 as uuidv4 } from 'uuid';

// material ui
import { Box, Grid, Container, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Clear';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : style
import { theme } from '../../../theme';
import { makeStyles } from '@material-ui/core/styles';

// mrx : components
import Btn from '../../../Common/Button';
import BlogBox from '../../../Common/BlogBox';
import ProvinceAndCity from '../../../Common/ProvinceAndCity';
import TitleBox from '../../../Common/TitleBox';
import Slide from '@material-ui/core/Slide';
import Modal from '@material-ui/core/Modal';
import BackIcon from "@material-ui/icons/ArrowBackIos"
import { route } from 'next/dist/server/router';
import TextFieldItem from '../../../Common/TextFieldItem';
import BackGround from '../../../../public/splash.jpg';



//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;



const useStyles = makeStyles({
    itemTitle: {
        width: '45%',
    },
    deleteBox: {
        width: '10%',
        position: 'relative',
    },
    deleteIcon: {
        position: 'absolute',
        top: '20%',
        left: '10%',
        color: primary,
        cursor: 'pointer',
        fontSize: '2.5rem',
    },
    text: {
        fontSize: '13px',
    },
    text_red: {
        fontSize: '13px',
        color: '#ef4b4c',
    },
    text_blue: {
        fontSize: '13px',
        color: '#0047BB',
    },
    imgStyle: {
        width: '30%'
    },
    imgText: {
        marginBottom: '0px',
        marginTop: '-5px',
    },
    textBox: {
        width: '100%',
        textAlign: '-webkit-center',
        textAlign: '-moz-center',
        textAlign: 'center',
    },
    buttonBuy: {
        backgroundColor: '#ef4b4c',
        padding: '10px 15px',
        borderRadius: '10px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        textAlign: 'center',
    },
    cancelBtn: {
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '10px',
        color: '#000',
        fontSize: '14px',
        cursor: 'pointer',
        textAlign: 'center',
        marginRight: '10px',
    },
    containerSelect: {
        backgroundColor: "#EDECE7",
        position: "absolute",
        width: "100%",
         height: "100%",
        padding: "20px",
        overflow: "hidden",
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        display: 'block',
    },
    buyBox: {
        width: "100%",
        textAlign: 'center',
        marginTop: "20px",
        marginBottom: "20px",
        display: 'flex',
        justifyContent: 'center',
    },
    red_text_price: {
        color: primary,
        fontSize: '14px',
    },
    itemBox: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px',
    },
    addItemBox: {
        width: '100%',
        cursor: 'pointer',
        textAlign: 'center',
    },
})


const SplashScreen = () => {
    const classes = useStyles();
    //for showing the splash screen
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        // if (Cookies.get('first-load'))
        //     setFirstLoad(false);
        // else {
        //     Cookies.set('first-load', true);
        //     setFirstLoad(true);
        // }
        const timer = setTimeout(() => {
            setFirstLoad(false);
          }, 2500);
          return () => clearTimeout(timer);
    }, [])
    return (


        <Modal
            open={firstLoad}
            onClose={() => setFirstLoad(false)}
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflowY: "scroll",
            }}
        >
            <Slide direction="up" 
                timeout={250}
                 in={firstLoad} mountOnEnter unmountOnExit>
                <Grid className={classes.containerSelect} container justify="center"
                style={{
                    backgroundImage: `url('${BackGround.src}')`, width: '100%', backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                }}
                >

                </Grid>
            </Slide>
        </Modal>

    );
}



export default SplashScreen;
