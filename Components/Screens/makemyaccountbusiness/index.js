import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Router, { withRouter } from 'next/router';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : style
import useStyles from './makemyaccountbusiness.style';
import { theme } from '../../theme';

// mrx : material ui
import { Box, Container } from '@material-ui/core';

// mrx : components
import Btn from '../../Common/Button';
import Loadings from "../../../Components/Common/Loading";

// mrx : api links
import {
  SET_PAYFACTOR,
} from '../../../pages/api/index';

// mrx : api
import { PostAuthUrl, GetUrl, GetAuthUrl } from '../../../pages/api/config';


//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


const MoveOfferPageIndex = () => {
  const classes = useStyles();

  // mrx : states
  const [OfferCode, setOfferCode] = useState("");
  const [Price, setPrice] = useState("20000");

  const Creatbusinessaccount = () => {
    // mrx : get saves
    PostAuthUrl(SET_PAYFACTOR, {
      price: Price,
      payFor: 0,
      totalPrice: Price,
      useOffCode: false,
      offPrice: 0,
      offPercentage: 0,
      offCode: OfferCode,
    }).then(res => {
      if (res && res.status === 200) {
        const data = res?.data?.data;
        Router.push("/creatbusinessaccount");
        Cookies.set("Count", 1);
        toast.success(res?.data?.message)
      } else {
        toast.error(res?.data?.message);
      }
    })
  }

  useEffect(() => {
    Creatbusinessaccount()
  }, [])

  return (
    <Container maxWidth='sm'>
      <Loadings />
    </Container>
  );
}



export default MoveOfferPageIndex;
