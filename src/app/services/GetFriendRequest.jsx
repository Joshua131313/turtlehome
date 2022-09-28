import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { db } from '../../Fire';
const useGetFriendRequests = (filter, user = firebase.auth().currentUser) => {
    const [friendRequests, setFriendRequests] = useState([])
    useEffect(()=> {
       if(filter === 'all') {
        db.collection('users').doc(user.uid).collection('notifications').where('type', '==', 'friend-request').onSnapshot(snapshot => {
            const friendRequests = snapshot.docs.map(doc => doc.data())
            setFriendRequests(friendRequests)
        })
       }
       else {
        db.collection('users').doc(user.uid).collection('notifications').where('type', '==', 'friend-request').where('status', '==', filter).onSnapshot(snapshot => {
            const friendRequests = snapshot.docs.map(doc => doc.data())
            setFriendRequests(friendRequests)
        })
       }
    }, [user, filter])

    return friendRequests    
};


export default useGetFriendRequests;