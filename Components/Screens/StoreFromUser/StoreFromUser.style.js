import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../theme';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const useStyles = makeStyles({
  avatorImageBox:{
    '& .MuiAvatar-root':{
        width: theme.spacing(9),
        height: theme.spacing(9),
        border:'3px solid #fff',
    },
    '& span':{
        color: 'rgb(33, 29, 112)',
        fontSize:'1.6rem',
        fontWeight:'bold',
    },
    '& svg':{
      color:secondary,
    }
},
avatorImage:{
  boxShadow: '0px -2px 13px 2px rgba(188,190,192,0.64)',
},
    titleOfProfile:{
        color:primary,
        fontSize:'1.5rem',
    },
    biographytitle:{
        color:'rgb(167, 169, 172)',
        fontSize:'1.5rem',

    },
    socialMediaBox:{
        borderBottom:`1px solid ${primary}`
    },
    backgroundPicSlider:{
        '& img':{
            objectFit: 'cover',
            height:'100%'
        }
    }
});


export default useStyles;
