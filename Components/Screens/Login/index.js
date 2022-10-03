import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Router, { withRouter } from 'next/router';

// mrx : cookie
import Cookies from 'js-cookie'

// mrx : components
import TextFieldItem from '../../Common/TextFieldItem';

// mrx : styles
import useStyles from './Login.style';
import { theme } from '../../theme';

// mrx : material ui
import Button from '@material-ui/core/Button';
import { Box, Container, Badge } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// mrx : api links
import { LOGIN_USER } from '../../../pages/api/index';

// mrx : api
import { PostUrl } from '../../../pages/api/config';

// mrx : context
import { Contexts } from "../../../contexts/index";

// mrx : style
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const LoginIndex = () => {
  const classes = useStyles();

  // mrx : states 
  const { setVerifyMobile } = useContext(Contexts);
  const [Mobile, setMobile] = useState(null);
  const [Password, setPassword] = useState(null);
  const [isLogin, setisLogin] = useState(true);
  const [passwordShow, setPasswordShow] = React.useState(false);

  const handleLogin = () => {
    if (Mobile?.length > 11 || Mobile?.length < 11) {
      toast.error("لطفا شماره خود را به درستی وارد کنید");
    } else {
      PostUrl(LOGIN_USER, {
        username: Mobile,
        password: Password,
      }).then((res) => {
        if (res && res.status === 200) {
          if (res.data.statusCode === 7) {
            setVerifyMobile(Mobile);
            Router.push({ pathname: '/verifycode' });
          } else if (res.data.statusCode === 0) {

            Cookies.set("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n", res?.data?.data?.access_token, { expires: 2100 });
            Cookies.set("Count", res?.data?.count, { expires: 2100 });
            Cookies.set("USID", res?.data?.data?.userId, { expires: 2100 });
            Cookies.set("CITID", res?.data?.data?.cityId, { expires: 2100 });

            toast.success("شما با موفقیت وارد حساب کاربری خود شدید");
            Router.push({ pathname: '/myprofile' });

          } else {
            if (res.data.statusCode !== 2) {

            } else {
              toast.error(res?.data?.message);
            }
          }
        } else {
          toast.error("خطایی در سرور به وجود آمده است");
        }
      });
    }
  }

  useEffect(() => {
    // check if token set 
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      Router.push({ pathname: '/' });
    } else {
      setisLogin(false);
    }
  }, [])

  if (!isLogin) {
    return (
      <Box mt={8}>
        <Container maxWidth='sm'>

          <Box pt={8} display='flex' flexDirection='column' alignItems='center' height='100vh'>

            <Box width='20rem' overflow='hidden'>
              <img src='/images/singuplogo.png' width='100%' />
            </Box>

            <Box mt={5} display='flex' width='100%' flexDirection='column' justifyContent='center' alignItems='center'>
              <TextFieldItem
                inputProps='شماره'
                type="number"
                onChange={(e) => setMobile(e.target.value)}
              />
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
            </Box>



            <Box mt={2} width='100%' textAlign='center'>
              <a onClick={() => Router.push("/ResetPassword")} className={classes.forgetPasswordLink}>رمز عبور خود را فراموش کرده ام</a>
            </Box>

            <Box mt={5} width='100%' textAlign='center' className={classes.buttonSignUp}>
              <Button style={{ margin: "0px 10px", color: "#fff", backgroundColor: "#ff0000" }} onClick={() => handleLogin()} variant="contained" width='30%'>ورود</Button>
              <Button style={{ margin: "0px 10px" }} onClick={() => Router.push({ pathname: '/register' })} variant="contained" width='30%'>ثبت نام</Button>
            </Box>
            {/* <a onClick={() => Router.push({ pathname: '/register' })} style={{ marginTop: 20 }} className={classes.forgetPasswordLink}>اکانت کاربری ندارم !</a> */}

          </Box>

        </Container >
      </Box >
    );

  } else {
    return (
      <></>
    )
  }
}

export default LoginIndex;