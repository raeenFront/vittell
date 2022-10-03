import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loadings from '../../Common/Loading';
import Link from "next/link";
import Router, { withRouter, useRouter } from 'next/router';

// mrx : material ui
import { Box, Container, Avatar, Grid } from '@material-ui/core';

// mrx : style
import useStyles from './StoreSearchResult.style';

import { theme } from '../../theme';

// mrx : componetns
import MainSlider from '../HomeScreen/Slider';

// mrx : context
import { Contexts } from "../../../contexts/index";

// mrx : api links
import { BASE_Image_Url } from '../../../pages/api/index';

// my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const StoreSearchResult = () => {
        const classes = useStyles();
        const router = useRouter()

        // mrx : state
        const { SearchUser } = useContext(Contexts);
        const [LoadingUser, setLoadingUser] = useState(true);

        useEffect(() => {
                if (SearchUser?.length < 1) {
                        router.push("/search");
                } else {
                        if (SearchUser === null) {
                                setLoadingUser(false);
                                setTimeout(function () {
                                        router.push("/search");
                                }, 2000);
                        } else {
                                setLoadingUser(false);
                        }
                }
        }, [])

        return (
                <Grid
                        container
                        justify="center"
                        display="center"
                        mb={10}
                >
                        <Container maxWidth='sm' >
                                <MainSlider />
                        </Container>
                        {/* <Box overflow='hidden' mt={9.5} mb={3} style={{ backgroundImage: `url('/images/slider-pic.png')`, width: '100%', height: '17rem' }} className={classes.backgroundPicSlider}>
                                <img src='/images/slider-pic.png' width='100%' />
                        </Box> */}
                        <Grid
                                style={{
                                        marginBottom: "100px"
                                }}
                        >

                                {
                                        LoadingUser ? (
                                                <Loadings />
                                        ) : (

                                                <>
                                                        {
                                                                SearchUser === null ? <p>کسب و کاری با جست و جوی شما یافت نشد</p> : SearchUser &&
                                                                        SearchUser?.map((item) => (
                                                                                <>
                                                                                        <Grid
                                                                                                key={item?.id}
                                                                                                onClick={() => Router.push(`profile/${item?.id}`)}
                                                                                        >
                                                                                                <Box overflow='hidden' mt={3} style={{ backgroundImage: `url(' ${BASE_Image_Url} ${item?.wallpaper}')`, width: '100%', height: '17rem',borderRadius:'10px' }} className={classes.backgroundPicSlider}>
                                                                                                        <img src={`${BASE_Image_Url}${item?.wallpaper}`} width='100%'  />
                                                                                                </Box>
                                                                                                <Box my={1} display='flex' mx={2} alignItems='center' className={classes.avatorImageBox}>
                                                                                                        <Avatar alt="Cindy Baker" src={`${BASE_Image_Url}${item?.profileImage}`} />
                                                                                                </Box>

                                                                                                <Box component='span' fontWeight='800' display='flex'  className={classes.titleOfProfile} mr={3} mt={-5} style={{marginRight:'9rem'}}>{item?.businessName}</Box>
                                                                                        </Grid>
                                                                                </>
                                                                        ))
                                                        }
                                                </>
                                        )
                                }

                        </Grid>

                </Grid>

        );
}



export default StoreSearchResult;
