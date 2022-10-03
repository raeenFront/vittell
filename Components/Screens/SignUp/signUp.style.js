import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../theme';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const useStyles = makeStyles({
  forgetPasswordLink: {
    fontSize: '1.2rem',
    color: primary,
    cursor: 'pointer',
  },
  buttonSignUp: {
    '& button': {
      width: '40%',
      fontSize: '1.3rem',
      fontWeight: '700',
      borderRadius: '.75rem'
    }
  },
  selectItemTextFeild: {
    width: '95%',
    border: 'none',
    outline: 'none',
    borderRadius: '.5rem',
    marginTop: '0',
    marginBottom: '1.1rem',
    padding: '.75rem',
    fontSize: '1.2rem',
  },
  textFiledItemBox: {
    '& .MuiInputAdornment-positionEnd': {
      padding: '0 !important',
      margin: '0!important'
    }
  }
  ,
  mt10:{
    marginTop:'10px',
  },
});


export default useStyles;
