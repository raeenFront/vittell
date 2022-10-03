import React, { useEffect, useState } from 'react'
import HomeScreen from './../Components/Screens/HomeScreen';

// mrx : cookie
import Cookies from 'js-cookie'

const Index = () => {
  // if (Cookies.get("token")) {
  //   return (
  //     <>
        
  //     </>
  //   )
  // } else {
    return (
      <>
        <HomeScreen />
      </>
    )
  // }
}

export default Index
