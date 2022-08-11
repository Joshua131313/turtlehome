import React from 'react'
import { useGetUserInfo } from '../../services/GetUserInfo'
import ImgLoaded from '../Imgloaded/Imgloaded'

export const Searcheduser = (props) => {
  const {userid, userinfo, handleAddRemove, search, userInfo} = props
  const clean = text => text?.replace(/[^a-zA-Z0-9 ]/g, "");
  let info = userInfo ? userInfo : userinfo
  // const pattern = new RegExp('\\b' + clean(search?.split('@')[1]), 'i');
  return (
    <div  className="searcheduser flexrow" onClick={()=> handleAddRemove?.(info?.name ? info.uid : {name: info.name, string: search?.split('@')[1] })}>
      
        {
           info?.userinfo?.profilePic ? <ImgLoaded img={info?.userinfo.profilePic} /> : <div className="imgloaded usericonplaceholder"><i className='fa fa-user'></i></div>
         }
        <span>{info?.name}</span> fdg
    </div> 
  )
}