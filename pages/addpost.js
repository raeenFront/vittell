import React, { useState, useEffect } from 'react'
import Router, { withRouter } from 'next/router';

// mrx : components
import AddPostIndex from '../Components/Screens/AddPost';

// mrx : cookie
import Cookies from 'js-cookie';

const AddPost = () => {
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
        <AddPostIndex />
      </>
    )
  } else {
    return (
      <>
      </>
    )
  }
}

export default AddPost
