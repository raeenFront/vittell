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
import { CHANGE_PASSWORD } from '../../../pages/api/index';

// mrx : api
import { PostUrl, GetUrl } from '../../../pages/api/config';

// mrx : context
import { Contexts } from "../../../contexts/index";

// mrx : style
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const LoginIndex = () => {
  const classes = useStyles();

  // mrx : states 
  const { setVerifyMobile, VerifyMobile } = useContext(Contexts);
  const [Password, setPassword] = useState(null);
  const [ConfirmPassword, setConfirmPassword] = useState(null);

  const handleReset = () => {
    if (VerifyMobile !== null) {
      PostUrl(CHANGE_PASSWORD, {
        mobile: VerifyMobile,
        password: Password,
        confirmPassword: ConfirmPassword,
        provinceId: "00000000-0000-0000-0000-000000000000",
        provinceId: "00000000-0000-0000-0000-000000000000"
      }).then((res) => {
        if (res && res.status === 200) {
          toast.success("رمز عبور شما با موفقیت تغییر یافت");
          Router.push({ pathname: '/login' });

        } else {
          toast.error("خطایی در سرور به وجود آمده است");
        }
      });
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
              inputProps='رمز عبور جدید'
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextFieldItem
              inputProps='تکرار رمز عبور '
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>

          <Box mt={5} width='100%' textAlign='center' className={classes.buttonSignUp}>
            <Button onClick={() => handleReset()} variant="contained" width='30%'>تغییر رمز عبور</Button>
          </Box>
        </Box>

      </Container>
    </Box>
  );
}

export default LoginIndex;