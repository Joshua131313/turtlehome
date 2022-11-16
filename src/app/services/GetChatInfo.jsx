import React, {useState, useEffect} from 'react'
import { db } from '../../Fire'
import firebase from 'firebase'

export const useGetChatInfo = (convoid) => {
  const [chatInfo, setChatInfo] = useState('')
  const user = firebase.auth().currentUser
  useEffect(()=> {
    if(convoid) {
      user &&  db.collection('chats').doc(convoid).onSnapshot(snap=> {
        let data = snap.data()
        setChatInfo(data)
      })
    }
  }, [user, convoid])

  return chatInfo
}