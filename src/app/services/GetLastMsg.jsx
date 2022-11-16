import React, {useState, useEffect} from 'react'
import { db } from '../../Fire'
import firebase from 'firebase'

export const useGetLastMsg = (convoid) => {
  const [lastMsg, setLastMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const user = firebase.auth().currentUser
  useEffect(()=> {
    if(convoid) {
      setLastMsg([])
      user &&  db.collection('chats').doc(convoid).onSnapshot(snap=> {
        let data = snap.data()
       
        setLastMsg(data.lastMsg)
        setLoading(false)
      })
    }
  }, [user, convoid])

  return lastMsg
}