import React, {useState, useEffect} from 'react'
import { db } from '../../Fire'
import firebase from 'firebase'

export const useGetChatMsgs = (convoid, setUpdateLimit, updateLimit) => {
  const [msgs, setMsgs] = useState([])
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(100)
  const [scrollLoading, setScrollLoading] = useState(false)
  const user = firebase.auth().currentUser
  
  
  useEffect(()=> {
    if(updateLimit) {
      setLimit(prev=> prev+20)
    }
  }, [updateLimit])

  useEffect(()=> {
    if(convoid) {
      user &&  db.collection('chats').doc(convoid).collection('messages').orderBy('date', 'desc').limit(limit).onSnapshot(snap=> {
        let items = []
        snap.forEach(doc => items.push(doc.data())) 
        setMsgs(items)
        setLoading(false)
        setUpdateLimit(false)
      })
    }
  }, [user, convoid, limit])

  return {msgs, loading}
}