import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Router, { withRouter } from 'next/router'

// mrx : cookie
import Cookies from 'js-cookie'

// mrx : components
import TextFieldItem from '../../Common/TextFieldItem';

// mrx : styles
import useStyles from './signUp.style';
import { theme } from '../../theme';

// mrx : material ui
import { Box, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// mrx : api links
import { SIGNUP, PROVINCE, CITY_BY_PROVINCE_ID } from '../../../pages/api/index';

// mrx : api
import { PostUrl, GetUrl } from '../../../pages/api/config';

// mrx : styles
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

// mrx : context
import { Contexts } from "../../../contexts/index";

const SignUpIndex = () => {
  const classes = useStyles();

  // mrx : states 
  const [Mobile, setMobile] = useState(null);
  const [Password, setPassword] = useState(null);
  const [ConfirmPassword, setConfirmPassword] = useState(null);
  const [ProvinceId, setProvinceId] = useState(null);
  const [CityId, setCityId] = useState(null);
  const [Province, setProvince] = useState([]);
  const [City, setCity] = useState([]);
  const [isRegister, setRegister] = useState(true);

  // mrx : state of show or hide password
  const { setVerifyMobile } = useContext(Contexts);
  const [passwordShow, setPasswordShow] = React.useState(false);
  const [tryPassword, setTryPassword] = React.useState(false);

  // mrx : state of show or hide password
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {

    // check if token set 
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      Router.push({ pathname: '/' });
    } else {
      setRegister(false);
    }

    // mrx : get Province
    GetUrl(PROVINCE).then(res => {

      if (res && res.status === 200) {
        const data = res.data.data;
        setProvince(data);
      }
    })
  }, [])

  useEffect(() => {
    // mrx : get citys by Province id
    GetUrl(CITY_BY_PROVINCE_ID + `?provinceId=${ProvinceId}`, {
      provinceId: ProvinceId,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res.data.isSuccess) {
          const data = res.data.data;
          setCity(data);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error(res?.data?.message);
      }
    });
  }, [ProvinceId])

  // mrx : handle Register Form
  const handleSubmit = () => {
    if (Mobile?.length > 11 || Mobile?.length < 11) {
      toast.error("لطفا شماره خود را به درستی وارد کنید");
    } else if (Password?.length < 6) {
      toast.error("رمز عبور حداقل باید بیشتر از 6 کاراکتر باشد");
    } else {
      PostUrl(SIGNUP, {
        Mobile: Mobile,
        Password: Password,
        ConfirmPassword: ConfirmPassword,
        ProvinceId: ProvinceId,
        CityId: CityId,
      }).then((res, err) => {
        if (res && res.status === 200) {
          if (res.data.statusCode !== 2) {
            if (res.data.isSuccess) {
              toast.success("اکانت شما ثبت گردید لطفا آن را تایید کنید");
              setVerifyMobile(Mobile);
              Router.push({ pathname: '/verifycode' });
            } else {
              toast.error(res?.data?.message);
            }
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("خطایی در سرور به وجود آمده است");
        }
      });
    }
  }

  if (!isRegister) {
    return (

      <Box pt={8} pb={5} >
        <Box display='flex' flexDirection='column' justifyContent='space-evenly' alignItems='center' height='100vh'>

          <Container maxWidth='sm'>
            <Box width='20rem' mb={4} overflow='hidden' mx='auto' >
              <img src='/images/singuplogo.png' width='100%' />
            </Box>

            <Box display='flex' className={classes.textFiledItemBox} width='100%' flexDirection='column' justifyContent='center' alignItems='center'>
              <TextFieldItem
                inputProps='شماره'
                type="number"
                onChange={(e) => setMobile(e.target.value)}
              />
              <select
                className={classes.selectItemTextFeild}
                id="demo-simple-select-outlined22"
                onChange={(e) => setProvinceId(e.target.value)}
              >
                <option>لطفا استان مورد نظر را انتخاب کنید</option>
                {Province && Province?.map((item) => <option onClick={(e) => setProvinceId(e.target.value)} key={item?.id} value={item?.id}>{item?.name}</option>)}
              </select>

              <select
                className={classes.selectItemTextFeild}
                id="demo-simple-select-outlined222"
                onChange={(e) => setCityId(e.target.value)}
                defaultValue="شیراز"
              >
                <option>لطفا برای نمایش شهر اول استان را انتخاب کنید</option>
                {City && City?.map((item) => <option key={item?.id} value={item?.id}>{item?.name}</option>)}
              </select>

              <TextFieldItem
                inputProps='رمز عبور'
                onChange={(e) => setPassword(e.target.value)}
                type={passwordShow ? 'text' : 'password'}
                icon={
                  <IconButton
                    aria-label="toggle password visibility">
                    {passwordShow ? <Visibility
                      onClick={() => setPasswordShow(!passwordShow)}
                    /> : <VisibilityOff
                      onClick={() => setPasswordShow(!passwordShow)} />}
                  </IconButton>
                }
              />

              <TextFieldItem
                inputProps='تکرار رمز عبور'
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={tryPassword ? 'text' : 'password'}
                icon={
                  <IconButton
                    aria-label="toggle password visibility"
                  >
                    {tryPassword ? <Visibility
                      onClick={() => setTryPassword(!tryPassword)}
                    /> : <VisibilityOff
                      onClick={() => setTryPassword(!tryPassword)}
                    />}
                  </IconButton>
                }
              />

            </Box>

            <Box mt={5} width='100%' textAlign='center' className={classes.buttonSignUp}>
              <Button style={{ margin: "0px 10px" , backgroundColor:primary , color:"#fff"}} onClick={() => handleSubmit()} variant="contained" width='30%'>ثبت نام</Button>
              <Button style={{ margin: "0px 10px" }} onClick={() => Router.push({ pathname: '/login' })} variant="contained" width='30%'>ورود</Button>
            </Box>
          </Container>
          {/* <a onClick={() => Router.push({ pathname: '/login' })} style={{ marginTop: -50 }} className={classes.forgetPasswordLink}>اکانت کاربری دارم !</a> */}

        </Box>

      </Box>

    );

  } else {
    return (
      <></>
    )
  }
}



export default SignUpIndex;
