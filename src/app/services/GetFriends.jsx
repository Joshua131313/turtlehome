import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { db } from '../../Fire';
const useGetFriends = (user = firebase.auth().currentUser) => {
    const [friends, setFriends] = useState([])
    console.log(user)
    useEffect(()=> {
         db.collection('users').doc(user.uid).collection('friends').onSnapshot(snapshot => {
            const friends = snapshot.docs.map(doc => doc.data())
            setFriends(friends)
        })
    }, [user])

    return friends    
};


export default useGetFriends;