import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loadings from '../../Common/Loading';
import Router, { withRouter } from 'next/router';

// material ui
import { Box, Grid, Container } from '@material-ui/core';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : style
import { theme } from '../../theme';
import useStyles from './NormalUserProfile.style';

// mrx : components
import Btn from '../../Common/Button';
import BlogBox from '../../Common/BlogBox';
import ProvinceAndCity from '../../Common/ProvinceAndCity';
import TitleBox from '../../Common/TitleBox';

// mrx : api links
import {
  GET_ALL_USER_SAVES,
  PROVINCE,
  CITY_BY_PROVINCE_ID,
  BASE_Image_Url,
  GET_PROVINCE_BY_USER_ID,
  GET_ANY_USER_BY_ID,
  SET_PAYFACTOR,
  CHANGE_USER_CITY_AUTH,
} from '../../../pages/api/index';

// mrx : api
import { PostAuthUrl, GetUrl, GetAuthUrl } from '../../../pages/api/config';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


const NormalUserProfileIndex = () => {
  const classes = useStyles();

  // mrx : state
  const [ProvinceId, setProvinceId] = useState(null);
  const [CityId, setCityId] = useState(null);
  const [Province, setProvince] = useState([]);
  const [City, setCity] = useState([]);
  const [LoadingPost, setLoadingPost] = useState(true);
  const [SavePosts, setSavePosts] = useState([]);
  const [CityValue, setCityValue] = useState("برای نمایش شهر استان را انتخاب کنید");
  const [ProvinceValue, setProvinceValue] = useState("استان مورد نظر را انتخاب کنید");

  const Creatbusinessaccount = () => {
    if (Cookies.get("Count") == 1) {
      Router.push("/creatbusinessaccount");
    } else {
      Router.push("/makemyaccountbusiness");
    }
  }

  useEffect(() => {

    // mrx : get saves
    Cookies.set("CITID", CityId, { expires: 2100 });

    // GetAuthUrl(CHANGE_USER_CITY_AUTH + `?cityId=${CityId}`).then(res => {
    //   if (res && res.status === 200) {
    //     const data = res?.data?.data;
    //     Cookies.remove("CITID");
    //     Cookies.set("CITID", CityId, { expires: 2100 });
    //   } else {
    //     toast.error(res?.data?.message);
    //   }
    // })

  }, [CityId])

  useEffect(() => {

    // // mrx : get city name
    // GetUrl(GET_PROVINCE_BY_USER_ID + `?id=${Cookies.get("CITID")}`).then(res => {

    //   if (res && res.status === 200) {
    //     const data = res?.data?.data;
    //     setCityValue(data?.name);
    //     setCityId(data?.id);
    //     setProvinceValue(data?.provinceName);
    //     setProvinceId(data?.provinceId)
    //   } else {
    //     toast.error(res?.data?.message);
    //   }
    // })

    // mrx : get saves
    GetAuthUrl(GET_ALL_USER_SAVES).then(res => {
      if (res && res.status === 200) {
        const data = res?.data?.data;
        setSavePosts(data);
        setLoadingPost(false);
      } else {
        toast.error(res?.data?.message);
      }
    })

    // // mrx : get Province
    // GetUrl(PROVINCE).then(res => {

    //   if (res && res.status === 200) {
    //     const data = res?.data?.data;
    //     setProvince(data);
    //   } else {
    //     toast.error(res?.data?.message);
    //   }
    // })
  }, [])

  // useEffect(() => {
  //   // mrx : get citys by Province id
  //   GetUrl(CITY_BY_PROVINCE_ID + `?provinceId=${ProvinceId}`, {
  //     provinceId: ProvinceId,
  //   }).then((res, err) => {
  //     if (res && res?.status === 200) {
  //       if (res?.data?.isSuccess) {
  //         const data = res?.data?.data;
  //         setCity(data);
  //       } else {
  //         toast.error(res?.data?.message);
  //       }
  //     } else {
  //       toast.error(res?.data?.message);
  //     }
  //   });
  // }, [ProvinceId])

  return (
    <Container maxWidth='sm'>
      <Box mt={11} pb={1} mb={2} style={{ borderBottom: `1px solid ${primary}`, }} className={classes.selectBoxNormalProfile}>

        {/* <Box display='flex' width='100%' justifyContent='space-evenly' className={classes.selectBoxTextFeildCheck}>
          <select
            className={classes.selectItemTextFeildCheck}
            id="demo-simple-select-outlined22"
            onChange={(e) => setProvinceId(e.target.value)}
          >
            <option>{ProvinceValue}</option>
            {Province && Province?.map((item) => <option onClick={(e) => setProvinceId(e.target.value)} key={item?.id} value={item?.id}>{item?.name}</option>)}
          </select>

          <select
            className={classes.selectItemTextFeildCheck}
            id="demo-simple-select-outlined222"
            onChange={(e) => setCityId(e.target.value)}
          >
            <option>{CityValue}</option>
            {City && City?.map((item) => <option key={item?.id} value={item?.id}>{item.name}</option>)}
          </select>

        </Box> */}

        <Box my={3} display='flex' width='100%' alignItems='center' justifyContent='center' px={1}>
          {
            Cookies.get("Count") == 0 ? <Btn onClick={() => Creatbusinessaccount()} variant='contained' className={classes.btnItemPay}>ایجاد اکانت تجاری</Btn> : ''
          }
        </Box>
      </Box>

      <Box my={2}>
        <TitleBox
          title='نشان شده ها'
        />
      </Box>

      <Grid style={{ display: " inline-flex" }}>
        <Box style={{ width: "100%" }} flexWrap='wrap' mb={10}>
          {
            LoadingPost ? (
              " "
            ) : (
              <>
                {SavePosts &&
                  SavePosts?.filter((item, idx) => idx % 2 == 1).map((item) => (
                    <BlogBox
                      key={item?.id}
                      href={`posts/${item?.postId}`}
                      homePic={BASE_Image_Url + item?.postImage}
                      title={item?.postTitle}
                      description={item?.postDescription}
                    />
                  ))}
              </>
            )
          }
        </Box>
        <Box style={{ width: "100%" }} flexWrap='wrap' mb={10}>
          {

            SavePosts?.length === 0 ? (
              <>
                <p
                  style={{
                    position: "absolute",
                    right: 20,
                    top: 20,
                  }}
                >آگهی یافت نشد</p>
              </>
            ) : (
              ' '
            )
          }
          {
            LoadingPost ? (
              <Loadings />
            ) : (
              <>
                {SavePosts &&
                  SavePosts?.filter((item, idx) => idx % 2 == 0).map((item) => (
                    <BlogBox
                      key={item?.id}
                      href={`posts/${item?.postId}`}
                      homePic={BASE_Image_Url + item?.postImage}
                      title={item?.postTitle}
                      description={item?.postDescription}
                    />
                  ))}
              </>
            )
          }
        </Box>
      </Grid>


    </Container>
  );
}



export default NormalUserProfileIndex;
