import React from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';
import useGetFriends from '../../services/GetFriends';
import FriendCard from './FriendCard';
const FriendsRender = props => {
    const friends = useGetFriends()
    console.log(friends)
    const friendsRender = friends?.map(friend=> {

        return  (
            <FriendCard 
                user={friend} 
                friends={friends} 
                key={friend.friendID} 
                userKey='friendID'
                options={[
                    {
                        icon: 'fal fa-user-',
                        text: '',
                        onClick: ()=> {}
                    }
                ]}
                />
        )
    })
    return (
        <Layout 
            title='Friends' 
            subTitle='View all your friends here'
            length={friends?.length}
            >
            <div className="usersrender flexcol">
                {friendsRender}
            </div>
        </Layout>
    );
};

FriendsRender.propTypes = {
    
};

export default FriendsRender;