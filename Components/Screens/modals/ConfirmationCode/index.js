import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import useStyles from './ConfirmationCode.style';
import Router, { withRouter } from 'next/router'

// mrx : styles
import { theme } from '../../../theme';

// mrx : components
import TextFieldItem from '../../../Common/TextFieldItem';

// mrx : material ui
import Button from '@material-ui/core/Button';
import { Box, Container } from '@material-ui/core';

// mrx : context
import { Contexts } from "../../../../contexts/index";

// mrx : api links
import { RE_SEND_VERIFY_CODE, GET_VERIFY_CODE } from '../../../../pages/api/index';

// mrx : api
import { PostUrl, GetUrl } from '../../../../pages/api/config';


// my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


const ConfirmationCodeModal = () => {
  const classes = useStyles();
  const [Code, setCode] = useState(null);
  const [SendAg, setSendAg] = useState(1);

  // mrx : state
  const { VerifyMobile } = useContext(Contexts);

  useEffect(() => {
    if (VerifyMobile !== null) {
      // mrx : get citys by Province id
      GetUrl(RE_SEND_VERIFY_CODE + `?mobile=${VerifyMobile}`).then((res, err) => {
        if (res && res.status === 200) {
          if (res.data.isSuccess) {
            const data = res.data.data;
            toast.success(res?.data?.message);
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error(res?.data?.message);
        }
      });
    }

  }, [])

  const HandleVerifyCode = () => {
    GetUrl(GET_VERIFY_CODE + `?mobile=${VerifyMobile}&code=${Code}`).then((res, err) => {
      if (res && res.status === 200) {
        if (res.data.isSuccess) {
          const data = res.data.data;
          toast.success(res?.data?.message);
          Router.push("/login");
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error(res?.data?.message);
      }
    });
  }

  return (

    <Box height='85vh' mt={8}>
      <Container maxWidth='sm'>
        <Box pt={8} display='flex' flexDirection='column' alignItems='center' height='100vh'>

          <Box width='20rem' overflow='hidden'>
            <img src='/images/singuplogo.png' width='100%' />
          </Box>

          <Box mt={5} display='flex' width='100%' flexDirection='column' justifyContent='center' alignItems='center'>
            <TextFieldItem
              inputProps='لطفا کد ارسال شده را وارد نمایید'
              type='number'
              onChange={(e) => setCode(e.target.value)}
            />
          </Box>

          <Box mt={5} width='100%' textAlign='center' className={classes.buttonSignUp}>
            <Button style={{backgroundColor: primary , color:"#fff"}} onClick={() => HandleVerifyCode()} variant="contained" width='30%'>تایید</Button>
          </Box>

        </Box>
      </Container>
    </Box>

  );
}



export default ConfirmationCodeModal;
