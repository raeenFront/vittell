import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loadings from '../../..//Common/Loading';
import Router, { useRouter, withRouter } from 'next/router';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { v4 as uuidv4 } from 'uuid';

// material ui
import { Box, Grid, Container, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Clear';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : style
import { theme } from '../../../theme';
import { makeStyles } from '@material-ui/core/styles';

// mrx : components
import Btn from '../../../Common/Button';
import BlogBox from '../../../Common/BlogBox';
import ProvinceAndCity from '../../../Common/ProvinceAndCity';
import TitleBox from '../../../Common/TitleBox';
import Slide from '@material-ui/core/Slide';
import Modal from '@material-ui/core/Modal';
import BackIcon from "@material-ui/icons/ArrowBackIos"
import { route } from 'next/dist/server/router';
import TextFieldItem from '../../../Common/TextFieldItem';



//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;



const useStyles = makeStyles({
  itemTitle: {
    width: '45%',
  },
  deleteBox: {
    width: '10%',
    position: 'relative',
  },
  deleteIcon: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    color: primary,
    cursor: 'pointer',
    fontSize: '2.5rem',
  },
  text: {
    fontSize: '13px',
  },
  text_red: {
    fontSize: '13px',
    color: '#ef4b4c',
  },
  text_blue: {
    fontSize: '13px',
    color: '#0047BB',
  },
  imgStyle: {
    width: '30%'
  },
  imgText: {
    marginBottom: '0px',
    marginTop: '-5px',
  },
  textBox: {
    width: '100%',
    textAlign: '-webkit-center',
    textAlign: '-moz-center',
    textAlign: 'center',
  },
  buttonBuy: {
    backgroundColor: '#ef4b4c',
    padding: '10px 15px',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  cancelBtn: {
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '10px',
    color: '#000',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'center',
    marginRight:'10px',
  },
  containerSelect: {
    backgroundColor: "#EDECE7",
    position: "absolute",
    width: "80%",
    // height: "100%",
    padding: "20px",
    overflow: "hidden",
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    display: 'block',
    borderRadius: '10px',   
  },
  buyBox: {
    width: "100%",
    textAlign: 'center',
    marginTop: "20px",
    marginBottom: "20px",
    display: 'flex',
    justifyContent: 'center',
  },
  red_text_price: {
    color: primary,
    fontSize: '14px',
  },
  itemBox: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px',
  },
  addItemBox: {
    width: '100%',
    cursor: 'pointer',
    textAlign: 'center',
  },
})

//type 1 home
//type 2 takhfif
//type 3 user pin
const EditPrice = ({ data, handleModal, handleEdit }) => {
  const router = useRouter();
  const classes = useStyles();
  const [ShowModalTell, setShowModalTell] = useState(true);
  //for storing the edited data
  const [editedData, setEditedData] = useState(data!==null?data:[]);

  const editTitle = (id, value) => {
    let tempdata = editedData;
    const price = tempdata?.filter(a => a.id === id)[0];
    price.title = value;
    tempdata = editedData?.map((a) => (
      a.id === id ? price : a
    ))
    setEditedData(tempdata);
  }
  const editItemTitle = (titleId, id, value) => {
    let tempdata = editedData;
    let price = tempdata?.filter(a => a.id === titleId)[0];
    const item = price?.priceItem?.filter(b => b.id === id)[0];
    item.itemTitle = value;
    price.priceItem = price?.priceItem?.map((a) => a.id === id ? item : a);
    tempdata = editedData?.map((a) => (
      a.id === titleId ? price : a
    ))
    setEditedData(tempdata);

  }
  const editItemValue = (titleId, id, value) => {
    let tempdata = editedData;
    let price = tempdata?.filter(a => a.id === titleId)[0];
    const item = price?.priceItem?.filter(b => b.id === id)[0];
    item.itemValue = value;
    price.priceItem = price?.priceItem?.map((a) => a.id === id ? item : a);
    tempdata = editedData?.map((a) => (
      a.id === titleId ? price : a
    ))
    setEditedData(tempdata);
  }
  const deleteItem = (titleId, id) => {
    let tempdata = editedData;
    let price = tempdata?.filter(a => a.id === titleId)[0];
    price.priceItem = price?.priceItem?.filter(a => a.id !== id);
    tempdata = editedData?.map((a) => (
      a.id === titleId ? price : a
    ))
    setEditedData(tempdata);
  }
  const addNewItem = (id) => {
    let tempdata = editedData;
    let price = tempdata?.filter(a => a.id === id)[0];
    const newItem = {
      itemTitle: '',
      itemValue: '',
      id: uuidv4()
    };
    console.log(newItem);
    price.priceItem.push(newItem);
    tempdata = editedData?.map((a) => (
      a.id === id ? price : a
    ))
    setEditedData(tempdata);
  }
  const addNewPrice = () => {
    const newPrice = {
      title: '',
      id: uuidv4(),
      priceItem: []
    }
    let tempdata = editedData;
    setEditedData([...tempdata, newPrice]);
  }

  return (


    <Modal
      open={ShowModalTell}
      onClose={() => handleModal(false)}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "scroll",
      }}
    >
      <Slide direction="up" in={ShowModalTell} mountOnEnter unmountOnExit>
        <Grid className={classes.containerSelect} container justify="center">
          <div style={{ textAlign: 'right', width: '100%' }}>
            <DeleteIcon style={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => { handleModal(false); setEditedData(data) }} />
          </div>
          {/* <Box component='span' display='flex' mt={3} mb={1} justifyContent='center' className={classes.red_text_price}  >
            قیمت ها به تومان می باشد
          </Box> */}
          {/* <Box mb={3} pb={2} style={{ textAlign: 'center', borderBottom: '2px solid #aaa' }}></Box> */}

          

          <div className={classes.addItemBox} onClick={() => addNewPrice()}>
          <h2>آیا از خروج حساب خود مطمئن هستید ؟</h2>

            {/* <AddIcon style={{ color: primary, fontSize: '3rem' }} /> */}
          </div>

          <div className={classes.buyBox}>
            <div className={classes.buttonBuy} onClick={() => { handleModal(false); handleEdit(); }} >خروج</div>
            <div className={classes.cancelBtn} onClick={() => { handleModal(false);  }} >انصراف</div>
          </div>

        </Grid>
      </Slide>
    </Modal>

  );
}



export default EditPrice;
