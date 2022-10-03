import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { theme } from '../theme';
import { Box } from "@material-ui/core";

const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const ProvinceAndCity = () => {
  const classes = useStyles();


  return (
    <Box display='flex' width='100%' justifyContent='space-evenly' className={classes.selectBoxTextFeildCheck}>
    <select
        className={classes.selectItemTextFeildCheck}
        id="demo-simple-select-outlined22"
        >
        <option value={0} selected="selected" disabled="disabled">استان</option>
        <option value={0} selected="selected">شیراز</option>
        <option value={0} selected="selected">اصفهان</option>
        <option value={0} selected="selected">تهران</option>
        <option value={0} selected="selected">کرمان</option>
    </select>

    <select
        className={classes.selectItemTextFeildCheck}
        id="demo-simple-select-outlined222"
       >

        <option selected="selected" disabled="disabled">شهر</option>
        <option value={0} selected="selected">لار</option>
        <option value={0} selected="selected">جهرم</option>
        <option value={0} selected="selected">لامرد</option>
        <option value={0} selected="selected">مرودشت</option>
    </select>

</Box>
  );
};

const useStyles = makeStyles({
    selectBoxTextFeildCheck: {
      '& select':{
          border:'none',
          outline:'none',
          borderRadius:'.5rem',
          backgroundColor: '#d1d3d487',
          color:primary,
          width:'49%',
          fontWeight:'700',
          padding: '.75rem',
          boxShadow: '0px 14px 16px 0px rgba(188, 190, 192, 0.004)',
      }
    },

});

export default ProvinceAndCity;
