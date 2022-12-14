import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppUser from '../../components/User/AppUser';
import Dropdown from '../../components/Dropdown/Dropdown';
import { db } from '../../../Fire';
import { generateID } from '../../services/DBFunctions';
import firebase from 'firebase';
import { getTimeAgo } from '../../utils/date';

const FriendCard = props => {
    const {user, friends, options, activeClassName, userKey='uid', accessBtns} = props
    const curUser = firebase.auth().currentUser
    const [openID, setOpenID] = useState(null)
    const [isFriend, setIsFriend] = useState(false)
    const sendFriendRequest = () => {
        const requestID = generateID()
        db.collection('users').doc(user[userKey]).collection('notifications').doc(requestID).set({
            requestedBy: curUser.uid,
            date: new Date(),
            requestID,
            type: 'friend-request',
            status: 'pending'
        })
        db.collection('users').doc(curUser.uid).collection('notifications').doc(requestID).set({
            requestedTo: user[userKey],
            date: new Date(),
            requestID,
            type: 'friend-request',
            status: 'pending'
        })
    }
    const unfriend = () => {

    }
    const accessBtnsRender = accessBtns?.map(btn=> {
        return (
            <i className={`appicon ${btn.icon}`} onClick={()=> btn.onClick()}></i>
        )
    })
    useEffect(()=> {
        setIsFriend(friends?.some(x=> x.uid === user[userKey]))
    }, [friends])

    return (
        <div className={`${activeClassName} friendcard flexrow sb ac`}>
                <AppUser userid={user[userKey]}>
                    {({userInfo})=> (
                        <small className="activetimeago">
                            {
                                userInfo?.lastActive === 'online' ? 'Active Now' 
                                : 
                                getTimeAgo(typeof userInfo.lastActive !== 'string' && userInfo?.lastActive?.toDate(), true)
                            }
                        </small>
                    )} 
                </AppUser>
                <div className="flexrow gap-10">
                    {accessBtnsRender && accessBtnsRender}                
                    <Dropdown options={options ?? [
                        {
                            icon: 'fal fa-comment',
                            text: 'Send message',
                            link: `/chats/new-chat?${user[userKey]}`
                        },
                        {
                            icon: isFriend ? 'fal fa-user-minus' : 'fal fa-user-plus', 
                            text: isFriend ? 'Unfriend' : "Send Friend Request", 
                            onClick: ()=> {isFriend ? unfriend() : sendFriendRequest()}
                        },
                        {
                            icon: 'fal fa-user-slash',
                            text: 'Block User',
                            onClick: ()=> {}
                        }
                        ]} 
                        openID={openID} 
                        setOpenID={setOpenID}
                        id={user[userKey]}>
                        <i className='fal fa-ellipsis-h appicon'></i>
                    </Dropdown>
                </div>
        </div>
    );
};

FriendCard.propTypes = {
    
};

export default FriendCard;