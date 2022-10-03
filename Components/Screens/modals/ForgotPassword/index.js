import React from 'react';
import useStyles from './ForgotPassword.style';
import { Box, Container} from '@material-ui/core';
import { theme } from '../../../theme';
import TextFieldItem from '../../../Common/TextFieldItem';
import logoPic from '../../../../public/images/singuplogo.png';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


const ForgotPasswordModal = () => {
    const classes = useStyles();
    const [password, setPassword] = React.useState(false);
      const [tryPassword, setTryPassword] = React.useState(false);


      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    return (

            <Box height='85vh' mt={8} style={{backgroundImage:`url('/images/SignUpBackGround.png')`,objectFit:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'}}>

              <Container maxWidth='sm'>
                  <Box pt={8} display='flex' flexDirection='column' alignItems='center'  height='100vh'>

                    <Box width='20rem' overflow='hidden'>
                      <img src='/images/singuplogo.png' width='100%'/>
                    </Box>

                    <Box mt={5}   display='flex' width='100%' flexDirection='column' justifyContent='center' alignItems='center'>
                    <TextFieldItem
                    inputProps='رمز جدید'
                    type={password ? 'text' : 'password'}
                        icon={
                        <IconButton
                        aria-label="toggle password visibility">
                            {password ? <Visibility
                             onClick={()=> setPassword(!password)}
                            /> : <VisibilityOff
                            onClick={()=> setPassword(!password)}/>}
                            </IconButton>
                        }
                    />

                  <TextFieldItem
                    inputProps='تکرار رمز جدید'
                    type={tryPassword? 'text' : 'password'}
                        icon={
                        <IconButton
                        aria-label="toggle password visibility"
                                >
                            {tryPassword? <Visibility
                            onClick={()=> setTryPassword(!tryPassword)}
                            /> : <VisibilityOff
                            onClick={()=> setTryPassword(!tryPassword)}
                            />}
                            </IconButton>
                        }
                    />
                    </Box>



                    <Box mt={5} width='100%' textAlign='center' className={classes.buttonSignUp}>
                        <Button variant="contained" width='30%'>تغییر رمز</Button>
                    </Box>

                  </Box>
                  </Container>

            </Box>

    );
}



export default ForgotPasswordModal;
