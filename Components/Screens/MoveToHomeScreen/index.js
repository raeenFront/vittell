import React from 'react';
import useStyles from './MoveToHomeScreen.style';
import { Box,Container} from '@material-ui/core';
import { theme } from '../../theme';
import Btn from '../../Common/Button';


//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


const MoveToHomeScreenIndex = () => {
    const classes = useStyles();

    return (

      <Container maxWidth='sm'>
      <Box display='flex'
       flexDirection='column'
       justifyContent='center'
       alignItems='center'
       height='100vh'
       className={classes.registerBusinessAccountBox}
       >
        <Box component='p'>
            کاربرگرامی
            <br/><br/>
            شمادرحال انتقال آگهی خود به صفحه اصلی میباشد.
            <br/>
            آگهی شما به مدت نامحدوددر صفحه اصلی نمایش داده میشود.
        </Box>


        <Box component='p' my={1} width='100%' textAlign='center' m={0}>
            هزینه انتقال به صفحه اصلی
        </Box>

        <Box component='span' style={{fontWeight:'900'}}>
            4000تومان
        </Box>


        <Box display='flex' flexDirection='column' alignItems='center' mt={3}>
          <Box component='span' mb={1} className={classes.offerText}>کدتخفیف</Box>
          <input className={classes.offerinput}/>
        </Box>

        <Box width='100%' mt={2} textAlign='center' className={classes.buttonSignUp}>
            <Btn variant="contained">پرداخت</Btn>
        </Box>

      </Box>
    </Container>



    );
}



export default MoveToHomeScreenIndex;
