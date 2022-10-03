import React from 'react'
import Head from 'next/head'

// pages
import Header from './Header/index';
import Footer from './Footer/index';

// material ui
import { Container } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

// styles
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../components/theme'


const Layout = ({ children }) => {
    return (
        <MuiThemeProvider theme={theme}>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
                <title>vitel Project</title>
            </Head>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
            <CssBaseline />
        </MuiThemeProvider>
    )
}

export default Layout
