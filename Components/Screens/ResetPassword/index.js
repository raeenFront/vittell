import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Router, { withRouter } from 'next/router';

// mrx : cookie
import Cookies from 'js-cookie'

// mrx : components
import TextFieldItem from '../../Common/TextFieldItem';

// mrx : styles
import useStyles from './ResetPassword.style';
import { theme } from '../../theme';

// mrx : material ui
import Button from '@material-ui/core/Button';
import { Box, Container } from '@material-ui/core';

// mrx : api links
import { RESET_PASSWORD } from '../../../pages/api/index';

// mrx : api
import { PostUrl, GetUrl } from '../../../pages/api/config';

// mrx : context
import { Contexts } from "../../../contexts/index";
import Btn from '../../Common/Button';

// mrx : style
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const LoginIndex = () => {
  const classes = useStyles();

  // mrx : states 
  const { setVerifyMobile } = useContext(Contexts);
  const [Mobile, setMobile] = useState(null);

  const handleReset = () => {
    if (Mobile !== null) {
      if (Mobile?.length > 11 || Mobile?.length < 11) {
        toast.error("لطفا شماره تماس خود را به درستی وارد کنید")
      } else {
        GetUrl(RESET_PASSWORD + `?mobile=${Mobile}`).then((res) => {
          if (res && res.status === 200) {

            toast.success("کد تایید با موفقیت برای شما ارسال شد");
            setVerifyMobile(Mobile);
            Router.push({ pathname: '/verifyMe' });

          } else {
            toast.error("خطایی در سرور به وجود آمده است");
          }
        });

      }
    } else {
      toast.error("لطفا شماره تماس خود را وارد کنید")
    }

  }

  return (
    <Box mt={8} >
      <Container maxWidth='sm'>

        <Box pt={8} display='flex' flexDirection='column' alignItems='center' height='100vh'>

          <Box width='20rem' overflow='hidden'>
            <img src='/images/singuplogo.png' width='100%' />
          </Box>

          <Box mt={5} display='flex' width='100%' flexDirection='column' justifyContent='center' alignItems='center'>
            <TextFieldItem
              inputProps='شماره'
              onChange={(e) => setMobile(e.target.value)}
            />
          </Box>

          <Box mt={5} width='100%' textAlign='center' className={classes.buttonSignUp}>
            <Btn onClick={() => handleReset()} variant="contained" width='30%'>مرحله بعدی</Btn>
          </Box>
        </Box>

      </Container>
    </Box>
  );
}

export default LoginIndex;