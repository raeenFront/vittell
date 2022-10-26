import React, { useState, useEffect, useLayoutEffect } from 'react';
import Router, { withRouter, useRouter } from 'next/router';

import {
  TelegramIcon,
  TelegramShareButton,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
import { SocialIcon } from 'react-social-icons';

// mrx : components
import Btn from '../../../Components/Common/Button';
import SocialMediaIcon from '../../../Components/Common/SocialMediaIcon';
import { toPersianNumber } from '../../../Components/farsi';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : styles
import { theme } from '../../../Components/theme';

// mrx : material ui
import {
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
  Button,
  Grid
} from '@material-ui/core';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Bookmark from '@material-ui/icons/Bookmark';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import PhoneIcon from '@material-ui/icons/Phone';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Modal from '@material-ui/core/Modal';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

// mrx : api links
import {
  GET_POST_BY_ID,
  BASE_Image_Url,
  LIKE_POST_BY_AUTH,
  SAVE_POST_BY_AUTH,
  GET_POST_COMMENTS_BY_POST_ID,
  ADD_COMMENTS_BY_AUTH,
  GET_ANY_USER_BY_ID,
  PAY_FACTOR,
  DEL_POST,
} from '../../../pages/api/index';

// mrx : api
import { PostUrl, PostAuthUrl, GetAuthUrl, GetUrl, DeleteAuthUrl } from '../../../pages/api/config';

// mrx : loading
import PostLoading from '../../../Components/Common/Loading/PostLoading';
import { toast } from 'react-toastify';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;
const black = theme.palette.initial.main;


// mrx : styles
const useStyles = makeStyles({
  CloeModalSahre: {
    marginTop: "-12px",
    marginRight: "-6px",
  },
  containerSelect: {
    maxWidth: "50rem",
    backgroundColor: "#fafafa",
    width: "100%",
    borderRadius: "20px",
    padding: "20px",
    margin: "0px 10px"
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
  ModalShare: {
    position: "absolute",
    background: "#efefef",
    width: "50%",
    padding: "7px",
    borderRadius: "5px",
    marginTop: "-117px",
    right: "59px",
    boxShadow: " 0px -3px 6px 2px rgb(188 190 192 / 64%)",
  },
  avatorImageBox: {
    marginTop: '8rem',
    '& .MuiAvatar-root': {
      width: theme.spacing(8),
      height: theme.spacing(8),
      border: '1px solid #fff',
    },
    '& span': {
      color: black,
      fontSize: '1.8rem',
      fontWeight: 'bold',

    }
  },
  avatorImage: {
    boxShadow: '0px -2px 13px 2px rgba(188,190,192,0.64)',
  },
  avatorImageComments: {
    boxShadow: 'none !important',
    width: "50px",
    height: "50px",
  },
  backgroundPicAds: {
    '& img': {
      boxShadow: '0px -5px 3px 0px rgba(188,190,192,0.64)',
    }
  },
  badgeSliderBoxPic: {
    display: 'inline!important',
    height: '5rem!important',
    width: '5rem!important',
    backgroundColor: primary,
    borderRadius: '50px'
  },
  svgBoxAds: {
    '& svg': {
      margin: '0 .75rem',
      fontSize: '1.75rem',
      color: '#716c6d',
    },
    '& img': {
      margin: '0 .75rem'
    }
  },
  titleOfParagraph: {
    color: secondary,
    fontSize: '1.6rem'
  },
  paragraphPost: {
    color: '#272042 !important',
    fontWeight: 800,
    lineHeight: '2rem',
    fontSize: '1.3rem',
    width: "100%",
    overflow: "hidden",
    background: "#fafafa",
    border: "none",
  },

  PriceItemAds: {
    fontSize: '1.5rem',
    color: primary,
    fontWeight: 'bold',

  },
  PriceItemAds2: {
    fontSize: '1.5rem',
    color: black,
    fontWeight: 'bold',
    marginLeft: '2rem'
  },
  btnBusiness: {
    '& button': {
      width: '40%!important'
    }
  },
  backgroundPicSlider: {
    '& img': {
      objectFit: 'cover',
      height: '100%'
    }
  },
  likeIcon: {
    fontSize: "25px !important",
    color: "#e2002d !important"
  },
  likeBtn: {
    marginRight: -10,
    "& span": {
      padding: '0px'
    }
  },
  containerSelectShare: {
    maxWidth: "50rem",
    backgroundColor: "#fafafa",
    position: "absolute",
    width: "90%",
    borderRadius: "20px",
    padding: "20px",
  },
  SaveBtn: {
    marginRight: -10,
  },
  SaveIcon: {
    fontSize: "25px !important",
    color: "#333333 !important",
  },
  Comments: {
    padding: "0px 5px !important"
  },
  CommentsModal: {
    background: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    outline: "none",
    height: "100vh",
    marginTop: 80
  },
  CloseIcon: {
    fontSize: "29px",
    color: "#00000085 !important",
  },
  CloseBtn: {
    position: "absolute",
    margin: 10
  },
  CommentsModalMain: {
    width: "100%",
    // margin: "60px 25px",
    padding: "0px 0px 0px 20px",
    margin: "20px 20px",
    borderRadius: "0px",
    height: "650px",
    overflowY: "scroll"
  },
  CommentsMain: {
    margin: "10px 0px",
  },
  CommentsMain2: {
    fontSize: "14px",
    background: "#a7989842",
    padding: "1px 20px",
    borderBottomLeftRadius: "15px",
    borderTopRightRadius: "15px",
    borderTopLeftRadius: "30px",
    borderBottomRightRadius: "30px",
  },
  CommentsUserName: {
    margin: "0px",
    color: "#a9a6a6",
    fontSize: "13px",
    marginTop: "11px",
    marginBottom: "-10px"
  },
  MainInput: {
    position: "absolute",
    bottom: "0px",
    background: "#e8e4e485",
    paddingTop: "18px",
    borderTopRightRadius: "20px",
    borderTopLeftRadius: "20px",
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
  SearchInput: {
    width: "90%",
    border: ' none',
    background: 'white',
    height: ' 42px',
    marginBottom: ' 15px',
    borderRadius: ' 20px',
    padding: ' 20px',
    outline: ' none',
    marginRight: ' 10px',
    color: '#2f2e2e',
  },
  sendIcon: {
    marginRight: "20px",
    position: "absolute",
    bottom: "7px",
  },
  MainUserDetailForm: {
    width: "100%",
    // margin: "60px 25px",
    padding: "0px 0px 0px 20px",
    margin: "70px 20px",
    borderRadius: "0px",
    height: "100vh",
  },
  ButtonSend: {
    background: "#eaeaea",
    width: "100%",
    fontSize: "15px !important",
    color: "#585591",
    borderRadius: "20px",
    border: "solid 1px #b7b2b2",
    margin: 10
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
  lableName: {
    fontSize: '1.5rem',
    color: secondary
  }
})

const Posts = () => {
  const classes = useStyles();
  const router = useRouter();

  // mrx : states
  const [PostDetail, setPostDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [PostID, setPostID] = useState(null);
  const [Like, setLike] = useState(false);
  const [saved, setsaved] = useState(false);
  const [ShowComments, setShowComments] = useState(false);
  const [UComments, setUComments] = useState([]);
  const [CommentsLoading, setCommentsLoading] = useState(true);
  const [SearchText, setSearchText] = useState(null);
  const [Mobile, setMobile] = useState(null);
  const [Name, setName] = useState(null);
  const [Family, setFamily] = useState(null);
  const [UserDetailModal, setUserDetailModal] = useState(false);
  const [ShareModal, setShareModal] = useState(false);
  const [UserDetail, setUserDetail] = useState(null);
  const [ShowModalAccept, setShowModalAccept] = useState(false);
  const [Labels, setLabels] = useState([]);
  const [ShowImage, setShowImage] = useState(false);

  // mrx : get post id
  const { id } = router.query;

  const showShareModal = (e) => {
    setShareModal(e);
  }

  // set Post id for scroll
  useEffect(() => {
    localStorage.setItem("PostID", id);
  }, [id])

  const GetComments = () => {
    GetUrl(GET_POST_COMMENTS_BY_POST_ID + `?postId=${PostDetail?.id}`).then(res => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess == true) {
          const data = res?.data?.data;
          setCommentsLoading(false);
          setUComments(data);
        } else if (res?.data?.isSuccess == false) {
          setCommentsLoading(true);
        }
      }
    })
  }

  const HandleAddPost = () => {
    if (Mobile?.length !== 11) {
      toast.error("لطفا شماره تماس را به درستی وارد کنید");
    } else {
      if (Name && Family && Mobile !== null) {
        PostUrl(ADD_COMMENTS_BY_AUTH, {
          postId: PostDetail?.id,
          text: SearchText,
          mobile: Mobile,
          name: Name,
          family: Family,
        }).then(res => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess == true) {
              const data = res?.data?.data;
              setCommentsLoading(false);
              setUComments(data);
              HandleShowUserDetail(false);
              setSearchText("");
              GetComments();
              setSearchText("");
            } else if (res?.data?.isSuccess == false) {
              setCommentsLoading(true);
            }
          }
        })
      } else {
        toast.error("لطفا تمامی موارد رو بدرستی وارد کنید")
      }
    }
  }

  const HandleShowComments = (status) => {
    GetComments();
    setShowComments(status);
  }

  const HandleShowUSerDetailIf = () => {
    if (SearchText !== null && SearchText.length > 1) {
      HandleShowUserDetail(true)
    } else {
      toast.error("لطفا نظر خود را وارد کنید");
    }
  }

  const HandleShowUserDetail = (status) => {
    if (status === true && Cookies.get("USID")) {
      GetAuthUrl(GET_ANY_USER_BY_ID + `?id=${Cookies.get("USID")}`).then(res => {
        if (res && res?.status === 200) {
          if (res?.data?.isSuccess == true) {
            const data = res?.data?.data;
            setMobile(data?.mobile);
          }
        }
      })
    }
    setUserDetailModal(status);
  }

  useEffect(() => {
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {

      // mrx : get Post Detail
      GetAuthUrl(GET_POST_BY_ID(id)).then(res => {
        if (res && res?.status === 200) {
          if (res?.data?.isSuccess == true) {
            const data = res?.data?.data;
            setPostDetail(data);
            setLike(data?.liked);
            setsaved(data?.saved);
            setUserDetail(data?.userId);
            setLabels(data?.lstLabels);
            setLoading(false);
          } else if (res?.data?.isSuccess == false) {
            setLoading(false);
          }
        }
      })
    } else {
      // mrx : get Post Detail
      GetUrl(GET_POST_BY_ID(id)).then(res => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess == true) {
            const data = res?.data?.data;
            setPostDetail(data);
            setLike(data.liked);
            setsaved(data.saved);
            setLoading(false);
          } else if (res?.data?.isSuccess == false) {
            setLoading(false);
          }
        }
      })
    }
  }, [id])

  const HandleLikePost = () => {
    GetAuthUrl(LIKE_POST_BY_AUTH + `?postId=${PostDetail?.id}`).then(res => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess == true) {
          Like ? setLike(false) : setLike(true);
        } else if (res?.data?.isSuccess == false) {
          setLike(false);
        }
      }
    })
  }

  const HandleSavePost = () => {
    GetAuthUrl(SAVE_POST_BY_AUTH + `?postId=${PostDetail?.id}`).then(res => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess == true) {
          toast.success(res?.data?.message);
          saved ? setsaved(false) : setsaved(true);
        } else if (res?.data?.isSuccess == false) {
          setsaved(false);
          toast.error(res?.data?.message);
        }
      }
    })
  }

  const HandleSendTo = (type) => {
    PostAuthUrl(PAY_FACTOR, {
      payFor: type,
      postId: PostDetail?.id,
      offPercentage: 0,
      offCode: ""
    }).then(res => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess == true) {
          toast.success(res?.data?.message);
        } else if (res?.data?.isSuccess == false) {
          toast.error(res?.data?.message);
        }
      }
    })
  }

  const HandleDeletePost = () => {
    DeleteAuthUrl(DEL_POST + `?id=${PostDetail?.id}`).then(res => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess == true) {
          toast.success(res?.data?.message);
          Router.push("/myprofile");
        } else if (res?.data?.isSuccess == false) {
          toast.error(res?.data?.message);
          Router.push("/myprofile");
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
            <Container maxWidth='sm'>
              <Box onClick={() => Router.push(`/profile/${PostDetail?.userId}`)} display='flex' alignItems='center' className={classes.avatorImageBox}>
                <Box>
                  <Avatar alt="Cindy Baker" src={BASE_Image_Url + PostDetail?.userProfile} className={classes.avatorImage} />
                </Box>
                <Box component='span' fontWeight='bold' mx={1} display='inline-block'>{PostDetail?.userName}</Box>
              </Box>
            </Container>

            <Box onClick={() => setShowImage(true)} mt={1} mb={1} style={{ backgroundImage: `url('/images/defult.png')`, width: '100%', }} className={classes.backgroundPicAds}>
              <img src={BASE_Image_Url + PostDetail?.image} width='100%' /*objectFit='cover'*/ />
            </Box>

            <Container maxWidth='sm' >
              <Box width='100%' style={{ borderBottom: `2px solid #b8b8b8`, paddingBottom: '4rem' }}>
                <Box display='flex' alignItems='center' flexDirection='row-reverse' flex='1' className={classes.svgBoxAds}>
                  {/* <FormControlLabel
                    onClick={() => Cookies.get("USID") ? HandleLikePost() : (Router.push({ pathname: '/login' }), toast.success("برای ایجاد آگهی باید دارای حساب کسب و کار باشید"))}
                    checked={Like}
                    className={classes.likeBtn}
                    control={<Checkbox icon={<FavoriteBorder className={classes.likeIcon} />} checkedIcon={<Favorite className={classes.likeIcon} />} name="checkedH" />}
                  /> */}
                  {/* <IconButton onClick={() => showShareModal(true)} className={classes.Comments}>
                    <ShareOutlinedIcon className={classes.SaveIcon} />
                  </IconButton> */}
                  <div style={{ display: 'flex', flexDirection: 'inherit', justifyContent: 'space-between', flexGrow: 'inherit',paddingTop:'20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'inherit' }}>
                      <div style={{ display: 'grid', textAlign: 'center', marginRight: '10px' }}>
                        <FormControlLabel
                          onClick={() => Cookies.get("USID") ? HandleLikePost() : (Router.push({ pathname: '/login' }), toast.success("برای ایجاد آگهی باید دارای حساب کسب و کار باشید"))}
                          checked={Like}
                          className={classes.likeBtn}
                          style={{ display: 'block' }}
                          control={<Checkbox icon={<FavoriteBorder className={classes.likeIcon} />} checkedIcon={<Favorite className={classes.likeIcon} />} name="checkedH" />}
                        />
                        <span style={{ fontSize: '14px' }}>{PostDetail?.likeCount}</span>
                      </div>
                      <div style={{ display: 'grid', textAlign: 'center', marginRight: '10px' }} >
                        <ChatBubbleOutlineIcon className={classes.SaveIcon} onClick={() => HandleShowComments(true)} />
                        <span style={{ fontSize: '14px' }}>{PostDetail?.lstComment?.length}</span>
                      </div>
                      <div style={{ display: 'grid', textAlign: 'center', marginRight: '10px' }} onClick={() => showShareModal(true)}>
                        <ShareOutlinedIcon className={classes.SaveIcon} />
                        <span style={{ fontSize: '14px' }}>&nbsp;</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'inherit' }}>
                      <div style={{ display: 'grid', textAlign: 'center', marginRight: '10px' }} >
                        <FormControlLabel
                          onClick={() => Cookies.get("USID") ? HandleSavePost() : (Router.push({ pathname: '/login' }), toast.success("لطفا وارد اکانت کاربری خود شوید"))}
                          checked={saved}
                          className={classes.SaveBtn}
                          style={{ marginTop: '-10px' }}
                          control={<Checkbox icon={<BookmarkBorderIcon className={classes.SaveIcon} />} checkedIcon={<Bookmark className={classes.SaveIcon} />} name="checkedH" />}
                        />
                        <span style={{ fontSize: '14px' }}>&nbsp;</span>
                      </div>
                    </div>
                  </div>

                  {/* <IconButton
                    onClick={() => HandleShowComments(true)}
                    className={classes.Comments}>
                    <ChatBubbleOutlineIcon className={classes.SaveIcon} />
                  </IconButton> */}

                  {/* <FormControlLabel
                    onClick={() => Cookies.get("USID") ? HandleSavePost() : (Router.push({ pathname: '/login' }), toast.success("لطفا وارد اکانت کاربری خود شوید"))}
                    checked={saved}
                    className={classes.SaveBtn}
                    control={<Checkbox icon={<BookmarkBorderIcon className={classes.SaveIcon} />} checkedIcon={<Bookmark className={classes.SaveIcon} />} name="checkedH" />}
                  /> */}
                </Box>

                {
                  !PostDetail?.percentage == 0 ? (
                    <Box
                      flex='1'
                      mt={-7}
                      mb={2}
                      position='relative'
                      textAlign='left'>
                      <div style={{position:'absolute',left:'0',bottom:'-5px'}}>
                        <img className={classes.badgeSliderBoxPic} />
                        <Box color='#fff' width='100%' right='-1.3rem'
                          top='1.5rem' position='absolute'
                          >

                          <Typography variant='h5'>%{PostDetail?.percentage}</Typography>
                        </Box>
                      </div>
                    </Box>
                  ) : (
                    <Box
                      flex='1'
                      mt={-4}
                      position='relative'
                      textAlign='left'>
                      <Box color='#fff' width='100%' right='-1rem'
                        top='1.5rem' position='absolute'
                        className={classes.badgeSliderSpanText}>

                      </Box>
                    </Box>
                  )
                }

              </Box>

              <Box mt={1}>
                <Box className={classes.titleOfParagraph} my={.75} component='span' fontWeight='bold' display='inline-block'>{PostDetail?.title}</Box>
                {/* <Box component='p' className={classes.paragraphPost} mt={0.5}>
                  {PostDetail?.description}
                </Box> */}
                {/* <p className="paragraphPost">{PostDetail?.description.replace("ایران", <br/>)}</p> */}
                <TextareaAutosize
                  style={{ background: 'linear-gradient(to  bottom, #EDECE7, #fff)' }}
                  minRows={5}
                  value={PostDetail?.description}
                  className="paragraphPost"
                />
                {/* <textarea className="paragraphPost" placeholder={PostDetail?.description}></textarea> */}
              </Box>


              <Box mt={3} mb={2} style={{ justifyContent: 'space-around' }}>
                {
                  PostDetail?.price !== 0 ? (
                    <Box className={classes.PriceItemAds2} component='span'  >قیمت اصلی :
                      <Box component='span' display='inline-block'>{toPersianNumber(PostDetail?.price)} تومان</Box>
                    </Box>
                  ) : (
                    ''
                  )
                }

                {
                  PostDetail?.percentage !== 0 ? (
                    <Box className={classes.PriceItemAds} component='span'  > تخفیف :
                      <Box component='span' display='inline-block'>%{PostDetail?.percentage}</Box>
                    </Box>
                  ) : (
                    ' '
                  )
                }

              </Box>

              {
                PostDetail?.userId === Cookies.get("USID") ? (
                  <Box my={2} pt={2} pb={2} display='flex' justifyContent='space-between' style={{ borderBottom: '2px solid #aaa', borderTop: '2px solid #aaa' }}>
                    <Box>
                      <Box width='100%' className={classes.PriceItemAds2} component='span' display='inline-block'>بازدیدماهیانه :
                        <Box component='span' display='inline-block'>{PostDetail?.thisMonthVisit}</Box>
                      </Box>

                      <Box width='100%' className={classes.PriceItemAds2} component='span' display='inline-block'>بازدید هفتگی :
                        <Box component='span' display='inline-block'>{PostDetail?.thisWeekVisit}</Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ''
                )
              }


              {
                PostDetail?.userId === Cookies.get("USID") ? (
                  <>
                    <Typography className={classes.lableName}>برچسب ها</Typography>

                    <Grid container direction="row" alignItems="center" style={{ borderBottom: '2px solid #aaa' }}>
                      {Labels && Labels?.map((item) => (
                        <Grid
                          key={item}
                          className="labales"
                        >
                          {item}
                        </Grid>
                      ))
                      }
                    </Grid>
                    <Box
                      style={{
                        marginBottom: 50
                      }}
                    >
                      <Box my={3} display='flex' width='100%' alignItems='center' justifyContent='space-between' className={classes.btnBusiness}>
                        <Btn onClick={() => Router.push(`/editpost/${PostDetail?.id}`)} >ویرایش آگهی</Btn>
                        <Btn
                          // onClick={() => HandleSendTo(1)}
                          onClick={() => { Router.push("/sendToHome") }}
                        >انتقال به خانه
                        </Btn>
                      </Box>
                      <Box my={1} display='flex' width='100%' alignItems='center' justifyContent='space-between' className={classes.btnBusiness}>
                        <Btn onClick={() => HandleSendTo(2)}>درج تخفیفات</Btn>

                        <Btn onClick={() => setShowModalAccept(true)} >حذف آگهی</Btn>
                      </Box>
                    </Box>
                  </>
                ) : (
                  ' '
                )
              }

              {/* <Box my={3} display='flex' width='100%' alignItems='center' justifyContent='center' className={classes.storeBtn}>
                <Btn variant='contained'>پروفایل فروشگاه</Btn>
              </Box> */}

              <Box style={{ borderTop: '1px solid #aaa' }} pt={3} pb={15} display='flex' width='100%' alignItems='center' justifyContent='center'>
                <Button
                  onClick={() => router.push(`tel:+98${PostDetail?.tell}`)}
                >
                  <SocialMediaIcon
                    Icon={<PhoneIcon />}
                  />
                </Button>
                <Button
                  onClick={() => router.push(`tel:+98${PostDetail?.tell}`)}
                >
                  <SocialMediaIcon
                    Icon={<ChatOutlinedIcon />}
                  />
                </Button>
                <Button
                  onClick={() => router.push(`https://www.instagram.com/${PostDetail?.instagram}`)}
                >
                  <SocialMediaIcon
                    Icon={<InstagramIcon />}
                  />

                </Button>
                <Button
                  onClick={() => router.push(`https://api.whatsapp.com/send?phone=+98${PostDetail?.whatsApp}`)}
                >
                  <SocialMediaIcon
                    Icon={<WhatsAppIcon />}
                  />
                </Button>

              </Box>

            </Container>
          </>
        )
      }
      <Modal
        open={ShowComments}
        onClose={() => HandleShowComments(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Slide direction="up" in={ShowComments} mountOnEnter unmountOnExit>
          <Grid
            container
            className={classes.CommentsModal}
          >
            {/* <IconButton onClick={() => HandleShowComments(false)} className={classes.CloseBtn}>
              <CancelRoundedIcon className={classes.CloseIcon} />
            </IconButton> */}

            <Grid
              className={classes.CommentsModalMain}
            >
              {
                UComments?.length > 0 ? (
                  ''
                ) : (
                  CommentsLoading ? (
                    ''
                  ) : (
                    <p>این آگهی کامنتی ندارد</p>
                  )

                )
              }
              {
                CommentsLoading ? (
                  <p>بارگذاری ...</p>
                ) : (
                  UComments &&
                  UComments?.map((item) => (
                    <Grid key={item?.id} container direction="row" alignItems="center" className={classes.CommentsMain}>
                      <Grid md={2} xs={2}>
                        <Avatar alt="Cindy Baker" className={classes.avatorImageComments} />
                      </Grid>
                      <Grid md={10} xs={10} className={classes.CommentsMain2}>
                        <h5 className={classes.CommentsUserName}>{item?.name + " " + item?.family}</h5>
                        <h4>{item?.text}</h4>
                      </Grid>
                    </Grid>
                  ))
                )
              }
            </Grid>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.MainInput}
            >


              <Grid container md={2} xs={2}>
                <IconButton onClick={() => HandleShowUSerDetailIf()} className={classes.sendIcon}>
                  <SendRoundedIcon style={{
                    fontSize: "30px"
                  }} />
                </IconButton>
              </Grid>

              <Grid container md={10} xs={10}>
                <TextareaAutosize value={SearchText} placeholder="نظر مورد نظر را وارد کنید ..." onChange={(e) => setSearchText(e.target.value)} className={classes.SearchInput} type="text" />
              </Grid>

            </Grid>

          </Grid>
        </Slide>
      </Modal>

      <Modal
        open={UserDetailModal}
        onClose={() => HandleShowUserDetail(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Slide direction="up" in={UserDetailModal} mountOnEnter unmountOnExit>
          <Grid
            container
            className={classes.CommentsModal}
            style={{
              padding: 20,
              bottom: "0px",
              position: "absolute",
              height: "300px",
            }}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid md={6} xs={6} style={{ padding: 10 }} >
                <input placeholder="نام" onChange={(e) => setName(e.target.value)} className={classes.Input} type="text" required />
              </Grid>
              <Grid md={6} xs={6} style={{ padding: 10 }} >
                <input placeholder="نام خانوادگی" onChange={(e) => setFamily(e.target.value)} className={classes.Input} type="text" required />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid md={12} xs={12}
                style={{
                  position: "relative",
                  top: "-40px",
                  padding: 10
                }}
              >
                <input value={Mobile} placeholder="شماره تماس" onChange={(e) => setMobile(e.target.value)} className={classes.Input} type="number" required />
              </Grid>

              <Button onClick={() => HandleAddPost()} className={classes.ButtonSend}>ارسال نظر</Button>

            </Grid>

          </Grid>
        </Slide>
      </Modal>
      <Modal
        open={ShowModalAccept}
        onClose={() => setShowModalAccept(false)}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "50px"
        }}
      >
        <Fade in={ShowModalAccept} mountOnEnter unmountOnExit>
          <Grid className={classes.containerSelect} container justify="center">
            <h1>آیا میخواهید آگهی خود را حذف کنید ؟</h1>
            <Box display='flex' width='100%' justifyContent='space-evenly' className={classes.selectBoxTextFeildCheck}>
              <Button onClick={() => HandleDeletePost()} className={classes.ButtonDelete}>حذف</Button>
              <Button onClick={() => setShowModalAccept(false)} className={classes.ButtonSend}>انصراف</Button>
            </Box>
          </Grid>
        </Fade>
      </Modal>
      <Modal
        open={ShowImage}
        onClose={() => setShowImage(false)}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "50px"
        }}
      >
        <Fade in={ShowImage} mountOnEnter unmountOnExit>
          <Grid style={{ position: "relative" }} className={classes.containerSelect} container justify="center">
            <span onClick={() => setShowImage(false)} className={classes.CloeModalSahre}>
              <HighlightOffRoundedIcon style={{
                fontSize: "35px",
                position: "absolute",
                right: "10px",
                color: "#1b185a",
                background: "white",
                borderRadius: "20px",
              }} />
            </span>
            <img src={BASE_Image_Url + PostDetail?.image} width='100%' /*objectFit='cover'*/ />
          </Grid>
        </Fade>
      </Modal>
      <Modal
        open={ShareModal}
        onClose={() => setShareModal(false)}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "50px"
        }}
      >
        <Slide direction="down" in={ShareModal} mountOnEnter unmountOnExit>
          <Grid className={classes.containerSelectShare} container justify="center">
            <h2>این آگهی را با دوستان خود به اشتراک بگذارید</h2>

            <Box display='flex' width='100%' justifyContent='space-evenly' className={classes.selectBoxTextFeildCheck}>

              <Box mb={2} display='flex' width='100%' alignItems='center' justifyContent='center'>
                {/* <Button
                  onClick={() => router.push(`sms:${PostDetail?.tell}`)}
                >
                  <SocialMediaIcon
                    Icon={<img src='/images/thirdIcon.png' width='80%' />}
                  />
                </Button> */}
                <WhatsappShareButton url={"https://vittell.com/posts/" + id} >
                  <SocialMediaIcon
                    social={true}
                    Icon={<img src='/images/icons/WhatsApp.png' width='120%' />}
                  />
                </WhatsappShareButton>
                <TelegramShareButton style={{ marginRight: "10px" }} url={"https://vittell.com/posts/" + id} >
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
    </>
  );
}



export default Posts;
