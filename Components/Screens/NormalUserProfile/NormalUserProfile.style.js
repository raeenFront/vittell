import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../theme';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const useStyles = makeStyles({
  selectBoxTextFeildCheck: {
    '& select': {
      border: 'none',
      outline: 'none',
      borderRadius: '.5rem',
      backgroundColor: '#d1d3d487',
      color: primary,
      width: '49%',
      fontWeight: '700',
      padding: '.75rem',
      boxShadow: '0px 14px 16px 0px rgba(188, 190, 192, 0.004)',
    }
  },
  btnItemPay:{
    width:'50%'
  },
  selectBoxNormalProfile:{
    '& select':{
      width:'45% !important',
      justifyContent:'space-between !important',
      boxShadow: ' 3px 4px 3px 0px rgb(188 190 192 / 64%)!important',
    },
  }

});


export default useStyles;
