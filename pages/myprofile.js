import React, { useState, useEffect, useContext } from 'react'
import NormalUserProfileIndex from '../Components/Screens/NormalUserProfile';
import BusinessAccountBusinessOwner from './../Components/Screens/BusinessAccountBusinessOwner';
import CreatBusinessAccount from './../Components/Screens/CreatBusinessAccount';
import { ToastContainer, toast } from 'react-toastify';

// mrx : api links
import {
  GET_USER_BY_ID,
} from './api/index';

// mrx : context
import { Contexts } from './../contexts/index';

// mrx : api
import { PostUrl, GetAuthUrl, PostAuthUrl } from './api/config';

// mrx : cookie
import Cookies from 'js-cookie';

const NormalUserProfile = () => {
  const [IsLogin, setIsLogin] = useState(false);

  // mrx : context data
  const { UserInfo, setUserInfo } = useContext(Contexts);
  const [IsBusinessFinish, setIsBusinessFinish] = useState(false);

  const GetUserInfo = () => {
    // mrx : get Province
    GetAuthUrl(GET_USER_BY_ID(Cookies.get("USID"))).then(res => {

      if (res && res.status === 200) {
        const data = res?.data?.data;
        setUserInfo(data);
      } else {
        toast.error(res?.data?.message);
      }
    })
  }

  useEffect(() => {
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      setIsLogin(true);
      GetUserInfo();
    } else {
      setIsLogin(false)
    }
    if (UserInfo?.data?.businessName !== null) {
      setIsBusinessFinish(false);
    } else {
      setIsBusinessFinish(true);
    }
  }, [])

  if (IsLogin) {
    if (UserInfo?.businessName !== null) {
      return (
        <>

          {Cookies.get("Count") == 1 ?
            // <StoreFromUser />
            <BusinessAccountBusinessOwner />
            :
            <NormalUserProfileIndex />
          }

        </>
      )
    } else if (IsBusinessFinish) {
      {
        Cookies.get("Count") == 1 ?
        // <StoreFromUser />
        <CreatBusinessAccount />
        :
        <NormalUserProfileIndex />
      }
    } else {
      return (
        <>

          {Cookies.get("Count") == 1 ?
            // <StoreFromUser />
            <CreatBusinessAccount />
            :
            <NormalUserProfileIndex />
          }

        </>
      )
    }

  } else {
    return (
      <>
      </>
    )
  }

}

export default NormalUserProfile
