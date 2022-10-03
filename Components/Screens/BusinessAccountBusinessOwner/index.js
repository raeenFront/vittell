import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Router, { withRouter, useRouter } from 'next/router';

// mrx : style
import { theme } from '../../theme';

// mrx : components
import BlogBox from '../../Common/BlogBox';
import SocialMediaIcon from '../../Common/SocialMediaIcon';
import Btn from '../../Common/Button';
import Loadings from '../../Common/Loading';

// mrx : loading
import PostLoading from '../../Common/Loading/PostLoading';

// material ui
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Avatar, Grid, Button, Typography } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import Slide from '@material-ui/core/Slide';
import Modal from '@material-ui/core/Modal';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Dialog from '../../Common/image croper/DialogProfile';
import DialogP from '../../Common/image croper/DialogProfileP';

// mrx : api links
import {
    GET_ANY_USER_BY_ID,
    BASE_Image_Url,
    UPLOAD_USER_WALLPAPER_AUTH,
    UPLOAD_USER_PROFILE_AUTH,
    GET_ALL_USER_SAVES,
    GET_USER_POST_BY_ID,
    EDIT_USER,
    PINE_TO_B
} from '../../../pages/api/index';

// mrx : api
import { PostUrl, PostAuthUrl, GetAuthUrl, GetUrl, PutAuthUrl } from '../../../pages/api/config';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : context
import { Contexts } from './../../../contexts/index';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;
const titleColor = theme.palette.secondary.titleColor;
const useStyles = makeStyles({
    PostsCountSt: {
        background: "#fafafa",
        color: "#fc6b0a",
        padding: " 4px 8px",
        borderRadius: "20px",
        position: "relative",
        right: "1px",
        top: "-7px",
    },
    containerSelect: {
        maxWidth: "50rem",
        backgroundColor: "#fafafa",
        position: "absolute",
        width: "90%",
        borderRadius: "20px",
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
            objectFit: 'cover',
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
        color: secondary,
        fontSize: '1.4rem',
    },
    titleOfProfilePost: {
        color: titleColor,
        float: "right",
        marginRight: "100px",
        fontSize: '1.5rem',
    },
    biographytitle: {
        background: "#fafafa",
        height: "116px",
        border: "none",
        overflow: "hidden",
        margin: "10px 5px 0px 0px",
        width: "100%",
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
        margin: "0px 10px",
    }
    ,
   sendTosearchText:{
    width: '40%',
    margin: "0px 10px",
    fontSize: 12,
    color: secondary,
    fontWeight: 'bold'
   }
});

