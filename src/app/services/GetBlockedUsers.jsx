import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { db } from '../../Fire';
const useGetBlockedUsers = (user = firebase.auth().currentUser) => {
    const [blockedUsers, setBlockedUsers] = useState([])
    console.log(user)
    useEffect(()=> {
         db.collection('users').doc(user.uid).collection('blockedUsers').onSnapshot(snapshot => {
            const blockedUsers = snapshot.docs.map(doc => doc.data())
            setBlockedUsers(blockedUsers)
        })
    }, [user])

    return blockedUsers    
};


export default useGetBlockedUsers;