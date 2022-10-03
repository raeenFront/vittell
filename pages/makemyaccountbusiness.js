import React, { useState, useEffect } from 'react';
import Makemyaccountbusiness from '../Components/Screens/makemyaccountbusiness';
import Router, { withRouter } from 'next/router';

// mrx : cookie
import Cookies from 'js-cookie';

const MoveOfferPage = () => {
  const [IsLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      Router.push("/");
    }
  }, [])
  
  if (IsLogin) {
    return (
      <>
        <Makemyaccountbusiness />
      </>
    )
  } else {
    return (
      <>
      </>
    )
  }
}

export default MoveOfferPage
