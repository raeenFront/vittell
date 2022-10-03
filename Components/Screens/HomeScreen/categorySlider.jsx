import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Router, { withRouter, useRouter } from 'next/router';
import { Button } from "@material-ui/core";


//icons 
import FirstIcon from '@material-ui/icons/Widgets';
// mrx : api links
import { GET_ALL_CATEGORY, GET_ALL_CATEGORYS } from "../../../pages/api/index";

// mrx : api
import { PostUrl, GetUrl, PostAuthUrl } from "../../../pages/api/config";

const textColor = '#888';
import  style from '../../../styles/myStyle.module.css';


const CatHome = ({ title }) => {
  const router = useRouter();
  //states
  //for showing the categories
  const [categories, setCategories] = useState([]);
  const classes = useStyles();
  const getCategories = () => {
    GetUrl(GET_ALL_CATEGORY).then((res) => {
      if (res && res?.status === 200) {
        setCategories(res?.data?.data);
        // setLoading(false);
      }
    });
  }
  useEffect(() => {
    getCategories();
  }, [])
  const handleClick = (category) => {
    localStorage.setItem("SearchInputs", JSON.stringify({
      category: category,
    }))
    localStorage.setItem("category", JSON.stringify({
      category
    }))
    router.push("/search");
  }
  return (
    <div className={`remove-scrollbar ${classes.categoryBox}`}>
      <Button className={style.firstItemIcon} >
        <FirstIcon style={{width:'32px',height:'2.5rem'}} />
      </Button >
      {
        categories?.filter((category) => category?.parentId === null)?.map((item) => (
          <Button className={classes.styleItem} key={item?.id} onClick={() => handleClick(item)}>{item?.name}</Button >
        ))
      }


    </div>
  );
};

const useStyles = makeStyles({
  styleItem: {
    color: textColor,
    backgroundColor: '#fff',
    borderRadius: '8px',
    marginTop: '2rem',
    marginLeft: '1rem'
  },
  // firstItemIcon:{
  //   backgroundColor:'#ef4b4c',
  //   borderRadius: '8px',
  //   marginTop: '2rem',
  //   marginLeft: '1rem',
  //   color: '#fff',
  //   padding: '4px 4px',
  //   marginRight:'1rem',
  //   minWidth:'32px',
  // },
  categoryBox: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
    overflowY:'hidden',
    width: '100%',
    scrollbarWidth:'none',
    paddingBottom:'10px',
  },
});

export default CatHome;
