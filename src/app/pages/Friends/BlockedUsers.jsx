import React from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';
import useGetFriends from '../../services/GetFriends';
import FriendCard from './FriendCard';
import useGetBlockedUsers from '../../services/GetBlockedUsers';
const BlockedUsers = props => {
    const blockedUsers = useGetBlockedUsers()
    const blockedUsersRender = blockedUsers?.map(blockedUser=> {

        return  (
            <FriendCard user={blockedUser} friends={blockedUsers} key={blockedUser.uid} />
        )
    })
    return (
        <Layout 
            title='Blocked Users' 
            subTitle='Manage the users your blocked'
            length={blockedUsers?.length}
            >
            <div className="usersrender flexcol">
                {blockedUsersRender}
            </div>
        </Layout>
    );
};

BlockedUsers.propTypes = {
    
};

export default BlockedUsers;