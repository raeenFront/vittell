import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../theme";
import { Box, Grid } from "@material-ui/core";
import Link from "next/link";

const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;
const colorDescription = theme.palette.initial.main

const BlogBox = ({ off, from, id, homePic, description, href, Offer, title }) => {
  const classes = useStyles();

  return (
    <Grid id={id ? id : ""} style={{ width: "100%" }}>
      <Link href={href}>
        <Box
          className={classes.sliderItemBox}
          // width="50%"
          style={{}}
          overflow="hidden"
          display="flex"
          alignItems="center"
          flexDirection="column"
          mb={2}
        >
          <Box
            overflow="hidden"
            mb={0.5}
            className={classes.sliderBoxPic}
            boxShadow={3}
            width="92%"
          >
            {off !== 0 ? (
              // <p className={classes.PostOff}>%{off}</p>
              <Box

                mx="auto"
                textAlign="center"
                className={classes.bageSliderBox}
              >
                <div className={classes.badge_red}>
                  <div className={classes.badge_percentage}>%{off}</div>
                </div>

              </Box>
            ) : (
              ""
            )}
            <img
              style={{ marginBottom: "-5px" }}
              src={homePic}
              width="100%"
              height="auto"
            />
          </Box>
          <Box component="span" textAlign="right" width="100%" mr={2}>
            {title}<br />
            <span style={{ fontSize: '11px', color: '#acacac', marginRight: '1px' }}>
              {description?.split(' ')?.map((item, index) => index < 2 ? item : '')}...
            </span>
          </Box>
        </Box>
      </Link>
    </Grid>
  );
};

const useStyles = makeStyles({
  postDescription: {
    color: '#acacac',
    fontSize: '11px',
    textAlign: 'right',
  },
  bageSliderBox: {
    zIndex: "100"
  }, 
  badge_percentage: {
    color: white,
    fontSize: '13px',
    position: 'relative',
    top: '1rem',
  },

  badge_red: {
    backgroundColor: primary,
    borderRadius: '50%',
    width: '3.5rem',
    height: '3.5rem',
    position: 'absolute',
    left: '2px',
    bottom: '-5%'
  },
  

  postDecriptionParent: {
    width: '65%',
    textAlign: 'right',
  },
  sliderItemBox: {
    "& img": {
      objectFit: "cover",
      borderRadius: "10px",
    },
    "& span": {
      fontSize: "1.3rem",
      fontWeight: "800",
      color: colorDescription,
      textOverflow: "ellipsis",
      overflow: "hidden",
      direction: "rtl",
      width: "74%",
      marginRight: "-17px",
      fontSize: "1.4rem",
      fontWeight: "bold",
      marginTop: "5px"
    }
  },
 
  sliderBoxPic: {
    position: "relative",
    borderRadius: "1rem",
    border: `1px solid #211d7073`,
    overflow: "visible",
  },
  PostOff: {
    bottom: "-20px",
    position: "absolute",
    color: "#ffffff",
    background: primary,
    // background: "#ff8600",
    padding: "10px",
    borderRadius: '50%',
    left: "5px"
  },
  

});

export default BlogBox;
