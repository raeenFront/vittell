import React, { Fragment, useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Loadings from "../../../Common/Loading";
import LinesEllipsis from "react-lines-ellipsis";

// mrx : material ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

// mrx : cookie
import Cookies from "js-cookie";

// mrx : styles of slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { theme } from "../../../theme";

// context
import { Contexts } from "../../../../contexts/index";

// mrx : api links
import {
  GET_OFFER_SLIDER_BY_CITY_ID,
  BASE_Image_Url
} from "../../../../pages/api/index";

// mrx : api
import { PostUrl, GetUrl } from "../../../../pages/api/config";

// mrx : colors
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;
const black = theme.palette.initial.main;

const DiscountSlider = () => {
  const classes = useStyles();

  // mrx : context
  const { cityId } = useContext(Contexts);

  // mrx : sldier setting
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: true,
    autoplay: false
  };

  // mrx : states
  const [offerSlider, setOfferSlider] = useState([]);
  const [LoadingDisCount, setLoadingDisCount] = useState(true);

  // mrx : get sliders
  useEffect(() => {
    // mrx : get Province
    GetUrl(GET_OFFER_SLIDER_BY_CITY_ID + `?cityId=${Cookies.get("CITID")}`, {
      cityId: cityId
    }).then((res) => {
      if (res && res.status === 200) {
        const data = res?.data?.data;
        setOfferSlider(data);
        setLoadingDisCount(false);
      }
    });
  }, []);

  return (
    <>
      <Box
        style={{
          marginTop: 25
        }}
        className="discount-slider"
      >
        <Slider {...settings} className={classes.sliderBoxPic}>
          {LoadingDisCount
            ? " "
            : offerSlider &&
              offerSlider.reverse()?.map((item) => (
                <div key={item?.id}>
                  <Link href={`/posts/${item?.id}`}>
                    <Box>
                      {item.percentage !== 0 ? (
                        <Box
                          position="relative"
                          mx="auto"
                          textAlign="center"
                          className={classes.bageSliderBox}
                        >
                          <img
                            // src="/images/bageItemPic.png"
                            className={classes.badgeSliderBoxPic}
                            style={{backgroundColor:primary , borderRadius:'50px'}}
                          />
                          <Box
                            color="#fff"
                            width="100%"
                            top="-1rem"
                            left="5.3rem"
                            position="absolute"
                            className={classes.badgeSliderSpanText}
                          >
                            <Typography variant="h5">
                              %{item.percentage}
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        ""
                      )}
                      <Box
                        className={classes.sliderItemBox}
                        // position="relative"
                        style={{ overflow: "hidden" }}
                      >
                        <img src={BASE_Image_Url + item?.image} />
                        <LinesEllipsis
                          style={{ paddingRight: "10px" }}
                          className={classes.sliderOff}
                          text={`${item?.title} ...`}
                        />
                      </Box>
                    </Box>
                  </Link>
                </div>
              ))}
        </Slider>
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  badgeSliderBoxPic: {
    display: "inline!important",
    transform: "translateY(3rem)!important",
    height: "5rem !important",
    width: "5rem !important",
    [theme.breakpoints.down("sm")]: {
      height: "3.5rem !important",
      width: "3.5rem !important"
    },
    position: "absolute",
    top: "2.5rem",
    right: "0.5rem"
  },
  sliderOff: {
    color: black,
    width: "100%",
    overflow: "hidden",
    direction: "rtl",
    fontSize: "1.4rem",
    marginTop: "5px",
    fontWeight: "bold",
    // marginRight: "-17px",
    textOverflow: "ellipsis"
  },
  sliderBoxPic: {
    marginTop: "-50px",
    "& .slick-dots li button": {
      display: "none !important"
    }
  },
  sliderItemBox: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "1rem",
    boxShadow: " 0px 12px 13px 0px rgba(188, 190, 192, 0.004)",
    "& img": {
      width: "92%",
      borderRadius: "1rem",
      height: "15rem",
      objectFit: "cover",
      boxShadow: "0px -5px 2px 0px rgba(188,190,192,0.64)",

      [theme.breakpoints.down("sm")]: {
        height: "9rem",
        width: "90%"
      }
    },
    "& span": {
      textOverflow: "ellipsis",
      overflow: "hidden",
      direction: "rtl",
      width: "74%",
      marginRight: "-17px",
      fontSize: "1.4rem",
      fontWeight: "bold",
      marginTop: "5px",
      color: primary
    }
  },
  bageSliderBox: {
    zIndex: "100"
  },
  badgeSliderSpanText: {
    "& h5": {
      [theme.breakpoints.down("sm")]: {
        lineHeight: "1rem !important",
        marginTop: "8rem",
        
      }
    }
  }
});

export default DiscountSlider;