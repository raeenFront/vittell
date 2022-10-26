import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Router, { withRouter, useRouter } from 'next/router';

// mrx : cookie
import Cookies from 'js-cookie';
import SocialMediaIcon from '../../Components/Common/SocialMediaIcon';

import {
    TelegramIcon,
    TelegramShareButton,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";

// mrx : api links
import {
    GET_ALL_USER_SAVES,
    PROVINCE,
    CITY_BY_PROVINCE_ID,
    BASE_Image_Url,
    GET_PROVINCE_BY_USER_ID,
    GET_ANY_USER_BY_ID,
    SET_PAYFACTOR,
    CHANGE_USER_CITY_AUTH,
    GET_DEFULT_CITY
} from '../../pages/api/index';

// mrx : api
import { PostAuthUrl, GetUrl, GetAuthUrl } from '../../pages/api/config';


// mrx : material ui
import {
    AppBar,
    Box,
    Button,
    Container,
    Avatar,
    IconButton,
    Toolbar,
    Link,
    Grid,

} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/List';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Bookmark from '@material-ui/icons/Bookmark';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import EditIcon from '@material-ui/icons/Edit';
//  import PasswordIcon from '@material-ui/icons/Key';
// import SharedIcon from '@material-ui/icons/Polyline';
import InfoIcon from '@material-ui/icons/Info';
import ContactIcon from '@material-ui/icons/CallEnd';
import SignoutIcon from '@material-ui/icons/Input';

// mrx : styles
import { theme } from '../theme';

// mrx : components
import ProvinceAndCityItem from './ProvinceAndCityItem';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

// context
import { Contexts } from '../../contexts/index';

// mrx : styles
const useStyles = makeStyles({
    avatorImage: {
        width: "80px",
        height: "80px",
        margin: "10px",
        boxShadow: "0px 5px 15px -1px #0808083d",
        border: "solid"
    },
    mycityText: {
        fontSize: "13px",
        color: "#525252",
        fontWeight: "bold",
        margin: '0px',
    },
    myCityUnderIcon: {
        margin: '0px',
        padding: '0px',
        width: '30px',
        height: '30px',
    },
    mycityButton: {
        position: "absolute",
        right: "50px",
        top: '-2px',
        alignItems: "flex-start",
        
    },
    header: {
        position: 'fixed',
        top: 0,
        zIndex: 85,
        right: 0,

    },
    appBarHeader: {
        boxShadow: 'none !important',
        backgroundColor: '#EDECE7',

    },
    menuIcon: {
        color: '#fff',
        backgroundColor: '#ef4b4c',
        width: "40px",
        height: "40px",
        borderRadius: "10px"
    },

    containerSelect: {
        maxWidth: "50rem",
        backgroundColor: "#fafafa",
        position: "absolute",
        width: "100%",
        top: "0px",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        padding: "20px",
    },
    containerSelectShare: {
        maxWidth: "50rem",
        backgroundColor: "#fafafa",
        position: "absolute",
        width: "90%",
        borderRadius: "20px",
        padding: "20px",

    },
    root: {
        width: '100%',
        justifyContent: 'space-between',
        padding: '0 !important',
        '& svg': {
            fontSize: '4rem'
        },
        borderBottom: `2px solid #b8b8b8`,
    },
    list: {
        width: 250,

    },
    fullList: {
        width: 'auto',


    },
    userDetail: {
        fontSize: "17px",
        margin: "10px 10px",
        paddingBottom: "12px",
    },
    desktopNavbar: {
        '& li': {
            listStyle: 'none',
            '&:hover': {
                color: theme.palette.primary.main,
            }
        },
    },
    profileMenuMobile: {
        backgroundColor: primary,
        width: '100%',
        minHeight: '15rem',
    },
    mainNavMobile: {
        '& li': {
            listStyle: 'none',
            padding: '1.2rem 1rem',
            fontSize: '1.3rem',

        }
    },
    menuIcon:{
        fontSize:'2rem',
        verticalAlign:'middle',
        marginLeft: '5px',
    },
    formControlHeader: {
        marginBottom: '1rem !important',
        fontFamily: 'IRANYekan !important',
        textAlign: 'center',
        '& svg': {
            display: 'none !important'
        },
        '& label': {
            color: primary,
            fontSize: '1.8rem',
            fontWeight: '700',
        },
        '& .MuiSelect-select.MuiSelect-select': {
            backgroundColor: 'transparent',
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none !important'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: 'none !important'
        }
    },
    selectBoxTextFeildCheck: {
        '& select': {
            border: 'none',
            outline: 'none',
            borderRadius: '.5rem',
            backgroundColor: '#d1d3d487',
            color: primary,
            width: '49%',
            fontWeight: '700',
            padding: '.75rem',
            boxShadow: '0px 14px 16px 0px rgba(188, 190, 192, 0.004)',
        }
    },
    btnItemPay: {
        width: '50%'
    },
    selectBoxNormalProfile: {
        '& select': {
            width: '45% !important',
            justifyContent: 'space-between !important',
            boxShadow: ' 3px 4px 3px 0px rgb(188 190 192 / 64%)!important',
        },
    },
    BTNMenu: {
        textAlign: "right",
        display: "contents"
    }
})

const Header = ({ test }) => {

    const classes = useStyles();
    const router = useRouter()

    const { setDefultCity, DefultCity } = useContext(Contexts);

    // mrx : state
    const [age, setAge] = React.useState('');
    const [ShowModalCity, setShowModalCity] = useState(false);
    const [ProvinceId, setProvinceId] = useState(null);
    const [CityIdH, setCityIdH] = useState(null);
    const [Province, setProvince] = useState([]);
    const [City, setCity] = useState([]);
    const [cityname, setcityname] = useState("");
    const [CityValue, setCityValue] = useState("شهر من");
    const [CityValue2, setCityValue2] = useState("شهر من");
    const [ProvinceValue, setProvinceValue] = useState("استان مورد نظر را انتخاب کنید");

    const [ProfileInfo, setProfileInfo] = useState([]);
    const [ShowShare, setShowShare] = useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [state, setState] = React.useState({
        left: false,
    });


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handleSetCityT = () => {
        GetUrl(GET_PROVINCE_BY_USER_ID + `?id=${Cookies.get("CITID")}`).then(res => {

            if (res && res.status === 200) {
                const data = res?.data?.data;
                setCityValue(data?.name);
                // if (data?.name == undefined) {
                //     Cookies.set("CITN", Cookies.get("DCIT"));
                // } else {
                //     Cookies.set("CITN", data?.name);
                // }
                // Cookies.set("CITN", data?.name);
                setCityValue2(data?.name);
                console.log("fuck " + data?.name);
                setcityname(data?.name);
                // if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
                setCityIdH(data?.id);
                // }
                setProvinceValue(data?.provinceName);
                setProvinceId(data?.provinceId)
            } else {
                toast.error(res?.data?.message);
            }
        })
    }

    const handleSetCityD = () => {
        GetUrl(GET_DEFULT_CITY).then(res => {
            Cookies.set("ISDefult", true);

            if (res && res.status === 200) {
                const data = res?.data?.data;
                if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n") && Cookies.get("ISFIRST") === null) {
                    setCityIdH(data?.id);
                }
                Cookies.set("ISFIRST", data?.id);
                Cookies.set("DCIT", Cookies.get("ISDefult") ? data?.name : Cookies.get("CITID"));
                setCityValue(Cookies.get("CITN"));
                setProvinceValue("استان");
                if (Cookies.get("CITN") === undefined) {
                    Cookies.set("CITN", Cookies.get("DCIT"));
                }
            } else {
                toast.error(res?.data?.message);
            }
        })
    }

    useEffect(() => {

        // mrx : get city name
        // if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
        handleSetCityT();
        // }
        // mrx : get Province
        GetUrl(PROVINCE).then(res => {
            if (res && res.status === 200) {
                const data = res?.data?.data;
                setProvince(data);
            } else {
                toast.error(res?.data?.message);
            }
        })

        if (Cookies.get("USID")) {
            // get user detail
            GetAuthUrl(GET_ANY_USER_BY_ID + `?id=${Cookies.get("USID")}`).then(res => {
                if (res && res?.status === 200) {
                    if (res?.data?.isSuccess == true) {
                        const data = res?.data?.data;
                        // setBusinessName(data?.businessName);
                        // setProfile(data?.profileImage);
                        setProfileInfo(data);
                    }
                }
            })
        }

        handleSetCityD();

    }, []);

    useEffect(() => {
        console.log("s" + cityname);
        if (cityname?.length > 3) {
            Cookies.set("CITN", cityname);
        }
        // var _iOSDevice = !!navigator.platform.match(/iPhone|iPod|iPad/);
        // console.log("sdfsdf " + _iOSDevice);
        if (Cookies.get("USID") === undefined || Cookies.get("DCIT") === undefined) {
            setCityValue(Cookies.get("DCIT") ? Cookies.get("DCIT") : "شهر");
            setCityValue2("شهر من");
            setProvinceValue("استان");
        }
        if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
                    Cookies.set("CITID", CityIdH);

            // mrx : get saves
            // GetAuthUrl(CHANGE_USER_CITY_AUTH + `?cityId=${CityIdH}`).then(res => {
            //     if (res && res.status === 200) {
            //         const data = res?.data?.data;
            //         Cookies.remove("CITID");
            //         Cookies.set("CITID", CityIdH);
            //     } else {
            //         toast.error(res?.data?.message);
            //     }
            // })
        } else {
            Cookies.remove("CITID");
            Cookies.remove("DCIT");
            Cookies.set("CITID", Cookies.get("ISFIRST") ? Cookies.get("ISFIRST") : CityIdH);
        }
    }, [CityIdH])

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

    const HandleLogOut = () => {
        Cookies.remove("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n");
        Cookies.remove("Count");
        Cookies.remove("USID");
        Router.push("/login");
        setState(false);
    }

    const HandleLogin = () => {
        Router.push("/login");
        setState(false);
    }

    const handleSetCity = (e) => {
        setCityIdH(e.target.value);
        Cookies.set("ISFIRST", e.target.value);
        Cookies.set("ISDefult", false);
        Cookies.set("CITN", JSON.stringify(City?.filter((item) => item?.id === Cookies.get('ISFIRST'))[0]?.name) ?? "شهر من");
        setTimeout(function () {
            router.reload();
        }, 2000);
    }

    const ShowCity = () => {
        return Cookies.get("CITN");
        return City?.filter((item) => item?.id === Cookies.get('ISFIRST'))[0]?.name ?? "شهر من";
        if (Cookies.get("CITN")?.length > 1) {
            return Cookies.get("CITN");
            setCityValue(Cookies.get("CITN"));
        } else {
            return Cookies.get("CITN");
        }
    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <Box component='ul' className={classes.mainNavMobile} p={0}>
                {
                    !Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n") ? (
                        <Button className={classes.BTNMenu} onClick={() => HandleLogin()}>
                            <Box component='li'>ورود به حساب کاربری
                            </Box>
                        </Button>

                    ) : (
                        <>
                            {
                                Cookies.get("Count") == 1 ? (
                                    <>
                                        <Grid style={{
                                            boxShadow: "-2px 16px 20px -4px #00000026",
                                            // background: "linear-gradient( to right, #928aff 0%, #8a5fcff5 51%, #392cff 100% )",
                                            background: "rgb(239 75 76)",
                                            marginTop: "-10px",
                                            paddingTop: "10px",
                                            color: "white",
                                        }}>
                                            <Avatar alt="Cindy Baker" src={BASE_Image_Url + ProfileInfo?.profileImage} className={classes.avatorImage} />
                                            <h4 className={classes.userDetail}>{ProfileInfo?.businessName}</h4>
                                        </Grid>
                                    </>
                                ) : (
                                    ""
                                )
                            }
                        </>
                    )
                }
                <Button className={classes.BTNMenu} onClick={() => { Router.push("/myprofile"), setState(false) }}>
                    <Box component='li'>
                        <EditIcon className={classes.menuIcon} />
                        <span>ویرایش حساب کاربری</span>
                    </Box>
                </Button>
                <Button className={classes.BTNMenu} onClick={() => { Router.push("/ResetPassword"), setState(false) }}>
                    <Box component='li'>
                    <EditIcon className={classes.menuIcon} />
                        تغییر رمز عبور</Box>
                </Button>

                <Button className={classes.BTNMenu} onClick={() => { setShowShare(true), setState(false) }}>
                    <Box component='li'>
                    <EditIcon className={classes.menuIcon} />
                        اشتراک با دوستان</Box>
                </Button>

                <Button className={classes.BTNMenu} onClick={() => { Router.push("/abus"), setState(false) }}>
                    <Box component='li'>
                    <InfoIcon className={classes.menuIcon} />
                        
                        درباره ما</Box>
                </Button>

                <Button className={classes.BTNMenu} onClick={() => { Router.push("/cntus"), setState(false) }}>
                    <Box component='li'>
                    <ContactIcon className={classes.menuIcon} />
                        
                        تماس با ما</Box>
                </Button>



                {
                    Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n") ? (
                        <>
                            <Button className={classes.BTNMenu} onClick={() => HandleLogOut()}>
                                <Box component='li'>
                        <SignoutIcon className={classes.menuIcon} />
                                    
                                    خروج از حساب کاربری</Box>
                            </Button>
                        </>
                    ) : (
                        ' '
                    )
                }

            </Box>
        </div>
    );

    return (
        <Container maxWidth='sm' className={classes.container}>
            <header className={classes.header}>
                <AppBar position="fixed" color='inherit' className={classes.appBarHeader}>
                    <Container maxWidth='sm'>

                        <Toolbar className={classes.root} >
                            <IconButton edge="start" aria-label="menu" className={classes.menuIcon}>
                                <ListIcon className={classes.menuIcon} onClick={toggleDrawer('left', true)} />
                            </IconButton>

                            <IconButton
                                className={classes.mycityButton}
                                onClick={() => setShowModalCity(true)}
                            >
                                <LocationOnIcon style={{
                                     fontSize: 35,
                                    color: "#525252",
                                }} />
                                <div>
                                    <p className={classes.mycityText}>
                                        {
                                            ShowCity()
                                        }
                                    </p>
                                    <ExpandMoreIcon className={classes.myCityUnderIcon} />
                                </div>

                            </IconButton>


                            <Box >
                                <Button style={{ marginTop: "7px" }} onClick={() => Router.push("/")} color="inherit">
                                    <Link>
                                        <Box style={{ width: '10rem', overflow: 'hidden' }}>
                                            <img src='../../../images/vitellogo.png' width='100%' />
                                        </Box>
                                    </Link>
                                </Button>
                            </Box>


                            {/* back */}
                            {/* <IconButton
                                onClick={() => router.back()}
                            // onClick={() => setShowModalCity(true)}
                            >
                                <ArrowBackIosIcon style={{
                                    fontSize: 20,
                                    color: "#3f51b5",
                                }} />
                            </IconButton> */}

                        </Toolbar>
                    </Container>

                </AppBar>
            </header>
            <div>
                <React.Fragment key={'left'}>
                    <Drawer anchor={'right'} open={state['left']} onClose={toggleDrawer('left', false)}>
                        {list('left')}
                    </Drawer>
                </React.Fragment>
            </div>
            <Modal
                open={ShowModalCity}
                onClose={() => setShowModalCity(false)}
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "50px"
                }}
            >
                <Slide direction="down" in={ShowModalCity} mountOnEnter unmountOnExit>
                    <Grid className={classes.containerSelect} container justify="center">
                        <Box display='flex' width='100%' justifyContent='space-evenly' className={classes.selectBoxTextFeildCheck}>
                            <select
                                className={classes.selectItemTextFeildCheck}
                                id="demo-simple-select-outlined22"
                                onChange={(e) => setProvinceId(e.target.value)}
                            >
                                <option>{ProvinceValue}</option>
                                {Province && Province?.map((item) => <option onClick={(e) => setProvinceId(e.target.value)} key={item?.id} value={item?.id}>{item.name}</option>)}
                            </select>

                            <select
                                className={classes.selectItemTextFeildCheck}
                                id="demo-simple-select-outlined222"
                                onChange={(e) => { handleSetCity(e) }}
                            >
                                <option>{CityValue}</option>
                                {City && City?.map((item) => <option key={item?.id} value={item?.id}>{item?.name}</option>)}
                            </select>

                        </Box>
                    </Grid>
                </Slide>
            </Modal>
            <Modal
                open={ShowShare}
                onClose={() => setShowShare(false)}
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "50px"
                }}
            >
                <Slide direction="down" in={ShowShare} mountOnEnter unmountOnExit>
                    <Grid className={classes.containerSelectShare} container justify="center">
                        <h2>ویتل را با دوستان خود به اشتراک بگذارید</h2>

                        <Box display='flex' width='100%' justifyContent='space-evenly' className={classes.selectBoxTextFeildCheck}>

                            <Box mb={2} display='flex' width='100%' alignItems='center' justifyContent='center'>
                                {/* <Button
                                    onClick={() => router.push(`sms:https://vittell.com/`)}
                                >
                                    <SocialMediaIcon
                                        social={true}
                                        Icon={<img src='/images/icons/message.png' width='100%' />}
                                    />
                                </Button> */}
                                <WhatsappShareButton url={"https://vittell.com/"} >
                                    <SocialMediaIcon
                                        social={true}
                                        Icon={<img src='/images/icons/WhatsApp.png' width='120%' />}
                                    />
                                </WhatsappShareButton>
                                <TelegramShareButton style={{ marginRight: "10px" }} url={"https://vittell.com/"} >
                                    <SocialMediaIcon
                                        social={true}
                                        Icon={<img src='/images/icons/telegram.png' width='100%' />}
                                    />
                                </TelegramShareButton>
                            </Box>
                        </Box>
                    </Grid>
                </Slide>
            </Modal>

        </Container>
    );
}

export default Header;
