import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { theme } from '../theme';
import { Box } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const ProvinceAndCityItem = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box component='ul' display='grid' p={0} style={{fontSize:'1.4rem',color:primary}} >
        <Box component='il' pb={2}>اصفهان</Box>
        <Box component='il' pb={2}>کرمان</Box>
        <Box component='il' pb={2}>شیراز</Box>
        <Box component='il' pb={2}>بوشهر</Box>
        <Box component='il' pb={2}>تهران</Box>
        <Box component='il' pb={2}>یزد</Box>
        <Box component='il' pb={2}>مشهد</Box>
      </Box>
    </div>
  );

  return (
    <div>
    <button type="button" onClick={handleOpen} className={classes.btnItem}>
      شیراز
    </button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  </div>
  );
};

const useStyles = makeStyles({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 3, 1),
    borderRadius:'.5rem',

  },


  btnItem:{
    border:'none',
    background:'transparent !important',
    color:primary,
    fontSize:'1.6rem',
    fontWeight:'bold'
  }

});

export default ProvinceAndCityItem;
