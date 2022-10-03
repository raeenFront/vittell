import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loadings from '../Components/Common/Loading';
import Router, { withRouter } from 'next/router';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

// material ui
import { Box, Grid, Container } from '@material-ui/core';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : context
import { Contexts } from '../contexts/index';

// mrx : style
import { theme } from '../Components/theme';
import useStyles from '../Components/Screens/NormalUserProfile/NormalUserProfile.style';

// mrx : components
import Btn from '../Components/Common/Button';
import BlogBox from '../Components/Common/BlogBox';
import ProvinceAndCity from '../Components/Common/ProvinceAndCity';
import TitleBox from '../Components/Common/TitleBox';
import { Avatar } from '@material-ui/core';




//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


import { BASE_Image_Url ,GET_USER_BY_ID } from './api';
import { GetAuthUrl, GetUrl } from './api/config';
import router from 'next/router';
const PriceList = () => {
  const classes = useStyles();

  const [IsLogin, setIsLogin] = useState(false);
  const [Wallpaer, setWallpaer] = useState("../images/Placeholder.PNG");
  const [Profile, setProfile] = useState("../images/Placeholder.PNG");
  const [userId, setUserId] = useState(null);

  // mrx : context data
  const { UserInfo, setUserInfo } = useContext(Contexts);
  const [IsBusinessFinish, setIsBusinessFinish] = useState(false);

  const GetUserInfo = () => {
    // mrx : get Province
    GetUrl(GET_USER_BY_ID(userId)).then(res => {

      if (res && res.status === 200) {
        const data = res?.data?.data;
        console.log('data',data)
        setUserInfo(data);
      } else {
        toast.error(res?.data?.message);
      }
    })
  }
  useEffect(() => {
    const { id } = router.query;
    setUserId(id);
    GetUserInfo();
  }, [router]);
  useEffect(() => {
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      setIsLogin(true);
      GetUserInfo();
    } else {
      setIsLogin(false)
    }
    if (UserInfo?.data?.businessName !== null) {
      setIsBusinessFinish(false);
    } else {
      setIsBusinessFinish(true);
    }
  }, [])
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
        style={{ marginBottom: "40px" }}
      >
        <TitleBox
          title='لیست قیمت'
        />
      </Box>

      {/* top */}
      <Box boxShadow={3} mt={8} style={{ backgroundImage: `url('/images/slider-pic.png')`, width: '100%', height: '17rem' }} className={classes.backgroundPicSlider}>
        <img src={BASE_Image_Url + Wallpaer} height='100%' width='100%' />
      </Box>
      <Box mx={1} display='flex' justifyContent='space-between' alignItems='center' className={classes.avatorImageBox}>
        <Box position='relative'>
          <Avatar alt="Cindy Baker" src={BASE_Image_Url + Profile} className={classes.avatorImage} />
        </Box>

      </Box>

      <Box component='span' fontWeight='bold' display='flex' justifyContent='center' className={classes.titleOfProfilePost} mr={3} mt={-3}>سشکش</Box>


    </Container >
  );
}



export default PriceList;
