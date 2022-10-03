import React from 'react';
import { Box, Button, Container, Grid } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { theme } from '../../../theme';
import DiscountSlider from './DiscountSlider';
import TitleBox from '../../../Common/TitleBox';
import { makeStyles } from '@material-ui/core/styles';
// import { theme } from '../theme';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const useStyles = makeStyles({
    discountMainBox: {
        background: 'linear-gradient(to  bottom, #EDECE7, #fff)',
                [theme.breakpoints.down('sm')]: {
            height: '18rem !important',

        },

        '& h4': {
            fontWeight: 'bold',

        }
    }

})


const DiscountIndex = () => {
    const classes = useStyles();
    return (
        <Box my={2} py={2} className={classes.discountMainBox} height='25rem'>
            <Container maxWidth='sm'>

                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center" 
                    style={{marginBottom:"6rem"}}>

                    <TitleBox
                        title='پرتخفیف ها'
                    />

                    <Button variant="text" color='inherit' endIcon={<ArrowBackIosRoundedIcon />} onClick={() => {
                        alert('همه تخفیف ها');
                    }}>
                        همه
                    </Button>
                </Grid>

                <DiscountSlider />
            </Container>
        </Box>
    );
}

export default DiscountIndex;
