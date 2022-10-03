import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Router, { withRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Dialog from '../../Common/image croper/Dialog';

// mrx : styles
import { theme } from '../../theme';

// mrx : context
import { Contexts } from '../../../contexts';

// mrx : components
import Btn from '../../Common/Button';
import TextFieldItem from '../../Common/TextFieldItem';

// mrx : api links
import {
    ADD_POST_AUTH,
    UPLOAD_POST_IMAGE_BY_ID,
} from '../../../pages/api/index';

// mrx : api
import { PostUrl, PostAuthUrl, GetAuthUrl, GetUrl } from '../../../pages/api/config';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : material ui
import AddIcon from '@material-ui/icons/AddCircleOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Container, Modal, Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Fade from '@material-ui/core/Fade';
import Loadings from '../../Common/Loading';

// mrx : my variables
const primary = theme.palette.primary.main;
const secondary = 'theme.palette.secondary.main';
const white = theme.palette.common.white;

const useStyles = makeStyles({
    buttonSignUp: {
        '& button': {
            width: '40%',
        }
    },
    choosePicItem: {

        borderBottom: `1px solid #aaa`,
        fontSize: '1.4rem',
        color: '#ffffffc4',
        '& svg': {
            fontSize: '3rem'
        }
    },
    textFieldItemBox: {
        '& .MuiTextField-root': {
            [theme.breakpoints.up('sm')]: {
                width: '90% !important',
            },
        },
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center'
        },
    },
    boxTextereaItem: {
        '& p': {
            fontWeight: '500'
        },
    },
    ButtonCustom: {
        background: "#fff",
        height: "100px",
        // border: '2px solid  rgb(239 75 76)',
        borderRadius: '4px',
        width: '49%',
        fontSize: "15px !important",


    },
    ButtonSend: {
        background: "#eaeaea",
        width: "100%",
        fontSize: "15px !important",
        color: "#585591",
        borderRadius: "20px",
        border: "solid 1px #b7b2b2",
        marginTop: 30
    },
    ButtonSend2: {
        background: "#eaeaea",
        width: "100%",
        fontSize: "15px !important",
        color: "#585591",
        borderRadius: "20px",
        border: "solid 1px #b7b2b2",
        marginTop: 10
    },
    textereaItem: {
        outline: 'none',
        border: 'none',
        borderRadius: '.5rem',
        width: '95%',
        padding: '1rem',
        fontWeight: '800',
        marginTop:'10px',
        marginBottom: '10px',
    },
    priceitemSpan: {
        color: primary,
        fontSize: '1.3rem',
        fontWeight: '800',
        padding: '1rem',
    },
    priceTextSpan: {
   
        color: '#80808091 !important',
        height: '40px',
        borderRadius: '4px',
        border: "none",
        paddingLeft: '5px',
        paddingRight: '10px',
        background: "#fff",
        outline: "none",
        width: '49%',
    },
    btnBage: {
        padding:'1rem',
        '& Button': {
            color: '#211d70',
            minWidth: '79px !important',
            height: '4rem',
            padding: '0 !important',
            '& span': {
                fontWeight: '700'
            },
            '& svg': {
                fontWeight: '700'
            },
        }
    },
    btnAddPost: {
        '& button': {
            width: '45% !important',
            fontSize: '1.1rem !important',
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
    containerSelect: {
        width: "100%",
        padding: "20px",
        overflow: "scroll",
        position: "absolute",
        maxWidth: "90%",
        backgroundColor: "#fafafa",
        borderRadius: "20px",
    },
    lableForm: {
        background: "#e9e9e9",
        borderRadius: "20px",
        border: "solid 1px red",
        margin: "5px 0px",
    },
    mainTags: {
        width: "100%",
        overflow: "scroll",
        height: "240px"
    }
})

const AddPostIndex = () => {
    const classes = useStyles();

    // mrx : state
    const [image, setImage] = useState("../images/Placeholder.PNG");
    const [ButtonType, setButtonType] = useState(true);
    const [PostID, setPostID] = useState(null);
    const [PostIDs, setPostIDs] = useState(null);

    // form States
    const [Picture, setPicture] = useState("");
    const [Title, setTitle] = useState(null);
    const [Description, setDescription] = useState(null);
    const [Price, setPrice] = useState(0);
    const [DisCount, setDisCount] = useState(0);
    const [lables, setlables] = useState([]);
    const [lablesId, setlablesId] = useState([]);
    const [ShowAddLables, setShowAddLables] = useState(false);
    const [LableValue, setLableValue] = useState("ویتل");
    const [PicDt, setPicDt] = useState([]);
    const [AddPostLoad, setAddPostLoad] = useState(false)

    // mrx : handle set Picture
    const handleSetImage = (e) => {
        setPicture(e.target.files[0]);
        setImage(e.target.files[0] && URL.createObjectURL(e.target.files[0]));
        setButtonType(false);
        if (e.target.files[0] == undefined) {
            setImage("../images/Placeholder.PNG");
            setButtonType(true);
        }
    };

    const HandleAddPost = () => {
        setAddPostLoad(true)
        // mrx : make labales to the array of string ["test1","test2"]
        setlables(lablesId && lablesId?.map((item) => item.LableValue))

        if (Title?.length > 30) {
            toast.error("تعداد کاراکتر عنوان طولانی می باشد")
            setAddPostLoad(false)
        } else {
            PostAuthUrl(ADD_POST_AUTH, {
                Title: Title,
                Description: Description,
                Price: Price ? parseInt(Price) : 0,
                // DisPrice: DisCount ? parseInt(DisCount) : 0,
                percentage: DisCount ? parseInt(DisCount) : 0,
                lstLabels: lables ? lables : [],
            }).then(res => {
                if (res && res.status === 200) {
                    if (res.data.isSuccess == true) {
                        Cookies.set("PostID", res?.data?.data?.id);
                        HandleUploadImage();
                    } else if (res.data.isSuccess == false) {
                        toast.error(res?.data?.message);
                        setAddPostLoad(false)
                    }
                }
            })
        }
    }

    const HandleUploadImage = () => {
        const PictureFile = new FormData();
        PictureFile.append("file", Picture);

        PostAuthUrl(UPLOAD_POST_IMAGE_BY_ID + `?id=${Cookies.get("PostID")}&x=${PicDt?.x}&y=${PicDt?.y}&width=${PicDt?.w}&height=${PicDt?.h}`,
            PictureFile
        ).then((res, err) => {
            if (res && res.status === 200) {
                toast.success("آگهی با موفقیت ثبت شد");
                Router.push("/myprofile");
                Cookies.remove("PostID")
                setAddPostLoad(false);
            } else {
                toast.error(res?.data?.message);
                setAddPostLoad(false);
            }
        });
    }

    const HandleAddLable = (e) => {
        if (LableValue?.length < 2) {
            toast.error("لطفا عنوان تگ رو به درستی وارد کنید ");
        } else if (lablesId?.length === 10) {
            toast.error("شما حداکثر تا 10 تگ می توانید اضافه کنید");
        } else {
            setlablesId(prev => [...prev, {
                id: uuidv4(),
                LableValue: LableValue
            }]);
            setlables(prev => [...prev, LableValue])
            setLableValue("");
        }
    }

    const HandleDeleteLable = (RemoveID) => {
        if (lablesId?.length === 1) {
            toast.error("شما حداقل به یک تگ نیاز دارید");
        } else {
            setlablesId(lablesId.filter(lablesId => lablesId.id !== RemoveID));
        }
    }

    const handleSetDisPrice = (e) => {
        if (e.target.value > 100) {
            setDisCount(0);
            toast.error("لطفا درصد را به درستی وارد کنید")
        } else {
            setDisCount(e.target.value)
        }
    }

    useEffect(() => {
        HandleAddLable()
    }, [])

    return (
        <>
            <Box  height= "100vh">
                <Box
                    style={{
                        // backgroundImage: `url(${image})`,
                        // backgroundSize: 'cover',
                        // backgroundRepeat: 'no-repeat'

                    }}
                    
                    mt={8}
                    className={classes.choosePicItem}
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    height='20vh'
                    width='100%'
                >
                    {/* <Dialog
                    ButtonType={ButtonType}
                    setButtonType={setButtonType}
                    setImage={setImage}
                    setPicture={setPicture}
                    setPicDt={setPicDt}
                /> */}
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        style={{
                            background: "rgb(255 255 255 / 100%)",
                            padding: "20PX",
                            borderRadius: "20px",
                            width: "50%",
                            marginBottom: "1rem"
                        }}
                    >
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="icon-button-file"
                            type="file"
                            onChange={(e) => handleSetImage(e)}
                        />
                        <label htmlFor="icon-button-file">
                            {ButtonType ? (
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <AddAPhotoIcon style={{ color: "#aaa" }} />
                                    <Typography style={{ color: "#aaa" }}> انتخاب عکس</Typography>
                                </Grid>
                            ) : (
                                " "
                            )}
                        </label>
                        <label htmlFor="icon-button-file">
                            {!ButtonType ? (
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <AddAPhotoIcon />
                                    تغییر عکس
                                </Grid>
                            ) : (
                                " "
                            )}
                        </label>
                    </Grid>

                </Box>

                <Container
                    style={{ margin: "40px 0px 10px 0px" }}
                    maxWidth='sm'

                >

                    <Box mt={3} mb={1} className={classes.boxTextereaItem} display='flex' width='100%' flexDirection='column' justifyContent='center' alignItems='center'>
                        <TextFieldItem
                            inputProps='عنوان ( حداکثر 40 کاراکتر ) : '
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextareaAutosize onChange={(e) => setDescription(e.target.value)} className={classes.textereaItem} aria-label="minimum height" minRows={5} placeholder='توضیحات:' />
                    </Box>

                    <Box  display='flex' justifyContent='space-between' mb={.5}  className={classes.priceitemSpan}>
                        <input value={Price == 0 ? "اختیاری" : Price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="قیمت(اختیاری)" className={classes.priceTextSpan} />
                        <input  value={DisCount == 0 ? "اختیاری" : DisCount} onChange={(e) => handleSetDisPrice(e)} type="number" placeholder="تخفیف % (اختیاری)"  className={classes.priceTextSpan} />
                    </Box>


                    <Box  px={1.5} display='flex' width='100%' alignItems='center' justifyContent='space-between' className={classes.btnBage} >
                        <Button className={classes.ButtonCustom}>برچسب ها:</Button>
                        <Button onClick={() => setShowAddLables(true)} className={classes.ButtonCustom}><AddIcon /></Button>
                        {/* <Button onClick={() => setShowAddLables(true)} className={classes.ButtonCustom}><MoreHorizIcon /></Button> */}
                    </Box>

                    {
                        AddPostLoad ? (
                            <Loadings />
                        ) : (
                            <Box my={5} width='100%' textAlign='center' className={classes.buttonSignUp}>
                                <Btn onClick={() => HandleAddPost()} variant="contained" width='30%'>ثبت</Btn>
                            </Box>
                        )
                    }


                    {/* <Box mb={10} display='flex' justifyContent='space-between' width='100%' textAlign='center' className={classes.btnAddPost}>
                    <Btn boxShadow={3} variant="contained">انتقال به صفحه اصلی</Btn>
                    <Btn boxShadow={3} variant="contained">انتقال به صفحه تخفیفات</Btn>
                </Box> */}

                </Container>
                <Modal
                    open={ShowAddLables}
                    onClose={() => setShowAddLables(false)}
                    style={{
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflowY: "scroll",
                    }}
                >
                    <Slide direction="up" in={ShowAddLables} mountOnEnter unmountOnExit>
                        <Grid className={classes.containerSelect} container justify="center">
                            <input
                                placeholder="عنوان تگ"
                                value={LableValue}
                                onChange={(e) => setLableValue(e.target.value)}
                                className={classes.Input}
                                type="text"
                            />
                            <Grid className={classes.mainTags}>
                                {lablesId &&
                                    lablesId?.map((item) => (
                                        <Grid
                                            key={item?.id}
                                            container
                                            direction="row"
                                            alignItems="center"
                                            className={classes.lableForm}
                                        >
                                            <Button
                                                onClick={() => HandleDeleteLable(item.id)}
                                            >
                                                <CloseRoundedIcon />
                                            </Button>
                                            <p>{item.LableValue}</p>
                                        </Grid>
                                    ))}
                            </Grid>
                            <Button
                                onClick={() => HandleAddLable()}
                                className={classes.ButtonSend}
                            >
                                ثبت تگ
                            </Button>
                            <Button
                                onClick={() => setShowAddLables(false)}
                                className={classes.ButtonSend2}
                            >
                                اتمام
                            </Button>
                        </Grid>
                    </Slide>
                </Modal>
            </Box>

        </>
    );
}



export default AddPostIndex;
