import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './RightBar.css'
import AppUser from '../User/AppUser';
import firebase from 'firebase';
import Dropdown from '../Dropdown/Dropdown';
import AppBtn from '../AppBtn/AppBtn';
import FriendCard from '../../pages/Friends/FriendCard';
import useGetFriends from '../../services/GetFriends';
const RightBar = props => {
    const user = firebase.auth().currentUser
    const [openID, setOpenID] = useState(1)
    const friends = useGetFriends()
    const friendsRender = friends?.map(friend=> {
        console.log(friend)
        return (
            <FriendCard user={friend} userKey='friendID'/>
        )
    }) 
    return (
        <div className='rightbar'>
            <div className="flexrow sb ac">
             <h3>Friends & Groups</h3>
             <i className="fal fa-user-plus appicon"></i>
            </div>
            <div className="friendsrender">
               {friendsRender}
            </div>
        </div>
    );
};

RightBar.propTypes = {
    
};

export default RightBar;