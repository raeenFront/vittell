
import React, { useEffect } from 'react'
import App from 'next/app';
import Head from 'next/head';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : material ui
import { Button, Grid, IconButton, TextField } from '@material-ui/core';

import {
  isBrowser,
  isMobile
} from "react-device-detect";

// pages
import Header from '../Components/Header/index';
import Footer from '../Components/Footer/index';

// mrx : material ui
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline'
import SplashScreen from '../Components/Screens/modals/SplashScreen';

// alert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router, { withRouter } from 'next/router';

// styles
import '../styles/globals.css'
import { MuiThemeProvider } from '@material-ui/core/styles';

// context
import ContextsProvider from "../contexts/index";

function MyApp({ Component, pageProps }) {

  // if (isBrowser) {
  //   return (
  //     <>
  //       <Grid
  //         container
  //         direction="row"
  //         justify="center"
  //         alignItems="center"
  //       >
  //         <Head>
  //           <meta charSet="utf-8" />
  //           <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
  //           <link rel="manifest" href="manifest.json" />
  //           <title>Vittell Web Aplication</title>
  //         </Head>
  //         <h3
  //           style={{
  //             textAlign: "center"
  //           }}
  //         >This application only support mobiles ( Desktop version coming soon ! )</h3>
  //       </Grid>
  //     </>
  //   )
  // } else {
  return (
    // <Layout>
    <>
      <MuiThemeProvider>
        <ContextsProvider>

          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta charSet="utf-8" />
            <meta name="HandheldFriendly" content="true" />
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
            <link rel="manifest" href="manifest.json" />
            <title>ویتل</title>
          </Head>
          <Header />
          <SplashScreen />
          <div style={{backgroundColor : '#EDECE7'}}>
            <ToastContainer />
            <Component {...pageProps} />
          </div>
          <Footer />
          <CssBaseline />
        </ContextsProvider>

      </MuiThemeProvider>

    </>
    // </Layout>
  )
  // }

}

export default MyApp