const BusinessAccountBusinessOwner = () => {
    const classes = useStyles();
    const router = useRouter();

    // mrx : context data
    const { UserInfo, setUserInfo } = useContext(Contexts);

    // mrx : states
    const [UserProfile, setUserProfile] = useState([]);
    const [Tell, setTell] = useState(null);
    const [loading, setLoading] = useState(true);
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
    const [WallpaerPic, setWallpaerPic] = useState("");
    const [ProfilePic, setProfilePic] = useState("");
    const [ButtonTypeW, setButtonTypeW] = useState(true);
    const [ButtonTypeP, setButtonTypeP] = useState(true);
    const [BusinessName, setBusinessName] = useState("");
    const [Biography, setBiography] = useState("");
    const [PostCount, setPostCount] = useState(0);
    const [SavesCount, setSavesCountCount] = useState(0);
    const [PicDt, setPicDt] = useState([]);
    const [PicDtP, setPicDtP] = useState([]);
    const [UserPost, setUserPost] = useState(1);
    const [LoadingWallpaper, setLoadingWallpaper] = useState(false);
    const [LoadingProfile, setLLoadingProfile] = useState(false);
    const [PostLeinght, setPostLeinght] = useState(16);

    const handleChangeUserPost = (e) => {
        setUserPost(e);
    }

    // mrx : handle set Wallpaper
    const handleSetWallpaper = (e) => {
        setWallpaerPic(e.target.files[0]);
        setWallpaer(e.target.files[0] && URL.createObjectURL(e.target.files[0]));
        setButtonTypeW(false);
        if (e.target.files[0] == undefined) {
            setWallpaer("../images/Placeholder.PNG");
            setButtonTypeW(true);
        }
    };

    // mrx : handle set profile
    const handleSetProfile = (e) => {
        setProfilePic(e.target.files[0]);
        setProfile(e.target.files[0] && URL.createObjectURL(e.target.files[0]));
        setButtonTypeP(false);
        if (e.target.files[0] == undefined) {
            setProfile("../images/Placeholder.PNG");
            setButtonTypeP(true);
        }
    };

    useEffect(() => {
        setLoadingWallpaper(true);
        let ProfileFile = new FormData();
        ProfileFile.append("file", ProfilePic);

        PostAuthUrl(UPLOAD_USER_PROFILE_AUTH + `?x=${PicDtP?.x}&y=${PicDtP?.y}&width=${PicDtP?.w}&height=${PicDtP?.h}`,
            ProfileFile
        ).then((res, err) => {
            if (res && res.status === 200) {
                setLoadingWallpaper(false);

            } else {
                toast.error(res?.data?.message);
                setLoadingWallpaper(false);
            }
        });
    }, [PicDtP])

    useEffect(() => {
        setLoadingWallpaper(true);
        let WallpaperFile = new FormData();
        WallpaperFile.append("file", WallpaerPic);

        PostAuthUrl(UPLOAD_USER_WALLPAPER_AUTH + `?x=${PicDt?.x}&y=${PicDt?.y}&width=${PicDt?.w}&height=${PicDt?.h}`,
            WallpaperFile
        ).then((res, err) => {
            if (res && res.status === 200) {
                setLoadingWallpaper(false);
            } else {
                toast.error(res?.data?.message);
                setLoadingWallpaper(false);
            }
        });
    }, [PicDt])

    useEffect(() => {
        setButtonTypeP(true);
        setButtonTypeW(true);
        // mrx : get user posts
        GetAuthUrl(GET_USER_POST_BY_ID + `?userId=${Cookies.get("USID")}`).then(res => {
            if (res && res.status === 200) {
                const data = res?.data?.data;
                setPosts(data);
                setLoadingPost(false);
                setPostLeinght(data?.length);
                setPostCount(data.length);
            } else {
                toast.error(res?.data?.message);
            }
        })

        // mrx : get user saves
        GetAuthUrl(GET_ALL_USER_SAVES).then(res => {
            if (res && res.status === 200) {
                const data = res?.data?.data;
                setSavePosts(data);
                setLoadingPost(false);
                setSavesCountCount(data.length);
            } else {
                toast.error(res?.data?.message);
            }
        })

        // get user detail
        GetAuthUrl(GET_ANY_USER_BY_ID + `?id=${Cookies.get("USID")}`).then(res => {
            if (res && res?.status === 200) {
                if (res?.data?.isSuccess == true) {

                    const data = res?.data?.data;
                    setBusinessName(data?.businessName);
                    setBiography(data?.biography);
                    setUserProfile(data);
                    setWallpaer(data?.wallpaper);
                    setProfile(data?.profileImage);
                    setTell(data?.tell);
                    setWhatsApp(data?.whatsApp);
                    setWhatsApp(data?.whatsApp);
                    setInstagram(data?.instagram);
                    setTelegram(data?.telegram);
                    setLoading(false);
                }
            }
        })
    }, []);

    console.log("sdfsdf" + PostLeinght);

    const handleSendToSearch = () => {
        GetAuthUrl(PINE_TO_B).then(res => {
            if (res && res?.status === 200) {
                if (res?.data?.isSuccess == true) {
                    toast.success(res?.data?.message);
                } else {
                    toast.success(res?.data?.message);
                }
            }
        })
    }

    const handleChangeUserDetail = () => {
        PutAuthUrl(EDIT_USER, {
            instagram: Instagram,
            telegram: Telegram,
            tell: Tell,
            WebSite: Instagram,
            whatsApp: WhatsApp,
            cityId: UserInfo?.cityId,
            categoryId: UserInfo?.categoryId,
            biography: Biography,
            businessName: BusinessName,
            cityName: UserInfo?.cityName,
        }).then(res => {
            if (res && res?.status === 200) {
                if (res?.data?.isSuccess == true) {
                    const data = res?.data?.data;
                    toast.success(res?.data?.message);
                    setShowModalTell(false);
                } else {
                    toast.success(res?.data?.message);
                }
            }
        })
    }

    return (
        <>
            {
                loading ? (
                    <PostLoading />
                ) : (
                    <>
                        <Box mt={8} style={{ backgroundImage: `url('/images/slider-pic.png')`, width: '100%' }} className={classes.backgroundPicSlider}>
                            {ButtonTypeW ? (
                                LoadingWallpaper ? (
                                    <Loadings />
                                ) : (
                                    < img src={BASE_Image_Url + Wallpaer} height='100%' width='100%' />
                                )

                            ) : (
                                LoadingWallpaper ? (
                                    <Loadings />
                                ) : (
                                    < img src={Wallpaer} height='100%' width='100%' />
                                )
                            )}
                        </Box>
                        <Box mx={1} display='flex' justifyContent='space-between' alignItems='center' className={classes.avatorImageBox}>
                            <Box position='relative'>
                                <label htmlFor="icon-button-Profile">
                                    <DialogP
                                        type="edit"
                                        ButtonType={ButtonTypeP}
                                        setButtonType={setButtonTypeP}
                                        setImage={setProfile}
                                        Image={Profile}
                                        setPicture={setProfilePic}
                                        setPicDtP={setPicDtP}
                                    />
                                </label>
                            </Box>

                            <label htmlFor="icon-button-file">
                                <Dialog
                                    type="edit"
                                    ButtonType={ButtonTypeW}
                                    setButtonType={setButtonTypeW}
                                    setImage={setWallpaer}
                                    Image={Wallpaer}
                                    setPicture={setWallpaerPic}
                                    setPicDt={setPicDt}
                                />
                            </label>

                        </Box>

                        <Box component='span' fontWeight='bold' display='flex' justifyContent='center' className={classes.titleOfProfilePost} mr={3} mt={-3}>{BusinessName}</Box>

                        <TextareaAutosize
                            value={Biography}
                            disabled
                            className="paragraphPost2"
                        />

                        <Container maxWidth='sm'>
                            <Box mb={2} pb={2} display='flex' width='100%' alignItems='center' justifyContent='center' style={{borderBottom:'2px solid #bbb'}}>
                                <Button
                                    onClick={() => router.push(`tel:+98${Tell}`)}
                                >
                                    <SocialMediaIcon
                                        Icon={<PhoneIcon />}
                                    />
                                </Button>
                                <Button
                                    onClick={() => router.push(`tel:+98${Tell}`)}
                                >
                                    <SocialMediaIcon
                                        Icon={<ChatOutlinedIcon />}
                                    />
                                </Button>
                                <Button
                                    onClick={() => router.push(`https://www.instagram.com/${Instagram}`)}
                                >
                                    <SocialMediaIcon
                                        Icon={<InstagramIcon />}
                                    />

                                </Button>
                                <Button
                                    onClick={() => router.push(`https://api.whatsapp.com/send?phone=+98${WhatsApp}`)}
                                >
                                    <SocialMediaIcon
                                        Icon={<WhatsAppIcon />}
                                    />
                                </Button>
                            </Box>

                            <Box mb={3} mt={2} display='flex' width='100%' alignItems='center' justifyContent='center'>
                                <Btn onClick={() => setShowModalTell(true)} variant='contained' className={classes.editBtnItem}>ویرایش حساب</Btn>
                                <Btn variant='contained' className={classes.editBtnItem}> لیست قیمت </Btn>
                            </Box>

                            <Box pb={2} mb={2} display='flex' width='100%' alignItems='center' justifyContent='center' style={{borderBottom:'2px solid #bbb'}}>
                            <Typography  className={classes.sendTosearchText} fontSize=""  >
                                درصورت تمایل برای دیده شدن صفحه فروشگاهتان، در ابتدای صفحه جستجو فروشگاها، می توانید از این بخش وارد شوید
                            </Typography>

                                <Btn className={classes.editBtnItem} onClick={() => handleSendToSearch()} variant='contained'>انتقال به جستجو</Btn>
                            </Box>

                            <Box   component='span' fontWeight='bold' display='flex' className={classes.titleOfProfile}>تعدادبازدید :
                                <Box component='span' fontWeight='bold' display='flex' className={classes.titleOfProfile} >{UserProfile?.totalVisit}</Box>
                            </Box>

                            <Box p={1} my={4} width='100%' display='flex' justifyContent='space-around' className={classes.alertBoxItem}>
                                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                                    <Button onClick={() => handleChangeUserPost(2)}>
                                        <img src='/images/penIcon.png' width='30px' style={{ paddingLeft: 10 }} />
                                        <Box component='span' mt={.5}>نشان شده ها <spna className={classes.PostsCountSt}>{SavesCount}</spna></Box>
                                    </Button>
                                </Box>
                                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                                    <Button onClick={() => handleChangeUserPost(1)}>
                                        <img src='/images/postIcon.png' width='30px' style={{ paddingLeft: 10 }} />
                                        <Box component='span' mt={.5}>آگهی های من <spna className={classes.PostsCountSt}>{PostCount}</spna></Box>
                                    </Button>
                                </Box>
                            </Box>


                            {
                                UserPost === 2 ? (
                                    <>
                                        <Box style={{ marginBottom: "15px" }} component='span' fontWeight='bold' display='flex' className={classes.titleOfProfile}>نشان شده های من</Box>

                                        <Grid style={{ display: " inline-flex" }}>
                                            <Box style={{ width: "50%" }} flexWrap='wrap' mb={10}>
                                                {
                                                    LoadingPost ? (
                                                        " "
                                                    ) : (
                                                        <>
                                                            {SavePosts &&
                                                                SavePosts?.filter((item, idx) => idx % 2 == 1).map((item) => (
                                                                    <BlogBox
                                                                        key={item?.id}
                                                                        href={`posts/${item?.postId}`}
                                                                        homePic={BASE_Image_Url + item?.postImage}
                                                                        description={item?.postTitle}
                                                                    />
                                                                ))}
                                                        </>
                                                    )
                                                }
                                            </Box>
                                            <Box style={{ width: "50%" }} flexWrap='wrap' mb={10}>
                                                {

                                                    SavePosts?.length === 0 ? (
                                                        <>
                                                            <p style={{ position: "absolute", margin: "-20px 10px" }}>آگهی یافت نشد</p>
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
                                                            {SavePosts &&
                                                                SavePosts?.filter((item, idx) => idx % 2 == 0).map((item) => (
                                                                    <BlogBox
                                                                        key={item?.id}
                                                                        href={`posts/${item?.postId}`}
                                                                        homePic={BASE_Image_Url + item?.postImage}
                                                                        description={item?.postTitle}
                                                                    />
                                                                ))}
                                                        </>
                                                    )
                                                }
                                            </Box>
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Box style={{ marginBottom: "15px" }} component='span' fontWeight='bold' display='flex' className={classes.titleOfProfile}>آگهی های من</Box>

                                        <Grid style={{ display: " inline-flex" }}>
                                            <Box style={{ width: "50%" }} flexWrap='wrap' mb={10}>
                                                {

                                                    Posts?.length === 0 ? (
                                                        <>
                                                            <p style={{ position: "absolute", margin: "-20px 10px" }}>آگهی یافت نشد</p>
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
                                                                Posts?.filter((item, idx) => idx % 2 == 1).map((item) => (
                                                                    <BlogBox
                                                                        key={item?.id}
                                                                        href={`posts/${item?.id}`}
                                                                        homePic={BASE_Image_Url + item?.image}
                                                                        description={item?.title}
                                                                    />
                                                                ))}
                                                        </>
                                                    )
                                                }
                                            </Box>
                                            <Box style={{ width: "50%" }} flexWrap='wrap' mb={10}>
                                                {
                                                    LoadingPost ? (
                                                        <Loadings />
                                                    ) : (
                                                        <>
                                                            {Posts &&
                                                                Posts?.filter((item, idx) => idx % 2 == 0).map((item) => (
                                                                    <BlogBox
                                                                        key={item?.id}
                                                                        href={`posts/${item?.id}`}
                                                                        homePic={BASE_Image_Url + item?.image}
                                                                        description={item?.title}
                                                                    />
                                                                ))}
                                                        </>
                                                    )
                                                }
                                            </Box>
                                        </Grid>
                                    </>
                                )
                            }



                        </Container>
                    </>
                )
            }
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
                        <TextareaAutosize
                            placeholder="بیوگرافی"
                            onChange={(e) => setBiography(e.target.value)}
                            className={classes.Input}
                            aria-label="minimum height"
                            minRows={5}
                            value={Biography}
                        />
                        <input
                            placeholder="شماره واتس اپ"
                            value={WhatsApp}
                            onChange={(e) => setWhatsApp(e.target.value)}
                            className={classes.Input}
                            type="number"
                        />
                        <input
                            placeholder="آیدی اینستاگرام"
                            value={Instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            className={classes.Input}
                            type="text"
                        />
                        {/* <input
                            placeholder="آیدی تلگرام"
                            value={Telegram}
                            onChange={(e) => setTelegram(e.target.value)}
                            className={classes.Input}
                            type="text"
                        /> */}
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



export default BusinessAccountBusinessOwner;
