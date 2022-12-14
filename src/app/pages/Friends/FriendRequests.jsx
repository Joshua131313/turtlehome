import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useGetFriendRequests from '../../services/GetFriendRequest';
import FriendCard from './FriendCard';
import firebase from 'firebase';
import { db } from '../../../Fire';
import Dropdown from '../../components/Dropdown/Dropdown';
import AppBtn from '../../components/AppBtn/AppBtn';
import AppSelect from '../../components/AppSelect/AppSelect';
import Layout from './Layout';
import { blockUser } from '../../services/DBFunctions';
import useGetBlockedUsers from '../../services/GetBlockedUsers';

const FriendRequests = props => {
    const [filter, setFilter] = useState('pending')
    const friendRequests = useGetFriendRequests(filter)
    const blockedUsers = useGetBlockedUsers()
    const curUser = firebase.auth().currentUser
    const acceptFriendRequest = (requestedBy, notifID) => {
        db.collection('users').doc(curUser.uid).collection('friends').doc(requestedBy).set({
            date: new Date(),
            friendID: requestedBy
        })
        db.collection('users').doc(requestedBy).collection('friends').doc(curUser.uid).set({
            date: new Date(),
            friendID: curUser.uid
        })
        db.collection('users').doc(curUser.uid).collection('notifications').doc(notifID).update({
            status: 'accepted'
        })
    }
    const rejectFriendRequest = (requestedBy, notifID) => {
        db.collection('users').doc(curUser.uid).collection('notifications').doc(notifID).update({
            status: 'rejected'
        })
    }
    const unsendRequest = () => {

    }
    const markAsRead = (notifID, read) => {
      if(read) {
        db.collection('users').doc(curUser.uid).collection('notifications').doc(notifID).update({
            read: false
        })
      }
      else {
        db.collection('users').doc(curUser.uid).collection('notifications').doc(notifID).update({
            read: true
        })
      }
    }
    console.log(friendRequests)
   
    const requestsRender = friendRequests?.map((request, i)=> {
        let isRequestedTo = request.requestedTo
        let options = [
            {
                icon: 'fal fa-user-check',
                text: isRequestedTo ? 'Request Pending' : 'Accept Request',
                onClick: ()=> isRequestedTo ? null : acceptFriendRequest(request.requestedBy, request.requestID)
            },
            {
                icon: 'fal fa-user-times',
                text: request.requestedTo ? 'Unsend Request' : 'Reject Request',
                onClick: ()=> isRequestedTo ? unsendRequest() : rejectFriendRequest(request.requestedBy, request.requestID),
            },
            {
                icon: 'fal fa-user-slash',
                text: blockedUsers.some(x=> x.userid === request.requestedBy) ? "Unblock this User" : 'Block this User',
                onClick: ()=> blockUser(request.requestedBy, blockedUsers.some(x=> x.userid === request.requestedBy))
            },
            {
                icon: request.read ? 'fal fa-eye-slash' : 'fal fa-eye',
                text: request.read ? 'Mark as Unread' : 'Mark as Read',
                onClick: ()=> markAsRead(request.requestID, request.read)
            }
        ]
        if(request.requestedTo) {
            return (
                <FriendCard 
                  user={{uid: request.requestedTo}} 
                  activeClassName={request?.read ? '' : 'hightlight'} 
                  key={i} 
                  options={options.slice(2, 4)}
                  accessBtns={options.slice(1, 2)}
                />
            )
        }
        else {
            return (
                <FriendCard 
                  user={{uid: request.requestedBy}} 
                  activeClassName={request?.read ? '' : 'hightlight'} 
                  key={i} 
                  options={options}
                  accessBtns={options.slice(0, 2)}
                />
            )
        }
    })
    
    return (
        <Layout 
            className='friendrequests'
            title={'Friend Requests'}
            subTitle={`Showing ${filter} requests`}
            length={friendRequests?.length}
            options={[
                {
                    icon: 'fal fa-th',
                    text: 'Show All',
                    onClick: ()=> {setFilter('all')}
                },
                {
                    icon: 'fal fa-question',
                    text: 'Show Pending',
                    onClick: ()=> {setFilter('pending')}
                },
                {
                    icon: 'fal fa-check',
                    text: 'Show Accepted',
                    onClick: ()=> {setFilter('accepted')}
                },
                {
                    icon: 'fal fa-times',
                    text: 'Show Rejected',
                    onClick: ()=> {setFilter('rejected')}
                },
         ]}>
            <div className="usersrender flexcol">
                {requestsRender}
            </div>
         </Layout>
    );
};

FriendRequests.propTypes = {
    
};

export default FriendRequests;