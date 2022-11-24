import React, { Fragment, useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import Loadings from "../../Common/Loading";

// mrx : cookie
import Cookies from "js-cookie";

// mrx : material ui
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// mrx : styles && slider style
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { theme } from "../../theme";

// mrx : api links
import {
  GET_SLIDER_BY_CITY_ID,
  BASE_Image_Url
} from "../../../pages/api/index";

// mrx : api
import { PostUrl, GetUrl } from "../../../pages/api/config";

// context
import { Contexts } from "../../../contexts/index";

// mrx : colors
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

// mrx : inside styles
const useStyles = makeStyles({
  sliderBoxPic: {
    marginTop: "8rem",
    marginBottom : "3rem"

  },
  backgroundPicSlider: {
    "& img": {
      borderRadius: "1rem"
    }
  }
});

const MainSlider = ({type=0}) => {
  const classes = useStyles();

  // mrx : context
  const { cityId } = useContext(Contexts);

  // mrx : slider setting
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    rtl: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // mrx : states
  const [slider, setSlider] = useState([]);
  const [LoadingSlider, setLoadingSlider] = useState(true);

  // mrx : get sliders
  useEffect(() => {
    // mrx : get Province
    GetUrl(GET_SLIDER_BY_CITY_ID + `?cityId=${Cookies.get("CITID")}&type=${type}`, {
      cityId: cityId
    }).then((res) => {
      if (res && res.status === 200) {
        // mrx : changing data to json
        const data = res?.data?.data;
        setSlider(data);
        setLoadingSlider(false);
      }
    });
  }, []);

  return (
    <>
      <Grid justify="center" className={classes.root}>
        <Slider {...settings} className={classes.sliderBoxPic}>
          {LoadingSlider ? (
            <Grid justify="center">
              <Loadings />
            </Grid>
          ) : (
            slider &&
            slider?.map((item) => (
              <Box
                key={item?.id}
                boxShadow={3}
                style={{
                  backgroundImage: `url({${BASE_Image_Url + item?.image}})`,
                  width: "100%",
                  height: "100%"
                }}
                className={classes.backgroundPicSlider}
              >
                {/* <p>{item.caption}</p> */}
                <img
                  src={`${BASE_Image_Url + item?.image}`}
                  height="100%"
                  width="100%"
                />
              </Box>
            ))
          )}
        </Slider>
      </Grid>
    </>
  );
};

export default MainSlider;
