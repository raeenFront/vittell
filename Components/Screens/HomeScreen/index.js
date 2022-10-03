import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// import cookie
import Cookie from 'js-cookie';

// material ui
import { Container, Button } from '@material-ui/core';

// components
import MainSlider from './Slider';
import DiscountIndex from './Discount';
import AdvertisIndex from './Advertis';
import CatHome from  './categorySlider';


const HomeScreen = () => {

  return (
    <>
      <Container maxWidth='sm' >
        <MainSlider />
      </Container>
      <DiscountIndex />
      <CatHome/>
      <AdvertisIndex />
    </>
  );
}

export default HomeScreen;
