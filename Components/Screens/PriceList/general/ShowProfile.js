import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
// material ui
import { Box, Grid, Container } from '@material-ui/core';

// mrx : cookie
import Cookies from 'js-cookie';


// mrx : style
//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;
import { theme } from '../../../theme';

import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({
    containerSelect: {
        maxWidth: "50rem",
        backgroundColor: "#fafafa",
        position: "absolute",
        width: "100%",
        bottom: "0px",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        padding: "20px",
        overflow: "scroll",
    },
    ButtonSend: {
        background: "#eaeaea",
        width: "100%",
        fontSize: "15px !important",
        color: "#585591",
        borderRadius: "20px",
        border: "solid 1px #b7b2b2",
        marginTop: 50
    },
    backgroundPicSlider: {
        borderRadius: "7px",
        '& img': {
            borderRadius: "7px",
            objectFit: 'cover',
            height: '100%'
        }
    },
    Input: {
        width: "100%",
        border: ' none',
        background: '#e6e6e6d6',
        height: ' 42px',
        marginBottom: ' 15px',
        borderRadius: ' 20px',
        padding: ' 20px',
        outline: ' none',
        color: '#2f2e2e',
    },
    avatorImageBox: {
        marginTop: '-4rem',
        '& .MuiAvatar-root': {
            width: theme.spacing(9),
            height: theme.spacing(9),
            border: '3px solid #fff',
        },
        '& svg': {
            color: secondary,
            fontSize: '2rem',
            marginBottom: '2rem'
        },
    },
    avatorImage: {
        boxShadow: '0px -2px 13px 2px rgba(188,190,192,0.64)',
    },
    titleOfProfile: {
        color: primary,
        fontSize: '1.4rem',
    },
    titleOfProfilePost: {
        color: secondary,
        float: "right",
        marginRight: "100px",
        fontSize: '1.5rem',
    },
    descriptionOfProfilePost: {
        color: '#9C9B97',
        fontSize: '12px',
    },
    red_text_price:{
        color: primary,
        fontSize: '14px',
    },
    biographytitle: {
        background: "#fafafa",
        height: "116px",
        border: "none",
        overflow: "hidden",
        margin: "30px 20px 10px",
        paddingTop: "20px",
        width: "100%",
        background: 'linear-gradient(to  bottom, #EDECE7, #fff)',
        borderTop: '2px solid #aaa'
    },
    alertBoxItem: {
        backgroundColor: secondary,
        borderRadius: '1rem',
        '& svg': {
            color: '#ffffffb8'
        },
        '& span': {
            fontSize: '1.2rem',
            color: '#ffffffb8',
            fontWeight: 'bold'
        }
    },
    editBtnItem: {
        width: '40%'
    }
});

import { BASE_Image_Url } from '../../../../pages/api';
const ShowProfile = ({ data }) => {
    const classes = useStyles();


    return (
        <div style={{paddingTop : '10px'}}>
            <Box boxShadow={3} mt={8} style={{ backgroundImage: `url('/images/slider-pic.png')`, width: '100%', height: '17rem' }} className={classes.backgroundPicSlider}>
                <img src={BASE_Image_Url + data?.wallpaper} height='100%' width='100%' />
            </Box>
            <Box mx={1} display='flex' justifyContent='space-between' alignItems='center' className={classes.avatorImageBox}>
                <Box position='relative'>
                    <Avatar alt="Cindy Baker" src={BASE_Image_Url + data?.profileImage} className={classes.avatorImage} />
                </Box>

            </Box>

            <Box component='span' fontWeight='bold' display='block' justifyContent='center' className={classes.titleOfProfilePost} mr={3} mt={-3}>
                <span style={{width:'100%'}}>{data?.businessName} </span> <br/>
                <span className={classes.descriptionOfProfilePost}>{data?.description} </span>
            </Box>
            <Box mb={2} mt={2} pb={2} style={{textAlign: 'center' ,borderBottom: '2px solid #aaa' }}></Box>
            <Box component='span' display='flex' justifyContent='center' className={classes.red_text_price}  >
                قیمت ها به تومان می باشد
            </Box>
            
            <Box mb={3} pb={2} style={{textAlign: 'center' ,borderBottom: '2px solid #aaa' }}></Box>

        </div>
    )
}

export default ShowProfile;