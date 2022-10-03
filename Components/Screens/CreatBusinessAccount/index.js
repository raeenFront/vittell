import React, { useState, useEffect } from 'react';
import Router, { withRouter, useRouter } from 'next/router';

// mrx : style
import { theme } from '../../theme';
import useStyles from './CreatBusinessAccount.style';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : components
import Btn from '../../Common/Button';
import TextFieldItem from '../../Common/TextFieldItem';
import SetSocialMediaIcon from '../../Common/SocialMediaIcon';
import SelectCategoryScreenModal from "../../Common/SelectCategory";
import UserDetailForm from '../../Common/UserDetailForm';
import Dialog from '../../Common/image croper/DialogProfile';
import DialogP from '../../Common/image croper/DialogProfileP';

// mrx : material ui
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PhoneIcon from '@material-ui/icons/Phone';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Box, Avatar, Container, Grid, Button } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Modal from '@material-ui/core/Modal';

// mrx : api links
import {
    UPLOAD_USER_WALLPAPER_AUTH,
    UPLOAD_USER_PROFILE_AUTH,
    MEMBER_TO_BUSSINES,
    PROVINCE,
    CITY_BY_PROVINCE_ID,
    GET_ALL_CATEGORY,
} from '../../../pages/api/index';

// mrx : api
import { PostUrl, GetUrl, PostAuthUrl } from '../../../pages/api/config';
import { toast } from 'react-toastify';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;


