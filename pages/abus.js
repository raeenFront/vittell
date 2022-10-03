import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loadings from '../Components/Common/Loading';
import Router, { withRouter } from 'next/router';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

// material ui
import { Box, Grid, Container } from '@material-ui/core';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : style
import { theme } from '../Components/theme';
import useStyles from '../Components/Screens/NormalUserProfile/NormalUserProfile.style';

// mrx : components
import Btn from '../Components/Common/Button';
import BlogBox from '../Components/Common/BlogBox';
import ProvinceAndCity from '../Components/Common/ProvinceAndCity';
import TitleBox from '../Components/Common/TitleBox';

// mrx : api links
import {
  GET_ALL_OFFER_POSTS,
  BASE_Image_Url,
} from '../pages/api/index';

// mrx : api
import { PostAuthUrl, GetUrl, GetAuthUrl } from '../pages/api/config';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


const NormalUserProfileIndex = () => {
  const classes = useStyles();

  return (
    <Container
      maxWidth='sm'
      style={{
        paddingTop: 100,
        height: '100vh'
        
      }}
    >

      <Box
        my={2}
        style={{ marginBottom: "20px" }}
      >

        <TitleBox
          title='درباره ما'
        />
      </Box>
      <TextareaAutosize
        minRows={5}
        value="
        ویترین - تلفن

کرونا به ما آموخت باید از همه ظرفیتها برای حضور در فضای مجازی بهره ببریم.

ویتل اولین بانک اطلاعات مشاغل رایگان در ایران می‌باشد.

در این وب اپلیکیشن شما می‌توانید به راحتی ویترین خود را بسازید و در هر ساعت از شبانه روز محصول یا اطلاعات کسب و کار خود را بارگذاری نمایید.

ویتل این امکان را به شما می‌دهد که وبسایت، پیج اینستاگرام و کانالهای ارتباطی خود را با مشتریان به اشتراک بگذارید.

در ویتل بستری فراهم شده تا در نهایت سادگی و سهولت کاربری، حداکثر بهره را از فضای مجازی ببرید.

همچنین
با ویتل در هر زمان و هر جا که هستید، میتوانید محصول یا خدمات مورد نیازتان را در شهر خودتان و یا دیگر شهرها جستجو نموده و با فروشگاه مورد نظر ارتباط برقرار کنید.
        "
        className="paragraphPost"
      />
    </Container >
  );
}



export default NormalUserProfileIndex;
