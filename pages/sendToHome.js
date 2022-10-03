import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loadings from '../Components/Common/Loading';
import Router, { withRouter } from 'next/router';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

// material ui
import { Box, Grid, Container, Typography } from '@material-ui/core';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : style
import { theme } from '../Components/theme';
import { makeStyles } from '@material-ui/core/styles';

// mrx : components
import Btn from '../Components/Common/Button';
import BlogBox from '../Components/Common/BlogBox';
import ProvinceAndCity from '../Components/Common/ProvinceAndCity';
import TitleBox from '../Components/Common/TitleBox';




//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const textHome = "کاربر گرامی" + " برای دیده شدن بیشتر آگهی خود،می توانید با پرداخت مبلغ 5/000 تومان، آن را به صفحه اصلی منتقل نمایی" ;
const textHome2 = "با این انتقال، اگهی شما علاوه بر نمایش در ویترین پروفایل شما، به صورت دائم در صفحه اصلی نیز نمایش داده می شود" ;

const textDount = "کاربر گرامی درصورتی که اگهی شما دارای  تخفیف می باشد، با پرداخت مبلغ 5/000 تومان، آن را به صفحه تخفیفات منتقل کنید"
const textDount2 = "با این انتقال، اگهی شما علاوه بر نمایش در ویترین پروفایل شما، به صورت دائم در تخفیفات نیز نمایش داده می شود" ;



const useStyles  = makeStyles({
    Text: {
      width: '70%',
      fontSize: 12,
      color: secondary,
      fontWeight: 'bold'
    },
    imgStyle:{
        marginBottom:'50px',
        width:'30%'
    }
})

const sendToPage = () => {
  const classes = useStyles();

  return (
    <Container
      maxWidth='sm'
      style={{
        paddingTop: 180,
        height: '100vh',
        textAlign:'center',
        
      }}
    >
              <img src='/images/singuplogo.png' className={classes.imgStyle}/>

              <Typography className={classes.Text}>{textHome}</Typography>

              <Btn style={{marginBottom: '40px' , marginTop:'20px'}} >پرداخت</Btn>
              <Typography className={classes.Text}> {textHome}</Typography>

    </Container >
  );
}



export default sendToPage;
