import React, { useEffect, useState } from 'react'
import { db } from '../../Fire'
import firebase from 'firebase'

export const useSearchUsers = ({search}) => {
  const [searchedUsers, setSearchedUsers] = useState()
  const user = firebase.auth().currentUser
  useEffect(()=> {
    db.collection('users').where('searchName', '>=', search.toLowerCase()).where('searchName', '<=', search.toLowerCase()+'\uf9ff').limit(8).onSnapshot(snap=> {
        let items = []
        snap.forEach(doc => items.push(doc.data()))
        setSearchedUsers(items.filter(x=> x.uid !== user.uid))
      })
  }, [search])  
  return searchedUsers
}