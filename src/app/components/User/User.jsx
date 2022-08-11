import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../../ContextAPI'
import ImgLoaded from '../Imgloaded/Imgloaded'
import './User.css' 

export const User = (props) => {
  
  const {userinfo} = useContext(StoreContext)

  return (
    <Link to='/settings/' className="user" >
      <ImgLoaded img={userinfo?.userinfo?.profilePic}/>
    </Link>
  )
}
