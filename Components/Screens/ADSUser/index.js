import React from 'react';
import { Box,Container,Avatar,Typography} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TelegramIcon from '@material-ui/icons/Telegram';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Btn from '../../Common/Button';
import SocialMediaIcon from '../../Common/SocialMediaIcon';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PhoneIcon from '@material-ui/icons/Phone';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../theme';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const useStyles = makeStyles({
      avatorImageBox:{
        marginTop:'8rem',
        '& .MuiAvatar-root':{
            width: theme.spacing(8),
            height: theme.spacing(8),
            border:'3px solid #fff',
        },
        '& span':{
            color: 'rgb(33, 29, 112)',
            fontSize:'1.6rem',
            fontWeight:'800',

        }
    },
      avatorImage:{
        boxShadow: '0px -2px 13px 2px rgba(188,190,192,0.64)',
      },
      backgroundPicAds:{
        '& img':{
          boxShadow: '0px -5px 3px 0px rgba(188,190,192,0.64)',
        }
      },

      badgeSliderBoxPic: {
        display: 'inline!important',
        height: '5.5rem!important',
        width: '5.5rem!important',
      },
      svgBoxAds:{
        '& svg':{
            margin:'0 .75rem',
            fontSize:'1.9rem',
            color:'#716c6d',
        },
        '& img':{
          margin:'0 .75rem'
        }
      },
      titleOfParagraph:{
        color:primary,
        fontSize:'1.6rem',
        fontWeight:'800',
      },
      paragraphPost:{
      color: '#353333e6',
      lineHeight:'2rem',
      fontSize:'1.3rem'
      },
      PriceItemAds:{
          fontSize:'1.3rem',
          color:'#56545482',
      },
      backgroundPicSlider:{
        '& img':{
            objectFit: 'cover',
            height:'100%'
        }
    },
    storeBtn:{
      '& button':{
        width:'45% !important',
        fontSize:'1.6rem !important'
      }
    }
});

const ADSUserIndex = () => {
    const classes = useStyles();

    return (
      <>
         <Container maxWidth='sm'>
         <Box display='flex' alignItems='center' className={classes.avatorImageBox}>
                <Box>
                  <Avatar alt="Cindy Baker" src='/images/AvatorImagePrifile.png' className={classes.avatorImage}/>
                </Box>
                <Box component='span' fontWeight='bold' mx={1} display='inline-block'>???????????? ??????????</Box>
            </Box>
         </Container>

            <Box mt={1} mb={1} style={{backgroundImage:`url('/images/slider-pic.png')`,width:'100%',height:'17rem'}} className={classes.backgroundPicAds}>
               <img src='/images/slider-pic.png' height='100%' width='100%' objectFit='cover'/>
            </Box>

        <Container maxWidth='sm'>

            <Box display='flex' justifyContent='space-between' width='100%'>

                <Box display='flex' alignItems='center' flex='1' className={classes.svgBoxAds}>
                    <FavoriteBorderIcon/>
                    <img src='/images/secondIcon.png' width='10.5%'/>
                    <img src='/images/firstIcon.png' width='10.5%'/>
                    <BookmarkBorderIcon/>
                </Box>

                <Box
                flex='1'
                mt={-4.75}
                position='relative'
                textAlign='left'>
                <img src='/images/bageItemPic.png' className={classes.badgeSliderBoxPic} />
                <Box color='#fff' width='100%' right='-1rem'
                  top='1.5rem' position='absolute'
                  className={classes.badgeSliderSpanText}
                  style={{fontSize:'2rem'}}
                  >

                  <Box component='span'>30%</Box>
            </Box>
          </Box>
            </Box>

            <Box mt={1}>
                <Box className={classes.titleOfParagraph} my={.75} component='span' fontWeight='bold'  display='inline-block'>?????????????? ?????????? ???????? ??????????</Box>
                <Box component='p' className={classes.paragraphPost}  mt={0.5}>
                ???????? ???????????? ?????? ???????????? ???? ?????????? ?????????? ?????????????? ???? ???????? ???????? ?? ???? ??????????????
                ???? ???????????? ???????????? ???????? ?????????????? ?? ???????? ???????? ????????????
                ?? ?? ???????? ???? ???????? ?? ?????????????????? ???? ???????? ???????? ?? ???????? ??????????
                 ???????? ???????????????? ???????? ?????????? ?? ?????????????????? ?????????? ???? ?????? ????
                </Box>
            </Box>

            <Box width='100%' className={classes.PriceItemAds} component='span' textAlign='left' display='inline-block'>???????? ????????:
                <Box component='span'  display='inline-block'>20000</Box>
            </Box>
            <Box width='100%' className={classes.PriceItemAds} component='span' textAlign='left' display='inline-block'>???????? ??????????????:
                <Box component='span' display='inline-block'>18000</Box>
            </Box>



            <Box my={3} display='flex' width='100%' alignItems='center' justifyContent='center' className={classes.storeBtn}>
                <Btn variant='contained'>?????????????? ??????????????</Btn>
            </Box>

            <Box mb={10} display='flex' width='100%' alignItems='center' justifyContent='center'>
                <SocialMediaIcon
                Icon={<img src='/images/forthIcon.png' width='80%'/>}
                />
                <SocialMediaIcon
                Icon={<img src='/images/thirdIcon.png' width='80%'/>}
                />
                 <SocialMediaIcon
                Icon={<InstagramIcon/>}
                />
                 <SocialMediaIcon
                Icon={<WhatsAppIcon/>}
                />
            </Box>
            </Container>
        </>
    );
}



export default ADSUserIndex;
