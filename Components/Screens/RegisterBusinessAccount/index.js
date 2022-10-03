import React from "react";
import useStyles from "./RegisterBusinessAccount.style";
import { Box, Container } from "@material-ui/core";
import { theme } from "../../theme";
import Btn from "../../Common/Button";


//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


const RegisterBusinessAccountIndex = () => {
  const classes = useStyles();

  return (

    <Container maxWidth="sm">
      <Box display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        className={classes.registerBusinessAccountBox}
      >
        <Box component="p">
          کاربرگرامی
          <br />
          <br />
          شما در حال ثبت اکانت تجاری خود در سامانه ویتل هستید.
          <br />
          هزینه ثبت اکانت برای مدت یکسال
          <Box component="span" style={{ fontWeight: "900" }}>
            10000
            تومان 
          </Box>
          می باشد
        </Box>





        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
          <Box component="span" mb={1} className={classes.offerText}>کدتخفیف</Box>
          <input className={classes.offerinput} />
        </Box>

        <Box width="100%" mt={2} textAlign="center" className={classes.buttonSignUp}>
          <Btn variant="contained">پرداخت</Btn>
        </Box>

      </Box>
    </Container>


  );
}



export default RegisterBusinessAccountIndex;
