import React, {useState, useEffect} from 'react'
import { db } from '../../Fire'
import firebase from 'firebase'

export const useGetMembersById = (convoid) => {
  const [members, setMembers] = useState([])
  const user = firebase.auth().currentUser
  useEffect(()=> {
    setMembers([])
    user &&  db.collection('chats').doc(convoid).onSnapshot(snap=> {
     let data = snap.data()
     setMembers(data?.members)
   })
  }, [user, convoid])

  return members
} 