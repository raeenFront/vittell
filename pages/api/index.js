export const HEADER_BASE = {
  "content-type": "application/json",
  "Accept-Language": "fr-IR,fr;q=0.5",
};

// mrx : base url
export const BASE_URL = `https://vitell.arezouarmina.ir/api`;

// mrx : base image url
export const BASE_Image_Url = `https://vitell.arezouarmina.ir`;

// const export const POSTS = `${BASE_URL}/posts/`;
export const LOGIN_USER = `${BASE_URL}/Authenticate/Login`;

// mrx : signup
export const SIGNUP = `${BASE_URL}/Authenticate/Register`;

// mrx : Province
export const PROVINCE = `${BASE_URL}/Province/GetAllProvince`;

// mrx : get city by province id  
export const CITY_BY_PROVINCE_ID = `${BASE_URL}/City/GetAllCityFromProvince`;

// mrx : Home slider
export const GET_SLIDER_BY_CITY_ID = `${BASE_URL}/Slider/GetCitySlider`;

// mrx : offer post slider
export const GET_OFFER_SLIDER_BY_CITY_ID = `${BASE_URL}/Post/GetHomeOffPost`;

// mrx : post of home page
export const GET_POSTS_HOME_PAGE_BY_CITY_ID = `${BASE_URL}/Post/GetHomePost`;

// mrx : get post & comments BY ID
export const GET_POST_BY_ID = (id) => `${BASE_URL}/Post/GetPost?id=${id}`;

// mrx : get user by id 
export const GET_USER_BY_ID = (id) => `${BASE_URL}/User/GetBussinesInfo?id=${id}`;

// mrx : verify code 
export const GET_VERIFY_CODE = `${BASE_URL}/Authenticate/Verify`;

// mrx : reSendVerifyCode
export const RE_SEND_VERIFY_CODE = `${BASE_URL}/Authenticate/ReSendVerifyCode`;

// mrx : Get all offer posts
export const GET_ALL_OFFER_POSTS = `${BASE_URL}/Post/GetOffPost`;

// mrx : get all posts search
export const GET_ALL_SEARCH_POSTS = `${BASE_URL}/Post/SearchPost`;

// mrx : get All Posts
export const GET_ALL_POSTS = `${BASE_URL}/Post/GetPosts`;

// mrx : get all users Search
export const GET_ALL_SEARCH_USERS = `${BASE_URL}/User/SearchUser`;

// mrx : get saves auth
export const GET_ALL_USER_SAVES = `${BASE_URL}/FavoritePost/GetUserFavoritePost`;

// mrx : get any user by ID 
export const GET_ANY_USER_BY_ID = `${BASE_URL}/User/GetUser`;

// mrx : get province by user id
export const GET_PROVINCE_BY_USER_ID = `${BASE_URL}/City/GetCity`;

// mrx : change normal user to Bussines
export const MEMBER_TO_BUSSINES = `${BASE_URL}/User/MemberToBussines`;

// mrx : change user city by auth
export const CHANGE_USER_CITY_AUTH = `${BASE_URL}/User/ChangeUserCity`;

// mrx : like post by user id ( auth )
export const LIKE_POST_BY_AUTH = `${BASE_URL}/Like/LikePost`;

// mrx : SAVE_POST_BY_AUTH ( auth )
export const SAVE_POST_BY_AUTH = `${BASE_URL}/FavoritePost/ToggleAdd`;

// mrx : get post comments by post id 
export const GET_POST_COMMENTS_BY_POST_ID = `${BASE_URL}/Comment/GetPostCommnet`;

// mrx : add comments by post id and auth
export const ADD_COMMENTS_BY_AUTH = `${BASE_URL}/Comment/Add`;

// mrx : add post Auth
export const ADD_POST_AUTH = `${BASE_URL}/Post/Add`;

// mrx : upload user wallpaper auth
export const UPLOAD_USER_WALLPAPER_AUTH = `${BASE_URL}/User/UploadWallpaper`;

// mrx : upload user profile auth
export const UPLOAD_USER_PROFILE_AUTH = `${BASE_URL}/User/UploadProfile`;

// mrx : get all Category
export const GET_ALL_CATEGORY = `${BASE_URL}/Category/GetAllCategoryFront`;

// mrx : make account ot bussines
export const SET_PAYFACTOR = `${BASE_URL}/Pay/PayFactor`;

// mrx : upload post image by post id
export const UPLOAD_POST_IMAGE_BY_ID = `${BASE_URL}/Post/AddPostImage`;

// mrx : get user post by id
export const GET_USER_POST_BY_ID = `${BASE_URL}/Post/GetUserPost`;

// edit user
export const EDIT_USER = `${BASE_URL}/User`;

// mrx : edit post
export const EDIT_POST = `${BASE_URL}/Post/Edit`;

// mrx : reset password
export const RESET_PASSWORD = `${BASE_URL}/Authenticate/ForgetPassword`;

// mrx : check verify code 
export const CHECK_VERIFY_CODE = `${BASE_URL}/Authenticate/ForgetPasswordVerifyCode`;

// mrx : change password
export const CHANGE_PASSWORD = `${BASE_URL}/Authenticate/ResetPassword`;

// mrx : pay factor ( send to home - offers page & search )
export const PAY_FACTOR = `${BASE_URL}/Pay/PayFactor`;

// mrx : delete post
export const DEL_POST = `${BASE_URL}/Post/Delete`;

// mrx : get defult city from admin
export const GET_DEFULT_CITY = `${BASE_URL}/Setting/GetDefaultCity`;

// mrx : pine to bussines
export const PINE_TO_B = `${BASE_URL}/User/PinBussines`;

//get user price list
export const GET_USER_PRICE_LIST =(userId)=> `${BASE_URL}/User/GetUserPrice/${userId}`;
//edit user price list
export const EDIT_PRICE_LIST = `${BASE_URL}/User/EditUserPrice`;