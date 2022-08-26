import React, { useEffect, useState } from 'react'
import { db } from '../../Fire'

export const useGetUserInfo = (userid, userInfo) => {
  const [userinfo, setUserinfo] = useState('')
  useEffect(()=> {
    if(!userInfo?.name) {
      if( userid) {
        db.collection('users').doc(userid).onSnapshot(snap=> {
        setUserinfo(snap.data())
        })
    }
    }
   }, [userid, userInfo])

  return !userInfo?.name ? userinfo : userInfo
}