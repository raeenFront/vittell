import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../theme';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const useStyles = makeStyles({
    buttonSignUp:{
        '& button':{
            width:'50%',
            fontSize:'1.3rem',
            fontWeight: '700',
            borderRadius: '.75rem',
            backgroundColor:secondary,
            color:'#ffff'
        }
    },
    registerBusinessAccountBox:{
        '& span':{
            fontSize:'1.4rem',
            fontWeight:'bold',
        },
        '& p':{
            fontSize:'1.5rem'
        }
    },
    offerText:{
      fontWeight: '800 !important',
        color:primary,
    },
    offerinput:{
        outline:'none',
        backgroundColor:'#c6c8c9',
        border:'none',
        borderRadius:'.75rem',
        padding:'6px 16px',
        width:'75%',
    }
});


export default useStyles;
