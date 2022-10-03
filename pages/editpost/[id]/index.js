import React, { useState, useEffect } from 'react';
import { Contexts } from '../../../contexts';
import { ToastContainer, toast } from 'react-toastify';
import Router, { withRouter, useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Dialog from '../../../Components/Common/image croper/Dialog';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : loading
import PostLoading from '../../../Components/Common/Loading/PostLoading';

// mrx : components
import { theme } from '../../../Components/theme';
import Btn from '../../../Components/Common/Button';
import TextFieldItem from '../../../Components/Common/TextFieldItem';

// mrx : api links
import {
  GET_POST_BY_ID,
  UPLOAD_POST_IMAGE_BY_ID,
  EDIT_POST,
  BASE_Image_Url,
} from '../../../pages/api/index';

// mrx : api
import { PutAuthUrl, PostAuthUrl, GetAuthUrl, GetUrl } from '../../../pages/api/config';

// mrx : material ui
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Container, Modal } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

// mrx : my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const useStyles = makeStyles({
  buttonSignUp: {
    '& button': {
      width: '40%',
    }
  },
  choosePicItem: {
    backgroundColor: '#d1d3d4',
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
      fontWeight: '800'
    },
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
  mainTags: {
    width: "100%",
    overflow: "scroll",
    height: "240px"
  },
  textereaItem: {
    outline: 'none',
    border: 'none',
    borderRadius: '.5rem',
    backgroundColor: '#fff',
    width: '95%',
    padding: '1rem',
    fontWeight: '800'
  },
  priceitemSpan: {
    color: primary,
    fontSize: '1.3rem',
    fontWeight: '800'
  },
  priceTextSpan: {
    color: '#80808091 !important',
    borderBottom: '1px solid #80808091',
    border: "none",
    borderBottom: "solid",
    background: "transparent",
    marginRight: 10,
    outline: "none",
  },
  btnBage: {
    '& Button': {
      color: '#211d70',
      minWidth: '79px !important',
      height: '1.75rem',
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
  }

})

