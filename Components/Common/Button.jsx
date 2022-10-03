import { withStyles } from "@material-ui/core";
import { Button } from '@material-ui/core';
import { theme } from "../theme";

const Btn = withStyles({
    root: {
    fontSize: '1.4rem !important',
    borderRadius:'200px',
    padding:'0px 10px 0px 10px',
    height: '4rem',
    color:'#fff',
   // background: 'linear-gradient(90deg, rgb(244,85,12) 0%, rgb(232 115 61) 100% )',
   backgroundColor: ' rgb(239 75 76)',
    },

})(Button);

export default Btn;



