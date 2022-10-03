import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../theme';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;
const black = theme.palette.initial.main;

const useStyles = makeStyles({
    containerSelect: {
        maxWidth: "50rem",
        backgroundColor: "#fafafa",
        position: "absolute",
        width: "100%",
        bottom: "0px",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        padding: "20px",
        overflow: "scroll",
    },
    TextArea: {
        width: "95%",
        background: "#fff",
        border: "navajowhite",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        fontWeight: "bolder",
        color: "#211d70 !important",
        fontSize: "13px",
    },
    ButtonSend: {
        background: "#eaeaea",
        width: "100%",
        fontSize: "15px !important",
        color: "#585591",
        borderRadius: "20px",
        border: "solid 1px #b7b2b2",
        marginTop: 50
    },
    selectBoxTextFeildCheck: {
        '& select': {
            border: 'none',
            outline: 'none',
            borderRadius: '.5rem',
            backgroundColor: '#d1d3d487',
            color: black,
            width: '49%',
            fontWeight: '700',
            padding: '.75rem',
            boxShadow: '0px 14px 16px 0px rgba(188, 190, 192, 0.004)',
        }
    },
    Input: {
        width: "100%",
        border: ' none',
        background: '#e6e6e6d6',
        height: ' 42px',
        marginBottom: ' 15px',
        borderRadius: ' 20px',
        padding: ' 20px',
        outline: ' none',
        color: '#2f2e2e',
    },
    buttonSignUp: {
        '& button': {
            width: '45%',
            fontSize: '1.3rem',
            fontWeight: '700',
        }
    },
    avatorImageBox: {
        marginTop: '-4rem',
        '& .MuiAvatar-root': {
            width: theme.spacing(9),
            height: theme.spacing(9),
            border: '2px solid #fff',
        },
        '& svg': {
            color: '#fff',
            fontSize: '2rem',
            marginBottom: '2rem'
        },
        '& .MuiAvatar-img': {
            backgroundColor: '#d1d3d4',
            objectFit: 'contain'
        }
    },
    choosePicItem: {
        color: "#000000d4",
        fontSize: "1.4rem",
        marginTop: "100px",
        background: "#cacacaa1",
        padding: "20px 10px",
        borderRadius: "10px",
    },
    textFieldItemBox: {
        '& .MuiTextField-root': {
            [theme.breakpoints.up('sm')]: {
                width: '90% !important',
            },
        },
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center'
        },
    },
    formCreatItemBox: {
        '& p': {
            fontWeight: '700'
        },
    },
    selectItemTextFeild: {
        width: '49% !important',
        border: 'none',
        color: primary,
        outline: 'none',
        borderRadius: '.5rem',
        marginTop: '0',
        marginBottom: '1.1rem',
        backgroundColor: '#d1d3d487',
        padding: '.75rem',
        fontSize: '1.4rem',
        fontWeight: '700'
    },
    socialArea:{
        borderBottom: `2px solid #b4b4b4`,
        borderTop: `2px solid #b4b4b4`,
        padding:'20px 0px 20px 0px'
    }

});


export default useStyles;
