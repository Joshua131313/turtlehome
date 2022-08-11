import React, { useEffect, useState } from 'react'
import { db } from '../../Fire'

export const useGetUserInfo = (userid, userInfo) => {
  const [userinfo, setUserinfo] = useState('')
  const [wasCalled, setWasCalled] = useState(false)
  useEffect(()=> {
    if(!userInfo?.name) {
      if(!wasCalled && userid) {
        db.collection('users').doc(userid).onSnapshot(snap=> {
        setUserinfo(snap.data())
        })
        setWasCalled(true)
    }
    }
   }, [userid, wasCalled, userInfo])

  return !userInfo?.name ? userinfo : userInfo
}