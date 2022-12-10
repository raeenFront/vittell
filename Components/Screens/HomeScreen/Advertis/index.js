import React, { Fragment, useState, useEffect, useContext } from "react";
import Loadings from "../../../Common/Loading";
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

// mrx : material ui
import { Box, Container, Grid } from '@material-ui/core';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : styles
import { theme } from '../../../theme';

// mrx : components
import TitleBox from '../../../Common/TitleBox';
import BlogBox from '../../../Common/BlogBox';

// mrx : api links
import { GET_POSTS_HOME_PAGE_BY_CITY_ID, BASE_Image_Url } from "../../../../pages/api/index";

// mrx : api
import { PostUrl, GetUrl } from "../../../../pages/api/config";

// context
import { Contexts } from '../../../../contexts/index';
import { getFontOverrideCss } from "next/dist/server/font-utils";

// mrx: colors
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


const AdvertisIndex = () => {

    // mrx : states
    const [homePosts, setHomePosts] = useState([]);
    const [LoadingAdvertis, setLoadingAdvertis] = useState(true);
    const [PostLeinght, setPostLeinght] = useState(16);

    // mrx : context
    const { cityId, DefultCity } = useContext(Contexts);

    const PostID = typeof window !== "undefined" ? localStorage.getItem("PostID") || '1' : '1';

    useEffect(() => {
        scroller.scrollTo(PostID, {
            delay: 50,
            smooth: 'easeInOutQuint',
        })
    // }, 2000)
    })
const getHomePost=()=>{
    // mrx : get Province
    GetUrl(GET_POSTS_HOME_PAGE_BY_CITY_ID + `?cityId=${Cookies.get("CITID")}`,
    {
        cityId: Cookies.get("CITID")
    }
).then((res) => {
    if (res && res.status === 200) {
        // mrx : changing data to json
        const data = res.data.data;
        setHomePosts(data);
        setPostLeinght(data?.length);
        setLoadingAdvertis(false);
    }
});
}
    // mrx : get sliders
    useEffect(() => {

        getHomePost();
    }, []);

    useEffect(()=>{
        getHomePost();
    },[cityId])

    return (
        <Container
            style={{
                marginBottom: 100
            }}
            maxWidth='sm'
        >
            <Grid style={{ display: " inline-flex", marginTop: "20px",width:'100%' }}>
                <Box style={{ width: "50%" }} flexWrap='wrap' mb={10}>
                    {
                        <>
                            {
                                homePosts &&
                                homePosts?.filter((item, idx) => idx % 2 == 1).map((item) => (
                                    <BlogBox
                                        id={item?.id}
                                        key={item?.id}
                                        href={`/posts/${item.id}`}
                                        homePic={BASE_Image_Url + item.image}
                                        title={item.title}
                                        description={item.description}
                                        off={item?.percentage}
                                    />
                                ))
                            }
                        </>
                    }
                </Box>
                <Box style={{ width: "50%" }} flexWrap='wrap' mb={10}>
                    {
                        <>
                            {
                                homePosts &&
                                homePosts?.filter((item, idx) => idx % 2 == 0).map((item) => (
                                    <BlogBox
                                        id={item?.id}
                                        key={item?.id}
                                        href={`/posts/${item.id}`}
                                        homePic={BASE_Image_Url + item.image}
                                        title={item.title}
                                        description={item.description}
                                        off={item?.percentage}

                                    />
                                ))
                            }
                        </>
                    }
                </Box>
            </Grid>
        </Container >
    );
}

export default AdvertisIndex;
