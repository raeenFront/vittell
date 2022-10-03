import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../theme';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const useStyles = makeStyles({
    buttonSignUp:{
        '& button':{
          width:'50%',
          fontSize:'1.3rem',
          fontWeight: '800',
          borderRadius: '.5rem',
          color:primary,
        }
    },
    forgetPasswordLink:{
        fontSize:'1.2rem',
        color:primary,
        cursor:'pointer',
    },

});


export default useStyles;
