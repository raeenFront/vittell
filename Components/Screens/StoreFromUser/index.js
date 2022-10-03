import React from 'react';
import useStyles from './StoreFromUser.style';
import { Box, Container, Avatar } from '@material-ui/core';
import { theme } from '../../theme';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PhoneIcon from '@material-ui/icons/Phone';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';
import BlogBox from '../../Common/BlogBox';
import SocialMediaIcon from '../../Common/SocialMediaIcon';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TitleBox from '../../Common/TitleBox';
//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


const StoreFromUser = () => {
  const classes = useStyles();

  return (
    <>
      <Box mt={8} boxShadow={3} style={{ backgroundImage: `url('/images/slider-pic.png')`, width: '100%', height: '17rem' }} className={classes.backgroundPicSlider}>
        <img src='/images/AccountPic.png' height='100%' width='100%' />
      </Box>
      <Box mx={1} display='flex' justifyContent='space-between' alignItems='center' className={classes.avatorImageBox}>
        <Box position='relative' mt={-5}>
          <Avatar alt="Cindy Baker" src='/images/AvatorImagePrifile.png' className={classes.avatorImage} />

        </Box>

      </Box>

      <Box component='span' fontWeight='800' display='flex' justifyContent='center' className={classes.titleOfProfile} mt={-3.5} mr={2}>سالن آرایش و زیبایی مهتاب</Box>

      <Box component='span' display='flex' mx={2} className={classes.biographytitle} mt={2} mb={10}>بیوگرافی</Box>


      <Container maxWidth='sm'>
        <Box my={2} pb={2} display='flex' width='100%' alignItems='center' justifyContent='center' className={classes.socialMediaBox}>
          <SocialMediaIcon
            Icon={<img src='/images/forthIcon.png' width='80%' />}
          />
          <SocialMediaIcon
            Icon={<img src='/images/thirdIcon.png' width='80%' />}
          />
          <SocialMediaIcon
            Icon={<InstagramIcon />}
          />
          <SocialMediaIcon
            Icon={<WhatsAppIcon />}
          />
        </Box>

        <TitleBox
          title='آگهی های فروشگاه' />

        <Box display='flex' flexWrap='wrap' mt={2} mb={10}>
          <BlogBox
            href="#"
            homePic='/images/homeBoxPic1.png'
            description='استخدام مسئول فروش'
          />
          <BlogBox
            href="#"
            homePic='/images/homeBoxPic2.png'
            description='مبلمان ودکوراسیون'
          />
          <BlogBox
            href="#"
            homePic='/images/homeBoxPic1.png'
            description='استخدام مسئول فروش'
          />
          <BlogBox
            href="#"
            homePic='/images/homeBoxPic2.png'
            description='استخدام مسئول فروش'
          />

        </Box>


      </Container>

    </>

  );
}



export default StoreFromUser;
