import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../theme';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const useStyles = makeStyles({
    avatorImageBox:{
        marginTop:'-4rem',
        '& .MuiAvatar-root':{
            width: theme.spacing(9),
            height: theme.spacing(9),
            border:'2px solid #fff',
        },
    },
    titleOfProfile:{
        color:primary,
        fontSize:'1.4rem',
    },
   backgroundPicSlider:{
     boxShadow: '0px -5px 3px 0px rgba(188,190,192,0.64)',
       '& img':{
           objectFit: 'cover',
           height: '100%',
       }
   }

});


export default useStyles;
