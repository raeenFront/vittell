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
import DiscountSlider from '../Components/Screens/HomeScreen/Discount/DiscountSlider';

// mrx : api links
import {
  GET_ALL_OFFER_POSTS,
  BASE_Image_Url,
} from '../pages/api/index';

// mrx : api
import { PostAuthUrl, GetUrl, GetAuthUrl } from '../pages/api/config';
import MainSlider from '../Components/Screens/HomeScreen/Slider';
import { Contexts } from '../contexts';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


const NormalUserProfileIndex = () => {
  const classes = useStyles();

  // mrx : state
  const [LoadingPost, setLoadingPost] = useState(true);
  const [OfferPost, setOfferPost] = useState([]);
  //Context 
  const { cityId } = useContext(Contexts);

  const PostID = typeof window !== "undefined" ? localStorage.getItem("PostID") || '1' : '1';

  useEffect(() => {
    scroller.scrollTo(PostID, {
      delay: 50,
      smooth: 'easeInOutQuint',
    })
    // }, 2000)
  })

  const getData = () => {
    // mrx : get saves
    GetAuthUrl(GET_ALL_OFFER_POSTS + `?cityId=${Cookies.get("CITID")}`).then(res => {
      if (res && res.status === 200) {
        const data = res?.data?.data;
        setOfferPost(data);
        setLoadingPost(false);
      } else {
        toast.error(res?.data?.message);
      }
    })
  }
  useEffect(() => {

    getData();

  }, [])
  useEffect(()=>{
    getData();
  },[cityId])

  return (
    <Container
      maxWidth='sm'
    // style={{
    //   paddingTop: 80
    // }}
    >
      <Container maxWidth='sm' >
        <MainSlider type={1} />
      </Container>
      <Box
        my={2}
        style={{ marginBottom: "40px" }}
      >
        <TitleBox
          title='تخفیفات ویتل'
        />
      </Box>

      <Grid style={{ display: " inline-flex" }}>
        <Box style={{ width: "50%" }} flexWrap='wrap' mb={10}>
          {
            LoadingPost ? (
              ""
            ) : (
              <>
                {OfferPost &&
                  OfferPost?.filter((item, idx) => idx % 2 == 1).map((item) => (
                    <BlogBox
                      id={item?.id}
                      off={item?.percentage}
                      Offer={true}
                      key={item?.id}
                      href={`posts/${item?.id}`}
                      homePic={BASE_Image_Url + item?.image}
                      title={item?.title}
                      description={item?.description}
                    />
                  ))}
              </>
            )
          }
        </Box>
        <Box style={{ width: "50%" }} flexWrap='wrap' mb={10}>
          {
            LoadingPost ? (
              <Loadings />
            ) : (
              <>
                {

                  OfferPost?.length === 0 ? (
                    <>
                      <p
                        style={{
                          position: "absolute",
                          right: 20,
                          top: 20,
                        }}
                      >آگهی یافت نشد</p>                    </>
                  ) : (
                    ' '
                  )
                }
                {OfferPost &&
                  OfferPost?.filter((item, idx) => idx % 2 == 0).map((item) => (
                    <BlogBox
                      id={item?.id}
                      off={item?.percentage}
                      Offer={true}
                      key={item?.id}
                      href={`posts/${item?.id}`}
                      homePic={BASE_Image_Url + item?.image}
                      title={item?.title}
                      description={item?.description}
                    />
                  ))}
              </>
            )
          }
        </Box>
      </Grid>

    </Container >
  );
}



export default NormalUserProfileIndex;
