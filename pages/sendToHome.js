import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loadings from '../Components/Common/Loading';
import Router, { useRouter, withRouter } from 'next/router';
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
import Slide from '@material-ui/core/Slide';
import Modal from '@material-ui/core/Modal';
import BackIcon from "@material-ui/icons/ArrowBackIos"
import { route } from 'next/dist/server/router';



//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const textHome = "کاربر گرامی" + " برای دیده شدن بیشتر آگهی خود،می توانید با پرداخت مبلغ 5/000 تومان، آن را به صفحه اصلی منتقل نمایید";
const textHome2 = "با این انتقال، اگهی شما علاوه بر نمایش در ویترین پروفایل شما، به صورت دائم در صفحه اصلی نیز نمایش داده می شود";

const textDount = "کاربر گرامی درصورتی که اگهی شما دارای  تخفیف می باشد، با پرداخت مبلغ 5/000 تومان، آن را به صفحه تخفیفات منتقل کنید"
const textDount2 = "با این انتقال، اگهی شما علاوه بر نمایش در ویترین پروفایل شما، به صورت دائم در تخفیفات نیز نمایش داده می شود";



const useStyles = makeStyles({
  Text: {
    width: '70%',
    color: secondary,
    fontWeight: 'bold',
    textAlign: 'center',
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
    padding: '10px',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    width:'20%',
    textAlign: 'center',
    margin:'auto',
  },
  containerSelect: {
    backgroundColor: "#EDECE7",
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: "20px",
    overflow: "hidden",
    scrollbarWidth:'none',
  },
  buyBox:{
    width: "100%",
    textAlign:'center',
    marginTop: "20px",
    marginBottom: "20px",
  },
})

//type 1 home
//type 2 takhfif
//type 3 user pin
const SendToPage = ({ type = 1, handleModal, handleOk }) => {
  const router = useRouter();
  const classes = useStyles();
  const [ShowModalTell, setShowModalTell] = useState(true);
  const showAboveText = () => {
    if (type === 1)
      return (
        <>
          <span className={classes.text}>کاربر گرامی،</span><br />
          <span className={classes.text}>برای دیده شدن بیشتر آگهی خود،</span><br />
          <span className={classes.text}>می توانید با پرداخت مبلغ</span><br />
          <span className={classes.text_red}>5000 تومان</span>
          <span className={classes.text}>، آن را به صفحه اصلی منتقل کنید</span></>
      )
    if (type === 2)
      return (
        <>
          <span className={classes.text}>کاربر گرامی،</span><br />
          <span className={classes.text}>در صورتی که آگهی شما دارای</span><br />
          <span className={classes.text}>تخفیف می باشد، می توانید برای</span><br />
          <span className={classes.text}>دیده شدن بیشتر، با پرداخت</span><br />
          <span className={classes.text}>مبلغ</span>&nbsp;
          <span className={classes.text_red}>5000 تومان</span>&nbsp;
          <span className={classes.text}>آن را به</span><br />
          <span className={classes.text}>صفحه تخفیفات منتقل کنید.</span>
          </>
        )
if (type === 3)
  return (
    <>
      <span className={classes.text}>کاربر گرامی،</span><br />
      <span className={classes.text}>برای دیده شدن بیشتر پروفایل،</span><br />
      <span className={classes.text}>فروشگاهتان می توانید، با پرداخت </span><br />
      <span className={classes.text}>مبلغ</span>
      <span className={classes.text_red}> 50/000 تومان</span>&nbsp;
      <span className={classes.text}>برای مدت</span><br />&nbsp;
      <span className={classes.text_red}>بک ماه</span>&nbsp;
      <span className={classes.text}>،در سه فروشگاه اول قرار</span><br />
      <span className={classes.text}>بگیرید</span>

    </>
  )
  }
const showDownText = () => {
  if (type === 1) {
    return (
      <>
        <span className={classes.text_blue}>بااین انتقال، آگهی شما علاوه بر</span><br />
        <span className={classes.text_blue}>نمایش در ویترین پروفایل شما،</span><br />
        <span className={classes.text_blue}>به صورت  </span>
        <span className={classes.text_red}>دائم</span>&nbsp;
        <span className={classes.text_blue}>در صفحه اصلی نیز</span><br />
        <span className={classes.text_blue}>نمایش داده می شود</span>
      </>
    )
  }
  if (type === 2) {
    return (
      <>
        <span className={classes.text_blue}>بااین انتقال، آگهی شما علاوه بر</span><br />
        <span className={classes.text_blue}>نمایش در ویترین پروفایل شما،</span><br />
        <span className={classes.text_blue}>به صورت  </span>
        <span className={classes.text_red}>دائم</span>&nbsp;
        <span className={classes.text_blue}>در صفحه تخفیفات نیز</span><br />
        <span className={classes.text_blue}>نمایش داده می شود</span>
      </>
    )
  }
  if (type === 3) {
    return (
      <>
        <span className={classes.text_blue}>با انتقال شما در جست و جوی کاربران،</span><br />
        <span className={classes.text_blue}>در بخش دسته بندی خودتان،</span><br />
        <span className={classes.text_blue}>در سه فروشگاه اول قرار میگیرید</span>
      </>
    )
  }
}
return (


    <Modal
      open={ShowModalTell}
      onClose={() => handleModal(false)}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "scroll",
      }}
    >
      <Slide direction="up" in={ShowModalTell} mountOnEnter unmountOnExit>
        <Grid className={classes.containerSelect} container justify="center">
          <div style={{ textAlign: 'left', width: '100%' }}>
            <BackIcon style={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => { handleModal(false); }} />
          </div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <img src='/images/singuplogo.png' className={classes.imgStyle} />
            <div className={classes.imgText}>
              <span >بانک اطلاعات مشاغل</span>
            </div>
          </div>

          <div className={classes.textBox}>
            {
              showAboveText()
            }
          </div>

          <div className={classes.buyBox}>
            <div className={classes.buttonBuy} onClick={() => { handleModal(false); handleOk() }} >پرداخت</div>
          </div>
          <div className={classes.textBox}>
            {
              showDownText()
            }
          </div>
        </Grid>
      </Slide>
    </Modal>
 
);
}



export default SendToPage;
