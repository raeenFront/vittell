import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loadings from '../../Common/Loading';
import Router, { withRouter, useRouter } from 'next/router';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

// mrx : cookie
import Cookies from 'js-cookie';

// mrx : context
import { Contexts } from "../../../contexts/index";

// mrx : components
import TextFieldItem from '../../Common/TextFieldItem';
import CategoryIcon from '@material-ui/icons/Category';
import BlogBox from '../../Common/BlogBox';
import ProvinceAndCity from '../../Common/ProvinceAndCity';
import SelectCategoryScreenModal from "../../Common/SelectCategory";

// style
import { theme } from '../../theme';
import useStyles from './SearchScreen.style';

// mrx : material ui
import SearchIcon from '@material-ui/icons/Search';
import { Box, Container, Grid, Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Slide from '@material-ui/core/Slide';
import Modal from '@material-ui/core/Modal';

// mrx : api links
import {
  GET_ALL_SEARCH_POSTS,
  PROVINCE,
  CITY_BY_PROVINCE_ID,
  GET_ALL_POSTS,
  BASE_Image_Url,
  GET_ALL_SEARCH_USERS
} from '../../../pages/api/index';

// mrx : api
import { PostUrl, GetUrl } from '../../../pages/api/config';

//my variables
const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const SearchScreenIndex = () => {
  const classes = useStyles();
  const router = useRouter();

  // mrx : state
  const { setSearchUser } = useContext(Contexts);
  const [SearchType, setSearchType] = React.useState(1);
  const [ProvinceId, setProvinceId] = useState(null);
  const [CityId, setCityId] = useState(null);
  const [CategoryID, setCategoryID] = useState("");
  const [City, setCity] = useState([]);
  const [Province, setProvince] = useState([]);
  const [AllPosts, setAllPosts] = useState([]);
  const [LoadingPost, setLoadingPost] = useState(true);
  const [showSelectCategoryModal, setShowSelectCategoryModal] = useState(false);
  const [category, setCategory] = useState(null);
  const [PostLeinght, setPostLeinght] = useState(16);

  const ChangeSearchType = (event) => {
    setSearchType(event);
  };

  const PostID = typeof window !== "undefined" ? localStorage.getItem("PostID") || '1' : '1';
  const SearchInputs = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("SearchInputs")) || '{}' : '{}';

  const [Search, setSearch] = useState(SearchInputs?.title ? SearchInputs?.title : "");

  // mrx : Search
  const handleSearch = (status) => {
    if (status !== 1) {
      if (Search === "") {
        localStorage.setItem("SearchInputs", JSON.stringify({}))
      } else {
        localStorage.setItem("SearchInputs", JSON.stringify({
          title: Search,
          category: category?.id,
          searchType: SearchType
        }))
      }
    }
    // mrx : search posts
    if (SearchType === 1) {
      setLoadingPost(true);
      // GetUrl(GET_ALL_SEARCH_POSTS + `?search=${Search}&provinceId=${ProvinceId}&cityId=${CityId}&categoryId=${category?.id}`)
      GetUrl(GET_ALL_SEARCH_POSTS + `?search=${Search ? Search : ""}&categoryId=${category?.id ? category?.id : null}`)
        .then((res, err) => {
          if (res && res.status === 200) {
            const data = res.data.data;
            setAllPosts(data);
            setPostLeinght(data?.length);
            setLoadingPost(false);
          } else {
            toast.error("خطایی در سرور به وجود آمده است");
          }
        });

      // mrx : search users
    } else if (SearchType === 2) {
      if (status !== 1) {
        setLoadingPost(true);
        // mrx : Search
        GetUrl(GET_ALL_SEARCH_USERS + `?name=${Search ? Search : ""}&provinceId=${ProvinceId}&cityId=${CityId}&categoryId=${category?.id ? category?.id : null}`)
          .then((res, err) => {
            if (res && res.status === 200) {
              const data = res.data.data;
              setSearchUser(data);
              Router.push("/searchStore");
              setLoadingPost(false);
            } else {
              toast.error("خطایی در سرور به وجود آمده است");
            }
          });
      }
    }
  }

  useEffect(() => {
    scroller.scrollTo(PostID, {
      delay: 50,
      smooth: 'easeInOutQuint',
    }, 2000)
  }, [LoadingPost])

  useEffect(() => {

    setSearch(SearchInputs?.title);
    setCategory(SearchInputs?.category);
    setSearchType(SearchInputs?.searchType ? SearchInputs?.searchType : 1);
    if (SearchInputs?.title?.length >= 1) {
      handleSearch(1);
    }

    if (SearchInputs?.title?.length === undefined) {
      // mrx : get All Posts
      GetUrl(GET_ALL_SEARCH_POSTS + `?cityId=${Cookies.get("CITID")}`).then((res, err) => {
        if (res && res?.status === 200) {
          const data = res?.data?.data;
          setAllPosts(data);
          setLoadingPost(false)
          if (res?.data?.statusCode === 4) {
            toast.success(res?.data?.message);
            setLoadingPost(true);
          }
        } else {
          toast.error("خطایی در سرور به وجود آمده است");
        }
      });
    }

  }, [])


  return (
    <Container maxWidth='sm'>

      <Box pt={13} style={{
      }} className={classes.formCheckBoxSearch} display='flex' justifyContent='space-around'>

        <Button
          onClick={() => ChangeSearchType(1)}
          style={{
            background: SearchType === 1 ? "rgb(239 75 76)" : "#eeece6",
            padding: "10px 20px",
            border: '2px solid  rgb(239 75 76)',
            borderRadius: '1rem',
            width: "45%",
            color: SearchType === 1 ? "white" : ""
          }}
        >
          محصول
        </Button>
        <Button
          onClick={() => ChangeSearchType(2)}
          style={{
            background: SearchType === 2 ? "rgb(239 75 76)" : "#eeece6",
            padding: "10px 20px",
            width: "45%",
            border: '2px solid  rgb(239 75 76)',
            borderRadius: '1rem',
            color: SearchType === 2 ? "white" : ""
          }}
        >
          فروشگاه
        </Button>
      </Box>



      <Box pb={3} style={{ borderBottom: `2px solid #aaa`, }}  width='100%' textAlign='center' display='flex' className={classes.searchItemBox}>
        <TextFieldItem           
          width= "70%"
          icon={<SearchIcon />}
          placeHolderText='نام محصول مورد نظر را وارد کنید'
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
          
        />
        <Button onClick={() => handleSearch()} variant='contained'  
                  style={{
                    background: "rgb(239 75 76)" ,
                    padding: "10px 20px",
                    border: '2px solid  rgb(239 75 76)',
                    borderRadius: '1rem',
                    width: "45%",
                    color: '#fff',
                    height:"40px",
                    marginRight: "15px"
                  }}  >جستجو</Button>
      </Box>



      <Box pb={3} my={5} style={{ borderBottom: `2px solid #aaa`, }} className={classes.selectBoxNormalProfile}>
        <Box display='flex' style={{
          width: "100%",
          marginRight: "8px",
        }} onClick={() => setShowSelectCategoryModal(true)}>
          <TextFieldItem
            inputProps=' دسته بندی'
            value={category && category?.name}
            backgroundColor='#fff'
            disabled
          />
        </Box>


      </Box>

      <Grid style={{ display: " inline-flex" }}>
        <Box style={{ width: "50%" }} flexWrap='wrap' mb={10}>
          {
            LoadingPost ? (
              " "
            ) : (
              <>
                {AllPosts &&
                  AllPosts?.filter((item, idx) => idx % 2 == 0).map((item) => (
                    <BlogBox
                      from="search"
                      id={item?.id}
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
                {

                  AllPosts?.length === 0 ? (
                    <>
                      <p style={{ position: "absolute", margin: "-20px 10px" }}>آگهی یافت نشد</p>
                    </>
                  ) : (
                    ' '
                  )
                }
                {AllPosts &&
                  AllPosts?.filter((item, idx) => idx % 2 == 1).map((item) => (
                    <BlogBox
                      from="search"
                      id={item?.id}
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
    </Container >
  );
}



export default SearchScreenIndex;