const AddPostIndex = () => {
  const classes = useStyles();
  const router = useRouter();

  // mrx : get post id
  const { id } = router.query;

  Cookies.set("PostID", id);

  // mrx : state
  const [Image, setImage] = useState(null);
  const [ButtonType, setButtonType] = useState(true);
  const [PostID, setPostID] = useState("");

  // form States
  const [PostDetail, setPostDetail] = useState([]);
  const [Picture, setPicture] = useState("");
  const [Title, setTitle] = useState(null);
  const [Description, setDescription] = useState(null);
  const [Price, setPrice] = useState(null);
  const [DisCount, setDisCount] = useState(null);
  const [lables, setlables] = useState([]);
  const [lablesId, setlablesId] = useState([]);
  const [ShowAddLables, setShowAddLables] = useState(false);
  const [LableValue, setLableValue] = useState("ویتل");
  const [loading, setLoading] = useState(true);
  const [PicDt, setPicDt] = useState([]);

  useEffect(() => {
    // mrx : get Post Detail
    GetAuthUrl(GET_POST_BY_ID(Cookies.get("PostID"))).then(res => {
      if (res && res?.status === 200) {
        if (res?.data?.isSuccess == true) {
          const data = res?.data?.data;
          setPostDetail(data);
          setTitle(data?.title);
          setDescription(data?.description);
          setPrice(data?.price);
          setDisCount(data?.percentage);
          setImage(data?.image);
          setlablesId(data?.lstLabels);
          setLoading(false);
        } else if (res?.data?.isSuccess == false) {

        }
      }
    })
  }, [])

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

  const HandleeditPost = () => {

    // mrx : make labales to the array of string ["test1","test2"]
    setlables(lablesId && lablesId?.map((item) => item.LableValue))

    PutAuthUrl(EDIT_POST, {
      id: Cookies.get("PostID"),
      Title: Title,
      Description: Description,
      Price: Price ? parseInt(Price) : 0,
      DisPrice: DisCount ? parseInt(DisCount) : 0,
      percentage: DisCount ? parseInt(DisCount) : 0,
      lstLabels: lablesId ? lablesId : []
    }).then(res => {
      console.log("test " + res?.data?.data?.id);
      if (res && res.status === 200) {
        if (res.data.isSuccess == true) {
          setPostID(res?.data?.data?.id);
          HandleUploadImage();

        } else if (res.data.isSuccess == false) {
          toast.error(res?.data?.message);
        }
      }
    })
  }

  const HandleUploadImage = () => {
    const PictureFile = new FormData();
    PictureFile.append("file", Picture);

    PostAuthUrl(UPLOAD_POST_IMAGE_BY_ID + `?id=${Cookies.get("PostID")}&x=${PicDt?.x}&y=${PicDt?.y}&width=${PicDt?.w}&height=${PicDt?.h}`,
      PictureFile
    ).then((res, err) => {
      if (res && res.status === 200) {
        toast.success("پست با موفقیت ثبت شد");
        Router.push("/myprofile");
        Cookies.remove("PostID");
      } else {
        toast.error(res?.data?.message);
      }
    });
  }

  const HandleAddLable = (e) => {
    if (LableValue.length < 2) {
      toast.error("لطفا عنوان تگ رو به درستی وارد کنید ");
    } else if (lablesId?.length === 10) {
      toast.error("شما حداکثر تا 10 تگ میتوانید اضافه کنید");
    } else {
      setlablesId(prev => [...prev,
        LableValue
      ]);
      setlables(prev => [...prev, LableValue])
      setLableValue("");
    }
  }

  const HandleDeleteLable = (RemoveID) => {
    if (lablesId?.length === 1) {
      toast.error("شما حداقل به یک تگ نیاز دارید");
    } else {
      setlablesId(lablesId.filter(lablesId => lablesId !== RemoveID));
    }
  }

  const handleSetDisPrice = (e) => {
    if (e.target.value > 100) {
      setDisCount(0);
      toast.error("درصد را لطفا به درستی وارد کنید")
    } else {
      setDisCount(e.target.value)
    }
  }

  return (
    <>
      {
        loading ? (
          <PostLoading />
        ) : (
          <>
            <Box
              boxShadow={3} mt={8}
              className={classes.choosePicItem}
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              height='20vh'
              width='100%'
            >
              <Box boxShadow={3} style={{ backgroundImage: `url('/images/slider-pic.png')`, width: '100%', height: '17rem' }} className={classes.backgroundPicSlider}>

                {ButtonType ? (
                  <img src={BASE_Image_Url + Image} height='100%' width='100%' />
                ) : (
                  <img src={Image} height='100%' width='100%' />
                )}
                {/* <Dialog
                  type="edit"
                  ButtonType={ButtonType}
                  setButtonType={setButtonType}
                  setImage={setImage}
                  setPicture={setPicture}
                  setPicDt={setPicDt}
                /> */}
              </Box>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{
                  background: "rgb(210 192 192 / 60%)",
                  padding: "20PX",
                  borderRadius: "20px",
                  width: "50%",
                  position: 'absolute',
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
                      <AddAPhotoIcon />
                      انتخاب عکس
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


            <Container style={{ margin: "40px 0px 150px 0px" }} maxWidth='sm'>
              <Box mt={3} mb={1} className={classes.boxTextereaItem} display='flex' width='100%' flexDirection='column' justifyContent='center' alignItems='center'>
                <TextFieldItem
                  inputProps='عنوان:'
                  value={Title}
                  backgroundColor='#fff'
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextareaAutosize value={Description} onChange={(e) => setDescription(e.target.value)} className={classes.textereaItem} aria-label="minimum height" minRows={5} placeholder='توضیحات:' />
              </Box>

              <Box component='span' display='flex' mb={.5} mr={2.5} className={classes.priceitemSpan}>
                قیمت :
                <input value={Price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="اختیاری" className={classes.priceTextSpan} />
              </Box>

              <Box component='span' display='flex' mr={2.5} className={classes.priceitemSpan} >
                درصد تخفیف :
                <input value={DisCount} onChange={(e) => handleSetDisPrice(e)} type="number" placeholder="اختیاری" className={classes.priceTextSpan} />
              </Box>

              <Box my={3} px={1.5} display='flex' width='100%' alignItems='center' justifyContent='space-between' className={classes.btnBage} >
                <Button onClick={() => setShowAddLables(true)} variant='contained'>برچسب ها</Button>
                <Button onClick={() => setShowAddLables(true)} variant='contained'><AddIcon /></Button>
                <Button onClick={() => setShowAddLables(true)} variant='contained'><MoreHorizIcon /></Button>
              </Box>

              <Box my={5} width='100%' textAlign='center' className={classes.buttonSignUp}>
                <Btn onClick={() => HandleeditPost()} boxShadow={3} variant="contained" width='30%'>تایید</Btn>
              </Box>

              {/* <Box mb={10} display='flex' justifyContent='space-between' width='100%' textAlign='center' className={classes.btnAddPost}>
                <Btn boxShadow={3} variant="contained">انتقال به صفحه اصلی</Btn>
                <Btn boxShadow={3} variant="contained">انتقال به صفحه تخفیفات</Btn>
              </Box> */}

            </Container>

          </>
        )
      }
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
                    key={item}
                    container
                    direction="row"
                    alignItems="center"
                    className={classes.lableForm}
                  >
                    <Button
                      onClick={() => HandleDeleteLable(item)}
                    >
                      <CloseRoundedIcon />
                    </Button>
                    <p>{item}</p>
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
    </>
  );
}



export default AddPostIndex;
