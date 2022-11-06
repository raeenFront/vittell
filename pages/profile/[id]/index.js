import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Router, { withRouter, useRouter } from 'next/router';

// mrx : style
import { theme } from '../../../Components/theme';

// mrx : components
import BlogBox from '../../../Components/Common/BlogBox';
import SocialMediaIcon from '../../../Components/Common/SocialMediaIcon';
import Loadings from '../../../Components/Common/Loading';
import PhoneIcon from '@material-ui/icons/Phone';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Avatar, Grid, Button } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import Slide from '@material-ui/core/Slide';
import Modal from '@material-ui/core/Modal';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

// mrx : api links
import {
    GET_ANY_USER_BY_ID,
    BASE_Image_Url,
    GET_USER_POST_BY_ID,
} from '../../../pages/api/index';

// mrx : api
import { PostUrl, PostAuthUrl, GetAuthUrl, GetUrl, PutAuthUrl } from '../../../pages/api/config';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : context
import { Contexts } from './../../../contexts/index';
import Btn from '../../../Components/Common/Button';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

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
    ButtonSend: {
        background: "#eaeaea",
        width: "100%",
        fontSize: "15px !important",
        color: "#585591",
        borderRadius: "20px",
        border: "solid 1px #b7b2b2",
        marginTop: 50
    },
    backgroundPicSlider: {
        '& img': {
            // objectFit: 'cover',
            height: '100%'
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
    avatorImageBox: {
        marginTop: '-4rem',
        '& .MuiAvatar-root': {
            width: theme.spacing(9),
            height: theme.spacing(9),
            border: '3px solid #fff',
        },
        '& svg': {
            color: secondary,
            fontSize: '2rem',
            marginBottom: '2rem'
        },
    },
    avatorImage: {
        boxShadow: '0px -2px 13px 2px rgba(188,190,192,0.64)',
    },
    titleOfProfile: {
        color: primary,
        fontSize: '1.4rem',
    },
    titleOfProfilePost: {
        color: secondary,
        float: "right",
        marginRight: "100px",
        fontSize: '1.5rem',
    },
    biographytitle: {
        background: "#fafafa",
        height: "116px",
        border: "none",
        overflow: "hidden",
        margin: "30px 20px 10px",
        paddingTop: "20px",
        width: "100%",
        // background: 'linear-gradient(to  bottom, #EDECE7, #fff)',
        background:'transparent',
        // borderTop: '2px solid #aaa' 


    },
    alertBoxItem: {
        backgroundColor: secondary,
        borderRadius: '1rem',
        '& svg': {
            color: '#ffffffb8'
        },
        '& span': {
            fontSize: '1.2rem',
            color: '#ffffffb8',
            fontWeight: 'bold'

        }
    },
    editBtnItem: {
        width: '40%',
        
    },
    price_list_btn:{
        borderRadius: '10px',
        backgroundColor: primary,
        color:'#fff',
        width:'25%',
        padding: '10px',
    },
});

