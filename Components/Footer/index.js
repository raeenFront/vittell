import React, { useState, useEffect } from 'react';
import Router, { withRouter, useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';

// mrx : cookie
import Cookies from 'js-cookie'

// mrx : style
import { theme } from '../theme';

// mrx : material ui
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction, Grid, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const useStyles = makeStyles({
    containerSelect: {
        maxWidth: "50rem",
        backgroundColor: "#fafafa",
        width: "100%",
        borderRadius: "20px",
        padding: "20px",
        margin: "0px 10px"
    },
    ButtonDelete: {
        background: "#eaeaea",
        width: "100%",
        fontSize: "15px !important",
        color: "#585591",
        borderRadius: "20px",
        border: "solid 1px red",
        margin: 10
    },
    root: {
        position: 'fixed',
        marginBottom: "15px",
        borderRadius: "70px",
        bottom: 0,
        right: 0,
        width: '100%',
        height: '6rem',
        borderBottom: '1px solid #d9dbe9',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#EDECE7 !important',
        '& svg': {
            fontSize: '2rem',
            color: 'rgb(82, 82, 82)'
        },
        '& .MuiBottomNavigationAction-label': {
            color: 'rgb(82, 82, 82)',
            fontSize: '1rem',
            fontFamily: 'IRANYekan !important',
        },
        '& .MuiBottomNavigationAction-root': {
            minWidth: '6.2rem',
            padding: '0'
        },
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    insertIconFooter: {
        height: '3rem !important',
        width: '3rem !important',
        border: '2px solid #525252',
        borderRadius: '50%',
        color: '#525252 !important',
        fontWeight: 'bold'
    },
    footerIconPng: {
        maxWidth: '23%'
    },
    TextModal: {
        textAlign: "center",
        fontSize: "14px",
    }
})

const Footer = () => {
    const classes = useStyles();
    const router = useRouter();

    // mrx : states
    const [value, setValue] = useState(0);
    const [ModalBussAcount, setModalBussAcount] = useState(false);

    const handleGoSearch = () => {
        router.push("/search");
        localStorage.setItem("PostID", 1)
        localStorage.setItem("SearchInputs", JSON.stringify({}))
    }

    const handleAddPost = () => {
        if (Cookies.get("Count") == 1) {
            router.push("/addpost"), localStorage.setItem("PostID", 1)
        } else if (Cookies.get("Count") == 0) {
            setModalBussAcount(true);
        } else {
            Router.push({ pathname: '/login' }), toast.success("برای ایجاد آگهی باید دارای حساب کسب و کار باشید")
        }
    }

    const Creatbusinessaccount = () => {
        if (Cookies.get("Count") == 1) {
            Router.push("/creatbusinessaccount");
            setModalBussAcount(false);
        } else {
            Router.push("/makemyaccountbusiness");
            setModalBussAcount(false);
        }
    }

    return (
        <>
            <footer>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}>
                    <BottomNavigationAction
                        onClick={() => (router.push("/"), localStorage.setItem("PostID", 1))}
                        icon={<img src='/images/footerIcon3.png' className={classes.footerIconPng} />} label="خانه" />
                    <BottomNavigationAction
                        onClick={() => (router.push("/offers"), localStorage.setItem("PostID", 1))}
                        icon={<img src='/images/footerIcon2.png' className={classes.footerIconPng} />} label="تخفیف ها"
                    />

                    <BottomNavigationAction
                        onClick={() => handleAddPost()}
                        icon={<AddIcon className={classes.insertIconFooter} />}
                    />

                    <BottomNavigationAction
                        onClick={() => handleGoSearch()}
                        icon={<img src='/images/footerIcon4.png' className={classes.footerIconPng} />} label="جستجو"
                    />
                    <BottomNavigationAction
                        onClick={() => Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n") ? router.push("/myprofile") : (Router.push({ pathname: '/login' }, localStorage.setItem("PostID", 1)), toast.success("برای ایجاد آگهی باید دارای حساب کسب و کار باشید"))}
                        icon={<img src='/images/footerIcon.png' className={classes.footerIconPng} />} label="ویترین من"
                    />

                </BottomNavigation>
                <Modal
                    open={ModalBussAcount}
                    onClose={() => setModalBussAcount(false)}
                    style={{
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "50px"
                    }}
                >
                    <Slide direction="down" in={ModalBussAcount} mountOnEnter unmountOnExit>
                        <Grid className={classes.containerSelect} container justify="center">
                            <h1 className={classes.TextModal}> برای بارگذاری پست، ابتدا باید پروفایل تجاری خود را بسازید</h1>
                            <Button onClick={() => Creatbusinessaccount()} className={classes.ButtonDelete}>ایجاد اکانت به تجاری</Button>
                        </Grid>
                    </Slide>
                </Modal>
            </footer>
        </>

    );
}

export default Footer;