const CreatBusinessAccountIndex = () => {
    const classes = useStyles();
    const router = useRouter();

    // mrx : ShowModalTell of pictures
    const [Wallpaer, setWallpaer] = useState("../images/Placeholder.PNG");
    const [Profile, setProfile] = useState("");
    const [WallpaerPic, setWallpaerPic] = useState("");
    const [ProfilePic, setProfilePic] = useState("");
    const [ButtonTypeW, setButtonTypeW] = useState(true);
    const [ButtonTypeP, setButtonTypeP] = useState(true);

    // mrx : states
    const [BusinessName, setBusinessName] = useState("");
    const [Instagram, setInstagram] = useState(null);
    const [Telegram, setTelegram] = useState(null);
    const [Biography, setBiography] = useState("");
    const [Tell, setTell] = useState(null);
    const [WebSite, setWebSite] = useState(null);
    const [WhatsApp, setWhatsApp] = useState(null);
    const [Province, setProvince] = useState([]);
    const [City, setCity] = useState([]);
    const [ProvinceId, setProvinceId] = useState(null);
    const [CityId, setCityId] = useState(null);
    const [CityValue, setCityValue] = useState("انتخاب شهر");
    const [ProvinceValue, setProvinceValue] = useState("انتخاب استان");
    const [showSelectCategoryModal, setShowSelectCategoryModal] = useState(false);
    const [category, setCategory] = useState(null);
    const [ShowUserDetail, setShowUserDetail] = useState(false);
    const [PicDt, setPicDt] = useState([]);
    const [PicDtP, setPicDtP] = useState([]);
    const [Description, setDescription] = useState('');

    // mrx : modal states 
    const [ShowModalTell, setShowModalTell] = useState(false);

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
        // mrx : get Province
        GetUrl(PROVINCE).then(res => {

            if (res && res.status === 200) {
                const data = res?.data?.data;
                setProvince(data);
            } else {
                toast.error(res?.data?.message);
            }
        });

    }, [])

    useEffect(() => {
        // mrx : get citys by Province id
        GetUrl(CITY_BY_PROVINCE_ID + `?provinceId=${ProvinceId}`, {
            provinceId: ProvinceId,
        }).then((res, err) => {
            if (res && res?.status === 200) {
                if (res?.data?.isSuccess) {
                    const data = res?.data?.data;
                    setCity(data);
                } else {
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error(res?.data?.message);
            }
        });
    }, [ProvinceId])

    const HandleUploadProfile = () => {
        const ProfileFile = new FormData();
        ProfileFile.append("file", ProfilePic);

        PostAuthUrl(UPLOAD_USER_PROFILE_AUTH + `?x=${PicDtP?.x}&y=${PicDtP?.y}&width=${PicDtP?.w}&height=${PicDtP?.h}`,
            ProfileFile
        ).then((res, err) => {
            if (res && res.status === 200) {

            } else {
                toast.error(res?.data?.message);
            }
        });
    }

    const HandleUploadWallpaper = () => {
        const WallpaperFile = new FormData();
        WallpaperFile.append("file", WallpaerPic);

        PostAuthUrl(UPLOAD_USER_WALLPAPER_AUTH + `?x=${PicDt?.x}&y=${PicDt?.y}&width=${PicDt?.w}&height=${PicDt?.h}`,
            WallpaperFile
        ).then((res, err) => {
            if (res && res.status === 200) {

            } else {
                toast.error(res?.data?.message);
            }
        });
    }

    const HandleCreatBusinessAccountIndex = (from = 0) => {
        PostAuthUrl(MEMBER_TO_BUSSINES, {
            BusinessName: BusinessName,
            CityId: CityId,
            description: Description,
            biography: Biography,
            CategoryId: category?.id,
            Instagram: Instagram,
            Telegram: Telegram,
            Tell: Tell,
            WebSite: Instagram,
            WhatsApp: WhatsApp,
        }).then((res, err) => {
            if (res && res?.data?.isSuccess === true) {
                if (res && res.status === 200) {
                    HandleUploadProfile();
                    HandleUploadWallpaper();
                    Cookies.set("Count", 1);
                    toast.success(res?.data?.message);
                    //from the send button
                    if (from === 0)
                        Router.push("/myprofile");
                    //from the price list button
                    else
                    router.push('/priceList/'+Cookies.get("USID"));
                } else {
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error(res?.data?.message);
            }

        });
    }

    return (
        <>
            <Grid container justify="center" boxShadow={3} mt={8} style={{
                backgroundImage: `url('${Wallpaer}')`, width: '100%', height: 200, backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }} className={classes.backgroundPicSlider}>

                <Dialog
                    ButtonType={ButtonTypeW}
                    setButtonType={setButtonTypeW}
                    setImage={setWallpaer}
                    setPicture={setWallpaerPic}
                    setPicDt={setPicDt}
                />

                {/* <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => handleSetWallpaper(e)}
                />
                <label htmlFor="icon-button-file">
                    {ButtonTypeW ? (
                        <Box component='span'
                            className={classes.choosePicItem}
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            width='100%'
                        >
                            عکس ویترین خود را انتخاب کنید
                        </Box>
                    ) : (
                        " "
                    )}
                </label>
                <label htmlFor="icon-button-file">
                    {!ButtonTypeW ? (
                        <Box component='span'
                            className={classes.choosePicItem}
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            width='100%'>
                            تغییر عکس ویترین
                        </Box>
                    ) : (
                        " "
                    )}
                </label> */}
            </Grid>
            <Box mx={1} display='flex' justifyContent='space-between' alignItems='center' className={classes.avatorImageBox}>
                <Box position='relative'>
                    <DialogP
                        ButtonType={ButtonTypeP}
                        setButtonType={setButtonTypeP}
                        setImage={setProfile}
                        Image={Profile}
                        setPicture={setProfilePic}
                        setPicDtP={setPicDtP}
                    />
                    {/* <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="icon-button-Profile"
                        type="file"
                        onChange={(e) => handleSetProfile(e)}
                    /> */}
                    {/* <label htmlFor="icon-button-Profile">
                        {ButtonTypeP ? (
                            <>
                                <Avatar alt="Cindy Baker" src={Profile} />
                                <AddCircleIcon style={{ position: 'absolute', top: '4rem', right: '2rem' }} />
                            </>
                        ) : (
                            " "
                        )}
                    </label>
                    <label htmlFor="icon-button-Profile">
                        {!ButtonTypeP ? (
                            <>
                                <Avatar alt="Cindy Baker" src={Profile} />
                                <AddCircleIcon style={{ position: 'absolute', top: '4rem', right: '2rem' }} />
                            </>
                        ) : (
                            " "
                        )}
                    </label> */}
                </Box>
                <AddCircleIcon />
            </Box>
            <Container maxWidth='sm'>

                <Box mt={5} display='flex' width='100%' flexDirection='column' justifyContent='center' className={classes.formCreatItemBox} alignItems='center'>
                    <TextFieldItem
                        inputProps='نام فروشگاه'
                        backgroundColor='#FFF'
                        onChange={(e) => setBusinessName(e.target.value)}
                    />
                    <TextFieldItem
                        inputProps='توضیحات'
                        backgroundColor='#fff'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextareaAutosize
                        placeholder="بیوگرافی"
                        onChange={(e) => setBiography(e.target.value)}
                        className={classes.TextArea}
                        aria-label="minimum height"
                        minRows={5}
                        backgroundColor='#fff'
                    />
                    <Box style={{
                        width: "100%",
                        marginRight: "20px"
                    }} onClick={() => setShowSelectCategoryModal(true)}>
                        <TextFieldItem
                            inputProps='دسته بندی'
                            value={category && category?.name}
                            backgroundColor='#fff'
                        />
                    </Box>
                    <Box display='flex' width='95%' justifyContent='space-evenly' className={classes.selectBoxTextFeildCheck}>
                        <select
                            className={classes.selectItemTextFeildCheck}
                            id="demo-simple-select-outlined22"
                            onChange={(e) => setProvinceId(e.target.value)}
                        >
                            <option>{ProvinceValue}</option>
                            {Province && Province?.map((item) => <option onClick={(e) => setProvinceId(e.target.value)} key={item?.id} value={item?.id}>{item?.name}</option>)}
                        </select>

                        <select
                            className={classes.selectItemTextFeildCheck}
                            id="demo-simple-select-outlined222"
                            onChange={(e) => setCityId(e.target.value)}
                        >
                            <option>{CityValue}</option>
                            {City && City?.map((item) => <option key={item?.id} value={item?.id}>{item?.name}</option>)}
                        </select>

                    </Box>
                </Box>

                <Box my={3} display='flex' width='100%' alignItems='center' justifyContent='center' className={classes.socialArea}>
                    <Button
                        onClick={() => setShowModalTell(true)}
                    >
                        <SetSocialMediaIcon
                            Icon={<PhoneIcon />}
                            backgroundColor="#b4b4b4"

                        />
                    </Button>
                    <Button
                        onClick={() => setShowModalTell(true)}
                    >
                        <SetSocialMediaIcon
                            Icon={<ChatOutlinedIcon />}
                            backgroundColor="#b4b4b4"

                        />
                    </Button>
                    <Button
                        onClick={() => setShowModalTell(true)}
                    >
                        <SetSocialMediaIcon
                            Icon={<InstagramIcon />}
                            backgroundColor="#b4b4b4"
                        />
                    </Button>
                    <Button
                        onClick={() => setShowModalTell(true)}
                    >
                        <SetSocialMediaIcon
                            Icon={<WhatsAppIcon />}
                            backgroundColor="#b4b4b4"

                        />
                    </Button>

                    <Btn style={{ backgroundColor: '#b4b4b4' }} onClick={() => HandleCreatBusinessAccountIndex(1)} >لیست قیمت</Btn>
                </Box>



                <Box mb={10} width='100%' textAlign='center' className={classes.buttonSignUp}>
                    <Btn onClick={() => HandleCreatBusinessAccountIndex()} variant="contained">ثبت</Btn>
                </Box>

            </Container>
            <Modal
                open={showSelectCategoryModal}
                onClose={() => setShowSelectCategoryModal(false)}
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflowY: "scroll",
                }}
            >
                <Slide direction="up" in={showSelectCategoryModal} mountOnEnter unmountOnExit>
                    <Grid container justify="center">
                        <SelectCategoryScreenModal
                            onClose={() => setShowSelectCategoryModal(false)}
                            setShowSelectCategoryModal={setShowSelectCategoryModal}
                            setCategory={setCategory}
                            category={category}
                        />
                    </Grid>
                </Slide>
            </Modal>
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
                            onClick={() => setShowModalTell(false)}
                            className={classes.ButtonSend}
                        >
                            ثبت اطلاعات
                        </Button>
                    </Grid>
                </Slide>
            </Modal>
        </>
    );
}



export default CreatBusinessAccountIndex;