const Profile = () => {
    const classes = useStyles();
    const router = useRouter();

    const { id } = router.query;
    // mrx : states
    const [UserProfile, setUserProfile] = useState([]);
    const [Tell, setTell] = useState(null);
    const [WhatsApp, setWhatsApp] = useState(null);
    const [Instagram, setInstagram] = useState(null);
    const [Telegram, setTelegram] = useState(null);

    // mrx : modal states 
    const [ShowModalTell, setShowModalTell] = useState(false);
    const [SavePosts, setSavePosts] = useState([]);
    const [Posts, setPosts] = useState([]);
    const [LoadingPost, setLoadingPost] = useState(true);

    // mrx : ShowModalTell of pictures
    const [Wallpaer, setWallpaer] = useState("../images/Placeholder.PNG");
    const [Profile, setProfile] = useState("../images/Placeholder.PNG");
    const [BusinessName, setBusinessName] = useState("");
    const [Description, setDescription] = useState("");
    const [Biography, setBiography] = useState("");

    const [UserID, setUserID] = useState(null);


    useLayoutEffect(() => {
        setUserID(id);

        // mrx : get user posts
        GetAuthUrl(GET_USER_POST_BY_ID + `?userId=${id}`).then(res => {
            if (res && res.status === 200) {
                const data = res?.data?.data;
                setPosts(data);
                setLoadingPost(false);
            } else {
                toast.error(res?.data?.message);
            }
        })

        // get user detail
        GetAuthUrl(GET_ANY_USER_BY_ID + `?id=${id}`).then(res => {
            if (res && res?.status === 200) {
                if (res?.data?.isSuccess == true) {

                    const data = res?.data?.data;
                    setBusinessName(data?.businessName);
                    setBiography(data?.biography);
                    setUserProfile(data);
                    setDescription(data?.description);
                    setWallpaer(data?.wallpaper);
                    setProfile(data?.profileImage);
                    setTell(data?.tell);
                    setWhatsApp(data?.whatsApp);
                    setWhatsApp(data?.whatsApp);
                    setInstagram(data?.instagram);
                    setTelegram(data?.telegram);
                }
            }
        })
    }, [id]);

    return (
        <>
            <Box boxShadow={3} mt={8} style={{ backgroundImage: `url('/images/slider-pic.png')`, width: '100%', height: '17rem' }} className={classes.backgroundPicSlider}>
                <img src={BASE_Image_Url + Wallpaer} height='100%' width='100%' />
            </Box>
            <Box mx={1} display='flex' justifyContent='space-between' alignItems='center' className={classes.avatorImageBox}>
                <Box position='relative'>
                    <Avatar alt="Cindy Baker" src={BASE_Image_Url + Profile} className={classes.avatorImage} />
                </Box>

            </Box>

            <Box component='span' fontWeight='bold' display='flex' justifyContent='center' className={classes.titleOfProfilePost} mr={3} mt={-3}>{BusinessName}</Box>
            <Box component='span'  display='flex' justifyContent='center' className={classes.titleOfProfilePost} mr={3} style={{fontSize:'13px',color:'#888'}} >{Description}</Box>
            <Box mb={-2} mt={4} style={{textAlign: 'center' ,borderBottom: '2px solid #aaa' }}></Box>
            <TextareaAutosize
                value={Biography}
                disabled
                className={classes.biographytitle}
            />

            <Container maxWidth='sm'>
                <Box mb={2} display='flex' width='100%' alignItems='center' justifyContent='center'>
                    <Button
                        onClick={() => router.push(`tel:+98${Tell}`)}
                    >
                        <SocialMediaIcon
                            Icon={<ChatOutlinedIcon />}
                        />
                    </Button>
                    <Button
                        onClick={() => router.push(`tel:+98${Tell}`)}
                    >
                        <SocialMediaIcon
                            Icon={<PhoneIcon />}
                        />
                    </Button>
                    
                    <Button
                        onClick={() => router.push(`https://api.whatsapp.com/send?phone=+98${WhatsApp}`)}
                    >
                        <SocialMediaIcon
                            Icon={<WhatsAppIcon />}
                        />
                    </Button>
                    <Button
                        onClick={() => router.push(`https://www.instagram.com/${Instagram}`)}
                    >
                        <SocialMediaIcon
                            Icon={<InstagramIcon />}
                        />

                    </Button>
                </Box>
                <Box mb={3} pb={2} style={{textAlign: 'center' ,borderBottom: '2px solid #aaa' }}>
                <Button  className={classes.price_list_btn} onClick={() => { Router.push("/priceList/"+UserID), setState(false) }}>لیست قیمت</Button>

                </Box>



                <Grid style={{ display: " inline-flex" }}>
                    <Box style={{ width: "50%" }} flexWrap='wrap' mb={10}>
                        {
                            LoadingPost ? (
                                " "
                            ) : (
                                <>
                                    {Posts &&
                                        Posts?.filter((item, idx) => idx % 2 == 1).map((item) => (
                                            <BlogBox
                                                key={item?.id}
                                                href={`../posts/${item?.id}`}
                                                homePic={BASE_Image_Url + item?.image}
                                                title={item?.title}
                                                description={item?.description}
                                            />
                                        ))}
                                </>
                            )
                        }
                    </Box>
                    <Box style={{ width: "50%" }} flexWrap='wrap' mb={10}>
                        {

                            Posts?.length === 0 ? (
                                <>
                                    <p>آگهی یافت نشد</p>
                                </>
                            ) : (
                                ' '
                            )
                        }
                        {
                            LoadingPost ? (
                                <Loadings />
                            ) : (
                                <>
                                    {Posts &&
                                        Posts?.filter((item, idx) => idx % 2 == 0).map((item) => (
                                            <BlogBox
                                                key={item?.id}
                                                href={`../posts/${item?.id}`}
                                                homePic={BASE_Image_Url + item?.image}
                                                title={item?.title}
                                                description={item?.description}
                                            />
                                        ))}
                                </>
                            )
                        }
                    </Box>
                </Grid>

            </Container>
            <Modal
                open={ShowModalTell}
                onClose={() => setShowModalTell(false)}
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflowY: "scroll",
                }}
            >
                <Slide direction="up" in={ShowModalTell} mountOnEnter unmountOnExit>
                    <Grid className={classes.containerSelect} container justify="center">
                        <input
                            placeholder="نام کسب و کار"
                            value={BusinessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className={classes.Input}
                            type="text"
                        />
                        <input
                            placeholder="بیوگرافی"
                            value={Biography}
                            onChange={(e) => setBiography(e.target.value)}
                            className={classes.Input}
                            type="text"
                        />
                        <input
                            placeholder="لینک واتس اپ"
                            value={WhatsApp}
                            onChange={(e) => setWhatsApp(e.target.value)}
                            className={classes.Input}
                            type="text"
                        />
                        <input
                            placeholder="لینک اینستاگرام"
                            value={Instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            className={classes.Input}
                            type="text"
                        />
                        <input
                            placeholder="لینک تلگرام"
                            value={Telegram}
                            onChange={(e) => setTelegram(e.target.value)}
                            className={classes.Input}
                            type="text"
                        />
                        <input
                            placeholder="شماره تماس"
                            value={Tell}
                            onChange={(e) => setTell(e.target.value)}
                            className={classes.Input}
                            type="number"
                        />

                        <Button
                            onClick={() => handleChangeUserDetail()}
                            className={classes.ButtonSend}
                        >
                            ویرایش اطلاعات
                        </Button>
                    </Grid>
                </Slide>
            </Modal>
        </>

    );
}



export default Profile;
