import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loadings from '../Components/Common/Loading';
import Router, { withRouter } from 'next/router';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

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
        style={{ marginBottom: "40px" }}
      >
        <TitleBox
          title='تماس با ما'
        />
      </Box>

    </Container >
  );
}



export default NormalUserProfileIndex;
