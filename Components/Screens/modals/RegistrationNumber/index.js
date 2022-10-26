import React from 'react';
import useStyles from './RegistrationNumber.style';
import { Box, Container} from '@material-ui/core';
import { theme } from '../../../theme';
import TextFieldItem from '../../../Common/TextFieldItem';
import Button from '@material-ui/core/Button';


//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


const RegistrationNumberModal = () => {
    const classes = useStyles();

    return (

            <Box height='85vh' mt={8} style={{backgroundImage:`url('/images/SignUpBackGround.png')`/*,objectFit:'cover'*/,backgroundPosition:'center',backgroundRepeat:'no-repeat'}}>
                 <Container maxWidth='sm'>
                  <Box pt={8} display='flex' flexDirection='column' alignItems='center'  height='100vh'>

                    <Box width='20rem' overflow='hidden'>
                      <img src='/images/singuplogo.png' width='100%'/>
                    </Box>

                    <Box mt={5}   display='flex' width='100%' flexDirection='column' justifyContent='center' alignItems='center'>


                  <TextFieldItem
                    inputProps='شماره تلفن خودرا واردکنید'
                    type='number'
                    />
                    </Box>



                    <Box mt={5} width='100%' textAlign='center' className={classes.buttonSignUp}>
                        <Button variant="contained" width='30%'>تایید</Button>
                    </Box>

                  </Box>
                  </Container>
            </Box>

    );
}



export default RegistrationNumberModal;
