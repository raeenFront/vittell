import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../theme';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  imageList: {
    width: 500,
    marginBottom: 100,
  },
  selectBoxTextFeildCheck: {
    '& select': {
      border: 'none',
      outline: 'none',
      borderRadius: '.7rem',
      backgroundColor: '#d1d3d487',
      color: primary,
      width: '49%',
      fontWeight: '700',
      padding: '.75rem',
      boxShadow: '0px 14px 16px 0px rgba(188, 190, 192, 0.004)',
    }
  },
  formCheckBoxSearch: {
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: secondary,
    },
    '& .MuiTypography-body1': {
      color: primary,
      fontFamily: 'IRANYekan',
      fontSize: '1.3rem',
      fontWeight: '700'
    },
    '& .MuiSvgIcon-root': {
      width: '2rem',
      height: '2rem'
    },
    '& .MuiFormControlLabel-root': {
      flexDirection: 'row-reverse',
      marginTop: '150px',
    }
  },
  btnItemPay: {
    width: '45%',
  },
  selectBoxNormalProfile: {
    '& select': {
      width: '45% !important',
      justifyContent: 'space-between !important',
      boxShadow: ' 3px 4px 3px 0px rgb(188 190 192 / 64%)!important',
    },
  },
  searchItemBox: {
    '& input': {
      padding: '.75rem .25rem !important',
    },
    '& .MuiInput-root': {
     // border: '1px solid  rgb(33, 29, 112)',
      borderRadius: '.5rem',
      backgroundColor: '#fff',
      height: '40px'
     // boxShadow: ' 1px 2px 3px 2px rgba(188, 190, 192, 0.5)',
    },
    marginTop: '3rem',
    marginLeft: '20px'

  }


});


export default useStyles;
