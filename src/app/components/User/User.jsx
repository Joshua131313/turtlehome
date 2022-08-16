import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../../ContextAPI'
import ImgLoaded from '../Imgloaded/Imgloaded'
import './User.css' 

export const User = (props) => {
  const {showName= true, isLink} = props
  const {userinfo} = useContext(StoreContext)
  let El = isLink ? Link : 'div'
  return (
    <El to='/settings/' className="user flexrow ac" >
      <ImgLoaded img={userinfo?.userinfo?.profilePic}/>
     {showName &&  <span>{userinfo.name}</span>}
    </El>
  )
}
