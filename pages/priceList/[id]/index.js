import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loadings from '../../../Components/Common/Loading';
import Router, { useRouter, withRouter } from 'next/router';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

import { makeStyles } from '@material-ui/core/styles';
// material ui
import { Box, Grid, Container } from '@material-ui/core';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : context
import { Contexts } from '../../../contexts/index';

// mrx : style
import { theme } from '../../../Components/theme';

// mrx : components
import Btn from '../../../Components/Common/Button';
import BlogBox from '../../../Components/Common/BlogBox';
import ProvinceAndCity from '../../../Components/Common/ProvinceAndCity';
import TitleBox from '../../../Components/Common/TitleBox';
import { Avatar } from '@material-ui/core';
import ShowProfile from '../../../Components/Screens/PriceList/general/ShowProfile';




//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


import { BASE_Image_Url ,GET_USER_BY_ID } from '../../api';
import { GetAuthUrl, GetUrl } from '../../api/config';
import router from 'next/router';
import PriceListView from '../../../Components/Screens/PriceList/general/PriceListView';


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
      '& img': {
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
const PriceList = () => {

  const router = useRouter();

  const [IsLogin, setIsLogin] = useState(false);
  const [Wallpaer, setWallpaer] = useState("../images/Placeholder.PNG");
  const [Profile, setProfile] = useState("../images/Placeholder.PNG");
  const [userId, setUserId] = useState(null);

  // mrx : context data
  const [ UserInfo, setUserInfo ] = useState(null);
  const [IsBusinessFinish, setIsBusinessFinish] = useState(false);





  const classes = useStyles();
  
  const GetUserInfo = (id) => {
    // mrx : get Province
    if(id !== undefined)
    {
      GetUrl(GET_USER_BY_ID(id)).then(res => {

        if (res && res.status === 200) {
          const data = res?.data?.data;
          console.log('data',data)
          setUserInfo(data);
        } else {
          toast.error(res?.data?.message);
        }
      })
    }
  }
  useEffect(() => {
    const { id } = router.query;
    console.log(id)
    setUserId(id);
    GetUserInfo(id);
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
        // paddingTop: 100,
        //height: '100vh'
        paddingBottom:'20%'
      }}
    >

      {/* <Box
        my={2}
        style={{ marginBottom: "40px" }}
      >
        <TitleBox
          title='لیست قیمت'
        />
      </Box> */}

      {/* top */}
      <ShowProfile data={UserInfo} />
      <PriceListView id={userId} qrCodeImage={UserInfo?.qrCodeUrl} />

    </Container >
  );
}



export default PriceList;
